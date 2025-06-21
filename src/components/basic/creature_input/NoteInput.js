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

function NoteInput({ data, onChange, bgColor = 'rgba(255, 255, 255, 0.616)' }) {

    const [ note, setNote ] = useState('');

    // #region Data relay
    function compileData() {
        const compiled = {};
        compiled.note = note;
        return compiled;
    }

    useEffect(() => {
        onChange(compileData());
    }, [ note ]);
    // #endregion

    return (
        <BasicCon bgColor={bgColor} content={
            <>
                <h3>Note</h3>
                <HorizLine />
                <textarea
                    className="form-control"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Backstory, visual description, etc."
                    style={{minHeight: '10.5vh'}}
                ></textarea>
            </>
        } />
    );
}

export default NoteInput;