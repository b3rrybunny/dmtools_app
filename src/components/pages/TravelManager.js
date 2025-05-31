// Modules ------------------------------------------------------------------
import * as bootstrap from 'bootstrap';
import { useState, useEffect, useRef, memo } from 'react';
import ReactDOMServer from 'react-dom/server';
import isEqual from 'lodash/isEqual';



// Custom -------------------------------------------------------------------
// Elements / Scripts
import HPBlock from '../basic/HPBlock';
import ACBlock from '../basic/ACBlock';
import HorizLine from '../basic/HorizontalLine';
import SideBySide from '../basic/SideBySide';
import CharacterCard from '../basic/CharacterCard';
import ProgressBar from '../basic/ProgressBar';
import BasicCon from '../basic/BasicContainer';
import * as tools from '../tools';
import * as dice from '../../scripts/dice';
// Data
import rawMonstersData from '../../data/srd_5e_monsters.json';
import * as SRDapi from '../../scripts/dndSRD5eapi';
import * as storage from '../../scripts/storage';
// CSS / Assets
import '../../css/TravelManager.css';
import player_character from '../../assets/player_character.png';
import NPC_img from '../../assets/NPC.png';

// Encounter JSON Format
// Each number corresponds to a roll of a d20.
// Single number is 5%.
// Multiple numbers can have the same data to simulate larger chances.
/*
{
    'tripName': tripName, **OPTIONAL**
    'maxDist': maxDist, **OPTIONAL**
    'distTraveled': distTraveled, **OPTIONAL**
    'hoursTraveled': hoursTraveled, **OPTIONAL**
    'encounters': {
        '1': {'type': 'monster', 'name': *monsterName*, 'num': *monsterNum* } ,
        '2': {'type': 'custom', 'name': *customName*, 'num': *customNum*} ,
        ...
        '20': {...}
    },
    'unsortedEncounters': unsortedEncounters **OPTIONAL**
    
}
*/

