// Modules ------------------------------------------------------------------
import { useState, useEffect } from 'react';

// Custom -------------------------------------------------------------------
// Elements
import HorizLine from '../HorizontalLine';
import SideBySide from '../SideBySide';
import BasicCon from '../BasicContainer';
// Scripts
import * as tools from '../../../scripts/tools';

function CombatInfoInput({ data, onChange }) {
    // Data
    const [ HP, setHP ] = useState(1);
    const [ HPNumOfDice, setHPNumOfDice ] = useState(1);
    const [ HPDiceType, setHPDiceType ] = useState(4);
    const [ HPFlatMod, setHPFlatMod ] = useState(0);
    const [ AC, setAC ] = useState(0);
    const [ armorType, setArmorType ] = useState('unarmored');
    const [ hasShield, setHasShield ] = useState(false);
    const [ initBonus, setInitBonus ] = useState(0);
    const [ initBonusOverride, setInitBonusOverride ] = useState(false);
    const [ speed, setSpeed ] = useState(30);

    // Data control
    const [ armorTypeOverride, setArmorTypeOverride ] = useState(false);

    // #region Update functions ------------------
    // General update (when rawData updates)
    useEffect(() => {
        if (armorTypeOverride === false) {
            setAC(10 + tools.getStatMod(data.DEX) + tools.getArmorMod(armorType) + (hasShield ? 2 : 0));
        }
        if (initBonusOverride === false) {
            setInitBonus(tools.getStatMod(data.DEX));
        }
    }, [ data, initBonusOverride, armorTypeOverride ])
    // #endregion

    // #region Data relay ------------------------
    function compileData() {
        const compiled = {};
        if (data.type === 'player' || data.type === 'npc') {
            compiled.HP = HP;
        }
        else {
            compiled.HPNumOfDice = HPNumOfDice;
            compiled.HPDiceType = HPDiceType;
            compiled.HPFlatMod = HPFlatMod;
        }
        compiled.AC = AC;
        compiled.armorType = armorType;
        compiled.hasShield = hasShield;
        compiled.initBonus = initBonus;
        compiled.speed = speed;
        return compiled;
    }
    useEffect(() => {
        onChange(compileData());
    }, [
        HP,
        HPNumOfDice,
        HPDiceType,
        HPFlatMod,
        AC,
        armorType,
        hasShield,
        initBonus,
        speed
    ]);
    // #endregion

    return (
        <BasicCon margin={0} content={
            <>
                <h3>Combat Stats</h3>
                <HorizLine />
                <div className='row g-1'>
                    <div className='col-8'>
                        <div className='input-group mb-1'>
                            <span className='input-group-text'>Hit Points</span>
                            {data.type === 'monster' ?
                                <>
                                    <input
                                        type='number'
                                        min='1'
                                        value={HPNumOfDice}
                                        onChange={(e) => setHPNumOfDice(Number(e.target.value))}
                                        className='form-control'
                                    ></input>
                                    <span className='input-group-text'>d</span>
                                    <input
                                        type='number'
                                        min='1'
                                        max='20'
                                        value={HPDiceType}
                                        onChange={(e) => setHPDiceType(Number(e.target.value))}
                                        className='form-control'
                                    ></input>
                                    <span className='input-group-text'>+</span>
                                    <input
                                        type='number'
                                        min='0'
                                        value={HPFlatMod}
                                        onChange={(e) => setHPFlatMod(Number(e.target.value))}
                                        className='form-control'
                                    ></input>
                                </>
                                : <>
                                    <input
                                        type='number'
                                        min='1'
                                        value={HP}
                                        onChange={(e) => setHP(Number(e.target.value))}
                                        className='form-control'
                                    ></input>
                                </>
                            }
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='input-group'>
                            <span className='input-group-text'>Speed</span>
                            <input
                                type='number'
                                min='0'
                                step='5'
                                value={speed}
                                onChange={(e) => setSpeed(Number(e.target.value))}
                                className='form-control'
                            ></input>
                            <span className='input-group-text'>ft.</span>
                        </div>
                    </div>
                </div>
                <div className='row g-1'>
                    <div className='col-12'>
                        <div className='input-group mb-1'>
                            <span className='input-group-text'>Armor Class</span>
                            <input
                                disabled={!armorTypeOverride}
                                type='number'
                                min='1'
                                value={AC}
                                onChange={(e) => setAC(Number(e.target.value))}
                                className='form-control'
                            ></input>
                            <span className={'input-group-text ' + (armorTypeOverride ? 'bg-danger' : 'bg-danger-subtle')}>
                                <input
                                    type='checkbox'
                                    checked={armorTypeOverride}
                                    onChange={(e) => setArmorTypeOverride(e.target.checked)}
                                    className='form-check-input me-1'
                                />
                                {armorTypeOverride ? 'Overriding AC adjustments' : 'Override AC adjustments? (DEX, armor type)'}
                            </span>
                        </div>
                        <div className='input-group mb-1'>
                            <span className='input-group-text'>Armor Type</span>
                            <select value={armorType} onChange={(e) => setArmorType(e.target.value)} className='form-select'>
                                <option value='unarmored'>None</option>
                                {data.type === 'monster' ?
                                    <option value='natural'>Natural</option>
                                    : null
                                }
                                <option value='padded'>Padded</option>
                                <option value='leather'>Leather</option>
                                <option value='studded-leather'>Studded Leather</option>
                                <option value='hide'>Hide</option>
                                <option value='chain-shirt'>Chain Shirt</option>
                                <option value='scale-mail'>Scale Mail</option>
                                <option value='breastplate'>Breastplate</option>
                                <option value='half-plate'>Half Plate</option>
                                <option value='ring-mail'>Ring Mail</option>
                                <option value='chain-mail'>Chain Mail</option>
                                <option value='splint'>Splint</option>
                                <option value='plate'>Plate</option>
                            </select>
                            <span className={'input-group-text ' + (hasShield ? 'bg-success text-light' : 'bg-success-subtle')}>
                                <input
                                    type='checkbox'
                                    checked={hasShield}
                                    onChange={(e) => setHasShield(e.target.checked)}
                                    className='form-check-input me-1'
                                />
                                Shield?
                            </span>
                        </div>
                    </div>
                </div>
                <div className='row g-1'>
                    <div className='col-12'>
                        <div className='input-group mb-1'>
                            <span className='input-group-text'>Initiative Bonus</span>
                            <span className='input-group-text p-0' style={{maxWidth: '75px'}}>
                                {initBonus > 0 ? '+ ' : ''}
                                <input
                                    disabled={!initBonusOverride}
                                    type='number'
                                    value={initBonus}
                                    onChange={(e) => setInitBonus(Number(e.target.value))}
                                    className='form-control rounded-0 border-0'
                                ></input>
                            </span>
                            <span className={'input-group-text flex-fill ' + (initBonusOverride ? 'bg-danger' : 'bg-danger-subtle')}>
                                <input
                                    type='checkbox'
                                    checked={initBonusOverride}
                                    onChange={(e) => setInitBonusOverride(e.target.checked)}
                                    className='form-check-input me-1'
                                />
                                {initBonusOverride ? 'Overriding DEX initiative bonus' : 'Override DEX initiative bonus?'}
                            </span>

                        </div>
                    </div>
                </div>

            </>
        } />
    );
}

export default CombatInfoInput;