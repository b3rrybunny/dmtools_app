// Modules ------------------------------------------------------------------
import { useState, useEffect, useRef, memo } from 'react';
import { Link } from 'react-router-dom';

// Custom -------------------------------------------------------------------
// Elements
import BasicCon from '../basic/BasicContainer';
import HorizLine from '../basic/HorizontalLine';
import SideBySide from '../basic/SideBySide';
import CharacterCard from '../basic/CharacterCard';
// Data / Scripts
import * as tools from '../../scripts/tools';
import * as storage from '../../scripts/storage';


function ViewCharacters() {
    // Page Title
    useEffect(() => {
        document.title = "View Characters";
    }, []);

    // Reload key
    const [ reloadKey, setReloadKey ] = useState(0);
    function handleReload() {
        setReloadKey(prevKey => prevKey + 1);
    }

    // Data Retrieval 
    const [ chars, setChars ] = useState(null);
    // Sync with localStorage on mount/reload
    useEffect(() => {
        const data = storage.retrieve('charData');
        if (data) {
            setChars(data.chars);
            tools.prettyLog(data, 'Character Data');
        }
        else setChars(null);
    }, [ reloadKey ]); // Re-run when reloadKey changes

    // Display characters function
    function DisplayChars() {
        return (
            <div>
                {chars.map((char, index) => (
                    <SideBySide key={index} content={
                        <CharacterCard
                            data={char}
                            fireReload={handleReload}
                        />
                    } />
                ))}
            </div>
        );
    }

    return (
        <div className='fade-drop-in' style={{overflowY: 'auto', height: '92.5vh'}}>
            <BasicCon margin={5} content={
                <>
                    <h2>View Custom Characters</h2>
                    <HorizLine />
                    <h5>Here you can view your custom characters.</h5>
                    <Link to='/AddCharacter'>
                        <button className='btn btn-success'>Click here to add a character.</button>
                    </Link>
                </>
            } />
            <HorizLine />
            {chars !== null ?
                <DisplayChars />
                : <BasicCon margin={7} content={
                    <h3>No characters to display. Make one <Link to='/AddCharacter'>here.</Link></h3>
                } />
            }
        </div>
    );
}

export default ViewCharacters;