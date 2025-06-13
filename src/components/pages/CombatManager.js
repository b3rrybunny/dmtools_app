// Modules ------------------------------------------------------------------
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

// Custom -------------------------------------------------------------------
// Elements
import HorizLine from '../basic/HorizontalLine';
import SideBySide from '../basic/SideBySide';
import CombatantCard from '../basic/CombatantCard';
import BasicCon from '../basic/BasicContainer';
// Data / Scripts
import rawMonstersData from '../../data/srd_5e_monsters.json';
import * as dice from '../../scripts/dice';
import * as tools from '../../scripts/tools';
import * as storage from '../../scripts/storage';
// CSS / Assets
import '../../css/CombatManager.css';


function CardContainer({ combatants, currentCombatant }) {
    const cardRefs = useRef([]);

    // Auto-scroll to current combatant when currentCombatant changes
    useEffect(() => {
        if (cardRefs.current[ currentCombatant ]) {
            cardRefs.current[ currentCombatant ].scrollIntoView({
                behavior: 'smooth',
                block: 'start', // Centers the element vertically in the viewport
                inline: 'nearest'
            });
        }
    }, [ currentCombatant ]);

    return (
        <div className="card-container">
            {combatants.map((combatant, index) => (
                <div
                    key={combatant.id}
                    ref={el => cardRefs.current[ index ] = el}
                    className='fade-drop-in'
                >
                    <CombatantCard
                        data={combatant}
                        index={index + 1}
                        isActive={index === currentCombatant ? true : false}
                    />
                </div>
            ))}
        </div>
    );
}

