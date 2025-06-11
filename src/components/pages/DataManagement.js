// Modules ------------------------------------------------------------------
import * as bootstrap from 'bootstrap';
import { useState, useEffect, useRef, memo } from 'react';
import ReactDOMServer from 'react-dom/server';


// Custom -------------------------------------------------------------------
// Elements / Scripts
import HPBlock from '../basic/HPBlock';
import ACBlock from '../basic/ACBlock';
import HorizLine from '../basic/HorizontalLine';
import SideBySide from '../basic/SideBySide';
import BasicCon from '../basic/BasicContainer';
import JsonDisplay from '../basic/JsonDisplay';
import * as tools from '../../scripts/tools';
import * as dice from '../../scripts/dice';
// Data
import rawMonstersData from '../../data/srd_5e_monsters.json';
import * as SRDapi from '../../scripts/dndSRD5eapi';
import * as storage from '../../scripts/storage';

function DataManagement() {
    // Page Title
    useEffect(() => {
        document.title = "Data Management";
        setProxyJson({ "no data": "to display" });
    }, []);

    // Data control
    const [dataType, setDataType] = useState('');
    const handleDataTypeChange = (e) => {
        const newDataType = e.target.value;
        setDataType(newDataType);
        if (newDataType === '') {
            setProxyJson({ "no data": "to display" });
        }
        else {
            setProxyJson(storage.retrieve(newDataType));
        }
    }
    const [proxyJson, setProxyJson] = useState();
    const handleJsonChange = (data) => {
        setProxyJson(data);
    }
    const [editable, setEditable] = useState(false);

    // Data manipulation
    const saveData = () => {
        storage.saveData(proxyJson, dataType);
        setEditable(false);
        setProxyJson(null);
        setDataType('');
    }
    const eraseData = () => {
        storage.erase(dataType);
        setEditable(false);
        setProxyJson(null);
        setDataType('');
    }

    return (
        <div style={{overflowY: 'auto !important', height: '92.5vh'}}>
            <BasicCon margin={7} content={
                <>
                    <h1>Data Management</h1>
                    <SideBySide content={
                        <>
                            <h4>Data to view/edit: </h4>
                            <select id="datatype" value={dataType} onChange={handleDataTypeChange}>
                                <option value="">Choose...</option>
                                <option value="charData">Character Data</option>
                                <option value="monsterData">Monster Data</option>
                            </select>
                        </>
                    } />
                </>
            } />
            <BasicCon margin={7} content={
                <>
                    <SideBySide justify='space-between' content={
                        <>
                            <button
                                className='btn btn-primary'
                                onClick={() => setEditable(!editable)}
                                disabled={dataType !== '' ? false : true}
                            >
                                Make Editable
                            </button>
                            <button
                                className='btn btn-success'
                                onClick={saveData}
                                disabled={dataType !== '' ? false : true}
                            >
                                Save data
                            </button>
                            <button
                                className='btn btn-danger'
                                onClick={eraseData}
                                disabled={dataType !== '' ? false : true}
                            >
                                Erase all data for this item
                            </button>
                        </>
                    } />
                    <HorizLine />
                    <JsonDisplay
                        jsonData={proxyJson}
                        editable={editable}
                        onChange={handleJsonChange}
                    />
                </>
            } />
        </div>
    );
}

export default DataManagement;