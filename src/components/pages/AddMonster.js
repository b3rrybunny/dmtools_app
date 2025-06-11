// Modules ------------------------------------------------------------------
import * as bootstrap from 'bootstrap';
import { useState, useEffect, useRef, memo } from 'react';
import ReactDOMServer from 'react-dom/server';
import { createPortal } from 'react-dom';


// Custom -------------------------------------------------------------------
// Elements / Scripts
import HPBlock from '../basic/HPBlock';
import ACBlock from '../basic/ACBlock';
import HorizLine from '../basic/HorizontalLine';
import SideBySide from '../basic/SideBySide';
import MonsterCard from '../basic/MonsterCard';
import BasicCon from '../basic/BasicContainer';
import * as tools from '../../scripts/tools';
import * as dice from '../../scripts/dice';
// Data
import rawMonstersData from '../../data/srd_5e_monsters.json';
import * as SRDapi from '../../scripts/dndSRD5eapi';
import * as storage from '../../scripts/storage';
// CSS / Assets
import '../../css/MonsterDataPage.css';


// Data Init
const allSpellsData = await (SRDapi.getAllSpells());
const allEquipmentData = await (SRDapi.getAllEquipment());
const allLanguageData = await (SRDapi.getAllLanguages());


// Subcomponents ------------------------------------------------------------
function GeneralInfoinput({ onAddGeneralInfo }) {
    // General Info
    const [name, setName] = useState(''); //Name
    const onNameChange = (e) => {
        setName(e.target.value);
        handleAddGeneralInfo();
    }
    const [chrClass, setChrClass] = useState('Generic'); //Class
    const onChrClassChange = (e) => {
        setChrClass(e.target.value);
        handleAddGeneralInfo();
    }
    const [level, setLevel] = useState('1'); //Level
    const onLevelChange = (e) => {
        setLevel(e.target.value);
        handleAddGeneralInfo();
    }
    const [race, setRace] = useState(''); //Race
    const onRaceChange = (e) => {
        setRace(e.target.value);
        handleAddGeneralInfo();
    }
    const [alignment, setAlignment] = useState(''); //Alignment
    const onAlignmentChange = (e) => {
        setAlignment(e.target.value);
        handleAddGeneralInfo();
    }
    const [xp, setXp] = useState('0'); //Experience Points
    const onXpChange = (e) => {
        setXp(e.target.value);
        handleAddGeneralInfo();
    }
    const [type, setType] = useState(''); //Monster type
    const onTypeChange = (e) => {
        setType(e.target.value);
        handleAddGeneralInfo();
    }

    function compileData() {
        return ({
            'name': name,
            'class': chrClass,
            'level': level,
            'race': race,
            'alignment': alignment,
            'xp': xp
        });
    }

    function handleAddGeneralInfo() {
        onAddGeneralInfo(compileData());
    }

    return (
        <>
            <BasicCon margin={2.5} content={
                <>
                    <h3>General Info:</h3>
                    <SideBySide content={
                        <>
                            <h4>Name: </h4>
                            <input
                                type="text"
                                value={name}
                                onChange={onNameChange}
                                placeholder="'Giant Freaking Frong'"
                                className="form-control"
                                style={{ maxWidth: '300px' }}
                            />
                        </>
                    } />
                    <SideBySide content={
                        <>
                            <h4>Class: </h4>
                            <select id="class" value={chrClass} onChange={onChrClassChange}>
                                <option value="Generic">Generic</option>
                                <option value="Barbarian">Barbarian</option>
                                <option value="Bard">Bard</option>
                                <option value="Ceric">Cleric</option>
                                <option value="Druid">Druid</option>
                                <option value="Fighter">Fighter</option>
                                <option value="Monk">Monk</option>
                                <option value="Paladin">Paladin</option>
                                <option value="Ranger">Ranger</option>
                                <option value="Rogue">Rogue</option>
                                <option value="Sorcerer">Sorcerer</option>
                                <option value="Warlock">Warlock</option>
                                <option value="Wizard">Wizard</option>
                                <option value="Artificer">Artificer</option>
                            </select>
                        </>
                    } />
                    <SideBySide content={
                        <>
                            <h4>Level: </h4>
                            <input
                                type="number"
                                min='1'
                                value={level}
                                onChange={onLevelChange}
                                placeholder="..."
                                className="form-control"
                                style={{ maxWidth: '75px' }}
                            />
                        </>
                    } />
                    <SideBySide content={
                        <>
                            <h4>Race: </h4>
                            <input
                                type="text"
                                value={race}
                                onChange={onRaceChange}
                                placeholder="'Frog'"
                                className="form-control"
                                style={{ maxWidth: '200px' }}
                            />
                        </>
                    } />
                    <SideBySide content={
                        <>
                            <h4>Alignment: </h4>
                            <select id="alignment" value={alignment} onChange={onAlignmentChange}>
                                <option value="">Choose...</option>
                                <option value="Lawful Good">Lawful Good</option>
                                <option value="Neutral Good">Neutral Good</option>
                                <option value="Chaotic Good">Chaotic Good</option>
                                <option value="Lawful Neutral">Lawful Neutral</option>
                                <option value="True Neutral">True Neutral</option>
                                <option value="Chaotic Neutral">Chaotic Neutral</option>
                                <option value="Lawful Evil">Lawful Evil</option>
                                <option value="Neutral Evil">Neutral Evil</option>
                                <option value="Chaotic Evil">Chaotic Evil</option>
                            </select>
                        </>
                    } />
                    <SideBySide content={
                        <>
                            <h4>XP: </h4>
                            <input
                                type="number"
                                step='10'
                                min='0'
                                value={xp}
                                onChange={onXpChange}
                                placeholder="..."
                                className="form-control"
                                style={{ maxWidth: '75px' }}
                            />
                        </>
                    } />
                </>
            } />
        </>
    )
}