function EncounterInput({ data, onAddEncounter, onAddJsonData }) {
    // JSON
    const [jsonData, setJsonData] = useState('');
    const onJsonDataChange = (e) => {
        setJsonData(e.target.value);
    }

    // Monster Input
    const [monsterName, setMonsterName] = useState('');
    const [monsterNum, setMonsterNum] = useState('1');
    const onMonsterNumChange = (e) => {
        setMonsterNum(e.target.value);
    }
    const [monsterChance, setMonsterChance] = useState('5');
    const onMonsterChanceChange = (e) => {
        setMonsterChance(e.target.value);
    }

    // Custom Characters
    const chars = (storage.retrieve('charData') ? JSON.parse((storage.retrieve('charData'))).chars : null);
    const [customName, setCustomName] = useState('');
    const [customNum, setCustomNum] = useState('1');
    const onCustomNumChange = (e) => {
        setCustomNum(e.target.value);
    }
    const [customChance, setCustomChance] = useState('5');
    const onCustomChanceChange = (e) => {
        setCustomChance(e.target.value);
    }

    // Autocomplete
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [customSuggestions, setCustomSuggestions] = useState([]);
    const [showCustomSuggestions, setCustomShowSuggestions] = useState(false);
    const handleMonsterNameChange = (e) => {
        const value = e.target.value;
        setMonsterName(value);

        if (!value) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        // Filter suggestions
        const filtered = rawMonstersData.filter(item =>
            (item.name.toLowerCase().includes(value.toLowerCase()))
        );

        setSuggestions(filtered);
        setShowSuggestions(true);
    };
    const handleSuggestionClick = (name) => {
        setMonsterName(name);
        setShowSuggestions(false);
    };
    const handleBlur = () => {
        // Small delay to allow click events to process
        setTimeout(() => setShowSuggestions(false), 200);
    };
    const handleCustomNameChange = (e) => {
        const value = e.target.value;
        setCustomName(value);

        if (!value) {
            setCustomSuggestions([]);
            setCustomShowSuggestions(false);
            return;
        }

        // Filter suggestions
        const filtered = chars.filter(item =>
            (item.name.toLowerCase().includes(value.toLowerCase()))
        );

        setCustomSuggestions(filtered);
        setCustomShowSuggestions(true);
    }
    const handleCustomSuggestionClick = (name) => {
        setCustomName(name);
        setCustomShowSuggestions(false);
    };
    const handleCustomBlur = () => {
        // Small delay to allow click events to process
        setTimeout(() => setCustomShowSuggestions(false), 200);
    };

    // Handle Add Funcs
    function handleAddMonsterEncounter() {
        const result = { 'chance': monsterChance, 'data': {} };
        result['data']['type'] = 'monster';
        result['data']['name'] = monsterName;
        result['data']['num'] = monsterNum;
        onAddEncounter(result);

        setMonsterName('');
        setMonsterNum('1');
        setMonsterChance('5');
    }

    function handleAddCustomEncounter() {
        const result = { 'chance': customChance, 'data': {} };
        result['data']['type'] = 'custom';
        result['data']['name'] = customName;
        result['data']['num'] = customNum;
        onAddEncounter(result);

        setCustomName('');
        setCustomNum('1');
        setCustomChance('5');
    }

    function handleAddJsonData() {
        onAddJsonData(jsonData);
        setJsonData('');
    }

    // Util
    const [availSpaces, setAvailSpaces] = useState(20);
    function isSpace() {
        const obj = data;
        const value = {};
        let spaces = 0;
        for (let key in obj) {
            if (isEqual(obj[key], value)) {
                spaces = spaces + 1;
            }
        }
        setAvailSpaces(spaces);
    }
    useEffect(() => {
        isSpace();
    })

    return (
        <BasicCon content={
            <>
                <h4>Add Encounter:</h4>
                <HorizLine />
                <SideBySide content={
                    <>
                        <h5>Monster: </h5>
                        <div className="autocomplete" style={{ position: 'relative' }}>
                            <input
                                type="text"
                                value={monsterName}
                                onChange={handleMonsterNameChange}
                                onFocus={() => monsterName && setShowSuggestions(true)}
                                onBlur={handleBlur}
                                placeholder="Start typing..."
                                className="form-control"
                            />
                            {showSuggestions && suggestions.length > 0 && (
                                <div
                                    className="autocomplete-items"
                                    style={{
                                        position: 'absolute',
                                        zIndex: 99,
                                        top: '100%',
                                        left: 0,
                                        right: 0,
                                        border: '1px solid #d4d4d4',
                                        borderTop: 'none',
                                        backgroundColor: 'white'
                                    }}
                                >
                                    {suggestions.map((item, index) => (
                                        <div
                                            key={item.name + index}
                                            onClick={() => handleSuggestionClick(item.name)}
                                            style={{
                                                padding: '10px',
                                                cursor: 'pointer',
                                                backgroundColor: '#fff',
                                                borderBottom: '1px solid #d4d4d4'
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e9e9e9'}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#fff'}
                                        >
                                            <div>
                                                <strong>{item.name.substr(0, monsterName.length)}</strong>
                                                {item.name.substr(monsterName.length)}
                                            </div>
                                            {/* Add Challenge text below the name */}
                                            {item.Challenge && (
                                                <div style={{ fontSize: '0.8em', color: '#666', marginTop: '4px' }}>
                                                    CR: {item.Challenge}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <h5>#: </h5>
                        <input
                            type='number'
                            min='1'
                            value={monsterNum}
                            onChange={onMonsterNumChange}
                            className='form-control'
                            style={{ maxWidth: '75px' }}
                        />

                    </>
                } />
                <SideBySide content={
                    <>
                        <h5>Chance: </h5>
                        <input
                            type='number'
                            min='5'
                            step='5'
                            max={(availSpaces * 5).toString()}
                            value={monsterChance}
                            onChange={onMonsterChanceChange}
                            className='form-control'
                            style={{ maxWidth: '75px' }}
                        />
                        <h5>%</h5>
                    </>
                } />
                <button
                    className={'btn ' + (availSpaces > 0 ? 'btn-success mb-2' : ' btn-danger disabled mb-2')}
                    onClick={handleAddMonsterEncounter}
                    style={{ width: '100%' }}
                >
                    Add monster encounter
                </button>

                <HorizLine />

                <SideBySide content={
                    <>
                        <h5>Custom Character from storage: </h5>
                        <div className="autocomplete" style={{ position: 'relative' }}>
                            <input
                                type="text"
                                value={customName}
                                onChange={handleCustomNameChange}
                                onFocus={() => customName && setCustomShowSuggestions(true)}
                                onBlur={handleCustomBlur}
                                placeholder="Start typing..."
                                className="form-control"
                            />
                            {showCustomSuggestions && customSuggestions.length > 0 && (
                                <div
                                    className="autocomplete-items"
                                    style={{
                                        position: 'absolute',
                                        zIndex: 99,
                                        top: '100%',
                                        left: 0,
                                        right: 0,
                                        border: '1px solid #d4d4d4',
                                        borderTop: 'none',
                                        backgroundColor: 'white'
                                    }}
                                >
                                    {customSuggestions.map((item, index) => (
                                        <div
                                            key={item.name + index}
                                            onClick={() => handleCustomSuggestionClick(item.name)}
                                            style={{
                                                padding: '10px',
                                                cursor: 'pointer',
                                                backgroundColor: '#fff',
                                                borderBottom: '1px solid #d4d4d4'
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e9e9e9'}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#fff'}
                                        >
                                            <div>
                                                <strong>{item.name.substr(0, customName.length)}</strong>
                                                {item.name.substr(customName.length)}
                                            </div>
                                            {/* Add Challenge text below the name */}
                                            {item.meta && (
                                                <div style={{ fontSize: '0.8em', color: '#666', marginTop: '4px' }}>
                                                    {item.meta}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                } />
                <SideBySide content={
                    <>
                        <h5>#: </h5>
                        <input
                            type='number'
                            min='1'
                            value={customNum}
                            onChange={onCustomNumChange}
                            className='form-control'
                            style={{ maxWidth: '75px' }}
                        />
                        <h5> Chance: </h5>
                        <input
                            type='number'
                            min='5'
                            step='5'
                            max={(availSpaces * 5).toString()}
                            value={customChance}
                            onChange={onCustomChanceChange}
                            className='form-control'
                            style={{ maxWidth: '75px' }}
                        />
                        <h5>%</h5>
                    </>
                } />
                <button
                    className={'btn ' + (availSpaces > 0 ? 'btn-success mb-2' : ' btn-danger disabled mb-2')}
                    onClick={handleAddCustomEncounter}
                    style={{ width: '100%' }}
                >
                    Add custom character encounter
                </button>


                <HorizLine />
                <SideBySide content={
                    <>
                        <h5>JSON Input: </h5>
                        <input
                            type="text"
                            value={jsonData}
                            onChange={onJsonDataChange}
                            placeholder="JSON"
                            className="form-control"
                            style={{ maxWidth: '100px' }}
                        />
                        <button className='btn btn-success' onClick={handleAddJsonData}>Add Encounters JSON</button>
                    </>
                } />
                <p><strong>Adding encounters via JSON will override any previously entered encounter data.</strong></p>


            </>
        } />
    );

}

function EncounterDisplay({ data }) {

    function consolidateKeys(obj) {
        // Group keys by their values (using JSON.stringify for deep comparison)
        const valueGroups = {};

        for (const [key, value] of Object.entries(obj)) {
            const valueStr = JSON.stringify(value);

            if (!valueGroups[valueStr]) {
                valueGroups[valueStr] = [];
            }
            valueGroups[valueStr].push(key);
        }

        // Build the consolidated object
        const result = {};

        for (const [valueStr, keys] of Object.entries(valueGroups)) {
            const value = JSON.parse(valueStr);

            if (keys.length === 1) {
                // Single key, use as-is
                result[keys[0]] = value;
            } else {
                // Multiple keys, create range or list format
                const consolidatedKey = createConsolidatedKey(keys);
                result[consolidatedKey] = value;
            }
        }

        return result;
    }

    function createConsolidatedKey(keys) {
        // Sort keys numerically
        const sortedKeys = keys.sort((a, b) => parseInt(a) - parseInt(b));

        // Check if keys form a continuous range
        const isConsecutive = sortedKeys.every((key, i) => {
            if (i === 0) return true;
            return parseInt(key) === parseInt(sortedKeys[i - 1]) + 1;
        });

        if (isConsecutive && sortedKeys.length > 1) {
            // Use range format: "1-3"
            return `${sortedKeys[0]}-${sortedKeys[sortedKeys.length - 1]}`;
        } else if (sortedKeys.length > 1) {
            // Use comma-separated format for non-consecutive keys: "1,3,5"
            return sortedKeys.join(',');
        } else {
            // Single key
            return sortedKeys[0];
        }
    }

    function getFirstNumber(key) {
        // Extract the first number from keys like "1-3", "1,3,5", or "4"
        return parseInt(key.split(/[-,]/)[0]);
    }

    function formatValue(value) {
        let result = '';
        if (isEqual(value, {})) {
            result = 'Nothing'
        }
        else {
            const num = value.num || 1;
            const name = value.name || '!NONAME';
            const type = value.type || '';

            result = num + ' ' + name;
            if (num > 1) {
                result = result + 's';
            }
        }

        return result;
    }

    function ConsolidatedList() {
        // Consolidate the data
        const consolidatedData = consolidateKeys(data);

        // Sort entries by the first number in the key
        const sortedEntries = Object.entries(consolidatedData).sort(([keyA], [keyB]) => {
            return getFirstNumber(keyA) - getFirstNumber(keyB);
        });

        return (
            <div>
                {sortedEntries.map(([key, value]) => (
                    <SideBySide key={key} content={
                        <>
                            <h4><strong>{key}:</strong></h4>
                            <h4>{formatValue(value)}</h4>
                            {isEqual(value, {}) ? null :
                                <div className="dropdown" style={{ position: 'static' }}>
                                    <button
                                        className="btn btn-secondary dropdown-toggle"
                                        type="button"
                                        id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown"
                                        data-bs-boundary="viewport"
                                        aria-expanded="false"
                                    >
                                        Open in Combat Manager
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a
                                            className="dropdown-item"
                                            href={`http://localhost:3000/CombatManager?type=${value['type']}&name=${value['name']}&num=${value['num']}`}
                                            target='_blank'
                                        >
                                            Standard
                                        </a></li>
                                        <li><a
                                            className="dropdown-item"
                                            href={`http://localhost:3000/CombatManager?type=${value['type']}&name=${value['name']}&num=${value['num']}&mod=adv`}
                                            target='_blank'
                                        >
                                            w/ Advantage
                                        </a></li>
                                        <li><a
                                            className="dropdown-item"
                                            hhref={`http://localhost:3000/CombatManager?type=${value['type']}&name=${value['name']}&num=${value['num']}&mod=disadv`}
                                            target='_blank'
                                        >
                                            w/ Disadvantage
                                        </a></li>
                                    </ul>
                                </div>
                            }

                        </>
                    } />
                ))}
            </div>
        );
    }

    return (
        <ConsolidatedList />
    );
}

function TravelManager() {
    // Page Title
    useEffect(() => {
        document.title = "dmT: Travel Manager";
    }, []);

    // Trip data
    const [tripName, setTripName] = useState('');
    const onTripNameChange = (e) => {
        setTripName(e.target.value);
    }

    // Travel Control
    const [maxDist, setMaxDist] = useState(0);
    const onMaxDistChange = (e) => {
        setMaxDist(parseInt(e.target.value));
    }
    const [distTraveled, setDistTraveled] = useState(0);
    const onAdvance = () => {
        setDistTraveled(distTraveled + pace);
        setHoursTraveled(hoursTraveled + 1);
    }
    const onGoBack = () => {
        setDistTraveled(distTraveled - pace);
        setHoursTraveled(hoursTraveled + 1);
    }
    const [pace, setPace] = useState(3);
    const onPaceChange = (e) => {
        setPace(parseInt(e.target.value));
    }
    const [hoursTraveled, setHoursTraveled] = useState(0);

    function TravelControl() {
        return (
            <>
                <div className='row' style={{ justifyContent: 'center' }}>
                    <BasicCon content={
                        <>
                            <SideBySide justify='center' content={
                                <>
                                    <button className='btn btn-danger btn-lg' onClick={onGoBack}>&lt; Go back</button>
                                    <button className='btn btn-success btn-lg' onClick={onAdvance}>Advance &gt;</button>
                                </>
                            } />
                            <SideBySide content={
                                <>
                                    <h4>Distance to travel: </h4>
                                    <input
                                        type='number'
                                        min='1'
                                        value={maxDist}
                                        onChange={onMaxDistChange}
                                        className='form-control'
                                        style={{ maxWidth: '75px' }}
                                    />
                                    <h4>miles</h4>
                                </>
                            } />
                            <SideBySide content={
                                <>
                                    <h4>Set pace: </h4>
                                    <select id="pace" value={pace} onChange={onPaceChange}>
                                        <option value={2}>Slow (2 mph)</option>
                                        <option value={3}>Normal (3 mph)</option>
                                        <option value={4}>Fast (4 mph)</option>
                                    </select>
                                    {/* Pace text */}
                                    {
                                        pace === 4 ? <p>-5 penalty to Passive Perception</p> :
                                            pace === 3 ? null :
                                                pace === 2 ? <p>Able to use Stealth</p> :
                                                    null
                                    }
                                </>
                            } />
                        </>
                    } />
                </div>
            </>
        );
    }

    // Encounter data
    const [unsortedEncounters, setUnsortedEncounters] = useState([]);
    const [encounters, setEncounters] = useState({
        '1': {},
        '2': {},
        '3': {},
        '4': {},
        '5': {},
        '6': {},
        '7': {},
        '8': {},
        '9': {},
        '10': {},
        '11': {},
        '12': {},
        '13': {},
        '14': {},
        '15': {},
        '16': {},
        '17': {},
        '18': {},
        '19': {},
        '20': {}
    });
    function onAddEncounter(encounter) {
        setUnsortedEncounters(prev => [...prev, encounter]);
    }
    function sortEncounters() {
        // Start with a fresh encounters object
        const newEncounters = {
            '1': {}, '2': {}, '3': {}, '4': {}, '5': {},
            '6': {}, '7': {}, '8': {}, '9': {}, '10': {},
            '11': {}, '12': {}, '13': {}, '14': {}, '15': {},
            '16': {}, '17': {}, '18': {}, '19': {}, '20': {}
        };

        // Sort encounters from highest chance to lowest chance
        // This ensures higher probability encounters get placed first
        const sortedArray = [...unsortedEncounters].sort((a, b) => b.chance - a.chance);

        sortedArray.forEach(enc => {
            const numOfKeys = Math.floor(enc.chance / 5);

            // Find the first available consecutive block of empty slots
            let placed = false;

            for (let startPos = 1; startPos <= 21 - numOfKeys && !placed; startPos++) {
                // Check if we have enough consecutive empty slots starting at startPos
                let allEmpty = true;
                for (let j = 0; j < numOfKeys; j++) {
                    const key = (startPos + j).toString();
                    if (!isEqual(newEncounters[key], {})) {
                        allEmpty = false;
                        break;
                    }
                }

                // If we found enough consecutive empty slots, fill them
                if (allEmpty) {
                    for (let j = 0; j < numOfKeys; j++) {
                        const key = (startPos + j).toString();
                        newEncounters[key] = enc.data;
                    }
                    placed = true;
                }
            }

            // If we couldn't place the encounter, log a warning
            if (!placed) {
                console.warn(`Could not place encounter: ${enc.data.name} (${enc.chance}% chance)`);
            }
        });

        setEncounters(newEncounters);
    }
    useEffect(() => {
        if (unsortedEncounters.length > 0) {
            sortEncounters();
        }
    }, [unsortedEncounters]);

    // Buttons
    const [isCopied, setIsCopied] = useState(false);
    function handleCopyJson() {
        const jsonToCopy = {};
        jsonToCopy['tripName'] = tripName;
        jsonToCopy['maxDist'] = maxDist;
        jsonToCopy['distTraveled'] = distTraveled;
        jsonToCopy['hoursTraveled'] = hoursTraveled;
        jsonToCopy['encounters'] = encounters;
        jsonToCopy['unsortedEncounters'] = unsortedEncounters;
        const string = JSON.stringify(jsonToCopy);
        const copyToClipboard = () => {
            navigator.clipboard.writeText(string)
                .then(() => {
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 5000); // Reset after 5 seconds
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        };
        copyToClipboard();
    }

    // JSON Add
    function onAddJsonData (jsonData) {
        const data = JSON.parse(jsonData);
        setDistTraveled(data.distTraveled);
        setMaxDist(data.maxDist);
        setHoursTraveled(data.hoursTraveled);
        setTripName(data.tripName);
        setEncounters(data.encounters);
        setUnsortedEncounters(data.unsortedEncounters);
    }

    return (
        <div className='travel-manager'>
            <div className='justify-content-center mb-2'>
                <BasicCon content={
                    <ProgressBar
                        value={distTraveled}
                        max={maxDist}
                        height={20}
                        fillColor="#2196F3"
                        animated={true}
                        showRemainingDistance={true}
                        unit=" miles"
                    />
                } />
            </div>
            <div className='row' style={{ display: 'grid', gridTemplateColumns: '1fr auto' }}>

                <div className='col' style={{ height: '100%' }}>
                    <BasicCon height='100%' content={
                        <>
                            <SideBySide content={
                                <>
                                    <h3>Encounters</h3>
                                    <h5 style={{ marginLeft: '50px' }}>Trip name:</h5>
                                    <input
                                        type='text'
                                        value={tripName}
                                        onChange={onTripNameChange}
                                        className='form-control'
                                        style={{ maxWidth: '200px' }}
                                    />

                                </>
                            } />
                            <HorizLine />
                            <EncounterDisplay data={encounters} />
                        </>
                    } />
                </div>

                <div className='col'>
                    <TravelControl />
                    <EncounterInput
                        onAddEncounter={onAddEncounter}
                        onAddJsonData={onAddJsonData}
                        data={encounters}
                    />
                    <BasicCon content={
                        <SideBySide content={
                            <>
                                <button className='btn btn-primary' onClick={handleCopyJson} style={{ width: '100%' }}>{isCopied ? 'Copied!' : 'Copy trip JSON to clipboard'}</button>
                            </>
                        } />
                    } />
                </div>
            </div>
        </div>
    );
}

export default TravelManager;