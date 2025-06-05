// Modules ------------------------------------------------------------------
import * as bootstrap from 'bootstrap';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';


// Custom -------------------------------------------------------------------
// Elements / Scripts
import HPBlock from '../basic/HPBlock';
import ACBlock from '../basic/ACBlock';
import HorizLine from '../basic/HorizontalLine';
import SideBySide from '../basic/SideBySide';
import CharacterCard from '../basic/CharacterCard';
import BasicCon from '../basic/BasicContainer';
import * as tools from '../tools';
import * as dice from '../../scripts/dice';
// Data
import rawMonstersData from '../../data/srd_5e_monsters.json';
import * as SRDapi from '../../scripts/dndSRD5eapi';
import * as storage from '../../scripts/storage';
// CSS / Assets
import '../../css/CombatManager.css';
import player_character from '../../assets/player_character.png';
import NPC_img from '../../assets/NPC.png';



function getModifier(stat) {
    const numericStat = Number(stat); // Converts strings to numbers (e.g., "18" → 18)
    if (isNaN(numericStat)) return "(Invalid)"; // Fallback for non-numbers

    const modifier = Math.floor((numericStat - 10) / 2);
    return modifier >= 0 ? `(+${modifier})` : `(${modifier})`;
}

function ModifierText({ modifier }) {
    if (modifier[1] === "+") {
        return (<p style={{ color: 'green', textAlign: 'center', margin: '0px' }}>{modifier}</p>)
    }
    else {
        return (<p style={{ color: 'red', textAlign: 'center', margin: '0px' }}>{modifier}</p>)
    }
}

