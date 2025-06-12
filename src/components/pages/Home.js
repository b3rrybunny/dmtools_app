// Modules ------------------------------------------------------------------
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

// Custom -------------------------------------------------------------------
// Elements
import BasicCon from "../basic/BasicContainer";
import SideBySide from "../basic/SideBySide";
// Assets
import witch_img from '../../assets/witch.png';
import swords_img from '../../assets/sword.png';
import wolf_img from '../../assets/wolf.png';
import camel_img from '../../assets/camel.png';

function Home() {
  // On Mount
  useEffect(() => {
    document.title = "DMTools Home";
    const animateElements = async () => {
      setIsWelcomeVis(true);
      await sleep(200);
      setIsCombatVis(true);
      await sleep(200);
      setIsTravelVis(true);
      await sleep(200);
      setIsCharVis(true);
      await sleep(200);
      setIsMonsterVis(true);
      await sleep(200);
      setIsDataVis(true);
    };
    animateElements();



  }, []);

  // Vis control
  const [isWelcomeVis, setIsWelcomeVis] = useState(false);
  const [ isCombatVis, setIsCombatVis ] = useState(false);
  const [ isTravelVis, setIsTravelVis ] = useState(false);
  const [ isCharVis, setIsCharVis ] = useState(false);
  const [ isMonsterVis, setIsMonsterVis ] = useState(false);
  const [ isDataVis, setIsDataVis ] = useState(false);

  // Helper functions
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <div className="center-screen">
      <div>
        <div className={"row" + (isWelcomeVis ? ' fade-drop-in' : ' fade-drop-in-initial')} style={{justifyContent: 'center'}}>
          <BasicCon content={
            <h3>Welcome to DMTools! Select an option to get started.</h3>
          } />
        </div>
        <div className="row">
          <div className={'col' + (isCombatVis ? ' fade-drop-in' : ' fade-drop-in-initial')}>
            <Link className='nav-link' to='/CombatManager'>
              <BasicCon margin={5} content={
                <>
                  <SideBySide content={
                    <>
                      <img src={swords_img} style={{
                        maxWidth: '150px',
                        width: '150px',
                        maxHeight: '150px',
                        height: '150px',
                        margin: '25px',
                        display: 'block',
                        objectFit: 'contain'
                      }} />
                      <div style={{
                        height: '170px',
                        width: '310px',
                        padding: '5px',
                        textAlign: 'left',
                        alignContent: 'center'
                      }}>
                        <h3><u><strong>Combat Manager</strong></u></h3>
                        <h4>A simble combat tracker with options for both standard and custom characters and monsters.</h4>
                      </div>
                    </>
                  } />
                </>
              } />
            </Link>
          </div>
          <div className={'col' + (isTravelVis ? ' fade-drop-in' : ' fade-drop-in-initial')}>
            <Link className='nav-link' to='/TravelManager'>
              <BasicCon margin={5} content={
                <>
                  <SideBySide content={
                    <>
                      <img src={camel_img} style={{
                        maxWidth: '150px',
                        width: '150px',
                        maxHeight: '150px',
                        height: '150px',
                        margin: '25px',
                        display: 'block',
                        objectFit: 'contain'
                      }} />
                      <div style={{
                        height: '170px',
                        width: '310px',
                        padding: '5px',
                        textAlign: 'left',
                        alignContent: 'center'
                      }}>
                        <h3><u><strong>Travel Manager</strong></u></h3>
                        <h4>A tool that lets you define encounters and track your party's movement along a route.</h4>
                      </div>
                    </>
                  } />
                </>
              } />
            </Link>
          </div>
        </div>
        <div className="row">
          <div className={'col' + (isCharVis ? ' fade-drop-in' : ' fade-drop-in-initial')}>
            <Link className='nav-link' to='/AddCharacter'>
              <BasicCon margin={5} content={
                <>
                  <SideBySide content={
                    <>
                      <img src={witch_img} style={{
                        maxWidth: '150px',
                        width: '150px',
                        maxHeight: '150px',
                        height: '150px',
                        margin: '25px',
                        display: 'block',
                        objectFit: 'contain'
                      }} />
                      <div style={{
                        height: '170px',
                        width: '310px',
                        padding: '5px',
                        textAlign: 'left',
                        alignContent: 'center'
                      }}>
                        <h3><u><strong>Add a Custom Character</strong></u></h3>
                        <h4>Add a player or nonplayer character for use in the other tools, or just to keep track of character info.</h4>
                      </div>
                    </>
                  } />
                </>
              } />
            </Link>
          </div>
          <div className={'col' + (isMonsterVis ? ' fade-drop-in' : ' fade-drop-in-initial')}>
            <Link className='nav-link' to='/AddMonster'>
              <BasicCon margin={5} content={
                <>
                  <SideBySide content={
                    <>
                      <img src={wolf_img} style={{
                        maxWidth: '150px',
                        width: '150px',
                        maxHeight: '150px',
                        height: '150px',
                        margin: '25px',
                        display: 'block',
                        objectFit: 'contain'
                      }} />
                      <div style={{
                        height: '170px',
                        width: '310px',
                        padding: '5px',
                        textAlign: 'left',
                        alignContent: 'center'
                      }}>
                        <h3><u><strong>Add a Custom Monster</strong></u></h3>
                        <h4>Add a monster for use in the other tools, or just to keep track of homebrew monster info.</h4>
                      </div>
                    </>
                  } />
                </>
              } />
            </Link>
          </div>
        </div>
      </div>


    </div>
  );
}

export default Home;