function InputWindow({ onTestPopulate, onAutocompleteAdd, onManualAdd, onClear, onCustomAdd }) {
    const [ suggestions, setSuggestions ] = useState([]);
    const [ showSuggestions, setShowSuggestions ] = useState(false);
    const [ customSuggestions, setCustomSuggestions ] = useState([]);
    const [ showCustomSuggestions, setCustomShowSuggestions ] = useState(false);

    // Auto
    const [ autoAdvSelected, setAutoAdvSelected ] = useState('');
    const [ autoValue, setAutoValue ] = useState('');
    const [ numToAdd, setNumToAdd ] = useState('1');
    const [ customMonsters, setCustomMonsters ] = useState([]);
    useEffect(() => {
        const monsterData = storage.retrieve('monsterData');
        setCustomMonsters(monsterData ? monsterData.monsters : []);
    }, []); // Empty dependency array means this runs once on mount
    const monsterPool = [ ...rawMonstersData, ...customMonsters ];

    // Manual
    const [ manualName, setManualName ] = useState('');
    const [ manualAdvSelected, setManualAdvSelected ] = useState('');
    const [ manualHP, setManualHP ] = useState('');
    const [ manualAC, setManualAC ] = useState('');
    const [ manualInit, setManualInit ] = useState('');
    const [ manualType, setManualType ] = useState('player');

    // Custom Characters
    const [ chars, setChars ] = useState([]);
    useEffect(() => {
        const charData = storage.retrieve('charData');
        setChars(charData ? charData.chars : []);
    }, []); // Empty dependency array means this runs once on mount
    const [ customName, setCustomName ] = useState('');
    const [ customInit, setCustomInit ] = useState('');
    const handleCustomInitChange = (e) => {
        setCustomInit(e.target.value);
    }
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
    const handleCustomAdd = () => {
        const charData = chars.find(char => char.name === customName);
        charData[ 'init' ] = customInit;
        onCustomAdd(charData); // Pass data to parent

        setCustomName(''); // Optional: Clear input after submission
    };


    const handleInputChange = (e) => {
        const value = e.target.value;
        setAutoValue(value);

        if (!value) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        // Filter suggestions
        const filtered = monsterPool.filter(item =>
            (item.name.toLowerCase().includes(value.toLowerCase()))
        );

        setSuggestions(filtered);
        setShowSuggestions(true);
    };
    const handleSuggestionClick = (name) => {
        setAutoValue(name);
        setShowSuggestions(false);
    };
    const handleBlur = () => {
        // Small delay to allow click events to process
        setTimeout(() => setShowSuggestions(false), 200);
    };

    const handleAutoAdd = () => {
        const numOfMonster = parseInt(numToAdd);
        for (let i = 0; i < numOfMonster; i++) {
            if (autoValue.trim()) {
                onAutocompleteAdd(autoValue, autoAdvSelected); // Pass data to parent
            }
        }
        setAutoValue(''); // Optional: Clear input after submission
    };

    const handleManualAdd = () => {
        const combatantData = {
            name: manualName,
            init: manualInit,
            hp: manualHP,
            ac: manualAC
        }
        if (manualType === 'player') {
            combatantData.isPlayer = true;
        }
        if (manualType === 'NPC') {
            combatantData.isNPC = true;
        }
        combatantData.id = Date.now() + Math.random();
        console.log('Adding manual combatant. Data:');
        tools.prettyLog(combatantData);
        onManualAdd(combatantData);
        setManualName('');
        setManualHP('');
        setManualAC('');
        setManualInit('');
        setManualType('player');
    }

    const handleAutoAdvChange = (e) => {
        setAutoAdvSelected(e.target.value);
    }

    const handleManualAdvChange = (e) => {
        setManualAdvSelected(e.target.value);
    }

    const handleManualTypeChange = (e) => {
        setManualType(e.target.value);
    }

    const handleManualNameChange = (e) => {
        setManualName(e.target.value);
    }

    const handleManualHPChange = (e) => {
        setManualHP(e.target.value);
    }

    const handleManualACChange = (e) => {
        setManualAC(e.target.value);
    }

    const handleManualInitChange = (e) => {
        setManualInit(e.target.value);
    }

    const handleNumToAddChange = (e) => {
        setNumToAdd(e.target.value);
    }

    return (
        <BasicCon margin='2.5' content={
            <>
                <div className='autocomplete-monster'>
                    <div className='side-by-side'>
                        <h5 style={{ margin: '0' }}>Monster name: </h5>
                        <div className="autocomplete" style={{ position: 'relative' }}>
                            <input
                                type="text"
                                value={autoValue}
                                onChange={handleInputChange}
                                onFocus={() => autoValue && setShowSuggestions(true)}
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
                                                <strong>{item.name.substr(0, autoValue.length)}</strong>
                                                {item.name.substr(autoValue.length)}
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
                        <input
                            type="number"
                            min='1'
                            value={numToAdd}
                            onChange={handleNumToAddChange}
                            placeholder="#"
                            className="form-control"
                            style={{ width: '100px' }}
                        />
                        <select id="autoAdv" value={autoAdvSelected} onChange={handleAutoAdvChange}>
                            <option value="">No Adv/Disadv</option>
                            <option value="adv">Advantage</option>
                            <option value="disadv">Disadvantage</option>
                        </select>
                        <button
                            onClick={handleAutoAdd}
                            className="btn btn-success"
                        >
                            Add Monster
                        </button>
                    </div>
                    <SideBySide content={
                        <>
                            <hr style={{
                                border: "2px solid #000000",
                                margin: "20px 0",
                                width: '100%'
                            }} />
                            <h5 style={{ margin: 0 }}>OR</h5>
                            <hr style={{
                                border: "2px solid #000000",
                                margin: "20px 0",
                                width: '100%'
                            }} />
                        </>
                    } />


                </div>

                <div className='manual-add'>
                    <div className='row'>
                        <div className='col side-by-side'>
                            <p>Name: </p>
                            <input
                                type="text"
                                value={manualName}
                                onChange={handleManualNameChange}
                                placeholder="Start typing..."
                                className="form-control"
                            />
                        </div>
                        <div className='col side-by-side'>
                            <p>❤ HP: </p>
                            <input
                                type="number"
                                min='0'
                                value={manualHP}
                                onChange={handleManualHPChange}
                                placeholder="♡"
                                className="form-control"
                                style={{ width: '100px' }}
                            />
                        </div>
                        <div className='col side-by-side'>
                            <p>⛊ AC: </p>
                            <input
                                type="number"
                                value={manualAC}
                                onChange={handleManualACChange}
                                placeholder="⛉"
                                className="form-control"
                                style={{ width: '100px' }}
                            />
                        </div>
                    </div>
                    <div className='row mt-1'>
                        <div className='col side-by-side'>
                            <p>Init: </p>
                            <input
                                type="number"
                                value={manualInit}
                                onChange={handleManualInitChange}
                                placeholder="..."
                                className="form-control"
                                style={{ width: '100px' }}
                            />
                            <p>Type: </p>
                            <select id="autoAdv" value={manualType} onChange={handleManualTypeChange}>
                                <option value="player">Player</option>
                                <option value="NPC">NPC</option>
                            </select>
                        </div>
                        <div className='col'>
                            <button
                                onClick={handleManualAdd}
                                className="btn btn-success"
                            >
                                Add Combatant
                            </button>
                        </div>
                    </div>
                </div>
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
                        <h5>Init: </h5>
                        <input
                            type="number"
                            value={customInit}
                            onChange={handleCustomInitChange}
                            placeholder="..."
                            className="form-control"
                            style={{ width: '100px' }}
                        />
                        <button className='btn btn-success' onClick={handleCustomAdd}>Add Custom Character</button>
                    </>
                } />


                <hr style={{
                    border: "2px solid #000000",
                    margin: "20px 0",
                    width: '100%'
                }} />
                <div className="row m-3">
                    <button
                        onClick={onTestPopulate}
                        className="btn btn-primary"
                    >
                        Test Populate
                    </button>
                </div>
                <div className="row m-3">
                    <button
                        onClick={onClear}
                        className="btn btn-danger"
                    >
                        Clear Combatants
                    </button>
                </div>
            </>
        } />

    );
}

