// Modules ------------------------------------------------------------------
import { useState, useEffect } from 'react';

// Custom -------------------------------------------------------------------
// Elements
import HorizLine from '../HorizontalLine';
import SideBySide from '../SideBySide';
import BasicCon from '../BasicContainer';
// Scripts
import * as tools from '../../../scripts/tools';

function StatsInput({ data, onChange, bgColor = 'rgba(255, 255, 255, 0.616)' }) {

    const [ STR, setSTR ] = useState(10);
    const [ DEX, setDEX ] = useState(10);
    const [ CON, setCON ] = useState(10);
    const [ INT, setINT ] = useState(10);
    const [ WIS, setWIS ] = useState(10);
    const [ CHA, setCHA ] = useState(10);

    function compileData() {
        const compiled = {};
        compiled.STR = STR;
        compiled.DEX = DEX;
        compiled.CON = CON;
        compiled.INT = INT;
        compiled.WIS = WIS;
        compiled.CHA = CHA;
        return compiled;
    }

    useEffect(() => {
        onChange(compileData())
    }, [ STR, DEX, CON, INT, WIS, CHA ])

    return (
        <BasicCon bgColor={bgColor} margin={0} width='fit-content' content={
            <>
                <h3>Stats</h3>
                <HorizLine />
                <div className='row g-1'>
                    <div className='col'>
                        <div className='input-group'>
                            <span className='input-group-text font-monospace rounded-tl rounded-bottom-0 bg-dark text-white'>STR</span>
                            <input
                                type='number'
                                min='1'
                                max='20'
                                value={STR}
                                onChange={(e) => setSTR(Number(e.target.value))}
                                className='form-control'
                            ></input>
                            <span className='input-group-text font-monospace rounded-tr rounded-bottom-0'>{tools.getModifierTextEl(STR)}</span>
                        </div>
                        <div className='input-group'>
                            <span className='input-group-text font-monospace rounded-0 bg-dark text-white'>DEX</span>
                            <input
                                type='number'
                                min='1'
                                max='20'
                                value={DEX}
                                onChange={(e) => setDEX(Number(e.target.value))}
                                className='form-control'
                            ></input>
                            <span className='input-group-text font-monospace rounded-0 '>{tools.getModifierTextEl(DEX)}</span>
                        </div>
                        <div className='input-group'>
                            <span className='input-group-text font-monospace rounded-0 bg-dark text-white'>CON</span>
                            <input
                                type='number'
                                min='1'
                                max='20'
                                value={CON}
                                onChange={(e) => setCON(Number(e.target.value))}
                                className='form-control'
                            ></input>
                            <span className='input-group-text font-monospace rounded-0'>{tools.getModifierTextEl(CON)}</span>
                        </div>
                        <div className='input-group'>
                            <span className='input-group-text font-monospace rounded-0 bg-dark text-white'>INT</span>
                            <input
                                type='number'
                                min='1'
                                max='20'
                                value={INT}
                                onChange={(e) => setINT(Number(e.target.value))}
                                className='form-control'
                            ></input>
                            <span className='input-group-text font-monospace rounded-0'>{tools.getModifierTextEl(INT)}</span>
                        </div>
                        <div className='input-group'>
                            <span className='input-group-text font-monospace rounded-0 bg-dark text-white'>WIS</span>
                            <input
                                type='number'
                                min='1'
                                max='20'
                                value={WIS}
                                onChange={(e) => setWIS(Number(e.target.value))}
                                className='form-control'
                            ></input>
                            <span className='input-group-text rounded-0'>{tools.getModifierTextEl(WIS)}</span>
                        </div>
                        <div className='input-group'>
                            <span className='input-group-text font-monospace rounded-bl rounded-top-0 bg-dark text-white'>CHA</span>
                            <input
                                type='number'
                                min='1'
                                max='20'
                                value={CHA}
                                onChange={(e) => setCHA(Number(e.target.value))}
                                className='form-control'
                            ></input>
                            <span className='input-group-text  font-monospace rounded-br rounded-top-0'>{tools.getModifierTextEl(CHA)}</span>
                        </div>
                    </div>
                </div>
            </>
        } />
    );
}

export default StatsInput;