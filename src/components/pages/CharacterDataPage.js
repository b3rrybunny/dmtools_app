// Modules ------------------------------------------------------------------
import * as bootstrap from 'bootstrap';
import { useState, useEffect, useRef, memo } from 'react';


// Custom -------------------------------------------------------------------
// Elements / Scripts
import HPBlock from '../basic/HPBlock';
import ACBlock from '../basic/ACBlock';
import HorizLine from '../basic/HorizontalLine';
import SideBySide from '../basic/SideBySide';
import * as tools from '../tools';
import * as dice from '../../scripts/dice';
// Data
import rawMonstersData from '../../data/srd_5e_monsters.json';
// CSS / Assets
import '../../css/CharacterDataPage.css';
import player_character from '../../assets/player_character.png';
import NPC_img from '../../assets/NPC.png';


function AttackInput({ onAddAttack }) {
    console.log('AttackInput rendering');
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
            attackTargets + (attackTargets > 1 ? 'targets. ' : 'target. ')
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
        )

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
    }
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
                        style={{ maxWidth: '100px' }}
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
                        style={{ maxWidth: '100px' }}
                    />
                    <h4># of targets: </h4>
                    <input
                        type="number"
                        min='1'
                        value={attackTargets}
                        onChange={onAttackTargetsChange}
                        placeholder="..."
                        className="form-control"
                        style={{ maxWidth: '100px' }}
                    />
                </>
            } />
            <SideBySide gap={0} content={
                <>
                    <h4>Damage: </h4>
                    <input
                        type="number"
                        min='1'
                        value={attackNumOfDice}
                        onChange={onAttackNumOfDiceChange}
                        placeholder="..."
                        className="form-control"
                        style={{ maxWidth: '100px' }}
                    />
                    <h5>d</h5>
                    <input
                        type="number"
                        min='4'
                        value={attackDice}
                        onChange={onAttackDiceChange}
                        placeholder="..."
                        className="form-control"
                        style={{ maxWidth: '100px' }}
                    />
                    <h5>{attackDamageMod < 0 ? '-' : '+'}</h5>
                    <input
                        type="number"
                        value={attackDamageMod}
                        onChange={onAttackDamageModChange}
                        placeholder="..."
                        className="form-control"
                        style={{ maxWidth: '100px' }}
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
                        <SideBySide content={
                            <>
                                <h5>Damage: </h5>
                                <input
                                    type="number"
                                    min='1'
                                    value={attackAddlNumOfDice}
                                    onChange={onAttackAddlNumOfDiceChange}
                                    placeholder="..."
                                    className="form-control"
                                    style={{ maxWidth: '100px' }}
                                />
                                <h5>d</h5>
                                <input
                                    type="number"
                                    min='4'
                                    value={attackAddlDice}
                                    onChange={onAttackAddlDiceChange}
                                    placeholder="..."
                                    className="form-control"
                                    style={{ maxWidth: '100px' }}
                                />
                                <h5>{attackAddlDamageMod < 0 ? '' : '+'}</h5>
                                <input
                                    type="number"
                                    value={attackAddlDamageMod}
                                    onChange={onAttackAddlDamageModChange}
                                    placeholder="..."
                                    className="form-control"
                                    style={{ maxWidth: '100px' }}
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
            <button
                className='btn btn-success'
                onClick={handleAddAttack}
                style={{ width: '100%' }}
            >Add Attack
            </button>
        </>
    );
}

function OtherActionInput({ onAddAction }) {
    const [actionName, setActionName] = useState(''); //Action name
    const onActionNameChange = (e) => {
        setActionName(e.target.value);
    }
    return (
        <>
            <SideBySide content={
                <>

                </>
            } />
        </>
    );
}

function GeneralInfoinput({ onAddGeneralInfo }) {
    // General Info
    const [name, setName] = useState(''); //Name
    const onNameChange = (e) => {
        setName(e.target.value);
        handleAddGeneralInfo();
    }
    const [chrClass, setChrClass] = useState(''); //Class
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
    const [xp, setXp] = useState(''); //Experience Points
    const onXpChange = (e) => {
        setXp(e.target.value);
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
            <div className='basic-container'>
                <h3>General Info:</h3>
                <SideBySide content={
                    <>
                        <h4>Name: </h4>
                        <input
                            type="text"
                            value={name}
                            onChange={onNameChange}
                            placeholder="'Izalith the Stinky'"
                            className="form-control"
                            style={{ maxWidth: '300px' }}
                        />
                    </>
                } />
                <SideBySide content={
                    <>
                        <h4>Class: </h4>
                        <select id="class" value={chrClass} onChange={onChrClassChange}>
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
                            style={{ maxWidth: '100px' }}
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
                            placeholder="'Wood Elf'"
                            className="form-control"
                            style={{ maxWidth: '200px' }}
                        />
                    </>
                } />
                <SideBySide content={
                    <>
                        <h4>Alignment: </h4>
                        <select id="alignment" value={alignment} onChange={onAlignmentChange}>
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
                            value={xp}
                            onChange={onXpChange}
                            placeholder="..."
                            className="form-control"
                            style={{ maxWidth: '100px' }}
                        />
                    </>
                } />
            </div>
        </>
    )
}

