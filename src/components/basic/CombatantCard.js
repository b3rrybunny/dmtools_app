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
import * as tools from '../../scripts/tools';
import * as dice from '../../scripts/dice';
// Data
import rawMonstersData from '../../data/srd_5e_monsters.json';
import * as SRDapi from '../../scripts/dndSRD5eapi';
import * as storage from '../../scripts/storage';
// Assets/CSS
import '../../css/CombatantCard.css';

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

function CombatantCard({ data, isActive, index }) {
    // Proxy values
    const [proxyHP, setProxyHP] = useState(0);
    // Initialize the proxy value only once on mount
    useEffect(() => {
        setProxyHP((data?.rolledHP ? data.rolledHP : data.hp));
    }, []); // Empty dependency array means this runs once on mount

    // Buttons
    const proxyHPUp = () => {
        setProxyHP(proxyHP + 1);
    }
    const proxyHPDown = () => {
        setProxyHP(proxyHP - 1);
    }

    return (
        <div className={'card mb-3 ' + (
            data?.isPlayer ? 'player-card' : //player card style
                data?.isNPC ? 'npc-card' : //npc cards style
                    'monster-card' //default (monster) style
        ) + (
                isActive ? ' active' : //Active combatant
                    ' inactive' //Nonactive combatant
            ) + (
                proxyHP <= 0 ? ' danger' : '' //HP below 0 applies danger bg
            )}>
            <div className='row g-0' style={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }}>
                {/* Image */}
                <div className="col square-container">
                    {data?.img_url ?
                        <img src={data.img_url} className="img-fluid rounded combatant-img" /> :
                        <h2>?</h2>
                    }
                </div>
                {/* Header Info */}
                <div className="col">
                    {/* Index and Name */}
                    <SideBySide justify={'normal'} content={
                        <>
                            <h2 style={{color: 'rgb(220, 218, 218)'}}><strong>{index}. {data.name}</strong> <sup><small>{data.init}</small></sup></h2>
                            <p style={{color: 'rgb(220, 218, 218)'}}>{data.meta}</p>
                        </>
                    } />
                    
                    {/* HP, AC */}
                    <SideBySide gap={1} content={
                        <>
                            <BasicCon content={
                                <SideBySide content={
                                    <>
                                        <h4><strong>❤ HP: </strong></h4>
                                        <button
                                            className='btn btn-outline-dark'
                                            onClick={proxyHPUp}
                                            style={{ minWidth: '35px' }}
                                        ><strong>+</strong></button>
                                        <h4>{proxyHP}</h4>
                                        <button
                                            className='btn btn-outline-dark'
                                            onClick={proxyHPDown}
                                            style={{ minWidth: '35px' }}
                                        ><strong>-</strong></button>
                                    </>
                                } />
                            } />
                            <BasicCon align='center' height={'60.8px'} content={
                                <h5><strong>⛊ AC: </strong>{data['ac']}</h5>
                            } />
                        </>
                    } />
                    {/* Stats Table */}
                    <StatsTable data={data} />
                </div>
            </div>
            {/* Card Body */}
                {data?.["Traits"] ?
                    <BasicCon margin={3} content={
                        <>
                            <h5>Traits:</h5>
                            <div
                                dangerouslySetInnerHTML={{ __html: data['Traits'] }}
                                style={{ justifyContent: 'left', textAlign: 'left' }}
                            />
                        </>
                    } />
                    : null
                }
                {data?.["Actions"] ?
                    <BasicCon margin={3} content={
                        <>
                            <h5>Actions:</h5>
                            <div
                                dangerouslySetInnerHTML={{ __html: data['Actions'] }}
                                style={{ justifyContent: 'left', textAlign: 'left' }}
                            />
                        </>
                    } />
                    : null
                }
                {data?.["Legendary Actions"] ?
                    <BasicCon margin={3} content={
                        <>
                            <h5>Legendary Actions:</h5>
                            <div
                                dangerouslySetInnerHTML={{ __html: data['Legendary Actions'] }}
                                style={{ justifyContent: 'left', textAlign: 'left' }}
                            />
                        </>
                    } />
                    : null
                }
                {/* Combat Relevant Quick Info */}
                <BasicCon margin={3} content={
                    <>
                        {data?.["Saving Throws"] ?
                            <h5><strong>Saving throws: </strong>{data["Saving Throws"]}</h5>
                            : null
                        }
                        {data?.["Skills"] ?
                            <h5><strong>Skills: </strong>{data["Skills"]}</h5>
                            : null
                        }
                        {data?.["Senses"] ?
                            <h5><strong>Senses: </strong>{data["Senses"]}</h5>
                            : null
                        }
                        {data?.["Speed"] ?
                            <h5><strong>Speed: </strong>{data["Speed"]}</h5>
                            : null
                        }
                        {data?.["Damage Immunities"] || data?.["Condition Immunities"] ?
                            <h5><strong>Immunities: </strong>{data["Damage Immunities"] || null} {data["Condition Immunities"] || null}</h5>
                            : null
                        }
                    </>
                } />
                {/* Footer */}
                {data?.note ?
                    <BasicCon margin={3} content={
                        <>
                            <p><strong>Note: </strong>{data.note}</p>
                        </>
                    } />
                    : null
                }
                <BasicCon margin={3} content={
                    <>
                        {data?.["level"] ?
                            <p><strong>Level: </strong>{data["level"]}</p>
                            : null
                        }
                        {data?.["Challenge"] ?
                            <p><strong>Challenge: </strong>{data["Challenge"]}</p>
                            : null
                        }
                        {data?.["Languages"] ?
                            <p><strong>Languages: </strong>{data["Languages"]}</p>
                            : null
                        }
                    </>
                } />

        </div>
    );
}

export default CombatantCard;