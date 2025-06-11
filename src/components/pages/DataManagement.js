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
    }, []);

    // Data control
    const [dataType, setDataType] = useState('');
    const handleDataTypeChange = (e) => {
        const newDataType = e.target.value;
        setDataType(newDataType);
        if (newDataType !== '') {
            setProxyJson(storage.retrieve(newDataType));
        }
    }
    const [proxyJson, setProxyJson] = useState();
    const handleJsonChange = (data) => {
        setProxyJson(data);
    }

    const [editable, setEditable] = useState(false);

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
        <>
            <BasicCon margin={7} content={
                <>
                    <h1>Data Management</h1>
                    <select id="datatype" value={dataType} onChange={handleDataTypeChange}>
                        <option value="">Choose...</option>
                        <option value="charData">Character Data</option>
                        <option value="monsterData">Monster Data</option>
                    </select>
                </>
            } />
            <BasicCon margin={7} content={
                <>
                    <SideBySide justify='space-between' content={
                        <>
                            <button className='btn btn-primary' onClick={() => setEditable(!editable)}>
                                Make Editable
                            </button>
                            <button className='btn btn-success' onClick={saveData}>
                                Save data
                            </button>
                            <button className='btn btn-danger' onClick={eraseData}>
                                Erase all data for this item
                            </button>
                        </>
                    } />
                    <JsonDisplay
                        jsonData={proxyJson}
                        editable={editable}
                        onChange={handleJsonChange}
                    />
                </>
            } />
        </>
    );
}

export default DataManagement;