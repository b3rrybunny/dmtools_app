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


export function retrieve (dataToRetrieve) {
    const result = localStorage.getItem(dataToRetrieve);
    if (result !== null) {
        console.log("Retrieved data '" + dataToRetrieve + "'.");
    }
    else {
        console.warn("No data to retrieve @ item '" + dataToRetrieve + "'.");
        return;
    }
    
    return(JSON.parse(result));
}

//export function save (dataToSave, storageItem) {}

export function check (storageItem) {
    if (localStorage.getItem(storageItem)) {
        return (true);
    }
    else {
        return (false);
    }
}

export function erase (storageItem=null) {
    if (storageItem === null) {
        localStorage.clear();
        console.log('Cleared all local storage data.');
    }
    else {
        localStorage.removeItem(storageItem);
        console.log("Removed item '" + storageItem + "' from local memory.")
    }
}

export function saveChar (data) {
    if (check('charData')) {
        if (data?.['ID']) {
            console.warn('saveChar(): Input data already has an ID. Overwriting...');
            data['ID'] = tools.genID();
            console.warn('New charData ID: ' + data['ID']);
        }
        else {
            data['ID'] = tools.genID();
        }
        const charData = retrieve('charData');
        charData['count'] = charData['count']++;
        charData['chars'] = [...charData['chars'], data];
        localStorage.setItem('charData', JSON.stringify(charData));
        console.log('Saved charData in local storage. Data:');
        tools.prettyLog(charData, 'Character Data');
    }
    else {
        if (data?.['ID']) {
            console.warn('saveChar(): Input data already has an ID. Overwriting...');
            data['ID'] = tools.genID();
            console.warn('New charData ID: ' + data['ID']);
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
        console.log('Created and saved charData in local storage. Data:');
        tools.prettyLog(charData, 'Character Data');
    }
}

export function eraseChar (charID) {
    if (check('charData')) {
        const charData = retrieve('charData');
        const newCharDataArray = charData['chars'].filter(item => item['ID'] !== charID);
        charData['chars'] = newCharDataArray;
        localStorage.setItem('charData', JSON.stringify(charData));
        console.log("Removed character @ ID: " + charID + ". New charData:");
        tools.prettyLog(charData, 'Character Data');
    }
    else {
        console.warn('No character data @ ID ' + charID + ' in local storage. Cannot erase.');
    }
}