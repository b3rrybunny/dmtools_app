// Frontend ------------------------------------------------------------
export function getProfBonus(level) {
  if (level < 1 || level > 20) {
    return -1; //Invalid input
  }
  return Math.ceil(level / 4) + 1;
}

export function getStatMod(statNum, bonus = 0) {
  const num = parseInt(statNum);
  const bonusNum = parseInt(bonus);

  // Early return for invalid inputs (undefined, NaN, non-numbers)
  if (isNaN(num)) {
    return 0;
  }

  switch (num) {
    case 0:
    case 1:
      return -5 + bonusNum;
    case 2:
    case 3:
      return -4 + bonusNum;
    case 4:
    case 5:
      return -3 + bonusNum;
    case 6:
    case 7:
      return -2 + bonusNum;
    case 8:
    case 9:
      return -1 + bonusNum;
    case 10:
    case 11:
      return 0 + bonusNum;
    case 12:
    case 13:
      return 1 + bonusNum;
    case 14:
    case 15:
      return 2 + bonusNum;
    case 16:
    case 17:
      return 3 + bonusNum;
    case 18:
    case 19:
      return 4 + bonusNum;
    case 20:
    case 21:
      return 5 + bonusNum;
    case 22:
    case 23:
      return 6 + bonusNum;
    case 24:
    case 25:
      return 7 + bonusNum;
    case 26:
    case 27:
      return 8 + bonusNum;
    case 28:
    case 29:
      return 9 + bonusNum;
    case 30:
    default:
      return 10 + bonusNum;
  }
}

export function getModifierTextEl(stat, prof = false, profBonus = 0) {
  const modifier = getStatMod(stat, (prof ? parseInt(profBonus) : 0));

  const getColor = (mod) => {
    if (mod > 0) {
      return ('green');
    }
    else if (mod === 0) {
      return ('black');
    }
    else if (mod < 0) {
      return ('red');
    }
  }

  return (<span style={{ color: getColor(modifier), textAlign: 'center', margin: '0px' }}>{modifier >= 0 ? ('+' + modifier) : (modifier)}</span>);
}

export function getArmorMod(type) {
  switch (type) {
    case 'natural':
    case 'unarmored':
      return 0;
    case 'padded':
    case 'leather':
      return 1;
    case 'studded-leather':
    case 'hide':
      return 2;
    case 'chain-shirt':
      return 3;
    case 'scale-mail':
    case 'breastplate':
    case 'ring-mail':
      return 4;
    case 'half-plate':
      return 5;
    case 'chain-mail':
      return 6;
    case 'splint':
      return 7;
    case 'plate':
      return 8;
  }
}

export function getSpellcastingAbility(characterClass) {
  switch (characterClass?.toLowerCase()) {
    // Charisma-based casters
    case 'bard':
    case 'paladin':
    case 'sorcerer':
    case 'warlock':
      return 'CHA';

    // Wisdom-based casters
    case 'cleric':
    case 'druid':
    case 'ranger':
      return 'WIS';

    // Intelligence-based casters
    case 'wizard':
    case 'artificer':
      return 'INT';

    // Special cases (subclasses with different stats)
    case 'eldritch knight':  // Fighter subclass
      return 'INT';
    case 'arcane trickster': // Rogue subclass
      return 'INT';

    // Non-spellcasters or invalid input
    default:
      return null; // or throw an error
  }
}



// Backend ------------------------------------------------------------
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
    console.log(`%c${label}: %c${value}`, styles.key, styles[ type ] || '');
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
    prettyLog(obj[ key ], key, false);
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