// Modules ------------------------------------------------------------------
import { useState, useEffect } from 'react';

// Custom -------------------------------------------------------------------
// Elements
import HorizLine from '../HorizontalLine';
import SideBySide from '../SideBySide';
import BasicCon from '../BasicContainer';

function BasicInfoInput({ data, onChange }) {

    const [ name, setName ] = useState(data.name || '');
    const [ race, setRace ] = useState(data.race || '');
    const [ alignment, setAlignment ] = useState(data.alignment || '');
    const [ charClass, setCharClass ] = useState(data.class || ''); //Char
    const [ level, setLevel ] = useState(data.level || 1); //Char
    const [ XP, setXP ] = useState(data.XP || 0); //Char
    const [ challenge, setChallenge ] = useState(data.challenge || 0); //Monster

    function compileData() {
        const compiled = {};
        if (data.type === 'player') {
            compiled.name = name;
            compiled.race = race;
            compiled.alignment = alignment;
            compiled.charClass = charClass;
            compiled.level = level;
            compiled.XP = XP;
        }
        else if (data.type === 'npc') {
            compiled.name = name;
            compiled.race = race;
            compiled.alignment = alignment;
            compiled.charClass = charClass;
            compiled.level = level;
        }
        else if (data.type === 'monster') {
            compiled.name = name;
            compiled.race = race;
            compiled.alignment = alignment;
            compiled.challenge = challenge;
        }
        else {
            compiled.name = name;
            compiled.race = race;
            compiled.alignment = alignment;
            compiled.charClass = charClass;
            compiled.level = level;
            compiled.XP = XP;
            compiled.challenge = challenge;
        }
        return compiled;
    }

    useEffect(() => {
        console.log('Sending data');
        onChange(compileData());
    }, [
        name,
        race,
        alignment,
        charClass,
        level,
        XP,
        challenge
    ]);

    return (
        <>
            <BasicCon margin={0} content={
                <>
                    <h3>Basic Info</h3>
                    <HorizLine />
                    <div className='row g-1 mb-1'>
                        <div className='col-4'>
                            <div className='input-group'>
                                <span className='input-group-text'>Name</span>
                                <input
                                    type='text'
                                    placeholder='Izalith the Stinky'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='form-control'
                                ></input>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='input-group'>
                                <span className='input-group-text'>Race</span>
                                <input
                                    type='text'
                                    placeholder='Wood Elf'
                                    value={race}
                                    onChange={(e) => setRace(e.target.value)}
                                    className='form-control text-primary'
                                ></input>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='input-group'>
                                <label className='input-group-text'>Alignment</label>
                                <select value={alignment} onChange={(e) => setAlignment(e.target.value)} className='form-select' id='alignment'>
                                    <option value=''>Choose...</option>
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
                            </div>
                        </div>
                    </div>
                    {data.type === 'player' || data.type === 'npc' ?
                        <div className='row g-1 mb-1'>
                            <div className='col-4'>
                                <div className='input-group'>
                                    <span className='input-group-text'>Class</span>
                                    <select value={charClass} onChange={(e) => setCharClass(e.target.value)} id="class" className='form-select'>
                                        <option value="Generic">No Class</option>
                                        <option value="Barbarian">Barbarian</option>
                                        <option value="Bard">Bard</option>
                                        <option value="Cleric">Cleric</option>
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
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className='input-group'>
                                    <span className='input-group-text'>Level</span>
                                    <input
                                        type='number'
                                        min='1'
                                        max='20'
                                        value={level}
                                        onChange={(e) => setLevel(Number(e.target.value))}
                                        className='form-control'
                                    ></input>
                                </div>
                            </div>
                            {data.type === 'player' ?
                                <div className='col-4'>
                                    <div className='input-group'>
                                        <span className='input-group-text'>XP</span>
                                        <input
                                            type='number'
                                            min='0'
                                            step='10'
                                            value={XP}
                                            onChange={(e) => setXP(Number(e.target.value))}
                                            className='form-control'
                                        ></input>
                                    </div>
                                </div>
                                : null
                            }
                        </div>
                        : null
                    }
                    {data.type === 'monster' ?
                        <div className='row g-1'>
                            <div className='col-2'>
                                <div className='input-group'>
                                    <span className='input-group-text'>Challenge rating</span>
                                    <input
                                        type='number'
                                        min='0'
                                        max='30'
                                        value={challenge}
                                        onChange={(e) => setChallenge(Number(e.target.value))}
                                        className='form-control'
                                    ></input>
                                </div>
                            </div>
                        </div>
                        : null
                    }
                </>
            } />
        </>
    );
}

export default BasicInfoInput;