function AttackInput({ onAddAttack }) {
    // Variables
    const [attackType, setAttackType] = useState(''); //Attack type
    const onAttackTypeChange = (e) => {
        setAttackType(e.target.value);
    }
    const [attackRange, setAttackRange] = useState('5'); //Attack reach
    const onAttackRangeChange = (e) => {
        setAttackRange(e.target.value);
    }
    const [attackDesc, setAttackDesc] = useState(''); //Attack desc
    const onAttackDescChange = (e) => {
        setAttackDesc(e.target.value);
    }
    const [attackToHit, setAttackToHit] = useState('0'); //Attack to hit modifier
    const onAttackToHitChange = (e) => {
        setAttackToHit(e.target.value);
    }
    const [attackTargets, setAttackTargets] = useState('1'); //Number of targets attack can hit
    const onAttackTargetsChange = (e) => {
        setAttackTargets(e.target.value);
    }
    const [attackNumOfDice, setAttackNumOfDice] = useState('1'); //Number of dice for damage roll
    const onAttackNumOfDiceChange = (e) => {
        setAttackNumOfDice(e.target.value);
    }
    const [attackDice, setAttackDice] = useState('4'); //Dice type for damage roll
    const onAttackDiceChange = (e) => {
        setAttackDice(e.target.value);
    }
    const [attackDamageType, setAttackDamageType] = useState(''); //Damage type for attack
    const onAttackDamageTypeChange = (e) => {
        setAttackDamageType(e.target.value);
    }
    const [attackDamageMod, setAttackDamageMod] = useState('0'); //Damage modifier for attack
    const onAttackDamageModChange = (e) => {
        setAttackDamageMod(e.target.value);
    }
    const [attackAddlDamage, setAttackAddlDamage] = useState('false'); //Does attack have add'l damage?
    const onAttackAddlDamageChange = (e) => {
        setAttackAddlDamage(e.target.value);
    }
    const [attackAddlNumOfDice, setAttackAddlNumOfDice] = useState('1'); //Number of dice for add'l damage roll
    const onAttackAddlNumOfDiceChange = (e) => {
        setAttackAddlNumOfDice(e.target.value);
    }
    const [attackAddlDice, setAttackAddlDice] = useState('4'); //Dice type for add'l damage roll
    const onAttackAddlDiceChange = (e) => {
        setAttackAddlDice(e.target.value);
    }
    const [attackAddlDamageType, setAttackAddlDamageType] = useState(''); //add'l Damage type for attack
    const onAttackAddlDamageTypeChange = (e) => {
        setAttackAddlDamageType(e.target.value);
    }
    const [attackAddlDamageMod, setAttackAddlDamageMod] = useState('0'); //add'l Damage modifier for attack
    const onAttackAddlDamageModChange = (e) => {
        setAttackAddlDamageMod(e.target.value);
    }
    const [attackNote, setAttackNote] = useState('');

    // Functions
    function handleAddAttack() {
        const AttackNameEl = (
            <em><strong>{attackDesc}. </strong></em>
        );
        const AttackTypeEl = (
            <em>{attackType}. </em>
        );
        const ToHitString = (
            (attackToHit < 0 ? '-' : '+')
            + attackToHit + ' to hit, '
        );
        const ReachString = (
            'reach ' + attackRange + 'ft., '
        );
        const TargetString = (
            attackTargets + (attackTargets > 1 ? ' targets. ' : ' target. ')
        );
        const DamageString = (
            '(' + attackNumOfDice + 'd' + attackDice + ') ' +
            (attackDamageMod > 0 ? ('+ ' + attackDamageMod) : attackDamageMod < 0 ? ('- ' + attackDamageMod) : '') +
            ' ' + attackDamageType + ' damage' + (attackAddlDamage === 'true' ? '' : '.')
        );
        const AddlDamageString = (
            ' + (' + attackAddlNumOfDice + 'd' + attackAddlDice + ') ' +
            (attackAddlDamageMod > 0 ? ('+ ' + attackAddlDamageMod) : attackAddlDamageMod < 0 ? ('- ' + attackAddlDamageMod) : '') +
            ' ' + attackAddlDamageType + ' damage.'
        );

        const result = (
            <p>
                {AttackNameEl}
                {AttackTypeEl}
                {ToHitString}
                {ReachString}
                {TargetString}
                <em>Hit: </em>
                {DamageString}
                {attackAddlDamage === 'true' ? AddlDamageString : <></>}
                {' ' + attackNote}
            </p>
        );
        onAddAttack(result);
        resetFields();
    }

    function resetFields() {
        // Reset Attack fields
        setAttackType('');
        setAttackRange('5');
        setAttackDesc('');
        setAttackToHit('0');
        setAttackTargets('1');
        setAttackNumOfDice('1');
        setAttackDice('4');
        setAttackDamageType('');
        setAttackDamageMod('0');
        setAttackAddlDamage('false');
        setAttackAddlNumOfDice('1');
        setAttackAddlDice('4');
        setAttackAddlDamageType('');
        setAttackAddlDamageMod('0');
        setAttackNote('');
    }

    // Component body
    return (
        <>
            <SideBySide content={
                <>
                    <h4>Attack Desc.: </h4>
                    <input
                        type="text"
                        value={attackDesc}
                        onChange={onAttackDescChange}
                        placeholder="'Scimitar'"
                        className="form-control"
                        style={{ maxWidth: '350px' }}
                    />
                </>
            } />
            <SideBySide content={
                <>
                    <h4>Type: </h4>
                    <select id="attackType" value={attackType} onChange={onAttackTypeChange}>
                        <option value="">Choose...</option>
                        <option value="Melee Weapon">Melee Weapon</option>
                        <option value="Ranged Weapon">Ranged Weapon</option>
                        <option value="Other">Other</option>
                    </select>
                    <h4>Reach: </h4>
                    <input
                        type="number"
                        min='5'
                        step='5'
                        value={attackRange}
                        onChange={onAttackRangeChange}
                        placeholder="..."
                        className="form-control"
                        style={{ maxWidth: '75px' }}
                    />
                    <h5>ft.</h5>
                </>
            } />
            <SideBySide content={
                <>
                    <h4>To hit: </h4>
                    <h5>{attackToHit < 0 ? '' : '+'}</h5>
                    <input
                        type="number"
                        value={attackToHit}
                        onChange={onAttackToHitChange}
                        placeholder="..."
                        className="form-control"
                        style={{ maxWidth: '75px' }}
                    />
                    <h4># of targets: </h4>
                    <input
                        type="number"
                        min='1'
                        value={attackTargets}
                        onChange={onAttackTargetsChange}
                        placeholder="..."
                        className="form-control"
                        style={{ maxWidth: '75px' }}
                    />
                </>
            } />
            <SideBySide gap={5} content={
                <>
                    <h4>Damage: </h4>
                    <input
                        type="number"
                        min='1'
                        value={attackNumOfDice}
                        onChange={onAttackNumOfDiceChange}
                        placeholder="..."
                        className="form-control"
                        style={{ maxWidth: '75px' }}
                    />
                    <h5>d</h5>
                    <input
                        type="number"
                        min='4'
                        value={attackDice}
                        onChange={onAttackDiceChange}
                        placeholder="..."
                        className="form-control"
                        style={{ maxWidth: '75px' }}
                    />
                    <h5>{attackDamageMod < 0 ? '-' : '+'}</h5>
                    <input
                        type="number"
                        value={attackDamageMod}
                        onChange={onAttackDamageModChange}
                        placeholder="..."
                        className="form-control"
                        style={{ maxWidth: '75px' }}
                    />
                    <h4> Type: </h4>
                    <select id="attackDamageType" value={attackDamageType} onChange={onAttackDamageTypeChange} style={{ maxWidth: '90px' }}>
                        <option value="">Choose...</option>
                        <option value="Acid">Acid</option>
                        <option value="Bludgeoning">Bludgeoning</option>
                        <option value="Cold">Cold</option>
                        <option value="Fire">Fire</option>
                        <option value="Force">Force</option>
                        <option value="Lightning">Lightning</option>
                        <option value="Necrotic">Necrotic</option>
                        <option value="Piercing">Piercing</option>
                        <option value="Poison">Poison</option>
                        <option value="Psychic">Psychic</option>
                        <option value="Radiant">Radiant</option>
                        <option value="Slashing">Slashing</option>
                        <option value="Thunder">Thunder</option>
                    </select>
                </>
            } />
            <SideBySide content={
                <>
                    <h4>Add'l damage: </h4>
                    <select id='attackAddlDamage' value={attackAddlDamage} onChange={onAttackAddlDamageChange}>
                        <option value={'false'}>No</option>
                        <option value={'true'}>Yes</option>
                    </select>
                </>
            } />
            {
                attackAddlDamage === 'true' ?
                    <>
                        <SideBySide gap={5} content={
                            <>
                                <h5>Damage: </h5>
                                <input
                                    type="number"
                                    min='1'
                                    value={attackAddlNumOfDice}
                                    onChange={onAttackAddlNumOfDiceChange}
                                    placeholder="..."
                                    className="form-control"
                                    style={{ maxWidth: '75px' }}
                                />
                                <h5>d</h5>
                                <input
                                    type="number"
                                    min='4'
                                    value={attackAddlDice}
                                    onChange={onAttackAddlDiceChange}
                                    placeholder="..."
                                    className="form-control"
                                    style={{ maxWidth: '75px' }}
                                />
                                <h5>{attackAddlDamageMod < 0 ? '' : '+'}</h5>
                                <input
                                    type="number"
                                    value={attackAddlDamageMod}
                                    onChange={onAttackAddlDamageModChange}
                                    placeholder="..."
                                    className="form-control"
                                    style={{ maxWidth: '75px' }}
                                />
                                <h5> Type: </h5>
                                <select id="attackAddlDamageType" value={attackAddlDamageType} onChange={onAttackAddlDamageTypeChange}>
                                    <option value="">Choose...</option>
                                    <option value="Acid">Acid</option>
                                    <option value="Bludgeoning">Bludgeoning</option>
                                    <option value="Cold">Cold</option>
                                    <option value="Fire">Fire</option>
                                    <option value="Force">Force</option>
                                    <option value="Lightning">Lightning</option>
                                    <option value="Necrotic">Necrotic</option>
                                    <option value="Piercing">Piercing</option>
                                    <option value="Poison">Poison</option>
                                    <option value="Psychic">Psychic</option>
                                    <option value="Radiant">Radiant</option>
                                    <option value="Slashing">Slashing</option>
                                    <option value="Thunder">Thunder</option>
                                </select>
                            </>
                        } />
                    </>
                    : <></>
            }
            <SideBySide content={
                <>
                    <h4>Note: </h4>
                    <textarea
                        value={attackNote}
                        onChange={(e) => setAttackNote(e.target.value)}
                        style={{ minHeight: '75px', width: '100%' }}
                        placeholder='Target must make a DC 11 CON saving throw, taking additional damage on a failed save, or half as much on a successful one.'
                    />
                </>
            } />
            <button
                className='btn btn-success'
                onClick={handleAddAttack}
                style={{ width: '100%' }}
            >Add Attack
            </button>
        </>
    );
}

