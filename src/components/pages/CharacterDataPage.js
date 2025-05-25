// Modules ------------------------------------------------------------------
import * as bootstrap from 'bootstrap';
import { useState, useEffect, useRef } from 'react';


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




function CharacterInput() {
    // General Info
    const [name, setName] = useState(''); //Name
    const onNameChange = (e) => {
        setName(e.target.value);
    }
    const [chrClass, setChrClass] = useState(''); //Class
    const onChrClassChange = (e) => {
        setChrClass(e.target.value);
    }
    const [level, setLevel] = useState('1'); //Level
    const onLevelChange = (e) => {
        setLevel(e.target.value);
    }
    const [race, setRace] = useState(''); //Race
    const onRaceChange = (e) => {
        setRace(e.target.value);
    }
    const [alignment, setAlignment] = useState(''); //Alignment
    const onAlignmentChange = (e) => {
        setAlignment(e.target.value);
    }
    const [xp, setXp] = useState(''); //Experience Points
    const onXpChange = (e) => {
        setXp(e.target.value);
    }

    // Stats
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
    const [profBonus, setProfBonus] = useState('1'); //Proficiency Bonus
    const onProfBonusChange = (e) => {
        setProfBonus(e.target.value);
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

    function StatsInputTable() {
        return (
            <>
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
                </div>
                <div className="btn-group-vertical" data-toggle="buttons">
                    <label className='btn btn-outline-dark' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <input
                            type="checkbox"
                            autoComplete="off"
                            checked={DEXThrow}
                            onChange={onDEXThrowChange}
                        /> DEX <ModifierText stat={DEX} prof={DEXThrow} />
                    </label>
                </div>
                <div className="btn-group-vertical" data-toggle="buttons">
                    <label className='btn btn-outline-dark' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <input
                            type="checkbox"
                            autoComplete="off"
                            checked={CONThrow}
                            onChange={onCONThrowChange}
                        /> CON <ModifierText stat={CON} prof={CONThrow} />
                    </label>
                </div>
                <div className="btn-group-vertical" data-toggle="buttons">
                    <label className='btn btn-outline-dark' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <input
                            type="checkbox"
                            autoComplete="off"
                            checked={INTThrow}
                            onChange={onINTThrowChange}
                        /> INT <ModifierText stat={INT} prof={INTThrow} />
                    </label>
                </div>
                <div className="btn-group-vertical" data-toggle="buttons">
                    <label className='btn btn-outline-dark' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <input
                            type="checkbox"
                            autoComplete="off"
                            checked={WISThrow}
                            onChange={onWISThrowChange}
                        /> WIS <ModifierText stat={WIS} prof={WISThrow} />
                    </label>
                </div>
                <div className="btn-group-vertical" data-toggle="buttons">
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

    function GeneralInfoinput() {
        return (
            <>
                <div className='basic-container'>
                    <SideBySide content={
                        <>
                            <h4>Name: </h4>
                            <input
                                type="text"
                                value={name}
                                onChange={onNameChange}
                                placeholder="'Izalith the Stinky'"
                                className="form-control"
                                style={{ width: '300px' }}
                            />
                        </>
                    } />
                </div>
                <div className='basic-container'>
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
                </div>
                <div className='basic-container'>
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
                                style={{ width: '100px' }}
                            />
                        </>
                    } />
                </div>
                <div className='basic-container'>
                    <SideBySide content={
                        <>
                            <h4>Race: </h4>
                            <input
                                type="text"
                                value={race}
                                onChange={onRaceChange}
                                placeholder="'Wood Elf'"
                                className="form-control"
                                style={{ width: '200px' }}
                            />
                        </>
                    } />
                </div>
                <div className='basic-container'>
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
                </div>
                <div className='basic-container'>
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
                                style={{ width: '100px' }}
                            />
                        </>
                    } />
                </div>
            </>
        )
    }

    function CombatInfoInput() {
        return (
            <>
                {/* HP */}
                <SideBySide content={
                    <>
                        <HPBlock hp={hp} onChange={handleHPChange} />
                        <ACBlock ac={ac} onChange={handleACChange} />
                    </>
                } />
                {/* Init, Speed */}
                <SideBySide content={
                    <>
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
                                        style={{ width: '100px' }}
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
                                        style={{ width: '100px' }}
                                    />
                                </>
                            } />
                        </div>
                    </>
                } />
            </>
        )
    }

    return (
        <div className='character-input'>
            <h2>Add Character</h2>
            <HorizLine />
            <div className='row'>
                <div className='col'>
                   <GeneralInfoinput/>
                   <StatsInputTable/>
                </div>
                {/* Skills */}
                <div className=''>
                    <SideBySide content={
                        <>
                            <SkillsInput />
                            <div>
                                <SavingThrowsInput />
                            </div>

                        </>
                    } />

                </div>
                <div className='col'>

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