function StatsTable({ data }) {
    if (data.STR &&
        data.DEX &&
        data.CON &&
        data.INT &&
        data.WIS &&
        data.CHA) {
        return (
            <>
                <table>
                    <tbody>
                        <tr>
                            <td>STR: </td>
                            <td>{data.STR} </td>
                            <td><ModifierText modifier={data.STR_mod ? data.STR_mod : getModifier(data.STR)} /></td>
                            <td>DEX: </td>
                            <td>{data.DEX} </td>
                            <td><ModifierText modifier={data.DEX_mod ? data.DEX_mod : getModifier(data.DEX)} /></td>
                        </tr>
                        <tr>
                            <td>CON: </td>
                            <td>{data.CON} </td>
                            <td><ModifierText modifier={data.CON_mod ? data.CON_mod : getModifier(data.CON)} /></td>
                            <td>INT: </td>
                            <td>{data.INT} </td>
                            <td><ModifierText modifier={data.INT_mod ? data.INT_mod : getModifier(data.INT)} /></td>
                        </tr>
                        <tr>
                            <td>WIS: </td>
                            <td>{data.WIS} </td>
                            <td><ModifierText modifier={data.WIS_mod ? data.WIS_mod : getModifier(data.WIS)} /></td>
                            <td>CHA: </td>
                            <td>{data.CHA} </td>
                            <td><ModifierText modifier={data.CHA_mod ? data.CHA_mod : getModifier(data.CHA)} /></td>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    }
    else {
        return (<p>No stats data.</p>)
    }
}

function CreatureImg({ img }) {
    if (img === 'player') {
        return (
            <div className="col-md-4 card-img-player" style={{ alignContent: 'center', justifyContent: 'center', padding: '0px' }}>
                <img src={player_character} className="img-fluid rounded" style={{ maxHeight: '270px' }} />
            </div>
        )
    }
    else if (img === 'npc') {
        return (
            <div className="col-md-4 card-img-npc" style={{ alignContent: 'center', justifyContent: 'center', padding: '0px' }}>
                <img src={NPC_img} className="img-fluid rounded" style={{ maxHeight: '270px' }} />
            </div>
        )
    }
    else {
        return (
            <div className="col-md-4 card-img-monster" style={{ alignContent: 'center', justifyContent: 'center', padding: '0px' }}>
                <img src={img} className="img-fluid rounded" style={{ maxHeight: '270px' }} />
            </div>
        )
    }
}

function CreatureActions({ data = null }) {
    const infoToDisplay = [
        'Actions',
        'Legendary Actions',
        'Speed',
        'Saving Throws',
        'Senses'
    ];

    const content = [];

    for (const key of infoToDisplay) {
        if (key === 'Actions') {
            if (data?.[key]) {
                content.push(
                    <div key={key} className=''>
                        <h5>{key}:</h5>
                        <div dangerouslySetInnerHTML={{ __html: data[key] }} />
                        <hr style={{ marginRight: '5px' }} />
                    </div>
                );
            }
        }
        else if (key === 'Legendary Actions') {
            if (data?.[key]) {
                content.push(
                    <div key={key} className=''>
                        <h5>{key}:</h5>
                        <div dangerouslySetInnerHTML={{ __html: data[key] }} />
                        <hr style={{ marginRight: '5px' }} />
                    </div>
                );
            }
        }
        else {
            content.push(
                <div key={key} className='side-by-side'>
                    {key}: {data?.[key] ?? 'N/A'}
                </div>
            );
        }
    }

    return (
        <div className='creature-info'>
            {content}
        </div>
    );
}

function CreatureCard({ data = null, index, onChange, isActive }) {

    const handleHPChange = (mod) => {
        if (data?.rolledHP !== undefined) {
            // Working with rolledHP
            const newValue = mod === '+' ? parseInt(data.rolledHP) + 1 : parseInt(data.rolledHP) - 1;
            onChange(data.id, 'rolledHP', newValue); // Prevent negative HP
        } else {
            // Working with regular hp
            const currentHP = data.hp || 0;
            const newValue = mod === '+' ? parseInt(currentHP) + 1 : parseInt(currentHP) - 1;
            onChange(data.id, 'hp', newValue);
        }
    }

    return (
        <div className={"card mb-3 " + (
            data?.isPlayer ? 'player-card' : //player card style
                data?.isNPC ? 'npc-card' : //npc cards style
                    'monster-card' //default (monster) style
        ) + (
                isActive ? ' active' : //Active combatant
                    ' inactive' //Nonactive combatant
            ) + (
                data?.rolledHP <= 0 ? ' danger' : //HP <=0, bg changes to warning
                    data.hp <= 0 ? ' danger' : //HP <=0, bg changes to warning
                        ''
            )
        }>
            <div className="row g-0">
                {
                    data?.isPlayer ? <CreatureImg img='player' /> : //player img
                        data?.isNPC ? <CreatureImg img='npc' /> : //npc img
                            <CreatureImg img={data.img_url} /> //default img
                }
                <div className="col-md-8" style={{ padding: '5px' }}>
                    {/* Index. Name */}
                    <div className='side-by-side'>
                        <h1 className="card-title">{index}. {data.name}</h1>
                        <p>{data.init}</p>
                    </div>
                    {/* HP, AC */}
                    <div className="side-by-side">
                        <div>
                            <HPBlock hp={data?.rolledHP ? data.rolledHP : data.hp} onChange={handleHPChange} />
                        </div>
                        <div className='ac-block'>
                            <h4>⛊ AC: {dice.extractNumbersOutsideParentheses(data.ac.toString())}</h4>
                        </div>
                    </div>
                    {/* Stats */}
                    <StatsTable data={data} />
                </div>

            </div>
            <div className='row g-0 mt-2 card-extra-info'>
                <CreatureActions data={data} />
            </div>
            <p className="card-text"><small className="text-body-secondary">{
                data?.manualAdd ? 'Added manually' :
                    data?.autoAdd ? 'Added via autocomplete' :
                        'Unknown add method'
            }</small></p>

        </div>
    )

}

function CardContainer({ combatants, currentCombatant, onChange }) {
    const cardRefs = useRef([]);

    // Auto-scroll to current combatant when currentCombatant changes
    useEffect(() => {
        if (cardRefs.current[currentCombatant]) {
            cardRefs.current[currentCombatant].scrollIntoView({
                behavior: 'smooth',
                block: 'start', // Centers the element vertically in the viewport
                inline: 'nearest'
            });
        }
    }, [currentCombatant]);

    // Passes change to parent CombatManager
    const handleOnChange = (id, key, value) => {
        onChange(id, key, value);
    }

    return (
        <div className="card-container">
            {combatants.map((combatant, index) => (
                <div
                    key={combatant.id}
                    ref={el => cardRefs.current[index] = el}
                >
                    <CreatureCard
                        data={combatant}
                        index={index + 1}
                        onChange={handleOnChange}
                        isActive={index === currentCombatant ? true : false}
                    />
                </div>
            ))}
        </div>
    );
}

function InputWindow({ onTestPopulate, onAutocompleteAdd, onManualAdd, onClear, onCustomAdd }) {
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [customSuggestions, setCustomSuggestions] = useState([]);
    const [showCustomSuggestions, setCustomShowSuggestions] = useState(false);

    // Auto
    const [autoAdvSelected, setAutoAdvSelected] = useState('');
    const [autoValue, setAutoValue] = useState('');
    const [numToAdd, setNumToAdd] = useState('1');

    // Manual
    const [manualName, setManualName] = useState('');
    const [manualAdvSelected, setManualAdvSelected] = useState('');
    const [manualHP, setManualHP] = useState('');
    const [manualAC, setManualAC] = useState('');
    const [manualInit, setManualInit] = useState('');
    const [manualType, setManualType] = useState('player');

    // Custom Characters
    const chars = (storage.retrieve('charData') ? JSON.parse((storage.retrieve('charData'))).chars : null);
    console.log('CombatManager.js: charData retrieved. Data: ');
    tools.prettyLogJson(chars);
    const [customName, setCustomName] = useState('');
    const [customInit, setCustomInit] = useState('');
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
        charData['init'] = customInit;
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
        const filtered = rawMonstersData.filter(item =>
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
                <div className='side-by-side' style={{ justifyContent: 'center' }}>
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
        document.title = "dmT: Combat Manager";
    }, []);

    // Data
    const [combatants, setCombatants] = useState([]);
    const [currentCombatantIndex, setCurrentCombatantIndex] = useState(0);

    // Add Funcs
    const addMonsterData = (monsterName, adv = '') => {
        const originalMonster = rawMonstersData.find(item => item.name === monsterName);

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
        setCombatants(prevCombatants => [...prevCombatants, monsterToAdd]);
        // Sort after adding
        setTimeout(() => sortCombatantsByInit(), 0);
    }

    function handleAutoAdd(monsterName, advantage) {
        addMonsterData(monsterName, advantage);
    }

    function handleManualAdd(manualData) {
        manualData.manualAdd = true;
        setCombatants(prevCombatants => [...prevCombatants, manualData]);
        // Sort after adding
        setTimeout(() => sortCombatantsByInit(), 0);
    }

    function handleCustomAdd(charData) {
        setCombatants(prevCombatants => [...prevCombatants, charData]);
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
            const monsterName = rawMonstersData[index].name;
            addMonsterData(monsterName);
        })
    }

    // Imported data from Travel Manager
    const [searchParams] = useSearchParams();
    const [hasProcessedParams, setHasProcessedParams] = useState(false);

    useEffect(() => {
        if (searchParams.toString() !== '' && !hasProcessedParams) {
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

            setHasProcessedParams(true);
        }
    }, [searchParams, hasProcessedParams]); // Dependencies ensure this only runs when needed

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
            const sorted = [...prevCombatants].sort((a, b) => {
                const aInit = a.init || 0;
                const bInit = b.init || 0;
                return bInit - aInit; // Descending order (highest initiative first)
            });
            return sorted;
        });
    };

    function handleCardOnChange(id, key, value) {
        console.log(`Updating combatant ${id}, ${key} changed to: ${value}`);
        setCombatants(prevCombatants =>
            prevCombatants.map(combatant =>
                combatant.id === id
                    ? { ...combatant, [key]: value }
                    : combatant
            )
        );
    }

    function handleClear() {
        setCombatants([]);
    }

    return (
        <div className='page'>
            <div className='row'>
                <div className='col'>
                    <CardContainer
                        combatants={combatants} // Now using the sorted combatants state
                        onChange={handleCardOnChange}
                        currentCombatant={currentCombatantIndex}
                    />
                </div>
                <div className='col ml-0' style={{ paddingLeft: '0px' }}>
                    <CombatControl
                        data={combatants.length > 0 ? combatants[currentCombatantIndex] : null} // Use the sorted combatants state
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