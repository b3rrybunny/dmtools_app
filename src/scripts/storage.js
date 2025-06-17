import * as tools from './tools';


/* charData = {
    'count': Number,
    'chars': [
        {
            'name': 'Izalith the Stinky',
            'ID': *numbers*,
            ...
        },
        {
            'name': 'Kiwi the Brave',
            'ID': *numbers*,
            ...
        }
    ]
} */


export function retrieve(dataToRetrieve) {
    const result = localStorage.getItem(dataToRetrieve);
    if (result !== null) {
        console.log("%c✅ Retrieved data '" + dataToRetrieve + "'.", 'color: lime');
    }
    else {
        console.log("%c⚠️ No data to retrieve @ item '" + dataToRetrieve + "'.", 'color: yellow');
        return;
    }

    return (JSON.parse(result));
}

//export function save (dataToSave, storageItem) {}

export function check(storageItem) {
    if (localStorage.getItem(storageItem)) {
        return (true);
    }
    else {
        return (false);
    }
}

export function erase(storageItem = null) {
    if (storageItem === null) {
        localStorage.clear();
        console.log('%c✅ Cleared all local storage data.', 'color: lime');
    }
    else {
        localStorage.removeItem(storageItem);
        console.log("%c✅ Removed item '" + storageItem + "' from local storage.", 'color: lime')
    }
}

export function saveChar(data, id = null) {
    if (check('charData')) { // If charData exists...
        if (data?.[ 'ID' ]) { //...if input data has an ID...
            if (parseInt(data[ 'ID' ]) === id) { //...if input data matches input ID...
                const charData = retrieve('charData');
                const count = charData.count;
                const newCharArray = charData.chars.map(item =>
                    item.ID === id ? data : item
                )
                const newCharData = {
                    'count': count,
                    'chars': newCharArray
                }
                //...overwrite character @ specified ID.
                localStorage.setItem('charData', JSON.stringify(newCharData));
                console.log('%c✅ Overwrit character @ ID ' + id + ' Data:', 'color: lime');
                tools.prettyLog(newCharData, 'Character Data');
                return;
            }
            else if (parseInt(data[ 'ID' ]) !== id) { //...if input data ID does NOT match input ID...
                //...raise error and do not save.
                console.error('Cannot save character @ ID ' + id + '. Input ID does not match.');
                return;
            }
            else if (id === null) { //..if there was no input ID...
                //...overwrite ID.
                console.log('%c⚠️ saveChar(): Input data already has an ID. Overwriting...', 'color: yellow');
                data[ 'ID' ] = tools.genID();
                console.log('%c⚠️ New charData ID: ' + data[ 'ID' ], 'color: yellow');
            }
        }
        else { //...if input ID does not exist, generate one.
            data[ 'ID' ] = tools.genID();
        }
        const charData = retrieve('charData');
        charData[ 'count' ] = parseInt(charData[ 'count' ]) + 1;
        charData[ 'chars' ] = [ ...charData[ 'chars' ], data ];
        localStorage.setItem('charData', JSON.stringify(charData));
        console.log('%c✅ Saved charData in local storage. Data:', 'color: lime');
        tools.prettyLog(charData, 'Character Data');
    }
    else { //If charData does not exist...
        if (data?.[ 'ID' ]) { //...if input data has an ID...
            if (parseInt(data[ 'ID' ]) !== id) { //...if input data ID does NOT match input ID...
                //...raise error and do not save.
                console.error('Cannot save character @ ID ' + id + '. Input ID does not match.');
                return;
            }
            else if (id === null) { //..if there was no input ID...
                //...overwrite ID.
                console.log('%c⚠️ saveChar(): Input data already has an ID. Overwriting...', 'color: yellow');
                data[ 'ID' ] = tools.genID();
                console.log('%c⚠️ New charData ID: ' + data[ 'ID' ], 'color: yellow');
            }
        }
        else { //...if input ID does not exist, generate one.
            data[ 'ID' ] = tools.genID();
        }
        const charData = {
            'count': 1,
            'chars': [ data ]
        }
        localStorage.setItem('charData', JSON.stringify(charData));
        console.log('%c✅ Created and saved charData in local storage. Data:', 'color: lime');
        tools.prettyLog(charData, 'Character Data');
    }
}

export function eraseChar(charID) {
    if (check('charData')) {
        const charData = retrieve('charData');
        if (charData[ 'chars' ].length === 1) {
            console.log('%c⚠️ Only one character in charData. Erasing entire item.', 'color: yellow');
            erase('charData');
            return;
        }
        const newCharDataArray = charData[ 'chars' ].filter(item => item[ 'ID' ] !== charID);
        charData[ 'chars' ] = newCharDataArray;
        localStorage.setItem('charData', JSON.stringify(charData));
        console.log("%c✅ Removed character @ ID: " + charID + ". New charData:", 'color: lime');
        tools.prettyLog(charData, 'Character Data');
    }
    else {
        console.log('%c⚠️ No character data @ ID ' + charID + ' in local storage. Cannot erase.', 'color: yellow');
    }
}

