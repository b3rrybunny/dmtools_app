import * as tools from '../components/tools';

const BASE_URL = "https://www.dnd5eapi.co";

export async function getAllSpells() {
    const result =  await fetch(BASE_URL + "/api/2014/spells").then((response) => response.json());
    console.log('dnd5eapi.co API queried. All spells queried. Count: ' + result.count);
    return (result.results);
}

export async function getSingleSpell(spellIndex) {
    const result =  await fetch(BASE_URL + "/api/2014/spells/" + spellIndex).then((response) => response.json());
    console.log('dnd5eapi.co API queried. Single spell queried. Name: ' + result.name);
    return (result);
}

export async function getAllEquipment() {
    const result =  await fetch(BASE_URL + "/api/2014/equipment").then((response) => response.json());
    console.log('dnd5eapi.co API queried. All equipment queried. Count: ' + result.count);
    return (result.results);
}

export async function getAllLanguages() {
    const result =  await fetch(BASE_URL + "/api/2014/languages").then((response) => response.json());
    console.log('dnd5eapi.co API queried. All languages queried. Count: ' + result.count);
    return (result.results);
}