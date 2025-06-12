// Modules ------------------------------------------------------------------
import { useState, useEffect} from 'react';

// Custom -------------------------------------------------------------------
// Elements
import HorizLine from '../basic/HorizontalLine';
import SideBySide from '../basic/SideBySide';
import BasicCon from '../basic/BasicContainer';
import JsonDisplay from '../basic/JsonDisplay';

// Data / Scripts
import * as storage from '../../scripts/storage';

function DataManagement() {
    // Page Title
    useEffect(() => {
        document.title = "Data Management";
        setProxyJson({ "no data": "to display" });
    }, []);

    // Page reload
    const [reloadKey, setReloadKey] = useState(0);
    function handleReload() {
        setReloadKey(prevKey => prevKey + 1);
    }

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
        setReloadKey(reloadKey + 1);
    }
    const [proxyJson, setProxyJson] = useState();
    const handleJsonChange = (data) => {
        setProxyJson(data);
    }
    const [editable, setEditable] = useState(false);
    

    // Data saving
    const [saveable, setSaveable] = useState(true);
    const onValidChange = (val) => {
        setSaveable(val);
    }
    const saveData = () => {
        storage.saveData(proxyJson, dataType);
        setEditable(false);
        setReloadKey(reloadKey + 1);
    }
    const eraseData = () => {
        storage.erase(dataType);
        setDataType('');
        setReloadKey(reloadKey + 1);
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
                                {editable ? 'Stop editing' : 'Start editing'}
                            </button>
                            <button
                                className='btn btn-success'
                                onClick={saveData}
                                disabled={dataType !== '' && !saveable === false ? false : true}
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
                        key={reloadKey}
                        jsonData={proxyJson}
                        editable={editable}
                        onChange={handleJsonChange}
                        onValidChange={onValidChange}
                    />
                </>
            } />
        </div>
    );
}

export default DataManagement;