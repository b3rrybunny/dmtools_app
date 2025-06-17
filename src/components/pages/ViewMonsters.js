// Modules ------------------------------------------------------------------
import { useState, useEffect, useRef, memo } from 'react';
import { Link } from 'react-router-dom';

// Custom -------------------------------------------------------------------
// Elements
import BasicCon from '../basic/BasicContainer';
import HorizLine from '../basic/HorizontalLine';
import SideBySide from '../basic/SideBySide';
import MonsterCard from '../basic/MonsterCard';
// Data / Scripts
import * as tools from '../../scripts/tools';
import * as storage from '../../scripts/storage';


function ViewMonsters() {
    // Page Title
    useEffect(() => {
        document.title = "View Monsters";
    }, []);

    // Reload key
    const [ reloadKey, setReloadKey ] = useState(0);
    function handleReload() {
        setReloadKey(prevKey => prevKey + 1);
    }

    // Data Retrieval 
    const [ monsters, setMonsters ] = useState(null);
    // Sync with localStorage on mount/reload
    useEffect(() => {
        const data = storage.retrieve('monsterData');
        if (data) {
            setMonsters(data.monsters);
            tools.prettyLog(data, 'Monster Data');
        }
        else setMonsters(null);
    }, [ reloadKey ]); // Re-run when reloadKey changes

    // Display monsteracters function
    function DisplayMonsters() {
        return (
            <div>
                {monsters.map((monster, index) => (
                    <SideBySide key={index} content={
                        <MonsterCard
                            data={monster}
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
                    <h2>View Custom Monsters</h2>
                    <HorizLine />
                    <h5>Here you can view your custom monsters.</h5>
                    <Link to='/AddMonster'>
                        <button className='btn btn-success'>Click here to add a monster.</button>
                    </Link>
                </>
            } />
            <HorizLine />
            {monsters !== null ?
                <DisplayMonsters />
                : <BasicCon margin={7} content={
                    <h3>No monsters to display. Make one <Link to='/AddMonster'>here.</Link></h3>
                } />
            }
        </div>
    );
}

export default ViewMonsters;