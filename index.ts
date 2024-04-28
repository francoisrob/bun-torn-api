import { Faction, TornAPI } from './lib';

const torn = new TornAPI('ChtwaS0nO6v3PNO9');

const x = async () => {
    const results = await torn.faction.basic();
    console.log(results);
};

x();
