export function prettyLog(obj, label = 'Object', isRoot = true) {
  const styles = {
    key: 'color: #1976d2; font-weight: bold;',
    string: 'color: #388e3c; font-weight: normal;',
    number: 'color: #f57c00; font-weight: bold;',
    boolean: 'color: #7b1fa2; font-weight: bold;', 
    null: 'color: #757575; font-style: italic;',
    undefined: 'color: #757575; font-style: italic;',
    date: 'color: #c2185b; font-weight: bold;',
    array: 'color: #0288d1; font-weight: bold; background: rgba(2,136,209,0.1); padding: 2px 4px; border-radius: 3px;',
    object: 'color: #5d4037; font-weight: bold; background: rgba(93,64,55,0.1); padding: 2px 4px; border-radius: 3px;',
    rootObject: 'color: #d32f2f; font-weight: bold; font-size: 14px; background: rgba(211,47,47,0.1); padding: 4px 8px; border-radius: 4px;'
  };
  
  if (obj === null) {
    console.log(`%c${label}: %cnull`, styles.key, styles.null);
    return;
  }
  
  if (obj === undefined) {
    console.log(`%c${label}: %cundefined`, styles.key, styles.undefined);
    return;
  }
  
  if (typeof obj !== 'object') {
    const type = typeof obj;
    const value = type === 'string' ? `"${obj}"` : obj;
    console.log(`%c${label}: %c${value}`, styles.key, styles[type] || '');
    return;
  }
  
  if (Array.isArray(obj)) {
    const groupStyle = isRoot ? styles.array : styles.array;
    console.group(`%c${label}: Array[${obj.length}]`, groupStyle);
    obj.forEach((item, index) => {
      prettyLog(item, `[${index}]`, false);
    });
    console.groupEnd();
    return;
  }
  
  if (obj instanceof Date) {
    console.log(`%c${label}: %c${obj.toISOString()}`, styles.key, styles.date);
    return;
  }
  
  const keys = Object.keys(obj);
  const groupLabel = `%c${label}: Object{${keys.length} properties}`;
  const groupStyle = isRoot ? styles.rootObject : styles.object;
  
  if (isRoot || keys.length <= 3) {
    console.group(groupLabel, groupStyle);
  } else {
    console.groupCollapsed(groupLabel, groupStyle);
  }
  
  keys.forEach(key => {
    prettyLog(obj[key], key, false);
  });
  
  console.groupEnd();
}

export function prettyLogJson(jsonArray, title = '', collapse = true) {
  if (!Array.isArray(jsonArray)) {
    console.error('Input must be an array');
    return;
  }

  const logMethod = collapse ? console.groupCollapsed : console.group;
  const groupTitle = title || `JSON Data (${jsonArray.length} items)`;

  logMethod(groupTitle);
  jsonArray.forEach((item, index) => {
    console.log(`Item ${index + 1}:`, JSON.parse(JSON.stringify(item, null, 2)));
  });
  console.groupEnd();
}

export function genID() {
  return Math.floor(Math.random() * 900000) + 100000;
}