function SpellInput({ onAddSpell }) {
    // Variables
    const [spellName, setSpellName] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
    const inputRef = useRef(null);

    // Autocomplete functions
    const onSpellNameChange = (e) => {
        const value = e.target.value;
        setSpellName(value);
        if (!value) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }
        // Filter suggestions
        const filtered = allSpellsData.filter(item =>
            (item.name.toLowerCase().includes(value.toLowerCase()))
        );
        setSuggestions(filtered);
        setShowSuggestions(true);
        updateDropdownPosition();
    };
    const updateDropdownPosition = () => {
        if (inputRef.current) {
            const rect = inputRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width
            });
        }
    };
    const handleSuggestionClick = (name) => {
        setSpellName(name);
        setShowSuggestions(false);
    };
    const handleBlur = () => {
        // Small delay to allow click events to process
        setTimeout(() => setShowSuggestions(false), 200);
    };
    const handleFocus = () => {
        if (spellName) {
            setShowSuggestions(true);
            updateDropdownPosition();
        }
    };
    useEffect(() => {
        const handleScroll = () => {
            if (showSuggestions) {
                updateDropdownPosition();
            }
        };

        const handleResize = () => {
            if (showSuggestions) {
                updateDropdownPosition();
            }
        };

        window.addEventListener('scroll', handleScroll, true);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll, true);
            window.removeEventListener('resize', handleResize);
        };
    }, [showSuggestions]);
    const renderDropdown = () => {
        if (!showSuggestions || suggestions.length === 0) return null;

        return createPortal(
            <div
                className="autocomplete-items"
                style={{
                    position: 'absolute',
                    zIndex: 999999,
                    top: dropdownPosition.top,
                    left: dropdownPosition.left,
                    width: dropdownPosition.width,
                    border: '1px solid #d4d4d4',
                    borderTop: 'none',
                    backgroundColor: 'white',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
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
                            <strong>{item.name.substr(0, spellName.length)}</strong>
                            {item.name.substr(spellName.length)}
                        </div>
                        <div style={{ fontSize: '0.8em', color: '#666', marginTop: '4px' }}>
                            Level: {item.level}
                        </div>
                    </div>
                ))}
            </div>,
            document.body
        );
    };

    // Add functions
    async function handleAddSpell() {
        const spell = allSpellsData.find(item => item.name === spellName);
        const spellData = await SRDapi.getSingleSpell(spell.index);
        const spellDataDescCompleteString = () => {
            let string = '';
            spellData.desc.forEach(item => {
                if (string === '') {
                    string = item;
                }
                else {
                    string = string + ' ' + item;
                }
            });
            return string;
        }
        const spellDataAreaOfEffectString = () => {
            let string = '';
            string = spellData.area_of_effect.type;
            string = string + ' ' + spellData.area_of_effect.size.toString() + 'ft.';
            return string;
        }
        const spellDataComponentString = () => {
            let string = '';
            spellData.components.forEach(item => {
                if (string === '') {
                    string = item;
                }
                else {
                    string = string + ', ' + item;
                }
            });
            return string;
        }
        const spellNameEl = (
            <strong><em>{spellData.name}, Level {spellData.level}. </em></strong>
        )
        const spellDescString = (
            spellDataDescCompleteString() + (spellData?.higher_level ? (' At Higher Levels: ' + spellData.higher_level[0]) : '')
        )
        const spellSpecsEl = (
            <>
                <em>Range: </em><span>{spellData.range}. </span>
                <em>Casting time: </em><span>{spellData.casting_time}. </span>
                <em>Duration: </em><span>{spellData.duration}. </span>
                {spellData?.concentration ? (<em>Concentration. </em>) : null}
                {spellData?.ritual ? (<em>Ritual. </em>) : null}
                {spellData?.area_of_effect ? (<><em>Area of effect: </em><span>{spellDataAreaOfEffectString()}. </span></>) : null}
                <em>Components: </em><span>{spellDataComponentString()}. </span>
            </>
        )
        const result = (
            <>
                <p>
                    {spellNameEl}
                    {spellSpecsEl}
                    {spellDescString}
                </p>
            </>
        );
        onAddSpell(result);
    }

    // Component body
    return (
        <>
            <SideBySide content={
                <>
                    <h4>Spell name: </h4>
                    <div className="autocomplete" style={{ position: 'relative' }}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={spellName}
                            onChange={onSpellNameChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder="'Acid Arrow'"
                            className="form-control"
                        />
                        {renderDropdown()}
                    </div>
                    <button className='btn btn-success' onClick={handleAddSpell}>Add Spell</button>
                </>
            } />
        </>
    );
}

function OtherActionInput({ onAddAction }) {
    // Variables
    const [actionName, setActionName] = useState('');
    const onActionNameChange = (e) => {
        setActionName(e.target.value);
    }
    const [actionDesc, setActionDesc] = useState('Exhales fire in a 15-ft cone. Each creature makes a DC 13 DEX check, taking (7d6) fire damage on a failed save, or half on a successful one.'); //Action name
    const onActionDescChange = (e) => {
        setActionDesc(e.target.value);
    }

    // Add functions
    function handleActionAdd() {
        const actionNameEl = (
            <strong><em>{actionName}. </em></strong>
        );
        const actionDescString = (
            actionDesc
        );
        const result = (
            <>
                <p>
                    {actionNameEl}
                    {actionDescString}
                </p>
            </>
        );
        onAddAction(result);
        setActionDesc('');
        setActionName('');
    }

    // Component body
    return (
        <>
            <SideBySide content={
                <>
                    <h4>Action name: </h4>
                    <input
                        type="text"
                        value={actionName}
                        onChange={onActionNameChange}
                        placeholder="'Fire Breath (Recharge 5-6)'"
                        className="form-control"
                        style={{ maxWidth: '300px' }}
                    />
                </>
            } />
            <SideBySide content={
                <>
                    <h4>Action Description: </h4>
                    <textarea
                        id='actionDescText'
                        value={actionDesc}
                        onChange={onActionDescChange}
                        style={{ width: '100%', minHeight: '150px' }}
                    >
                        Exhales fire in a 15-ft cone. Each creature makes a DC 13 DEX check, taking (7d6) fire damage on a failed save, or half on a successful one.
                    </textarea>
                </>
            } />
            <button
                className='btn btn-success'
                onClick={handleActionAdd}
                style={{ width: '100%' }}
            >
                Add Action
            </button>
        </>
    );
}

function LanguageInput({ data, onAddLanguage }) {
    // Variables
    const [language, setLanguage] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
    const inputRef = useRef(null);

    // Autocomplete functions
    const onLanguageChange = (e) => {
        const value = e.target.value;
        setLanguage(value);
        if (!value) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }
        // Filter suggestions
        const filtered = allLanguageData.filter(item =>
            (item.name.toLowerCase().includes(value.toLowerCase()))
        );
        setSuggestions(filtered);
        setShowSuggestions(true);
        updateDropdownPosition();
    };
    const updateDropdownPosition = () => {
        if (inputRef.current) {
            const rect = inputRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width
            });
        }
    };
    const handleSuggestionClick = (name) => {
        setLanguage(name);
        setShowSuggestions(false);
    };
    const handleBlur = () => {
        // Small delay to allow click events to process
        setTimeout(() => setShowSuggestions(false), 200);
    };
    const handleFocus = () => {
        if (language) {
            setShowSuggestions(true);
            updateDropdownPosition();
        }
    };
    useEffect(() => {
        const handleScroll = () => {
            if (showSuggestions) {
                updateDropdownPosition();
            }
        };

        const handleResize = () => {
            if (showSuggestions) {
                updateDropdownPosition();
            }
        };

        window.addEventListener('scroll', handleScroll, true);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll, true);
            window.removeEventListener('resize', handleResize);
        };
    }, [showSuggestions]);
    const renderDropdown = () => {
        if (!showSuggestions || suggestions.length === 0) return null;

        return createPortal(
            <div
                className="autocomplete-items"
                style={{
                    position: 'absolute',
                    zIndex: 999999,
                    top: dropdownPosition.top,
                    left: dropdownPosition.left,
                    width: dropdownPosition.width,
                    border: '1px solid #d4d4d4',
                    borderTop: 'none',
                    backgroundColor: 'white',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
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
                            <strong>{item.name.substr(0, language.length)}</strong>
                            {item.name.substr(language.length)}
                        </div>
                    </div>
                ))}
            </div>,
            document.body
        );
    };

    // Add functions
    function handleAddLanguage() {
        onAddLanguage(language);
        setLanguage('');
    }

    // Subcomponents
    function DisplayLanguages() {
        return (
            <div>
                {data.map((lang, index) => (
                    <SideBySide key={index} content={<>{index + 1}. {lang}</>} />
                ))}
            </div>
        );
    }

    // Component body
    return (
        <BasicCon margin={2.5} content={
            <>
                <SideBySide content={
                    <>
                        <h4>Add Language: </h4>
                        <div className="autocomplete" style={{ position: 'relative' }}>
                            <input
                                ref={inputRef}
                                type="text"
                                value={language}
                                onChange={onLanguageChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                placeholder="'Common'"
                                className="form-control"
                            />
                            {renderDropdown()}
                        </div>
                        <button className='btn btn-success' onClick={handleAddLanguage}>Add Language</button>
                    </>
                } />
                {data.length !== 0 ?
                    <DisplayLanguages />
                    : null
                }
            </>
        } />
    );
}

