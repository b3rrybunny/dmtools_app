// Modules
import * as bootstrap from 'bootstrap';
import { useState } from 'react';
import * as dice from '../../scripts/dice';

// Custom
import rawMonstersData from '../../data/srd_5e_monsters.json';
import '../../css/CombatManager.css';
import player_character from '../../assets/player_character.png';
import NPC_img from '../../assets/NPC.png';
import * as tools from '../tools';


function getModifier(stat) {
    const numericStat = Number(stat); // Converts strings to numbers (e.g., "18" → 18)
    if (isNaN(numericStat)) return "(Invalid)"; // Fallback for non-numbers

    const modifier = Math.floor((numericStat - 10) / 2);
    return modifier >= 0 ? `(+${modifier})` : `(${modifier})`;
}

function ModifierText({ modifier }) {
    if (modifier[1] === "+") {
        return (<p style={{ color: 'green', textAlign: 'center' }}>{modifier}</p>)
    }
    else {
        return (<p style={{ color: 'red', textAlign: 'center' }}>{modifier}</p>)
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
                <img src={player_character} className="img-fluid rounded" />
            </div>
        )
    }
    else if (img === 'npc') {
        return (
            <div className="col-md-4 card-img-npc" style={{ alignContent: 'center', justifyContent: 'center', padding: '0px' }}>
                <img src={NPC_img} className="img-fluid rounded" />
            </div>
        )
    }
    else {
        return (
            <div className="col-md-4 card-img-monster" style={{ alignContent: 'center', justifyContent: 'center', padding: '0px' }}>
                <img src={img} className="img-fluid rounded" />
            </div>
        )
    }
}

function CreatureCard({ data = null, index }) {
    return (
        <div className={"card mb-3 " + (
            data?.isPlayer ? 'player-card' :
                data?.isNPC ? 'npc-card' :
                    'monster-card'
        ) + (
                index === 1 ? ' active' :
                    ' inactive'
            )
        }>
            <div className="row g-0">
                {
                    data?.isPlayer ? <CreatureImg img='player' /> :
                        data?.isNPC ? <CreatureImg img='npc' /> :
                            <CreatureImg img={data.img_url} />
                }
                <div className="col-md-8">
                    {/* Index. Name */}
                    <div className='side-by-side'>
                        <h1 className="card-title">{index}. {data.name}</h1>
                        <p>{data.init}</p>
                    </div>
                    {/* HP, AC */}
                    <div className="side-by-side">
                        <div>
                            <h5>❤ HP: {
                                data?.isPlayer ? data.hp :
                                    data?.isNPC ? data.hp :
                                        dice.extractNumbersOutsideParentheses(data.hp)
                            } {
                                    data?.isPlayer ? null :
                                        data?.isNPC ? null :
                                            dice.rollDice(data.hp)
                                }</h5>
                        </div>
                        <div>
                            <h5>⛊ AC: {dice.extractNumbersOutsideParentheses(data.ac)}</h5>
                        </div>
                    </div>
                    {/* Stats */}
                    <StatsTable data={data} />
                </div>

            </div>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>

        </div>
    )

}

function CardContainer({ combatants }) {
    // Sort combatants by initiative in descending order (highest first)
    const sortedCombatants = [...combatants].sort((a, b) => {
        // Handle cases where init might be undefined or null
        const aInit = a.init || 0;
        const bInit = b.init || 0;
        return bInit - aInit; // Descending order (highest initiative first)
    });

    return (
        <div className="card-container">
            {sortedCombatants.map((combatant, index) => (
                <CreatureCard
                    key={combatant.id}
                    data={combatant}
                    index={index + 1}
                />
            ))}
        </div>
    );
}

function InputWindow({ value, onTestPopulate, onAutocompleteAdd, onManualAdd }) {
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Auto
    const [autoAdvSelected, setAutoAdvSelected] = useState('');
    const [autoValue, setAutoValue] = useState('');

    // Manual
    const [manualName, setManualName] = useState('');
    const [manualAdvSelected, setManualAdvSelected] = useState('');
    const [manualHP, setManualHP] = useState('');
    const [manualAC, setManualAC] = useState('');
    const [manualInit, setManualInit] = useState('');
    const [manualType, setManualType] = useState('player');

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
        if (autoValue.trim()) {
            onAutocompleteAdd(autoValue, autoAdvSelected); // Pass data to parent
            setAutoValue(''); // Optional: Clear input after submission
        }
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



    return (
        <div className="input-window" style={{ width: '100%' }}>
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
                <div className='side-by-side'>
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
                </div>
            </div>

            <div className='manual-add'>
                <div className='row'>
                    <div className='col side-by-side'>
                        <p>Combatant name: </p>
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
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col side-by-side'>
                        <p>Init: </p>
                        <input
                            type="number"
                            value={manualInit}
                            onChange={handleManualInitChange}
                            placeholder="Start typing..."
                            className="form-control"
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
        </div>
    );
}

function CombatManager() {
    const [combatants, setCombatants] = useState([]);

    const addMonsterData = (monsterName, adv = '') => {
        const originalMonster = rawMonstersData.find(item => item.name === monsterName);

        // Create a copy of the monster object instead of modifying the original
        const monsterToAdd = { ...originalMonster };
        if (adv.length > 0) {
            monsterToAdd.init = dice.rollInit(monsterToAdd.DEX, adv);
        }
        else {
            monsterToAdd.init = dice.rollInit(monsterToAdd.DEX);
        }
        monsterToAdd.id = Date.now() + Math.random();;
        setCombatants(prevCombatants => [...prevCombatants, monsterToAdd]);
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
        /*const testCreatures = selections.map(index => rawMonstersData[index]);
        setCreatures(prevCreatures => [...prevCreatures, ...testCreatures]);*/
    }

    function handleAutoAdd(monsterName, advantage) {
        addMonsterData(monsterName, advantage);
    }

    function handleManualAdd(manualData) {
        setCombatants(prevCombatants => [...prevCombatants, manualData]);
    }

    return (
        <div className='page'>
            <div className='row'>
                <div className='col'>
                    <CardContainer combatants={combatants} />
                </div>
                <div className='col'>
                    <InputWindow
                        onTestPopulate={testPopulate}
                        onAutocompleteAdd={handleAutoAdd}
                        onManualAdd={handleManualAdd}
                    />
                </div>
            </div>
        </div>
    );
}

export default CombatManager;