function CharacterInput() {
    // Stats
    const [profBonus, setProfBonus] = useState('2'); //Proficiency Bonus
    const onProfBonusChange = (e) => {
        setProfBonus(e.target.value);
    }
    const [STR, setSTR] = useState('10'); //STR
    const onSTRChange = (e) => {
        setSTR(e.target.value);
    }
    const [DEX, setDEX] = useState('10'); //DEX
    const onDEXChange = (e) => {
        setDEX(e.target.value);
    }
    const [CON, setCON] = useState('10'); //CON
    const onCONChange = (e) => {
        setCON(e.target.value);
    }
    const [INT, setINT] = useState('10'); //INT
    const onINTChange = (e) => {
        setINT(e.target.value);
    }
    const [WIS, setWIS] = useState('10'); //WIS
    const onWISChange = (e) => {
        setWIS(e.target.value);
    }
    const [CHA, setCHA] = useState('10'); //CHA
    const onCHAChange = (e) => {
        setCHA(e.target.value);
    }
    const [hp, setHp] = useState('10'); //Hit Points
    const onHpChange = (e) => {
        setHp(e.target.value);
    }
    const handleHPChange = (mod) => {
        switch (mod) {
            case '+':
                setHp(parseInt(hp) + 1);
                break;
            case '-':
                setHp(parseInt(hp) - 1);
                break;
        }
    }
    const [ac, setAc] = useState('10'); //Armor Class
    const onAcChange = (e) => {
        setAc(e.target.value);
    }
    const handleACChange = (mod) => {
        switch (mod) {
            case '+':
                setAc(parseInt(ac) + 1);
                break;
            case '-':
                setAc(parseInt(ac) - 1);
                break;
        }
    }
    const [initBonus, setInitBonus] = useState('0'); //Initiative Bonus
    const onInitBonusChange = (e) => {
        setInitBonus(e.target.value);
    }
    const [insp, setInsp] = useState('0'); //Inspiration
    const onInspChange = (e) => {
        setInsp(e.target.value);
    }
    const [speed, setSpeed] = useState('30'); //Speed
    const onSpeedChange = (e) => {
        setSpeed(e.target.value);
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

    // Actions
    const [actions, setActions] = useState([]); // Array with objects that describe actions

    const [actionType, setActionType] = useState(''); //Action type
    const onActionTypeChange = (e) => {
        setActionType(e.target.value);
    }


    // Attacks
    function onAddAttack(attackData) {
        setActions(prevActions => [...prevActions, attackData]);
        // Clear Actions and Attack Fields
        resetActions();
    }

    // General Info
    const [generalInfo, setGeneralInfo] = useState({});
    function onAddGeneralInfo (infoData) {
        setGeneralInfo(infoData);
    }

    const resetActions = () => {
        // Reset Action fields
        setActionType('');
    };

    function ModifierText({ stat, prof = false }) {
    let modifier;

    const getColor = (mod) => {
        if (mod > 0) {
            return ('green');
        }
        else if (mod === 0) {
            return ('black');
        }
        else if (mod > 0) {
            return ('red');
        }
    }

    switch (parseInt(stat)) {
        case 0:
            modifier = prof ? -5 + parseInt(profBonus) : -5;
            break;
        case 1:
            modifier = prof ? -5 + parseInt(profBonus) : -5;
            break;
        case 2:
            modifier = prof ? -4 + parseInt(profBonus) : -4;
            break;
        case 3:
            modifier = prof ? -4 + parseInt(profBonus) : -4;
            break;
        case 4:
            modifier = prof ? -3 + parseInt(profBonus) : -3;
            break;
        case 5:
            modifier = prof ? -3 + parseInt(profBonus) : -3;
            break;
        case 6:
            modifier = prof ? -2 + parseInt(profBonus) : -2;
            break;
        case 7:
            modifier = prof ? -2 + parseInt(profBonus) : -2;
            break;
        case 8:
            modifier = prof ? -1 + parseInt(profBonus) : -1;
            break;
        case 9:
            modifier = prof ? -1 + parseInt(profBonus) : -1;
            break;
        case 10:
            modifier = prof ? 0 + parseInt(profBonus) : 0;
            break;
        case 11:
            modifier = prof ? 0 + parseInt(profBonus) : 0;
            break;
        case 12:
            modifier = prof ? 1 + parseInt(profBonus) : 1;
            break;
        case 13:
            modifier = prof ? 1 + parseInt(profBonus) : 1;
            break;
        case 14:
            modifier = prof ? 2 + parseInt(profBonus) : 2;
            break;
        case 15:
            modifier = prof ? 2 + parseInt(profBonus) : 2;
            break;
        case 16:
            modifier = prof ? 3 + parseInt(profBonus) : 3;
            break;
        case 17:
            modifier = prof ? 3 + parseInt(profBonus) : 3;
            break;
        case 18:
            modifier = prof ? 4 + parseInt(profBonus) : 4;
            break;
        case 19:
            modifier = prof ? 4 + parseInt(profBonus) : 4;
            break;
        case 20:
            modifier = prof ? 5 + parseInt(profBonus) : 5;
            break;
    }
    return (<p style={{ color: getColor(modifier), textAlign: 'center', margin: '0px' }}>{modifier > 0 ? ('+' + modifier) : modifier === 0 ? modifier : ('-' + modifier)}</p>);
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

    function StatsInputTable() {
        return (
            <>
                <div className='basic-container'>
                    <h3>Stats: </h3>
                    <table>
                        <tbody>
                            <tr>
                                <td>STR: </td>
                                <td><input
                                    type="number"
                                    min='0'
                                    max='20'
                                    value={STR}
                                    onChange={onSTRChange}
                                    placeholder="..."
                                    className="form-control"
                                    style={{ maxWidth: '100px' }}
                                /></td>
                                <td><ModifierText stat={STR} /></td>
                                <td>DEX: </td>
                                <td><input
                                    type="number"
                                    min='0'
                                    max='20'
                                    value={DEX}
                                    onChange={onDEXChange}
                                    placeholder="..."
                                    className="form-control"
                                    style={{ maxWidth: '100px' }}
                                /></td>
                                <td><ModifierText stat={DEX} /></td>
                            </tr>
                            <tr>
                                <td>CON: </td>
                                <td><input
                                    type="number"
                                    min='0'
                                    max='20'
                                    value={CON}
                                    onChange={onCONChange}
                                    placeholder="..."
                                    className="form-control"
                                    style={{ maxWidth: '100px' }}
                                /></td>
                                <td><ModifierText stat={CON} /></td>
                                <td>INT: </td>
                                <td><input
                                    type="number"
                                    min='0'
                                    max='20'
                                    value={INT}
                                    onChange={onINTChange}
                                    placeholder="..."
                                    className="form-control"
                                    style={{ maxWidth: '100px' }}
                                /></td>
                                <td><ModifierText stat={INT} /></td>
                            </tr>
                            <tr>
                                <td>WIS: </td>
                                <td><input
                                    type="number"
                                    min='0'
                                    max='20'
                                    value={WIS}
                                    onChange={onWISChange}
                                    placeholder="..."
                                    className="form-control"
                                    style={{ maxWidth: '100px' }}
                                /></td>
                                <td><ModifierText stat={WIS} /></td>
                                <td>CHA: </td>
                                <td><input
                                    type="number"
                                    min='0'
                                    max='20'
                                    value={CHA}
                                    onChange={onCHAChange}
                                    placeholder="..."
                                    className="form-control"
                                    style={{ maxWidth: '100px' }}
                                /></td>
                                <td><ModifierText stat={CHA} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
        );
    }

    function SavingThrowsInput() {
        return (
            <div className='basic-container saving-throws'>
                <h3>Saving Throws: </h3>
                <div className="btn-group-vertical" data-toggle="buttons">
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
            </div>
        );
    }

    function SkillsInput() {
        return (
            <div className='basic-container'>
                <h3>Skills: </h3>
                <div className="btn-group-vertical" data-toggle="buttons">
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
            </div>
        );
    }

    function CombatInfoInput() {
        return (
            <>
                <div className='basic-container'>
                    <h3>Combat Info:</h3>
                    <HPBlock hp={hp} onChange={handleHPChange} />
                    <ACBlock ac={ac} onChange={handleACChange} />
                    <SideBySide content={
                        <>
                            <h4>Proficiency Bonus: </h4>
                            <input
                                type="number"
                                value={profBonus}
                                onChange={onProfBonusChange}
                                placeholder="..."
                                className="form-control"
                                style={{ maxWidth: '100px' }}
                            />
                        </>
                    } />
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
                                    style={{ maxWidth: '100px' }}
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
                                    style={{ maxWidth: '100px' }}
                                />
                            </>
                        } />
                    </div>
                </div>
            </>
        )
    }

    function ActionsInput() {
        return (
            <>
                <div className='basic-container'>
                    <h3>Actions:</h3>
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


                    {actions.length >= 1 ? (
                        <>
                            <HorizLine />
                            <DisplayActions />
                        </>
                    ) : (<></>)}
                </div>
            </>
        );
    }


    return (
        <div className='character-input'>
            <div className='row'>
                <h2>Add Character</h2>
                <HorizLine />
            </div>

            <div className='row'>
                <div className='custom-grid'>
                    {/* 1st column */}
                    <div className='col' style={{ margin: '2.5px' }}>
                        <GeneralInfoinput onAddGeneralInfo={onAddGeneralInfo} />
                        <StatsInputTable />
                    </div>
                    {/* 2nd column */}
                    <div className='col' style={{ margin: '2.5px' }}>
                        <SideBySide content={
                            <>
                                <CombatInfoInput />
                                <SavingThrowsInput />
                            </>
                        } />
                        <ActionsInput />
                    </div>
                    {/* 3rd column */}
                    <div className='col' style={{ margin: '2.5px' }}>
                        <SkillsInput />
                    </div>



                </div>
            </div>
        </div>
    );
}

function CharacterDataPage() {
    return (
        <div>
            <CharacterInput />
        </div>
    );
}

export default CharacterDataPage;