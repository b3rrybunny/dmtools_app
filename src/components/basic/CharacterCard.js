// Modules ------------------------------------------------------------------
import { useState } from 'react';

// Custom -------------------------------------------------------------------
// Elements
import HorizLine from '../basic/HorizontalLine';
import SideBySide from '../basic/SideBySide';
import BasicCon from '../basic/BasicContainer';
import JsonDisplay from './JsonDisplay';
// Data / Scripts
import * as storage from '../../scripts/storage';
// CSS / Assets
import '../../css/CharacterCard.css';

function DeletePopup({ isOpen, onConfirm, onCancel, charName, charID }) {
    if (!isOpen) return null;

    return (
        <>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999
            }}>
                <div style={{
                    backgroundColor: 'white',
                    padding: '24px',
                    borderRadius: '8px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    maxWidth: '500px',
                    width: '100%',
                    margin: '0 16px',
                    alignContent: 'center'
                }}>
                    <h5 style={{ color: 'red' }}>Delete {charName ? charName : '[INVALID CHAR NAME]'} @ ID:{charID}?</h5>
                    <SideBySide content={
                        <>
                            <button className='btn btn-danger' onClick={onConfirm}>Confirm</button>
                            <button className='btn btn-secondary' onClick={onCancel}>Nevermind</button>
                        </>
                    } />
                </div>
            </div>
        </>
    );
}

function EditPopup({ isOpen, onConfirm, onCancel, data }) {
    const [ editData, setEditData ] = useState(data);
    const handleJsonChange = (input) => {
        setEditData(input);
    };
    const [ saveable, setSaveable ] = useState(true);
    const onValidChange = (val) => {
        setSaveable(val);
    };
    const handleConfirm = () => {
        onConfirm(editData);
    };

    if (!isOpen) return null;
    return (
        <>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999
            }}>
                <div style={{
                    backgroundColor: 'white',
                    padding: '2px',
                    borderRadius: '8px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    maxWidth: '500px',
                    width: '100%',
                    margin: '0 5px',
                    alignContent: 'center'
                }}>
                    <h5 style={{ color: 'blue' }}>Editing {data.name ? data.name : '[INVALID CHAR NAME]'} @ ID: {data.ID}</h5>
                    <JsonDisplay
                        jsonData={editData}
                        editable={true}
                        onChange={handleJsonChange}
                        onValidChange={onValidChange}
                    />
                    <SideBySide content={
                        <>
                            <button
                                className='btn btn-danger'
                                onClick={handleConfirm}
                                disabled={!saveable === false ? false : true}
                            >
                                Confirm & save
                            </button>
                            <button
                                className='btn btn-secondary'
                                onClick={onCancel}
                            >
                                Nevermind
                            </button>
                        </>
                    } />
                </div>
            </div>
        </>
    );
}

function CharacterCard({ data, fireReload }) {
    // Vis control
    const [ isVisible, setIsVisible ] = useState(true);
    const destroySelf = () => setIsVisible(false);

    // Delete popup
    const [ isDeleteOpen, setIsDeleteOpen ] = useState(false);
    const openDeletePopup = () => setIsDeleteOpen(true);
    const onDeletePopupClosed = () => setIsDeleteOpen(false);
    const onDelete = () => {
        onDeletePopupClosed();
        storage.eraseChar(data.ID);
        fireReload();
    };

    // Edit popup
    const [ isEditOpen, setIsEditOpen ] = useState(false);
    const openEditPopup = () => setIsEditOpen(true);
    const onEditPopupClosed = () => setIsEditOpen(false);
    const onEdit = (newData) => {
        onEditPopupClosed();
        storage.saveChar(newData, newData.ID);
        fireReload();
    }

    // Util functions
    function getModifier(stat) {
        const numericStat = Number(stat); // Converts strings to numbers (e.g., "18" → 18)
        if (isNaN(numericStat)) return "(Invalid)"; // Fallback for non-numbers

        const modifier = Math.floor((numericStat - 10) / 2);
        return modifier >= 0 ? `(+${modifier})` : `(${modifier})`;
    }
    function ModifierText({ modifier }) {
        if (modifier[ 1 ] === "+") {
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

    // Buttons
    const [ isCopied, setIsCopied ] = useState(false);
    function copyJson() {
        const string = JSON.stringify(data);
        const copyToClipboard = () => {
            navigator.clipboard.writeText(string)
                .then(() => {
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 5000); // Reset after 5 seconds
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        };
        copyToClipboard();
    }



    if (!isVisible) return null;
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
                        <SideBySide content={
                            <>
                                <button className='btn btn-primary' onClick={copyJson}>{isCopied ? 'Copied!' : 'Copy character JSON to clipboard'}</button>
                                <button className='btn btn-success' onClick={openEditPopup}>Edit character JSON</button>
                                <button className='btn btn-danger' onClick={openDeletePopup}>Delete Character</button>
                            </>
                        } />


                    </div>
                    <HorizLine />
                    {/* Body */}
                    <div className='row' style={{ width: '100%', display: 'grid', gridTemplateColumns: 'auto 1fr 1fr' }}>
                        <div className='col' style={{ alignContent: 'center' }}>
                            <img src={data.img_url !== '' ? data.img_url : null} className='img-fluid rounded' style={{ maxWidth: '250px', border: '2px solid black' }} />
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
                                    <h5>Saving Throws: {data[ 'Saving Throws' ]}</h5>
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
                            <p style={{ textAlign: 'left' }}><strong>Note:</strong> {data.note}</p>

                        </div>
                        <div className='col'>
                            <BasicCon content={
                                <>
                                    <h5>Actions:</h5>
                                    <div
                                        dangerouslySetInnerHTML={{ __html: data[ 'Actions' ] }}
                                        style={{ justifyContent: 'left', textAlign: 'left' }}
                                    />
                                </>
                            } />
                        </div>
                    </div>
                    <DeletePopup
                        isOpen={isDeleteOpen}
                        onConfirm={onDelete}
                        onCancel={onDeletePopupClosed}
                        charName={data.name}
                        charID={data.ID}
                    />
                    <EditPopup
                        isOpen={isEditOpen}
                        onConfirm={onEdit}
                        onCancel={onEditPopupClosed}
                        data={data}
                    />
                </>
            } />
        </div>
    );
}

export default CharacterCard;