function CombatControl({ onSort, onNext, onPrev, data }) {
    if (data === null) {
        data = {
            name: 'NULL'
        }
    }
    return (
        <BasicCon margin='2.5' content={
            <>
                <div className='side-by-side'>
                    <h3>Combat Control</h3>
                    <button
                        onClick={onSort}
                        className="btn btn-primary"
                    >
                        Sort Combatants
                    </button>
                </div>
                <hr />
                <div className='side-by-side' style={{ justifyContent: 'space-between' }}>
                    <button
                        onClick={onPrev}
                        className="btn btn-primary"
                    >
                        &lt; Prev turn
                    </button>
                    <h4>Current turn: {data.name}</h4>
                    <button
                        onClick={onNext}
                        className="btn btn-primary"
                    >
                        Next Turn &gt;
                    </button>
                </div>
            </>
        } />

    )
}

function CombatManager() {
    // Page Title
    useEffect(() => {
        document.title = "Combat Manager";
    }, []);

    // Data
    const [ combatants, setCombatants ] = useState([]);
    const [ currentCombatantIndex, setCurrentCombatantIndex ] = useState(0);

    // Add Funcs
    const [ monsterPool, setMonsterPool ] = useState([]);
    useEffect(() => {
        const monsterData = storage.retrieve('monsterData');
        const customMonsters = monsterData ? monsterData.monsters : [];

        setMonsterPool([ ...rawMonstersData, ...customMonsters ]);
    }, []); // Empty dependency array means this runs once on mount

    const addMonsterData = (monsterName, adv = '') => {
        const originalMonster = monsterPool.find(item => item.name === monsterName);

        // Create a copy of the monster object instead of modifying the original
        const monsterToAdd = { ...originalMonster };
        // Assign Init
        if (adv.length > 0) {
            monsterToAdd.init = dice.rollInit(monsterToAdd.DEX, adv);
        }
        else {
            monsterToAdd.init = dice.rollInit(monsterToAdd.DEX);
        }
        // Assign Rolled HP
        monsterToAdd.rolledHP = dice.rollDice(monsterToAdd.hp);
        monsterToAdd.id = Date.now() + Math.random();
        monsterToAdd.autoAdd = true;
        setCombatants(prevCombatants => [ ...prevCombatants, monsterToAdd ]);
        // Sort after adding
        setTimeout(() => sortCombatantsByInit(), 0);
    }

    function handleAutoAdd(monsterName, advantage) {
        addMonsterData(monsterName, advantage);
    }

    function handleManualAdd(manualData) {
        manualData.manualAdd = true;
        setCombatants(prevCombatants => [ ...prevCombatants, manualData ]);
        // Sort after adding
        setTimeout(() => sortCombatantsByInit(), 0);
    }

    function handleCustomAdd(charData) {
        setCombatants(prevCombatants => [ ...prevCombatants, charData ]);
        // Sort after adding
        setTimeout(() => sortCombatantsByInit(), 0);
    }

    function testPopulate() {
        const dataLength = rawMonstersData.length;
        const selections = [];
        for (let i = 0; i < 4; i++) {
            selections.push(Math.floor(Math.random() * (dataLength + 1)));
        }
        selections.forEach(index => {
            const monsterName = rawMonstersData[ index ].name;
            addMonsterData(monsterName);
        })
    }

    // Imported data from Travel Manager
    const [ searchParams ] = useSearchParams();
    const [ hasProcessedParams, setHasProcessedParams ] = useState(false);

    useEffect(() => {
        // Only process params if monsterPool is populated AND we haven't processed yet
        if (searchParams.toString() !== '' && !hasProcessedParams && monsterPool.length > 0) {
            const queryParams = Object.fromEntries(searchParams.entries());
            const num = parseInt(queryParams.num);
            const name = queryParams.name;
            const type = queryParams.type;

            if (type === 'monster') {
                // Clear existing combatants first
                setCombatants([]);
                for (let i = 0; i < num; i++) {
                    addMonsterData(name, (queryParams?.mod ? queryParams.mod : ''));
                }
            }

            else if (type === 'custom') {
                // Clear existing combatants first
                setCombatants([]);
                for (let i = 0; i < num; i++) {
                    addMonsterData(name, (queryParams?.mod ? queryParams.mod : ''));
                }
            }

            setHasProcessedParams(true);
        }
    }, [ searchParams, hasProcessedParams, monsterPool ]); // Add monsterPool as dependency

    // Combat flow control
    function handleOnPrev() {
        if (currentCombatantIndex === 0) {
            setCurrentCombatantIndex(combatants.length - 1);
        }
        else {
            setCurrentCombatantIndex(currentCombatantIndex - 1);
        }
    }

    function handleOnNext() {
        if (currentCombatantIndex === combatants.length - 1) {
            setCurrentCombatantIndex(0);
        }
        else {
            setCurrentCombatantIndex(currentCombatantIndex + 1);
        }
    }

    // Util
    const sortCombatantsByInit = () => {
        setCombatants(prevCombatants => {
            const sorted = [ ...prevCombatants ].sort((a, b) => {
                const aInit = a.init || 0;
                const bInit = b.init || 0;
                return bInit - aInit; // Descending order (highest initiative first)
            });
            return sorted;
        });
    };


    function handleClear() {
        setCombatants([]);
    }

    return (
        <div className='page'>
            <div className='row'>
                <div className='col'>
                    <CardContainer
                        combatants={combatants} // Now using the sorted combatants state
                        currentCombatant={currentCombatantIndex}
                    />
                </div>
                <div className='col ml-0 fade-drop-in' style={{ paddingLeft: '0px' }}>
                    <CombatControl
                        data={combatants.length > 0 ? combatants[ currentCombatantIndex ] : null} // Use the sorted combatants state
                        onSort={sortCombatantsByInit}
                        onPrev={handleOnPrev}
                        onNext={handleOnNext}
                    />
                    <InputWindow
                        onTestPopulate={testPopulate}
                        onAutocompleteAdd={handleAutoAdd}
                        onManualAdd={handleManualAdd}
                        onCustomAdd={handleCustomAdd}
                        onClear={handleClear}
                    />
                </div>
            </div>
        </div>
    );
}

export default CombatManager;