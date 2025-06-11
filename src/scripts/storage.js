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

export function saveChar(data) {
    if (check('charData')) {
        if (data?.['ID']) {
            console.log('%c⚠️ saveChar(): Input data already has an ID. Overwriting...', 'color: yellow');
            data['ID'] = tools.genID();
            console.log('%c⚠️ New charData ID: ' + data['ID'], 'color: yellow');
        }
        else {
            data['ID'] = tools.genID();
        }
        const charData = retrieve('charData');
        charData['count'] = parseInt(charData['count']) + 1;
        charData['chars'] = [...charData['chars'], data];
        localStorage.setItem('charData', JSON.stringify(charData));
        console.log('%c✅ Saved charData in local storage. Data:', 'color: lime');
        tools.prettyLog(charData, 'Character Data');
    }
    else {
        if (data?.['ID']) {
            console.log('%c⚠️ saveChar(): Input data already has an ID. Overwriting...', 'color: yellow');
            data['ID'] = tools.genID();
            console.log('%c⚠️ New charData ID: ' + data['ID'], 'color: yellow');
        }
        else {
            data['ID'] = tools.genID();
        }
        const charData = {
            'count': 1,
            'chars': [
                data
            ]
        };
        localStorage.setItem('charData', JSON.stringify(charData));
        console.log('%c✅ Created and saved charData in local storage. Data:', 'color: lime');
        tools.prettyLog(charData, 'Character Data');
    }
}

export function eraseChar(charID) {
    if (check('charData')) {
        const charData = retrieve('charData');
        const newCharDataArray = charData['chars'].filter(item => item['ID'] !== charID);
        charData['chars'] = newCharDataArray;
        localStorage.setItem('charData', JSON.stringify(charData));
        console.log("%c✅ Removed character @ ID: " + charID + ". New charData:", 'color: lime');
        tools.prettyLog(charData, 'Character Data');
    }
    else {
        console.log('%c⚠️ No character data @ ID ' + charID + ' in local storage. Cannot erase.', 'color: yellow');
    }
}

export function saveMonster(data) {
    if (check('monsterData')) {
        if (data?.['ID']) {
            console.log('%c⚠️ saveMonster(): Input data already has an ID. Overwriting...', 'color: yellow');
            data['ID'] = tools.genID();
            console.log('%c⚠️ New monsterData ID: ' + data['ID'], 'color: yellow');
        }
        else {
            data['ID'] = tools.genID();
        }
        const monsterData = retrieve('monsterData');
        monsterData['count'] = parseInt(monsterData['count']) + 1;
        monsterData['monsters'] = [...monsterData['monsters'], data];
        localStorage.setItem('monsterData', JSON.stringify(monsterData));
        console.log('%c✅ Saved monsterData in local storage. Data:', 'color: lime');
        tools.prettyLog(monsterData, 'Monster Data');
    }
    else {
        if (data?.['ID']) {
            console.log('%c⚠️ saveMonster(): Input data already has an ID. Overwriting...', 'color: yellow');
            data['ID'] = tools.genID();
            console.log('%c⚠️ New monsterData ID: ' + data['ID'], 'color: yellow');
        }
        else {
            data['ID'] = tools.genID();
        }
        const monsterData = {
            'count': 1,
            'monsters': [
                data
            ]
        };
        localStorage.setItem('monsterData', JSON.stringify(monsterData));
        console.log('%c✅ Created and saved monsterData in local storage. Data:', 'color: lime');
        tools.prettyLog(monsterData, 'Monster Data');
    }
}

export function eraseMonster(monsterID) {
    if (check('monsterData')) {
        const monsterData = retrieve('monsterData');
        const newMonsterDataArray = monsterData['monsters'].filter(item => item['ID'] !== monsterID);
        monsterData['monsters'] = newMonsterDataArray;
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