// Modules ------------------------------------------------------------------
import * as bootstrap from 'bootstrap';
import { useState, useEffect, useRef, memo } from 'react';
import ReactDOMServer from 'react-dom/server';


// Custom -------------------------------------------------------------------
// Elements / Scripts
import HPBlock from '../basic/HPBlock';
import ACBlock from '../basic/ACBlock';
import HorizLine from '../basic/HorizontalLine';
import SideBySide from '../basic/SideBySide';
import BasicCon from '../basic/BasicContainer';
import * as tools from '../tools';
import * as dice from '../../scripts/dice';
// Data
import rawMonstersData from '../../data/srd_5e_monsters.json';
import * as SRDapi from '../../scripts/dndSRD5eapi';
import * as storage from '../../scripts/storage';
// CSS / Assets
import '../../css/CharacterCard.css';
import player_character from '../../assets/player_character.png';
import NPC_img from '../../assets/NPC.png';

function CharacterCard({ data }) {

    function getModifier(stat) {
        const numericStat = Number(stat); // Converts strings to numbers (e.g., "18" → 18)
        if (isNaN(numericStat)) return "(Invalid)"; // Fallback for non-numbers

        const modifier = Math.floor((numericStat - 10) / 2);
        return modifier >= 0 ? `(+${modifier})` : `(${modifier})`;
    }

    function ModifierText({ modifier }) {
        if (modifier[1] === "+") {
            return (<p style={{ color: 'green', textAlign: 'center', margin: '0px' }}>{modifier}</p>)
        }
        else {
            return (<p style={{ color: 'red', textAlign: 'center', margin: '0px' }}>{modifier}</p>)
        }
    }

    function StatsTable({ data }) {
        if (data.STR &&
            data.DEX &&
            data.CON &&
            data.INT &&
            data.WIS &&
            data.CHA) {
            return (
                <>
                    <table>
                        <tbody>
                            <tr>
                                <td>STR: </td>
                                <td>{data.STR} </td>
                                <td><ModifierText modifier={data.STR_mod ? data.STR_mod : getModifier(data.STR)} /></td>
                                <td>DEX: </td>
                                <td>{data.DEX} </td>
                                <td><ModifierText modifier={data.DEX_mod ? data.DEX_mod : getModifier(data.DEX)} /></td>
                            </tr>
                            <tr>
                                <td>CON: </td>
                                <td>{data.CON} </td>
                                <td><ModifierText modifier={data.CON_mod ? data.CON_mod : getModifier(data.CON)} /></td>
                                <td>INT: </td>
                                <td>{data.INT} </td>
                                <td><ModifierText modifier={data.INT_mod ? data.INT_mod : getModifier(data.INT)} /></td>
                            </tr>
                            <tr>
                                <td>WIS: </td>
                                <td>{data.WIS} </td>
                                <td><ModifierText modifier={data.WIS_mod ? data.WIS_mod : getModifier(data.WIS)} /></td>
                                <td>CHA: </td>
                                <td>{data.CHA} </td>
                                <td><ModifierText modifier={data.CHA_mod ? data.CHA_mod : getModifier(data.CHA)} /></td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )
        }
        else {
            return (<p>No stats data.</p>)
        }
    }

    return (
        <div className='character-card'>
            <BasicCon content={
                <>
                    {/* Header */}
                    <div className='row' style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr auto' }}>
                        {/* Name, race, class, alignment */}
                        <div className='col'>
                            <SideBySide content={
                                <>
                                    <h2>{data.name}</h2>
                                    <h4>(Lvl. {data.level})</h4>
                                    <h4>{data.meta}</h4>
                                </>
                            } />
                        </div>
                        {/* Buttons */}
                        <div className='col'>

                        </div>
                    </div>
                    <HorizLine />
                    {/* Body */}
                    <div className='row' style={{ width: '100%', display: 'grid', gridTemplateColumns: 'auto 1fr 1fr' }}>
                        <div className='col' style={{ alignContent: 'center' }}>
                            <img src={data.img_url} className='img-fluid rounded' style={{ maxWidth: '250px', border: '2px solid black' }} />
                        </div>
                        <div className='col'>
                            <SideBySide content={
                                <>
                                    <BasicCon content={
                                        <h4>❤ HP: {data.hp}</h4>
                                    } />
                                    <BasicCon content={
                                        <h4>⛊ AC: {data.ac}</h4>
                                    } />

                                </>
                            } />
                            <StatsTable data={data} />
                            <SideBySide content={
                                <>
                                    <BasicCon content={
                                        <h5>Speed: {data.Speed}</h5>
                                    } />
                                    <BasicCon content={
                                        <h5>Proficiency Bonus: +{data.profBonus}</h5>
                                    } />
                                    <BasicCon content={
                                        <h5>Initiative Bonus: +{data.initBonus}</h5>
                                    } />
                                </>
                            } />
                            <SideBySide content={
                                <BasicCon content={
                                    <h5>Saving Throws: {data['Saving Throws']}</h5>
                                } />
                            } />
                            <SideBySide content={
                                <BasicCon content={
                                    <h5>Skills: {data.Skills}</h5>
                                } />
                            } />
                            <SideBySide content={
                                <BasicCon content={
                                    <h5>Senses: {data.Senses}</h5>
                                } />
                            } />
                            <SideBySide content={
                                <BasicCon content={
                                    <h5>Languages: {data.Languages}</h5>
                                } />
                            } />

                            
                        </div>
                        <div className='col'>
                            <BasicCon content={
                                <>
                                    <h5>Actions:</h5>
                                    <div
                                        dangerouslySetInnerHTML={{ __html: data['Actions'] }}
                                        style={{ justifyContent: 'left', textAlign: 'left' }}
                                    />
                                </>
                            } />
                        </div>

                    </div>
                </>
            } />
        </div>
    );
}

export default CharacterCard;