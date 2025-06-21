// Modules ------------------------------------------------------------------
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';


// Custom -------------------------------------------------------------------
// Elements
import HorizLine from '../HorizontalLine';
import SideBySide from '../SideBySide';
import BasicCon from '../BasicContainer';
// Scripts / Data
import * as SRDapi from '../../../scripts/dndSRD5eapi';
import * as tools from '../../../scripts/tools';

function TraitsInput({ data, onChange, bgColor = 'rgba(255, 255, 255, 0.616)' }) {

    const [ traits, setTraits ] = useState([]);
    const [ traitName, setTraitName ] = useState('');
    const [ traitContent, setTraitContent ] = useState('');

    // #region Handle Functions
    const addTrait = () => {
        setTraits(prev => [ ...prev, [traitName, traitContent]]);
        setTraitName('');
        setTraitContent('');
    };
    // #endregion

    // #region Data relay
    function compileData() {
        const compiled = {};
        compiled.traits = traits;
        return compiled;
    }

    useEffect(() => {
        onChange(compileData());
    }, [ traits ]);
    // #endregion

    return (
        <BasicCon bgColor={bgColor} content={
            <>
                <h3>Traits</h3>
                <HorizLine />
                <div className='row g-1'>
                    <div className='col'>
                        <div className='input-group w-100'>
                            <span className='input-group-text rounded-top-left rounded-bottom-0 bg-dark text-white'>Trait</span>
                            <input
                                type="text"
                                value={traitName}
                                onChange={(e) => setTraitName(e.target.value)}
                                placeholder="'Cunning Action'"
                                className="form-control flex-fill"
                            />
                            <button className='btn btn-success rounded-top-right rounded-bottom-0' onClick={addTrait}>Add Trait</button>
                        </div>
                        <div className='bg-light rounded-bottom border border-top-0 border-dark'>
                            <textarea
                                className="form-control"
                                value={traitContent}
                                onChange={(e) => setTraitContent(e.target.value)}
                                rows="3"
                                placeholder="'On each of its turns, the creature can use a bonus action to take the Dash, Disengage, or Hide action.'"
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className='row mt-1 g-1'>
                    <div className='col'>
                        <div className='bg-light rounded border border-dark' style={{overflowY: 'auto', maxHeight: '40vh'}}>
                            {traits.length !== 0 ?
                                <>
                                    <p className='ms-3 mb-0'>Added Traits:</p>
                                    {traits.map((trait) => (
                                        <p className='ms-3 mb-0'>• <strong>{trait[0]}</strong> {trait[1]}</p>
                                    ))}
                                </>
                                : <p className='ms-3 mb-0'>No traits.</p>
                            }
                        </div>
                    </div>
                </div>
            </>
        } />
    );
}

export default TraitsInput;