function NoteInput({ value, onChange }) {
    return (
        <>
            <BasicCon margin={2.5} content={
                <>
                    <h4>Note:</h4>
                    <textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        style={{ minHeight: '75px', width: '100%' }}
                        placeholder='Izalith is particularly fond of apples and comes from a long line of apple farmers.'
                    />
                </>
            } />
        </>
    );
}

function JsonInput({ value, onChange, onAdd }) {
    return (
        <div style={{ padding: '10px' }}>
            <h5>Input via JSON</h5>
            <p>If you have a monster you've created previously, but they aren't showing up (likely because your local storage was cleared), you can add them here via JSON if you have them saved.</p>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder='JSON text here'
                style={{ margin: '5px', width: '98%' }}
            />
            <button className='btn btn-success' onClick={onAdd} style={{ width: '100%' }}>Add input JSON</button>
        </div>
    );
}


// Main components ---------------------------------------------------------
function MonsterInput({ onReload }) {
    // Stats
    const [profBonus, setProfBonus] = useState('2'); //Proficiency Bonus
    const onProfBonusChange = (e) => {
        setProfBonus(e.target.value);
    };
    const [STR, setSTR] = useState('10'); //STR
    const onSTRChange = (e) => {
        setSTR(e.target.value);
    };
    const [DEX, setDEX] = useState('10'); //DEX
    const onDEXChange = (e) => {
        setDEX(e.target.value);
    };
    const [CON, setCON] = useState('10'); //CON
    const onCONChange = (e) => {
        setCON(e.target.value);
    };
    const [INT, setINT] = useState('10'); //INT
    const onINTChange = (e) => {
        setINT(e.target.value);
    };
    const [WIS, setWIS] = useState('10'); //WIS
    const onWISChange = (e) => {
        setWIS(e.target.value);
    };
    const [CHA, setCHA] = useState('10'); //CHA
    const onCHAChange = (e) => {
        setCHA(e.target.value);
    };
    function StatsInputTable() {
        return (
            <>
                <BasicCon margin={2.5} content={
                    <>
                        <h3>Stats: </h3>
                        <table style={{ margin: '0px' }}>
                            <tbody>
                                <tr>
                                    <td>STR: </td>
                                    <td><input
                                        type="number"
                                        min='0'
                                        max='30'
                                        value={STR}
                                        onChange={onSTRChange}
                                        placeholder="..."
                                        className="form-control"
                                        style={{ maxWidth: '75px' }}
                                    /></td>
                                    <td><ModifierText stat={STR} /></td>
                                    <td>DEX: </td>
                                    <td><input
                                        type="number"
                                        min='0'
                                        max='30'
                                        value={DEX}
                                        onChange={onDEXChange}
                                        placeholder="..."
                                        className="form-control"
                                        style={{ maxWidth: '75px' }}
                                    /></td>
                                    <td><ModifierText stat={DEX} /></td>
                                </tr>
                                <tr>
                                    <td>CON: </td>
                                    <td><input
                                        type="number"
                                        min='0'
                                        max='30'
                                        value={CON}
                                        onChange={onCONChange}
                                        placeholder="..."
                                        className="form-control"
                                        style={{ maxWidth: '75px' }}
                                    /></td>
                                    <td><ModifierText stat={CON} /></td>
                                    <td>INT: </td>
                                    <td><input
                                        type="number"
                                        min='0'
                                        max='30'
                                        value={INT}
                                        onChange={onINTChange}
                                        placeholder="..."
                                        className="form-control"
                                        style={{ maxWidth: '75px' }}
                                    /></td>
                                    <td><ModifierText stat={INT} /></td>
                                </tr>
                                <tr>
                                    <td>WIS: </td>
                                    <td><input
                                        type="number"
                                        min='0'
                                        max='30'
                                        value={WIS}
                                        onChange={onWISChange}
                                        placeholder="..."
                                        className="form-control"
                                        style={{ maxWidth: '75px' }}
                                    /></td>
                                    <td><ModifierText stat={WIS} /></td>
                                    <td>CHA: </td>
                                    <td><input
                                        type="number"
                                        min='0'
                                        max='30'
                                        value={CHA}
                                        onChange={onCHAChange}
                                        placeholder="..."
                                        className="form-control"
                                        style={{ maxWidth: '75px' }}
                                    /></td>
                                    <td><ModifierText stat={CHA} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                } />
            </>
        );
    }

    // Combat stats
    const [hpNumOfDice, setHpNumOfDice] = useState('1');
    const [hpDice, setHpDice] = useState('4');
    const [hpFlat, setHpFlat] = useState('1');
    const [hpMod, setHpMod] = useState('0');

    const [ac, setAc] = useState('10'); //Armor Class
    const onAcChange = (e) => {
        setAc(e.target.value);
    };
    const handleACChange = (mod) => {
        switch (mod) {
            case '+':
                setAc(parseInt(ac) + 1);
                break;
            case '-':
                setAc(parseInt(ac) - 1);
                break;
        }
    };
    const [initBonus, setInitBonus] = useState('0'); //Initiative Bonus
    const onInitBonusChange = (e) => {
        setInitBonus(e.target.value);
    };
    const [insp, setInsp] = useState('0'); //Inspiration
    const onInspChange = (e) => {
        setInsp(e.target.value);
    };
    const [speed, setSpeed] = useState('30'); //Speed
    const onSpeedChange = (e) => {
        setSpeed(e.target.value);
    };
    function CombatInfoInput() {
        return (
            <>
                <BasicCon margin={0} content={
                    <>
                        <h3>Combat Info:</h3>
                        <BasicCon margin={0} content={
                            <SideBySide gap={.5} content={
                                <>
                                    <h4>❤ HP: </h4>
                                    <input
                                        type="number"
                                        min='1'
                                        value={hpFlat}
                                        onChange={(e) => setHpFlat(e.target.value)}
                                        placeholder="..."
                                        className="form-control"
                                        style={{ maxWidth: '60px' }}
                                    />
                                    <h4> (</h4>
                                    <input
                                        type="number"
                                        min='1'
                                        value={hpNumOfDice}
                                        onChange={(e) => setHpNumOfDice(e.target.value)}
                                        placeholder="..."
                                        className="form-control"
                                        style={{ maxWidth: '60px' }}
                                    />
                                    <h4>d</h4>
                                    <input
                                        type="number"
                                        min='4'
                                        value={hpDice}
                                        onChange={(e) => setHpDice(e.target.value)}
                                        placeholder="..."
                                        className="form-control"
                                        style={{ maxWidth: '60px' }}
                                    />
                                    <h4> + </h4>
                                    <input
                                        type="number"
                                        min='0'
                                        value={hpMod}
                                        onChange={(e) => setHpMod(e.target.value)}
                                        placeholder="..."
                                        className="form-control"
                                        style={{ maxWidth: '60px' }}
                                    />
                                    <h4>)</h4>
                                </>
                            } />
                        } />
                        <ACBlock ac={ac} onChange={handleACChange} />
                        <div className='basic-container'>
                            <SideBySide content={
                                <>

                                    <h4>Proficiency Bonus: </h4>
                                    <input
                                        type="number"
                                        value={profBonus}
                                        onChange={onProfBonusChange}
                                        placeholder="..."
                                        className="form-control"
                                        style={{ maxWidth: '75px' }}
                                    />

                                </>
                            } />
                        </div>
                        <div className='basic-container'>
                            <SideBySide content={
                                <>
                                    <h4>Init Bonus: </h4>
                                    <input
                                        type="number"
                                        value={initBonus}
                                        onChange={onInitBonusChange}
                                        placeholder="..."
                                        className="form-control"
                                        style={{ maxWidth: '75px' }}
                                    />
                                </>
                            } />
                        </div>
                        <div className='basic-container'>
                            <SideBySide content={
                                <>
                                    <h4>Speed: </h4>
                                    <input
                                        type="number"
                                        min='0'
                                        step='5'
                                        value={speed}
                                        onChange={onSpeedChange}
                                        placeholder="..."
                                        className="form-control"
                                        style={{ maxWidth: '75px' }}
                                    />
                                    <h5>ft.</h5>
                                </>
                            } />
                        </div>
                    </>
                } />
            </>
        );
    }

    // Skills
    const [Acrobatics, setAcrobatics] = useState(false); //Acrobatics
    const onAcrobaticsChange = (e) => {
        setAcrobatics(e.target.checked);
    };
    const [AnimalHandling, setAnimalHandling] = useState(false); //Animal Handling
    const onAnimalHandlingChange = (e) => {
        setAnimalHandling(e.target.checked);
    };
    const [Arcana, setArcana] = useState(false); //Arcana
    const onArcanaChange = (e) => {
        setArcana(e.target.checked);
    };
    const [Athletics, setAthletics] = useState(false); //Athletics
    const onAthleticsChange = (e) => {
        setAthletics(e.target.checked);
    };
    const [Deception, setDeception] = useState(false); //Deception
    const onDeceptionChange = (e) => {
        setDeception(e.target.checked);
    };
    const [History, setHistory] = useState(false); //History
    const onHistoryChange = (e) => {
        setHistory(e.target.checked);
    };
    const [Insight, setInsight] = useState(false); //Insight
    const onInsightChange = (e) => {
        setInsight(e.target.checked);
    };
    const [Intimidation, setIntimidation] = useState(false); //Intimidation
    const onIntimidationChange = (e) => {
        setIntimidation(e.target.checked);
    };
    const [Investigation, setInvestigation] = useState(false); //Investigation
    const onInvestigationChange = (e) => {
        setInvestigation(e.target.checked);
    };
    const [Medicine, setMedicine] = useState(false); //Medicine
    const onMedicineChange = (e) => {
        setMedicine(e.target.checked);
    };
    const [Nature, setNature] = useState(false); //Nature
    const onNatureChange = (e) => {
        setNature(e.target.checked);
    };
    const [Perception, setPerception] = useState(false); //Perception
    const onPerceptionChange = (e) => {
        setPerception(e.target.checked);
    };
    const [Performance, setPerformance] = useState(false); //Performance
    const onPerformanceChange = (e) => {
        setPerformance(e.target.checked);
    };
    const [Persuasion, setPersuasion] = useState(false); //Persuasion
    const onPersuasionChange = (e) => {
        setPersuasion(e.target.checked);
    };
    const [Religion, setReligion] = useState(false); //Religion
    const onReligionChange = (e) => {
        setReligion(e.target.checked);
    };
    const [SleightOfHand, setSleightOfHand] = useState(false); //Sleight of Hand
    const onSleightOfHandChange = (e) => {
        setSleightOfHand(e.target.checked);
    };
    const [Stealth, setStealth] = useState(false); //Stealth
    const onStealthChange = (e) => {
        setStealth(e.target.checked);
    };
    const [Survival, setSurvival] = useState(false); //Survival
    const onSurvivalChange = (e) => {
        setSurvival(e.target.checked);
    };
    function SkillsInput() {
        return (
            <BasicCon margin={2.5} content={
                <>
                    <h3>Skills: </h3>
                    <div className="btn-group-vertical" data-toggle="buttons" style={{ width: '100%' }}>
                        <label className='btn btn-outline-dark' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input
                                type="checkbox"
                                autoComplete="off"
                                checked={Acrobatics}
                                onChange={onAcrobaticsChange}
                            /> Acrobatics (DEX)<ModifierText stat={DEX} prof={Acrobatics} />
                        </label>

                        <label className='btn btn-outline-dark' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input
                                type="checkbox"
                                autoComplete="off"
                                checked={AnimalHandling}
                                onChange={onAnimalHandlingChange}
                            /> Animal Handling (WIS)<ModifierText stat={WIS} prof={AnimalHandling} />
                        </label>

                        <label className='btn btn-outline-dark' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input
                                type="checkbox"
                                autoComplete="off"
                                checked={Arcana}
                                onChange={onArcanaChange}
                            /> Arcana (INT)<ModifierText stat={INT} prof={Arcana} />
                        </label>

                        <label className='btn btn-outline-dark' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input
                                type="checkbox"
                                autoComplete="off"
                                checked={Athletics}
                                onChange={onAthleticsChange}
                            /> Athletics (STR)<ModifierText stat={STR} prof={Athletics} />
                        </label>

                        <label className='btn btn-outline-dark' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input
                                type="checkbox"
                                autoComplete="off"
                                checked={Deception}
                                onChange={onDeceptionChange}
                            /> Deception (CHA)<ModifierText stat={CHA} prof={Deception} />
                        </label>

                        <label className='btn btn-outline-dark' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input
                                type="checkbox"
                                autoComplete="off"
                                checked={History}
                                onChange={onHistoryChange}
                            /> History (INT)<ModifierText stat={INT} prof={History} />
                        </label>

                        <label className='btn btn-outline-dark' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input
                                type="checkbox"
                                autoComplete="off"
                                checked={Insight}
                                onChange={onInsightChange}
                            /> Insight (WIS)<ModifierText stat={WIS} prof={Insight} />
                        </label>

                        <label className='btn btn-outline-dark' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input
                                type="checkbox"
                                autoComplete="off"
                                checked={Intimidation}
                                onChange={onIntimidationChange}
                            /> Intimidation (CHA)<ModifierText stat={CHA} prof={Intimidation} />
                        </label>

                        <label className='btn btn-outline-dark' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input
                                type="checkbox"
                                autoComplete="off"
                                checked={Investigation}
                                onChange={onInvestigationChange}
                            /> Investigation (INT)<ModifierText stat={INT} prof={Investigation} />
                        </label>

                        <label className='btn btn-outline-dark' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input
                                type="checkbox"
                                autoComplete="off"
                                checked={Medicine}
                                onChange={onMedicineChange}
                            /> Medicine (WIS)<ModifierText stat={WIS} prof={Medicine} />
                        </label>

                        <label className='btn btn-outline-dark' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input
                                type="checkbox"
                                autoComplete="off"
                                checked={Nature}
                                onChange={onNatureChange}
                            /> Nature (INT)<ModifierText stat={INT} prof={Nature} />
                        </label>

                        <label className='btn btn-outline-dark' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input
                                type="checkbox"
                                autoComplete="off"
                                checked={Perception}
                                onChange={onPerceptionChange}
                            /> Perception (WIS)<ModifierText stat={WIS} prof={Perception} />
                        </label>

                        <label className='btn btn-outline-dark' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input
                                type="checkbox"
                                autoComplete="off"
                                checked={Performance}
                                onChange={onPerformanceChange}
                            /> Performance (CHA)<ModifierText stat={CHA} prof={Performance} />
                        </label>

                        <label className='btn btn-outline-dark' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input
                                type="checkbox"
                                autoComplete="off"
                                checked={Persuasion}
                                onChange={onPersuasionChange}
                            /> Persuasion (CHA)<ModifierText stat={CHA} prof={Persuasion} />
                        </label>

                        <label className='btn btn-outline-dark' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input
                                type="checkbox"
                                autoComplete="off"
                                checked={Religion}
                                onChange={onReligionChange}
                            /> Religion (INT)<ModifierText stat={INT} prof={Religion} />
                        </label>

                        <label className='btn btn-outline-dark' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input
                                type="checkbox"
                                autoComplete="off"
                                checked={SleightOfHand}
                                onChange={onSleightOfHandChange}
                            /> Sleight of Hand (DEX)<ModifierText stat={DEX} prof={SleightOfHand} />
                        </label>

                        <label className='btn btn-outline-dark' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input
                                type="checkbox"
                                autoComplete="off"
                                checked={Stealth}
                                onChange={onStealthChange}
                            /> Stealth (DEX)<ModifierText stat={DEX} prof={Stealth} />
                        </label>

                        <label className='btn btn-outline-dark' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input
                                type="checkbox"
                                autoComplete="off"
                                checked={Survival}
                                onChange={onSurvivalChange}
                            /> Survival (WIS)<ModifierText stat={WIS} prof={Survival} />
                        </label>
                    </div>
                </>
            } />
        );
    }

    // Saving Throws
    const [STRThrow, setSTRThrow] = useState(false); //Strength Saving Throw
    const onSTRThrowChange = (e) => {
        setSTRThrow(e.target.checked);
    };
    const [DEXThrow, setDEXThrow] = useState(false); //DexteritySaving Throw
    const onDEXThrowChange = (e) => {
        setDEXThrow(e.target.checked);
    };
    const [CONThrow, setCONThrow] = useState(false); //Constituion Saving Throw
    const onCONThrowChange = (e) => {
        setCONThrow(e.target.checked);
    };
    const [INTThrow, setINTThrow] = useState(false); //Intelligence Saving Throw
    const onINTThrowChange = (e) => {
        setINTThrow(e.target.checked);
    };
    const [WISThrow, setWISThrow] = useState(false); //Wisdom Saving Throw
    const onWISThrowChange = (e) => {
        setWISThrow(e.target.checked);
    };
    const [CHAThrow, setCHAThrow] = useState(false); //Charisma Saving Throw
    const onCHAThrowChange = (e) => {
        setCHAThrow(e.target.checked);
    };
    function SavingThrowsInput() {
        return (
            <BasicCon margin={2.5} content={
                <>
                    <h3>Saving Throws: </h3>
                    <div className="btn-group-vertical" data-toggle="buttons" style={{ width: '100%' }}>
                        <label className='btn btn-outline-dark' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input
                                type="checkbox"
                                autoComplete="off"
                                checked={STRThrow}
                                onChange={onSTRThrowChange}
                            /> STR <ModifierText stat={STR} prof={STRThrow} />
                        </label>
                        <label className='btn btn-outline-dark' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input
                                type="checkbox"
                                autoComplete="off"
                                checked={DEXThrow}
                                onChange={onDEXThrowChange}
                            /> DEX <ModifierText stat={DEX} prof={DEXThrow} />
                        </label>
                        <label className='btn btn-outline-dark' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input
                                type="checkbox"
                                autoComplete="off"
                                checked={CONThrow}
                                onChange={onCONThrowChange}
                            /> CON <ModifierText stat={CON} prof={CONThrow} />
                        </label>
                        <label className='btn btn-outline-dark' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input
                                type="checkbox"
                                autoComplete="off"
                                checked={INTThrow}
                                onChange={onINTThrowChange}
                            /> INT <ModifierText stat={INT} prof={INTThrow} />
                        </label>
                        <label className='btn btn-outline-dark' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input
                                type="checkbox"
                                autoComplete="off"
                                checked={WISThrow}
                                onChange={onWISThrowChange}
                            /> WIS <ModifierText stat={WIS} prof={WISThrow} />
                        </label>
                        <label className='btn btn-outline-dark' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input
                                type="checkbox"
                                autoComplete="off"
                                checked={CHAThrow}
                                onChange={onCHAThrowChange}
                            /> CHA <ModifierText stat={CHA} prof={CHAThrow} />
                        </label>
                    </div>
                </>
            } />
        );
    }

    // Actions
    const [actions, setActions] = useState([]); // Array with objects that describe actions
    const [actionType, setActionType] = useState(''); //Action type
    const onActionTypeChange = (e) => {
        setActionType(e.target.value);
    }
    function onAddAction(actionData) {
        setActions(prevActions => [...prevActions, actionData]);
        // Clear Actions Fields
        resetActions();
    }
    function ActionsInput() {
        return (
            <>
                <BasicCon margin={2.5} content={
                    <>
                        <h3>Add Actions:</h3>
                        <SideBySide content={
                            <>
                                <h4>Action type:</h4>
                                <select id="actionType" value={actionType} onChange={onActionTypeChange}>
                                    <option value="">Choose...</option>
                                    <option value="Attack">Attack</option>
                                    <option value="Spell">Spell</option>
                                    <option value="Legendary">Legendary</option>
                                    <option value="Other">Other</option>
                                </select>
                            </>
                        } />
                        {actionType === 'Attack' ? (
                            <AttackInput onAddAttack={onAddAttack} />
                        ) : null}
                        {actionType === 'Spell' ? (
                            <SpellInput onAddSpell={onAddSpell} />
                        ) : null}
                        {actionType === 'Other' ? (
                            <OtherActionInput onAddAction={onAddAction} />
                        ) : null}


                        {actions.length >= 1 ? (
                            <>
                                <HorizLine />
                                <DisplayActions />
                            </>
                        ) : (<></>)}
                    </>
                } />
            </>
        );
    }
    function DisplayActions() {
        return (
            <div>
                {actions.map((action, index) => (
                    <SideBySide key={index} content={<>{index + 1}. {action}</>} />
                ))}
            </div>
        );
    }

    // Attacks
    function onAddAttack(attackData) {
        setActions(prevActions => [...prevActions, attackData]);
        // Clear Actions Fields
        resetActions();
    }

    // Spells
    function onAddSpell(spellData) {
        setActions(prevActions => [...prevActions, spellData]);
        // Clear Actions Fields
        resetActions();
    }

    // General Info
    const [generalInfo, setGeneralInfo] = useState({});
    function onAddGeneralInfo(infoData) {
        setGeneralInfo(infoData);
    }

    // Languages
    const [languages, setLanguages] = useState([]);
    function onAddLanguage(language) {
        setLanguages(prevLanguages => [...prevLanguages, language]);
    }

    // Senses
    const [senseValue, setSenseValue] = useState('');
    const onSenseValueChange = (e) => {
        setSenseValue(e.target.value);
    }
    const [senseRange, setSenseRange] = useState('5');
    const onSenseRangeChange = (e) => {
        setSenseRange(e.target.value);
    }
    const [senses, setSenses] = useState([]);
    function onSensesChange() {
        let senseString = senseValue + ' ' + senseRange + 'ft.';
        setSenses(prevSenses => [...prevSenses, senseString]);
        setSenseRange('');
        setSenseValue('');
    }
    function DisplaySenses() {
        return (
            <div>
                {senses.map((item, index) => (
                    <SideBySide key={index} content={<>{index + 1}. {item}</>} />
                ))}
            </div>
        );
    }
    function SensesInput() {
        return (
            <BasicCon margin={2.5} content={
                <>
                    <SideBySide content={
                        <>
                            <h4>Add Sense: </h4>
                            <select id="sense" value={senseValue} onChange={onSenseValueChange}>
                                <option value="">Choose...</option>
                                <option value="Blindsight">Blindsight</option>
                                <option value="Darkvision">Darkvision</option>
                                <option value="Tremorsense">Tremorsense</option>
                                <option value="Truesight">Truesight</option>
                            </select>
                            <h5>Range: </h5>
                            <input
                                type="number"
                                step='5'
                                min='5'
                                value={senseRange}
                                onChange={onSenseRangeChange}
                                placeholder="..."
                                className="form-control"
                                style={{ maxWidth: '75px' }}
                            />
                            <h5>ft.</h5>
                            <button className='btn btn-success' onClick={onSensesChange}>Add</button>
                        </>
                    } />
                    <DisplaySenses />
                </>
            } />
        );
    }

    // Image
    const [imgUrl, setImgUrl] = useState(''); // Image url
    const onImgUrlChange = (e) => {
        setImgUrl(e.target.value);
    }
    function ImageInput() {
        return (
            <BasicCon margin={2.5} content={
                <>
                    <h5>Monster Image Url: </h5>
                    <input
                        type="text"
                        value={imgUrl}
                        onChange={onImgUrlChange}
                        placeholder="Image link"
                        className="form-control"
                        style={{ maxWidth: '400px' }}
                    />
                    <p style={{ maxWidth: '250px' }}>Images can only be added via url due to the limitations of browser local storage.</p>
                    <p style={{ maxWidth: '250px' }}>It's easier if you copy/paste.</p>
                    <p style={{ maxWidth: '250px' }}>Preview:</p>
                    {imgUrl !== '' ?
                        <img src={imgUrl !== '' ? imgUrl : null} className='img-fluid rounded' style={{ maxHeight: '270px', maxWidth: '250px' }} />
                        : <p><em>(none)</em></p>
                    }
                </>
            } />
        );
    }

    // Note
    const [note, setNote] = useState('');

    // JSON Input
    const [jsonInput, setJsonInput] = useState('');
    function onJsonAdd() {
        const data = JSON.parse(jsonInput);
        saveMonsterData(data);
    }

    // Util functions
    function getMod(statNum, bonus = 0) {
        switch (parseInt(statNum)) {
            case 0:
            case 1:
                return (-5 + parseInt(bonus));
            case 2:
            case 3:
                return (-4 + parseInt(bonus));
            case 4:
            case 5:
                return (-3 + parseInt(bonus));
            case 6:
            case 7:
                return (-2 + parseInt(bonus));
            case 8:
            case 9:
                return (-1 + parseInt(bonus));
            case 10:
            case 11:
                return (0 + parseInt(bonus));
            case 12:
            case 13:
                return (1 + parseInt(bonus));
            case 14:
            case 15:
                return (2 + parseInt(bonus));
            case 16:
            case 17:
                return (3 + parseInt(bonus));
            case 18:
            case 19:
                return (4 + parseInt(bonus));
            case 20:
            case 21:
                return (5 + parseInt(bonus));
            case 22:
            case 23:
                return (6 + parseInt(bonus));
            case 24:
            case 25:
                return (7 + parseInt(bonus));
            case 26:
            case 27:
                return (8 + parseInt(bonus));
            case 28:
            case 29:
                return (9 + parseInt(bonus));
            case 30:
            default:
                return (10 + parseInt(bonus));
        }
    }

    function ModifierText({ stat, prof = false }) {
        const modifier = getMod(stat, (prof ? parseInt(profBonus) : 0));

        const getColor = (mod) => {
            if (mod > 0) {
                return ('green');
            }
            else if (mod === 0) {
                return ('black');
            }
            else if (mod < 0) {
                return ('red');
            }
        }

        return (<p style={{ color: getColor(modifier), textAlign: 'center', margin: '0px' }}>{modifier >= 0 ? ('+' + modifier) : (modifier)}</p>);
    }

    const resetActions = () => {
        // Reset Action fields
        setActionType('');
    };

    function handleReload() {
        onReload();
    }

    function saveMonsterData(data = null) {
        const monsterData = {};
        console.log('saveMonsterData called with:', data);
        console.log('typeof data:', typeof data);
        console.log('Boolean(data):', Boolean(data));

        if (data) {

            // General Info
            monsterData['name'] = (data.name);
            monsterData['level'] = data.level;
            monsterData['meta'] = (
                (data?.race ? (data.race) : '') +
                (data?.class ? (' ' + data.class) : '') +
                (data?.alignment ? (', ' + data.alignment) : '')
            );
            monsterData['xp'] = data.xp;
            monsterData['isMonster'] = false;

            // Stats
            monsterData['STR'] = data.STR;
            monsterData['STR_mod'] = ('(' + (getMod(data.STR) >= 0 ? ('+' + getMod(data.STR)) : getMod(data.STR)) + ')');
            monsterData['DEX'] = data.DEX;
            monsterData['DEX_mod'] = ('(' + (getMod(data.DEX) >= 0 ? ('+' + getMod(data.DEX)) : getMod(data.DEX)) + ')');
            monsterData['CON'] = data.CON;
            monsterData['CON_mod'] = ('(' + (getMod(data.CON) >= 0 ? ('+' + getMod(data.CON)) : getMod(data.CON)) + ')');
            monsterData['INT'] = data.INT;
            monsterData['INT_mod'] = ('(' + (getMod(data.INT) >= 0 ? ('+' + getMod(data.INT)) : getMod(data.INT)) + ')');
            monsterData['WIS'] = data.WIS;
            monsterData['WIS_mod'] = ('(' + (getMod(data.WIS) >= 0 ? ('+' + getMod(data.WIS)) : getMod(data.WIS)) + ')');
            monsterData['CHA'] = data.CHA;
            monsterData['CHA_mod'] = ('(' + (getMod(data.CHA) >= 0 ? ('+' + getMod(data.CHA)) : getMod(data.CHA)) + ')');

            // Combat
            monsterData['profBonus'] = data.profBonus;
            monsterData['hp'] = data.hp;
            monsterData['ac'] = data.ac;
            monsterData['initBonus'] = data.initBonus;
            monsterData['Speed'] = (data.speed + 'ft.');

            // Skills
            monsterData['Skills'] = (
                (Acrobatics ? ('Acrobatics +(' + getMod(data.DEX, data.profBonus).toString() + '), ') : '') +
                (AnimalHandling ? ('Animal Handling +(' + getMod(data.WIS, data.profBonus).toString() + '), ') : '') +
                (Arcana ? ('Arcana +(' + getMod(data.INT, data.profBonus).toString() + '), ') : '') +
                (Athletics ? ('Athletics +(' + getMod(data.STR, data.profBonus).toString() + '), ') : '') +
                (Deception ? ('Deception +(' + getMod(data.CHA, data.profBonus).toString() + '), ') : '') +
                (History ? ('History +(' + getMod(data.INT, data.profBonus).toString() + '), ') : '') +
                (Insight ? ('Insight +(' + getMod(data.WIS, data.profBonus).toString() + '), ') : '') +
                (Intimidation ? ('Intimidation +(' + getMod(data.CHA, data.profBonus).toString() + '), ') : '') +
                (Investigation ? ('Investigation +(' + getMod(data.INT, data.profBonus).toString() + '), ') : '') +
                (Medicine ? ('Medicine +(' + getMod(data.WIS, data.profBonus).toString() + '), ') : '') +
                (Nature ? ('Nature +(' + getMod(data.INT, data.profBonus).toString() + '), ') : '') +
                (Perception ? ('Perception +(' + getMod(data.WIS, data.profBonus).toString() + '), ') : '') +
                (Persuasion ? ('Persuasion +(' + getMod(data.CHA, data.profBonus).toString() + '), ') : '') +
                (Religion ? ('Religion +(' + getMod(data.INT, data.profBonus).toString() + '), ') : '') +
                (SleightOfHand ? ('Sleight of Hand +(' + getMod(data.DEX, data.profBonus).toString() + '), ') : '') +
                (Stealth ? ('Stealth +(' + getMod(data.DEX, data.profBonus).toString() + '), ') : '') +
                (Survival ? ('Survival +(' + getMod(data.WIS, data.profBonus).toString() + ')') : '')
            );

            // Saving Throws
            monsterData["Saving Throws"] = (
                (STRThrow ? ('STR +(' + getMod(data.STR, data.profBonus).toString() + '), ') : '') +
                (DEXThrow ? ('DEX +(' + getMod(data.DEX, data.profBonus).toString() + '), ') : '') +
                (CONThrow ? ('CON +(' + getMod(data.CON, data.profBonus).toString() + '), ') : '') +
                (INTThrow ? ('INT +(' + getMod(data.INT, data.profBonus).toString() + '), ') : '') +
                (WISThrow ? ('WIS +(' + getMod(data.WIS, data.profBonus).toString() + '), ') : '') +
                (CHAThrow ? ('CHA +(' + getMod(data.CHA, data.profBonus).toString() + ')') : '')
            );

            // Actions
            monsterData["Actions"] = data.Actions

            // Languages
            monsterData['Languages'] = data.Languages;

            // Senses
            monsterData["Senses"] = data.Senses;

            // Image
            monsterData['img_url'] = data['img_url'];

            // Note
            monsterData['note'] = data.note;

            // Save to local storage
            storage.saveMonster(monsterData);
            onReload();
            return null;
        }


        // General Info
        monsterData['name'] = generalInfo.name;
        monsterData['level'] = generalInfo.level;
        monsterData['meta'] = (
            (generalInfo?.race ? (generalInfo.race) : '') +
            (generalInfo?.class ? (' ' + generalInfo.class) : '') +
            (generalInfo?.alignment ? (', ' + generalInfo.alignment) : '')
        );
        monsterData['xp'] = generalInfo.xp;
        monsterData['isMonster'] = true;

        // Stats
        monsterData['STR'] = STR;
        monsterData['STR_mod'] = ('(' + (getMod(STR) >= 0 ? ('+' + getMod(STR)) : getMod(STR)) + ')');
        monsterData['DEX'] = DEX;
        monsterData['DEX_mod'] = ('(' + (getMod(DEX) >= 0 ? ('+' + getMod(DEX)) : getMod(DEX)) + ')');
        monsterData['CON'] = CON;
        monsterData['CON_mod'] = ('(' + (getMod(CON) >= 0 ? ('+' + getMod(CON)) : getMod(CON)) + ')');
        monsterData['INT'] = INT;
        monsterData['INT_mod'] = ('(' + (getMod(INT) >= 0 ? ('+' + getMod(INT)) : getMod(INT)) + ')');
        monsterData['WIS'] = WIS;
        monsterData['WIS_mod'] = ('(' + (getMod(WIS) >= 0 ? ('+' + getMod(WIS)) : getMod(WIS)) + ')');
        monsterData['CHA'] = CHA;
        monsterData['CHA_mod'] = ('(' + (getMod(CHA) >= 0 ? ('+' + getMod(CHA)) : getMod(CHA)) + ')');

        // Combat
        monsterData['profBonus'] = profBonus;
        monsterData['hp'] = (hpFlat + ' (' + hpNumOfDice + 'd' + hpDice + '+ ' + hpMod + ')')
        monsterData['ac'] = ac;
        monsterData['initBonus'] = initBonus;
        monsterData['Speed'] = (speed + 'ft.');

        // Skills
        monsterData['Skills'] = (
            (Acrobatics ? ('Acrobatics +(' + getMod(DEX, profBonus).toString() + '), ') : '') +
            (AnimalHandling ? ('Animal Handling +(' + getMod(WIS, profBonus).toString() + '), ') : '') +
            (Arcana ? ('Arcana +(' + getMod(INT, profBonus).toString() + '), ') : '') +
            (Athletics ? ('Athletics +(' + getMod(STR, profBonus).toString() + '), ') : '') +
            (Deception ? ('Deception +(' + getMod(CHA, profBonus).toString() + '), ') : '') +
            (History ? ('History +(' + getMod(INT, profBonus).toString() + '), ') : '') +
            (Insight ? ('Insight +(' + getMod(WIS, profBonus).toString() + '), ') : '') +
            (Intimidation ? ('Intimidation +(' + getMod(CHA, profBonus).toString() + '), ') : '') +
            (Investigation ? ('Investigation +(' + getMod(INT, profBonus).toString() + '), ') : '') +
            (Medicine ? ('Medicine +(' + getMod(WIS, profBonus).toString() + '), ') : '') +
            (Nature ? ('Nature +(' + getMod(INT, profBonus).toString() + '), ') : '') +
            (Perception ? ('Perception +(' + getMod(WIS, profBonus).toString() + '), ') : '') +
            (Persuasion ? ('Persuasion +(' + getMod(CHA, profBonus).toString() + '), ') : '') +
            (Religion ? ('Religion +(' + getMod(INT, profBonus).toString() + '), ') : '') +
            (SleightOfHand ? ('Sleight of Hand +(' + getMod(DEX, profBonus).toString() + '), ') : '') +
            (Stealth ? ('Stealth +(' + getMod(DEX, profBonus).toString() + '), ') : '') +
            (Survival ? ('Survival +(' + getMod(WIS, profBonus).toString() + ')') : '')
        );

        // Saving Throws
        monsterData["Saving Throws"] = (
            (STRThrow ? ('STR +(' + getMod(STR, profBonus).toString() + '), ') : '') +
            (DEXThrow ? ('DEX +(' + getMod(DEX, profBonus).toString() + '), ') : '') +
            (CONThrow ? ('CON +(' + getMod(CON, profBonus).toString() + '), ') : '') +
            (INTThrow ? ('INT +(' + getMod(INT, profBonus).toString() + '), ') : '') +
            (WISThrow ? ('WIS +(' + getMod(WIS, profBonus).toString() + '), ') : '') +
            (CHAThrow ? ('CHA +(' + getMod(CHA, profBonus).toString() + ')') : '')
        ).replace(/,+$/, "");

        // Actions
        monsterData["Actions"] = actions.map(element => ReactDOMServer.renderToStaticMarkup(element)).join('');

        // Languages
        let langString = languages.join(', ');
        monsterData['Languages'] = langString;

        // Senses
        let sensesString = senses.join(', ');
        sensesString = sensesString + ', Passive Perception ' + (Perception ? (parseInt(WIS) + parseInt(profBonus)) : WIS);
        monsterData["Senses"] = sensesString;

        // Image
        monsterData['img_url'] = imgUrl;

        // Note
        monsterData['note'] = note;

        // Save to local storage
        storage.saveMonster(monsterData);
        onReload();
    }

    // Body
    return (
        <div className='monster-input'>
            <div className='row' style={{ display: 'grid', gridTemplateColumns: '1fr auto' }}>

                <div className='col'>
                    <SideBySide gap={20} content={
                        <>
                            <h2>Add Monster</h2>
                            <h4><strong><em>Make sure all data is correct before adding. You <span style={{ color: 'red' }}>cannot</span> change it later.</em></strong></h4>
                        </>
                    } />

                    <SideBySide gap={3} content={
                        <>

                            <p>All data is added automatically except fields with 'Add' in their title. You muse click the respective 'Add' button to properly add it.</p>
                            <p>Monsters will be stored in your system's local storage.</p>
                        </>
                    } />
                </div>

                <div className='col' style={{ alignContent: 'center' }}>
                    <button
                        className='btn btn-success'
                        style={{ margin: '5px' }}
                        onClick={() => saveMonsterData()}
                    >
                        Add Monster
                    </button>
                    <button
                        className='btn btn-danger'
                        style={{ margin: '5px' }}
                        onClick={handleReload}
                    >
                        Clear All
                    </button>
                </div>

            </div>

            <div className='row'>
                <HorizLine />
            </div>

            <div className='row'>
                <div className='custom-grid'>
                    {/* 1st column */}
                    <div className='col' style={{ margin: '2.5px' }}>
                        <GeneralInfoinput onAddGeneralInfo={onAddGeneralInfo} />
                        <StatsInputTable />
                        <LanguageInput data={languages} onAddLanguage={onAddLanguage} />
                        <NoteInput value={note} onChange={setNote} />
                    </div>
                    {/* 2nd column */}
                    <div className='col' style={{ margin: '2.5px' }}>
                        <SideBySide gap={0} content={
                            <>
                                <CombatInfoInput />
                                <SavingThrowsInput />
                            </>
                        } />
                        <ActionsInput />
                        <SensesInput />
                        <div style={{ margin: '10px' }}>
                            <HorizLine thickness={5} />
                        </div>
                        <JsonInput value={jsonInput} onChange={setJsonInput} onAdd={onJsonAdd} />
                    </div>
                    {/* 3rd column */}
                    <div className='col' style={{ margin: '2.5px' }}>
                        <SkillsInput />
                        <ImageInput />
                    </div>
                </div>
            </div>
        </div>
    );
}

function AddMonster() {
    // Page Title
    useEffect(() => {
        document.title = "Add Monster";
    }, []);

    // Page reload
    const [reloadKey, setReloadKey] = useState(0);
    function handleReload() {
        setReloadKey(prevKey => prevKey + 1);
    }

    // Data Retrieval 
    const [monsters, setMonsters] = useState(null);
    // Sync with localStorage on mount/reload
    useEffect(() => {
        const data = storage.retrieve('monsterData');
        if (data) {
            setMonsters(data.monsters);
            console.log("AddMonster.js: 'monsterData' retrieved. Data: ");
            tools.prettyLog(monsters, 'Monster Data');
        }
        else setMonsters(null);
    }, [reloadKey]); // Re-run when reloadKey changes


    function DisplayMonsters() {
        return (
            <div>
                {monsters.map((monster, index) => (
                    <SideBySide key={index} content={
                        <MonsterCard data={monster} />
                    } />
                ))}
            </div>
        );
    }

    return (
        <div className='monster-data-page'>
            <MonsterInput onReload={handleReload} key={reloadKey} />
            {monsters !== null ?
                <DisplayMonsters />
                : null
            }
        </div>
    );
}

export default AddMonster;