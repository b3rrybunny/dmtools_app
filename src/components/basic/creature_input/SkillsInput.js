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
const allProficiencyData = await (SRDapi.getAllProficiencies());
const allLanguageData = await (SRDapi.getAllLanguages());

function SkillsInput({ data, onChange, bgColor = 'rgba(255, 255, 255, 0.616)' }) {

    const [ profBonus, setProfBonus ] = useState(2);
    const [ profBonusOverride, setProfBonusOverride ] = useState(false);
    const [ proficiencies, setProficiencies ] = useState([]);
    const [ proficiency, setProficiency ] = useState('');
    const [ savingThrows, setSavingThrows ] = useState([]);
    const [ skills, setSkills ] = useState([]);
    const [ language, setLanguage ] = useState('');
    const [ languages, setLanguages ] = useState('');
    const [ senses, setSenses ] = useState([]);
    const [ sense, setSense ] = useState('');
    const [ senseRange, setSenseRange ] = useState(30);
    const [ spellAbility, setSpellAbility ] = useState('');
    const [ spellOverride, setSpellOverride ] = useState(false);
    const [ spellSaveDC, setSpellSaveDC ] = useState(0);
    const [ spellATKBonus, setSpellATKBonus ] = useState(0);


    // #region Update functions ------------------------------
    // General update (when data updates)
    useEffect(() => {
        if (data.type === 'monster') {
            setProfBonusOverride(true);
            setSpellOverride(true);
        }
        if (profBonusOverride === false && data.type !== 'monster') {
            setProfBonus(tools.getProfBonus(data.level));
        }
        if (spellOverride === false && tools.getSpellcastingAbility(data.charClass) !== null && data.type !== 'monster') {
            const ability = tools.getSpellcastingAbility(data.charClass);
            setSpellAbility(ability);
            setSpellSaveDC(8 + profBonus + tools.getStatMod(data[ ability ]));
            setSpellATKBonus(tools.getStatMod(data[ ability ]) + profBonus);
        }
    }, [ data, profBonusOverride, spellOverride, profBonus ])
    // #endregion

    // #region Data relay ------------------------------------
    function compileData() {
        const compiled = {};
        compiled.savingThrows = savingThrows;
        compiled.skills = skills;
        compiled.languages = languages;
        compiled.profBonus = profBonus;
        compiled.senses = senses;
        if (data.type !== 'monster') {
            compiled.proficiencies = proficiencies;
            if (tools.getSpellcastingAbility(data.charClass) !== null) {
                compiled.spellAbility = spellAbility;
                compiled.spellSaveDC = spellSaveDC;
                compiled.spellATKBonus = spellATKBonus;
            }
        }
        else {
            if (spellAbility !== '') {
                compiled.spellAbility = spellAbility;
                compiled.spellSaveDC = spellSaveDC;
                compiled.spellATKBonus = spellATKBonus;
            }
        }
        return compiled;
    }
    useEffect(() => {
        onChange(compileData());
    }, [
        savingThrows,
        skills,
        languages,
        profBonus,
        senses,
        proficiencies,
        spellAbility,
        spellSaveDC,
        spellATKBonus
    ]);
    // #endregion

    // #region Handle functions ------------------------------
    function handleCheckboxChange(arg) {
        switch (arg) {
            case 'STR':
            case 'DEX':
            case 'CON':
            case 'INT':
            case 'WIS':
            case 'CHA':
                if (savingThrows.includes(arg)) {
                    setSavingThrows(savingThrows.filter((item) => item !== arg));
                }
                else {
                    setSavingThrows(prev => [ ...prev, arg ]);
                }
            default:
                if (skills.includes(arg)) {
                    setSkills(skills.filter((item) => item !== arg));
                }
                else {
                    setSkills(prev => [ ...prev, arg ]);
                }
        }
    }

    function addSense() {
        setSenses(prev => [ ...prev, [ sense, senseRange ] ]);
        setSense('');
        setSenseRange(30);
    }
    // #endregion

    // #region Proficiency Autocomplete ----------------------
    const [ profSuggestions, setProfSuggestions ] = useState([]);
    const [ showProfSuggestions, setShowProfSuggestions ] = useState(false);
    const [ dropdownPositionProf, setDropdownPositionProf ] = useState({ top: 0, left: 0, width: 0 });
    const profInputRef = useRef(null);
    // Button function
    const addProficiency = () => {
        setProficiencies(prev => [ ...prev, proficiency ]);
        setProficiency('');
    }
    // #region Autocomplete functions
    const onProficiencyChange = (e) => {
        const value = e.target.value;
        setProficiency(value);
        if (!value) {
            setProfSuggestions([]);
            setShowProfSuggestions(false);
            return;
        }
        // Filter profSuggestions
        const filtered = allProficiencyData.filter(item =>
            (item.toLowerCase().includes(value.toLowerCase()))
        );
        setProfSuggestions(filtered);
        setShowProfSuggestions(true);
        updateProfDropdownPos();
    };
    const updateProfDropdownPos = () => {
        if (profInputRef.current) {
            const rect = profInputRef.current.getBoundingClientRect();
            setDropdownPositionProf({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width
            });
        }
    };
    const handleProfSuggestionClick = (name) => {
        setProficiency(name);
        setShowProfSuggestions(false);
    };
    const handleProfBlur = () => {
        // Small delay to allow click events to process
        setTimeout(() => setShowProfSuggestions(false), 200);
    };
    const handleProfFocus = () => {
        if (proficiency) {
            setShowProfSuggestions(true);
            updateProfDropdownPos();
        }
    };
    useEffect(() => {
        const handleScroll = () => {
            if (showProfSuggestions) {
                updateProfDropdownPos();
            }
        };

        const handleResize = () => {
            if (showProfSuggestions) {
                updateProfDropdownPos();
            }
        };

        window.addEventListener('scroll', handleScroll, true);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll, true);
            window.removeEventListener('resize', handleResize);
        };
    }, [ showProfSuggestions ]);
    const renderProfDropdown = () => {
        if (!showProfSuggestions || profSuggestions.length === 0) return null;

        // Helper function to highlight matching text
        const highlightMatch = (text, query) => {
            if (!query) return text;

            const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            const parts = text.split(regex);

            return parts.map((part, index) => {
                if (part.toLowerCase() === query.toLowerCase()) {
                    return <strong key={index}>{part}</strong>;
                }
                return part;
            });
        };

        return createPortal(
            <div
                className="autocomplete-items"
                style={{
                    position: 'absolute',
                    zIndex: 999999,
                    top: dropdownPositionProf.top,
                    left: dropdownPositionProf.left,
                    width: dropdownPositionProf.width,
                    border: '1px solid #d4d4d4',
                    borderTop: 'none',
                    backgroundColor: 'white',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
            >
                {profSuggestions.map((item, index) => (
                    <div
                        key={item + index}
                        onClick={() => handleProfSuggestionClick(item)}
                        style={{
                            padding: '10px',
                            cursor: 'pointer',
                            backgroundColor: '#fff',
                            borderBottom: '1px solid #d4d4d4'
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e9e9e9'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#fff'}
                    >
                        <div>
                            {highlightMatch(item, proficiency)}
                        </div>
                    </div>
                ))}
            </div>,
            document.body
        );
    };
    // #endregion
    // #endregion

    // #region Language Autocomplete -------------------------
    const [ langSuggestions, setLangSuggestions ] = useState([]);
    const [ showLangSuggestions, setShowLangSuggestions ] = useState(false);
    const [ dropdownPositionLang, setDropdownPositionLang ] = useState({ top: 0, left: 0, width: 0 });
    const langInputRef = useRef(null);
    // Button function
    const addLanguage = () => {
        setLanguages(prev => [ ...prev, language ]);
        setLanguage('');
    }

    // #region Autocomplete functions
    const onLanguageChange = (e) => {
        const value = e.target.value;
        setLanguage(value);
        if (!value) {
            setLangSuggestions([]);
            setShowLangSuggestions(false);
            return;
        }
        // Filter langSuggestions
        const filtered = allLanguageData.filter(item =>
            (item.name.toLowerCase().includes(value.toLowerCase()))
        );
        setLangSuggestions(filtered);
        setShowLangSuggestions(true);
        updateLangDropdownPos();
    };
    const updateLangDropdownPos = () => {
        if (langInputRef.current) {
            const rect = langInputRef.current.getBoundingClientRect();
            setDropdownPositionLang({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width
            });
        }
    };
    const handleLangSuggestionClick = (name) => {
        setLanguage(name);
        setShowLangSuggestions(false);
    };
    const handleLangBlur = () => {
        // Small delay to allow click events to process
        setTimeout(() => setShowLangSuggestions(false), 200);
    };
    const handleLangFocus = () => {
        if (language) {
            setShowLangSuggestions(true);
            updateLangDropdownPos();
        }
    };
    useEffect(() => {
        const handleScroll = () => {
            if (showLangSuggestions) {
                updateLangDropdownPos();
            }
        };

        const handleResize = () => {
            if (showLangSuggestions) {
                updateLangDropdownPos();
            }
        };

        window.addEventListener('scroll', handleScroll, true);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll, true);
            window.removeEventListener('resize', handleResize);
        };
    }, [ showLangSuggestions ]);
    const renderLangDropdown = () => {
        if (!showLangSuggestions || langSuggestions.length === 0) return null;

        // Helper function to highlight matching text
        const highlightMatch = (text, query) => {
            if (!query) return text;

            const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            const parts = text.split(regex);

            return parts.map((part, index) => {
                if (part.toLowerCase() === query.toLowerCase()) {
                    return <strong key={index}>{part}</strong>;
                }
                return part;
            });
        };

        return createPortal(
            <div
                className="autocomplete-items"
                style={{
                    position: 'absolute',
                    zIndex: 999999,
                    top: dropdownPositionLang.top,
                    left: dropdownPositionLang.left,
                    width: dropdownPositionLang.width,
                    border: '1px solid #d4d4d4',
                    borderTop: 'none',
                    backgroundColor: 'white',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
            >
                {langSuggestions.map((item, index) => (
                    <div
                        key={item.name + index}
                        onClick={() => handleLangSuggestionClick(item.name)}
                        style={{
                            padding: '10px',
                            cursor: 'pointer',
                            backgroundColor: '#fff',
                            borderBottom: '1px solid #d4d4d4'
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e9e9e9'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#fff'}
                    >
                        <div>
                            {highlightMatch(item.name, language)}
                        </div>
                    </div>
                ))}
            </div>,
            document.body
        );
    };
    // #endregion
    // #endregion

    // Component Body ----------------------------------------
    return (
        <BasicCon bgColor={bgColor} content={
            <>
                <h3>Proficiencies & Skills</h3>
                <HorizLine />
                <div className='row g-1 mb-1'>
                    <div className='col-12'>
                        <div className='input-group'>
                            <span className='input-group-text bg-dark text-white'>Proficiency Bonus</span>
                            <span className='input-group-text p-0 flex-fill'>
                                {profBonus > 0 ? <span className='ms-1'>+</span> : null}
                                <input
                                    disabled={!profBonusOverride}
                                    type='number'
                                    value={profBonus}
                                    onChange={(e) => setProfBonus(Number(e.target.value))}
                                    className='form-control rounded-end rounded-start-0 border-0'
                                ></input>
                            </span>
                            {data.type !== 'monster' ?
                                <span className={'input-group-text ' + (profBonusOverride ? 'bg-danger' : 'bg-danger-subtle')}>
                                    <input
                                        type='checkbox'
                                        checked={profBonusOverride}
                                        onChange={(e) => setProfBonusOverride(e.target.checked)}
                                        className='form-check-input me-1'
                                    />
                                    {profBonusOverride ? 'Overriding level proficiency bonus' : 'Override level proficiency bonus?'}
                                </span>
                                : null
                            }
                        </div>
                    </div>
                </div>
                <div className='row g-1 mb-1'>
                    <div className='col'>
                        {data.type === 'player' || data.type === 'npc' ?
                            <>
                                <div className='input-group w-100'>
                                    <span className='input-group-text rounded-top-left rounded-bottom-0 bg-dark text-white'>Proficiencies</span>
                                    <div className="input-group-text rounded-0 p-0 flex-fill" style={{ position: 'relative' }}>
                                        <input
                                            ref={profInputRef}
                                            type="text"
                                            value={proficiency}
                                            onChange={onProficiencyChange}
                                            onFocus={handleProfFocus}
                                            onBlur={handleProfBlur}
                                            placeholder="'Blowguns'"
                                            className="ms-1 me-1 border-0 flex-fill"
                                        />
                                        {renderProfDropdown()}
                                    </div>
                                    <button className='btn btn-success rounded-top-right rounded-bottom-0' onClick={addProficiency}>Add Proficiency</button>
                                </div>
                                <div className='bg-light rounded-bottom border border-top-0 border-dark'>
                                    {proficiencies.length !== 0 ?
                                        <>
                                            <p className='ms-3 mb-0'>Added proficiencies:</p>
                                            {proficiencies.map((prof) => (
                                                <p className='ms-3 mb-0'>• {prof}</p>
                                            ))}
                                        </>
                                        : <p className='ms-3 mb-0'>No proficiencies.</p>
                                    }
                                </div>
                            </>
                            : null
                        }
                    </div>
                </div>
                <div className='row g-1 mb-1' style={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }}>
                    <div className='col'>
                        <div className='input-group w-100'>
                            <span className='input-group-text rounded-top-left rounded-bottom-0 bg-dark text-white'>Languages</span>
                            <div className="input-group-text rounded-0 p-0" style={{ position: 'relative', maxWidth: '110px' }}>
                                <input
                                    ref={langInputRef}
                                    type="text"
                                    value={language}
                                    onChange={onLanguageChange}
                                    onFocus={handleLangFocus}
                                    onBlur={handleLangBlur}
                                    placeholder="'Common'"
                                    className="ms-1 me-1 border-0 w-100"
                                />
                                {renderLangDropdown()}
                            </div>
                            <button className='btn btn-success rounded-top-right rounded-bottom-0' onClick={addLanguage}>Add Language</button>
                        </div>
                        <div className='bg-light rounded-bottom border border-top-0 border-dark'>
                            {languages.length !== 0 ?
                                <>
                                    <p className='ms-3 mb-0'>Added languages:</p>
                                    {languages.map((prof) => (
                                        <p className='ms-3 mb-0'>• {prof}</p>
                                    ))}
                                </>
                                : <p className='ms-3 mb-0'>No languages.</p>
                            }
                        </div>
                    </div>
                    <div className='col'>
                        <div className='input-group w-100'>
                            <span className='input-group-text rounded-top-left rounded-bottom-0 bg-dark text-white'>Senses</span>
                            <input
                                type="text"
                                value={sense}
                                onChange={(e) => setSense(e.target.value)}
                                placeholder="'Darkvision'"
                                className="form-control"
                                style={{ maxWidth: '100px' }}
                            />
                            <span className='input-group-text rounded-0 bg-dark text-white'>Range</span>
                            <input
                                type="number"
                                min='0'
                                step='5'
                                value={senseRange}
                                onChange={(e) => setSenseRange(e.target.value)}
                                className="form-control"
                                style={{ maxWidth: '75px' }}
                            />
                            <span className='input-group-text'>ft.</span>
                            <button className='btn btn-success rounded-top-right rounded-bottom-0' onClick={addSense}>Add Sense</button>
                        </div>
                        <div className='bg-light rounded-bottom border border-top-0 border-dark'>
                            {senses.length !== 0 ?
                                <>
                                    <p className='ms-3 mb-0'>Added senses:</p>
                                    {senses.map((sense) => (
                                        <p className='ms-3 mb-0'>• {sense[ 0 ]} {sense[ 1 ]}ft.</p>
                                    ))}
                                </>
                                : <p className='ms-3 mb-0'>No senses.</p>
                            }
                        </div>
                    </div>
                </div>
                <div className='row g-2' style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto' }}>
                    <div className='col'>
                        <h5>Saving Throws</h5>
                        <HorizLine />
                        <div className='input-group'>
                            <div className='input-group-text rounded-tl rounded-bottom-0 bg-dark text-white'>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={savingThrows.includes('STR')}
                                    onChange={() => handleCheckboxChange('STR')}
                                />
                            </div>
                            <span className='input-group-text font-monospace'>STR</span>
                            <span className='input-group-text font-monospace flex-fill rounded-tr rounded-bottom-0'>{tools.getModifierTextEl(data.STR, (savingThrows.includes('STR')), profBonus)}</span>
                        </div>
                        <div className='input-group'>
                            <div className='input-group-text rounded-0 bg-dark text-white'>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={savingThrows.includes('DEX')}
                                    onChange={() => handleCheckboxChange('DEX')}
                                />
                            </div>
                            <span className='input-group-text font-monospace'>DEX</span>
                            <span className='input-group-text font-monospace flex-fill rounded-0'>{tools.getModifierTextEl(data.DEX, (savingThrows.includes('DEX')), profBonus)}</span>
                        </div>
                        <div className='input-group'>
                            <div className='input-group-text rounded-0 bg-dark text-white'>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={savingThrows.includes('CON')}
                                    onChange={() => handleCheckboxChange('CON')}
                                />
                            </div>
                            <span className='input-group-text font-monospace'>CON</span>
                            <span className='input-group-text font-monospace flex-fill rounded-0'>{tools.getModifierTextEl(data.CON, (savingThrows.includes('CON')), profBonus)}</span>
                        </div>
                        <div className='input-group'>
                            <div className='input-group-text rounded-0 bg-dark text-white'>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={savingThrows.includes('INT')}
                                    onChange={() => handleCheckboxChange('INT')}
                                />
                            </div>
                            <span className='input-group-text font-monospace'>INT</span>
                            <span className='input-group-text font-monospace flex-fill rounded-0'>{tools.getModifierTextEl(data.INT, (savingThrows.includes('INT')), profBonus)}</span>
                        </div>
                        <div className='input-group'>
                            <div className='input-group-text rounded-0 bg-dark text-white'>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={savingThrows.includes('WIS')}
                                    onChange={() => handleCheckboxChange('WIS')}
                                />
                            </div>
                            <span className='input-group-text font-monospace'>WIS</span>
                            <span className='input-group-text font-monospace flex-fill rounded-0'>{tools.getModifierTextEl(data.WIS, (savingThrows.includes('WIS')), profBonus)}</span>
                        </div>
                        <div className='input-group'>
                            <div className='input-group-text rounded-bl rounded-top-0 bg-dark text-white'>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={savingThrows.includes('CHA')}
                                    onChange={() => handleCheckboxChange('CHA')}
                                />
                            </div>
                            <span className='input-group-text font-monospace'>CHA</span>
                            <span className='input-group-text font-monospace flex-fill rounded-br rounded-top-0'>{tools.getModifierTextEl(data.CHA, (savingThrows.includes('CHA')), profBonus)}</span>
                        </div>
                    </div>
                    <div className='col'>
                        <h5>Skills</h5>
                        <HorizLine />
                        <div style={{ maxHeight: '27.5vh', overflowY: 'auto' }}>
                            {/* Strength Skills */}
                            <div className='input-group'>
                                <div className='input-group-text rounded-tl rounded-bottom-0 bg-dark text-white'>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={skills.includes('Athletics')}
                                        onChange={() => handleCheckboxChange('Athletics')}
                                    />
                                </div>
                                <span className='input-group-text flex-fill'>Athletics (STR)</span>
                                <span className='input-group-text rounded-tr rounded-bottom-0'>{tools.getModifierTextEl(data.STR, (skills.includes('Athletics')), profBonus)}</span>
                            </div>

                            {/* Dexterity Skills */}
                            <div className='input-group'>
                                <div className='input-group-text rounded-0 bg-dark text-white'>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={skills.includes('Acrobatics')}
                                        onChange={() => handleCheckboxChange('Acrobatics')}
                                    />
                                </div>
                                <span className='input-group-text flex-fill'>Acrobatics (DEX)</span>
                                <span className='input-group-text  rounded-0'>{tools.getModifierTextEl(data.DEX, (skills.includes('Acrobatics')), profBonus)}</span>
                            </div>

                            <div className='input-group'>
                                <div className='input-group-text rounded-0 bg-dark text-white'>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={skills.includes('Sleight of Hand')}
                                        onChange={() => handleCheckboxChange('Sleight of Hand')}
                                    />
                                </div>
                                <span className='input-group-text flex-fill'>Sleight of Hand (DEX)</span>
                                <span className='input-group-text  rounded-0'>{tools.getModifierTextEl(data.DEX, (skills.includes('Sleight of Hand')), profBonus)}</span>
                            </div>

                            <div className='input-group'>
                                <div className='input-group-text rounded-0 bg-dark text-white'>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={skills.includes('Stealth')}
                                        onChange={() => handleCheckboxChange('Stealth')}
                                    />
                                </div>
                                <span className='input-group-text flex-fill'>Stealth (DEX)</span>
                                <span className='input-group-text  rounded-0'>{tools.getModifierTextEl(data.DEX, (skills.includes('Stealth')), profBonus)}</span>
                            </div>

                            {/* Intelligence Skills */}
                            <div className='input-group'>
                                <div className='input-group-text rounded-0 bg-dark text-white'>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={skills.includes('Arcana')}
                                        onChange={() => handleCheckboxChange('Arcana')}
                                    />
                                </div>
                                <span className='input-group-text flex-fill'>Arcana (INT)</span>
                                <span className='input-group-text  rounded-0'>{tools.getModifierTextEl(data.INT, (skills.includes('Arcana')), profBonus)}</span>
                            </div>

                            <div className='input-group'>
                                <div className='input-group-text rounded-0 bg-dark text-white'>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={skills.includes('History')}
                                        onChange={() => handleCheckboxChange('History')}
                                    />
                                </div>
                                <span className='input-group-text flex-fill'>History (INT)</span>
                                <span className='input-group-text  rounded-0'>{tools.getModifierTextEl(data.INT, (skills.includes('History')), profBonus)}</span>
                            </div>

                            <div className='input-group'>
                                <div className='input-group-text rounded-0 bg-dark text-white'>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={skills.includes('Investigation')}
                                        onChange={() => handleCheckboxChange('Investigation')}
                                    />
                                </div>
                                <span className='input-group-text flex-fill'>Investigation (INT)</span>
                                <span className='input-group-text  rounded-0'>{tools.getModifierTextEl(data.INT, (skills.includes('Investigation')), profBonus)}</span>
                            </div>

                            <div className='input-group'>
                                <div className='input-group-text rounded-0 bg-dark text-white'>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={skills.includes('Nature')}
                                        onChange={() => handleCheckboxChange('Nature')}
                                    />
                                </div>
                                <span className='input-group-text flex-fill'>Nature (INT)</span>
                                <span className='input-group-text  rounded-0'>{tools.getModifierTextEl(data.INT, (skills.includes('Nature')), profBonus)}</span>
                            </div>

                            <div className='input-group'>
                                <div className='input-group-text rounded-0 bg-dark text-white'>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={skills.includes('Religion')}
                                        onChange={() => handleCheckboxChange('Religion')}
                                    />
                                </div>
                                <span className='input-group-text flex-fill'>Religion (INT)</span>
                                <span className='input-group-text  rounded-0'>{tools.getModifierTextEl(data.INT, (skills.includes('Religion')), profBonus)}</span>
                            </div>

                            {/* Wisdom Skills */}
                            <div className='input-group'>
                                <div className='input-group-text rounded-0 bg-dark text-white'>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={skills.includes('Animal Handling')}
                                        onChange={() => handleCheckboxChange('Animal Handling')}
                                    />
                                </div>
                                <span className='input-group-text flex-fill'>Animal Handling (WIS)</span>
                                <span className='input-group-text  rounded-0'>{tools.getModifierTextEl(data.WIS, (skills.includes('Animal Handling')), profBonus)}</span>
                            </div>

                            <div className='input-group'>
                                <div className='input-group-text rounded-0 bg-dark text-white'>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={skills.includes('Insight')}
                                        onChange={() => handleCheckboxChange('Insight')}
                                    />
                                </div>
                                <span className='input-group-text flex-fill'>Insight (WIS)</span>
                                <span className='input-group-text  rounded-0'>{tools.getModifierTextEl(data.WIS, (skills.includes('Insight')), profBonus)}</span>
                            </div>

                            <div className='input-group'>
                                <div className='input-group-text rounded-0 bg-dark text-white'>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={skills.includes('Medicine')}
                                        onChange={() => handleCheckboxChange('Medicine')}
                                    />
                                </div>
                                <span className='input-group-text flex-fill'>Medicine (WIS)</span>
                                <span className='input-group-text  rounded-0'>{tools.getModifierTextEl(data.WIS, (skills.includes('Medicine')), profBonus)}</span>
                            </div>

                            <div className='input-group'>
                                <div className='input-group-text rounded-0 bg-dark text-white'>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={skills.includes('Perception')}
                                        onChange={() => handleCheckboxChange('Perception')}
                                    />
                                </div>
                                <span className='input-group-text flex-fill'>Perception (WIS)</span>
                                <span className='input-group-text  rounded-0'>{tools.getModifierTextEl(data.WIS, (skills.includes('Perception')), profBonus)}</span>
                            </div>

                            <div className='input-group'>
                                <div className='input-group-text rounded-0 bg-dark text-white'>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={skills.includes('Survival')}
                                        onChange={() => handleCheckboxChange('Survival')}
                                    />
                                </div>
                                <span className='input-group-text flex-fill'>Survival (WIS)</span>
                                <span className='input-group-text  rounded-0'>{tools.getModifierTextEl(data.WIS, (skills.includes('Survival')), profBonus)}</span>
                            </div>

                            {/* Charisma Skills */}
                            <div className='input-group'>
                                <div className='input-group-text rounded-0 bg-dark text-white'>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={skills.includes('Deception')}
                                        onChange={() => handleCheckboxChange('Deception')}
                                    />
                                </div>
                                <span className='input-group-text flex-fill'>Deception (CHA)</span>
                                <span className='input-group-text  rounded-0'>{tools.getModifierTextEl(data.CHA, (skills.includes('Deception')), profBonus)}</span>
                            </div>

                            <div className='input-group'>
                                <div className='input-group-text rounded-0 bg-dark text-white'>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={skills.includes('Intimidation')}
                                        onChange={() => handleCheckboxChange('Intimidation')}
                                    />
                                </div>
                                <span className='input-group-text flex-fill'>Intimidation (CHA)</span>
                                <span className='input-group-text  rounded-0'>{tools.getModifierTextEl(data.CHA, (skills.includes('Intimidation')), profBonus)}</span>
                            </div>

                            <div className='input-group'>
                                <div className='input-group-text rounded-0 bg-dark text-white'>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={skills.includes('Performance')}
                                        onChange={() => handleCheckboxChange('Performance')}
                                    />
                                </div>
                                <span className='input-group-text flex-fill'>Performance (CHA)</span>
                                <span className='input-group-text  rounded-0'>{tools.getModifierTextEl(data.CHA, (skills.includes('Performance')), profBonus)}</span>
                            </div>
                            <div className='input-group'>
                                <div className='input-group-text rounded-bl rounded-top-0 bg-dark text-white'>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={skills.includes('Persuasion')}
                                        onChange={() => handleCheckboxChange('Persuasion')}
                                    />
                                </div>
                                <span className='input-group-text flex-fill'>Persuasion (CHA)</span>
                                <span className='input-group-text  rounded-br rounded-top-0'>{tools.getModifierTextEl(data.CHA, (skills.includes('Persuasion')), profBonus)}</span>
                            </div>
                        </div>
                        <div className='mt-2' style={{ justifyContent: 'center', textAlign: 'center' }}>
                            <SideBySide justify='space-between' content={
                                <>
                                    <h5>↓</h5>
                                    <h5>Scroll</h5>
                                    <h5>↓</h5>
                                </>
                            } />
                        </div>
                    </div>
                    {data.type === 'monster' || tools.getSpellcastingAbility(data.charClass) !== null ?
                        <div className='col fade-drop-in'>
                            <h5>Spellcasting</h5>
                            <HorizLine />
                            <div className='input-group mb-1'>
                                <span className='input-group-text bg-dark text-white'>Casting Ability</span>
                                <select
                                    disabled={!spellOverride}
                                    value={spellAbility}
                                    onChange={(e) => setSpellAbility(e.target.value)}
                                    className='form-select'
                                >
                                    <option value="">Not a spellcaster</option>
                                    <option value="INT">INT</option>
                                    <option value="WIS">WIS</option>
                                    <option value="CHA">CHA</option>
                                </select>
                            </div>
                            <div className='input-group mb-1'>
                                <span className='input-group-text bg-dark text-white'>Spell Save DC</span>
                                <input
                                    disabled={!spellOverride}
                                    type='number'
                                    min='0'
                                    value={spellSaveDC}
                                    onChange={(e) => setSpellSaveDC(Number(e.target.value))}
                                    className='form-control'
                                />
                            </div>
                            <div className='input-group mb-1'>
                                <span className='input-group-text bg-dark text-white'>Spell ATK Bonus</span>
                                <input
                                    disabled={!spellOverride}
                                    type='number'
                                    min='0'
                                    value={spellATKBonus}
                                    onChange={(e) => setSpellATKBonus(Number(e.target.value))}
                                    className='form-control'
                                />
                            </div>
                            {data.type !== 'monster' ?
                                <div className='input-group'>
                                    <span className='input-group-text'>
                                        <input
                                            type='checkbox'
                                            checked={spellOverride}
                                            onChange={(e) => setSpellOverride(e.target.checked)}
                                            className='form-check-input'
                                        />
                                    </span>
                                    <span className={'input-group-text flex-fill ' + (spellOverride ? 'bg-danger' : 'bg-danger-subtle')}>
                                        {spellOverride ? 'Overriding automatic spell stats' : 'Override automatic spell stats?'}
                                    </span>
                                </div>
                                : null
                            }

                        </div>
                        : null
                    }

                </div>
            </>
        } />
    );
}

export default SkillsInput;