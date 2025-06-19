import * as tools from './tools';

const BASE_URL = "https://www.dnd5eapi.co";

export async function getAllProficiencies(clean = true, simple = true) {
    const result = await fetch(BASE_URL + "/api/2014/proficiencies").then((response) => response.json());
    console.log('%c🛜 dnd5eapi.co API queried. All proficiencies queried. Count: ' + result.count, 'color: brown');
    if (clean === true) {
        console.log('%c🛜 Proficiencies query called with "clean" option. Removing all Skills and Saving Throws...', 'color: brown');
        const filtered = result.results.filter(item => {
            return !item.name.startsWith("Saving Throw:") && !item.name.startsWith("Skill:");
        });
        if (simple === true) {
            console.log('%c🛜 Proficiencies query called with "simple" option. Cutting down results array to just proficiency names...', 'color: brown');
            const simple = filtered.map(item => item.name);
            return simple;
        }
        else {
            return filtered;
        }

    }
    else {
        if (simple === true) {
            console.log('%c🛜 Proficiencies query called with "simple" option. Cutting down results array to just proficiency names...', 'color: brown');
            const simple = result.results.map(item => item.name);
            return simple;
        }
        return result.results;
    }
}

export async function getAllSpells() {
    const result = await fetch(BASE_URL + "/api/2014/spells").then((response) => response.json());
    console.log('%c🛜 dnd5eapi.co API queried. All spells queried. Count: ' + result.count, 'color: brown');
    return (result.results);
}

export async function getSingleSpell(spellIndex) {
    const result = await fetch(BASE_URL + "/api/2014/spells/" + spellIndex).then((response) => response.json());
    console.log('%c🛜 dnd5eapi.co API queried. Single spell queried. Name: ' + result.name, 'color: peru');
    return (result);
}

export async function getAllEquipment() {
    const result = await fetch(BASE_URL + "/api/2014/equipment").then((response) => response.json());
    console.log('%c🛜 dnd5eapi.co API queried. All equipment queried. Count: ' + result.count, 'color: brown');
    return (result.results);
}

export async function getAllLanguages() {
    const result = await fetch(BASE_URL + "/api/2014/languages").then((response) => response.json());
    console.log('%c🛜 dnd5eapi.co API queried. All languages queried. Count: ' + result.count, 'color: brown');
    return (result.results);
}