export function saveMonster(data, id = null) {
    if (check('monsterData')) { // If monsterData exists...
        if (data?.[ 'ID' ]) { //...if input data has an ID...
            if (parseInt(data[ 'ID' ]) === id) { //...if input data matches input ID...
                const monsterData = retrieve('monsterData');
                const count = monsterData.count;
                const newMonsterArray = monsterData.monsters.map(item =>
                    item.ID === id ? data : item
                )
                const newMonsterData = {
                    'count': count,
                    'monsters': newMonsterArray
                }
                //...overwrite monster @ specified ID.
                localStorage.setItem('monsterData', JSON.stringify(newMonsterData));
                console.log('%c✅ Overwrit monster @ ID ' + id + ' Data:', 'color: lime');
                tools.prettyLog(newMonsterData, 'Monster Data');
                return;
            }
            else if (parseInt(data[ 'ID' ]) !== id) { //...if input data ID does NOT match input ID...
                //...raise error and do not save.
                console.error('Cannot save monster @ ID ' + id + '. Input ID does not match.');
                return;
            }
            else if (id === null) { //..if there was no input ID...
                //...overwrite ID.
                console.log('%c⚠️ saveMonster(): Input data already has an ID. Overwriting...', 'color: yellow');
                data[ 'ID' ] = tools.genID();
                console.log('%c⚠️ New monsterData ID: ' + data[ 'ID' ], 'color: yellow');
            }
        }
        else { //...if input ID does not exist, generate one.
            data[ 'ID' ] = tools.genID();
        }
        const monsterData = retrieve('monsterData');
        monsterData[ 'count' ] = parseInt(monsterData[ 'count' ]) + 1;
        monsterData[ 'monsters' ] = [ ...monsterData[ 'monsters' ], data ];
        localStorage.setItem('monsterData', JSON.stringify(monsterData));
        console.log('%c✅ Saved monsterData in local storage. Data:', 'color: lime');
        tools.prettyLog(monsterData, 'Monster Data');
    }
    else { //If monsterData does not exist...
        if (data?.[ 'ID' ]) { //...if input data has an ID...
            if (parseInt(data[ 'ID' ]) !== id) { //...if input data ID does NOT match input ID...
                //...raise error and do not save.
                console.error('Cannot save monster @ ID ' + id + '. Input ID does not match.');
                return;
            }
            else if (id === null) { //..if there was no input ID...
                //...overwrite ID.
                console.log('%c⚠️ saveMonster(): Input data already has an ID. Overwriting...', 'color: yellow');
                data[ 'ID' ] = tools.genID();
                console.log('%c⚠️ New monsterData ID: ' + data[ 'ID' ], 'color: yellow');
            }
        }
        else { //...if input ID does not exist, generate one.
            data[ 'ID' ] = tools.genID();
        }
        const monsterData = {
            'count': 1,
            'monsters': [ data ]
        }
        localStorage.setItem('monsterData', JSON.stringify(monsterData));
        console.log('%c✅ Created and saved monsterData in local storage. Data:', 'color: lime');
        tools.prettyLog(monsterData, 'Monster Data');
    }
}

export function eraseMonster(monsterID) {
    if (check('monsterData')) {
        const monsterData = retrieve('monsterData');
        if (monsterData[ 'monsters' ].length === 1) {
            console.log('%c⚠️ Only one monster in monsterData. Erasing entire item.', 'color: yellow');
            erase('monsterData');
            return;
        }
        const newMonsterDataArray = monsterData[ 'monsters' ].filter(item => item[ 'ID' ] !== monsterID);
        monsterData[ 'monsters' ] = newMonsterDataArray;
        localStorage.setItem('monsterData', JSON.stringify(monsterData));
        console.log("%c✅ Removed monsteracter @ ID: " + monsterID + ". New monsterData:", 'color: lime');
        tools.prettyLog(monsterData, 'Monster Data');
    }
    else {
        console.log('%c⚠️ No monster data @ ID ' + monsterID + ' in local storage. Cannot erase.', 'color: yellow');
    }
}

export function saveData(data, itemName) {
    localStorage.setItem(itemName, JSON.stringify(data));
    console.log("%c✅ Saved data @ item name " + itemName + ". Data:", 'color: lime');
    tools.prettyLog(data, itemName);
}