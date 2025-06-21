// Modules ------------------------------------------------------------------
import { useState, useEffect } from 'react';

// Custom -------------------------------------------------------------------
// Elements
import HorizLine from '../basic/HorizontalLine';
import SideBySide from '../basic/SideBySide';
import BasicCon from '../basic/BasicContainer';
import BasicInfoInput from '../basic/creature_input/BasicInfoInput';
import StatsInput from '../basic/creature_input/StatsInput';
import CombatInfoInput from '../basic/creature_input/CombatInfoInput';
import SkillsInput from '../basic/creature_input/SkillsInput';
import TraitsInput from '../basic/creature_input/TraitsInput';
import NoteInput from '../basic/creature_input/NoteInput';
// Data / Script
import * as tools from '../../scripts/tools';
import * as dice from '../../scripts/dice';
import rawMonstersData from '../../data/srd_5e_monsters.json';
import * as SRDapi from '../../scripts/dndSRD5eapi';
import * as storage from '../../scripts/storage';
// Assets/CSS




function AddCreature() {
  // Master creature object with all data
  const [ master, setMaster ] = useState();
  useEffect(() => {
    console.log('master altered')
    tools.prettyLog(master);
  }, [ master ]);
  // Initial chosen type
  const [ type, setType ] = useState('monster');
  useEffect(() => {
    setMaster({ type: type })
  }, [ type ])

  // #region Child object data with corresponding useEffect statements that update master on change
  const [ basicInfo, setBasicInfo ] = useState({});
  useEffect(() => {
    setMaster(prev => ({
      ...prev,
      ...basicInfo
    }));
  }, [ basicInfo ]);
  const [ stats, setStats ] = useState({});
  useEffect(() => {
    setMaster(prev => ({
      ...prev,
      ...stats
    }));
  }, [ stats ]);
  const [ combatInfo, setCombatInfo ] = useState({});
  useEffect(() => {
    setMaster(prev => ({
      ...prev,
      ...combatInfo
    }));
  }, [ combatInfo ]);
  const [ skills, setSkills ] = useState({});
  useEffect(() => {
    setMaster(prev => ({
      ...prev,
      ...skills
    }));
  }, [ skills ]);
  const [ traits, setTraits ] = useState({});
  useEffect(() => {
    setMaster(prev => ({
      ...prev,
      ...traits
    }));
  }, [ traits ]);
  const [ note, setNote ] = useState({});
  useEffect(() => {
    setMaster(prev => ({
      ...prev,
      ...traits
    }));
  }, [ traits ]);
  // #endregion

  // Vis control
  const [ isTypeChosen, setIsTypeChosen ] = useState(false);
  const [ bgColor, setBgColor ] = useState('rgba(255, 255, 255, 0.616)');
  useEffect(() => {
    switch (type) {
      case 'monster':
        setBgColor('#ffababb8');
        break;
      case 'player':
        setBgColor('#cdffc5b8');
        break;
      case 'npc':
        setBgColor('rgba(197, 210, 255, 0.72)');
        break;
    }
  }, [ isTypeChosen ]);

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: '92.5vh' }}>
      {isTypeChosen ?
        <>
          <div className='row g-1 mt-1 ms-0 me-0'>
            <div className='col'>
              <BasicInfoInput
                data={master}
                onChange={(newData) => setBasicInfo(newData)}
                bgColor={bgColor}
              />
            </div>
            <div className='col-4'>
              <NoteInput
                data={master}
                onChange={(newData) => setNote(newData)}
                bgColor={bgColor}
              />
            </div>
          </div>
          <div className='row g-1 mt-1 ms-0 me-0' style={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr'}}>
            <div className='col'>
              <StatsInput
                data={master}
                onChange={(newData) => setStats(newData)}
                bgColor={bgColor}
              />
            </div>
            <div className='col'>
              <SkillsInput
                data={master}
                onChange={(newData) => setSkills(newData)}
                bgColor={bgColor}
              />
            </div>
            <div className='col'>
              <TraitsInput
                data={master}
                onChange={(newData) => setTraits(newData)}
                bgColor={bgColor}
              />
            </div>
          </div>
          <div className='row g-1 mt-1 ms-0 me-0' style={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr' }}>
            <div className='col'>
              <CombatInfoInput
                data={master}
                onChange={(newData) => setCombatInfo(newData)}
                bgColor={bgColor}
              />
            </div>

          </div>
        </>
        : <div className='center-screen fade-drop-in'>
          <BasicCon content={
            <>
              <h1 style={{ textAlign: 'center' }}>Welcome to the creature creator!</h1>
              <h3 style={{ textAlign: 'center' }}>Select a type to get started.</h3>
              <div className='input-group'>
                <span className='input-group-text bg-dark text-white'>Type</span>
                <select value={type} onChange={(e) => setType(e.target.value)} className='form-select'>
                  <option value='monster'>Monster</option>
                  <option value='player'>Player character</option>
                  <option value='npc'>NPC</option>
                </select>
                <button className='btn btn-success' onClick={() => setIsTypeChosen(true)}>Start</button>
              </div>
            </>
          } />
        </div>
      }


    </div>
  );
}




function Testing({ data }) {
  // Page Title
  useEffect(() => {
    document.title = "Test Page";
  }, []);

  return (
    <AddCreature />
  );
}

export default Testing;