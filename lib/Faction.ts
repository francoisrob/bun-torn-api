import { TornAPIBase } from './TornAPIBase';
import {
  AttackResponse,
    Errorable,
    IApplication,
    IArmor,
    IAttack,
    IAttackFull,
    IBooster,
    IChain,
    IChainReport,
    ICompleteChain,
    ICrime,
    ICurrency,
    IDonation,
    IDrug,
    IFaction,
    IFactionPosition,
    IFactionReport,
    IMedical,
    INews,
    IRevives,
    IRevivesFull,
    IStats,
    ITemporary,
    ITerritory,
    IUpgrade,
    IWeapon
} from './Interfaces';

export class Faction extends TornAPIBase {
    constructor(apiKey: string, comment: string) {
        super(apiKey, comment);
    }

    async multi(endpoints: string[], id?: string): Promise<Errorable<Record<string, object>>> {
        return this.multiQuery('faction', endpoints, id);
    }

    async faction(id?: string): Promise<Errorable<IFaction>> {
        const query = await fetch(this.buildUri({ route: 'faction', selection: '', id: id }), {
            headers: { 'Content-Type': 'application/json' },
            method: 'get'
        });

        return await query.json();
    }

    async applications(): Promise<Errorable<IApplication[]>> {
        return this.apiQueryToArray({ route: 'faction', selection: 'applications' });
    }

    async armor(): Promise<Errorable<IArmor[]>> {
        return this.apiQuery({ route: 'faction', selection: 'armor' });
    }

    async armorynews(from?: number, to?: number): Promise<Errorable<INews[]>> {
        return this.apiQueryToArray({ route: 'faction', selection: 'armorynews', from: from, to: to }, 'id');
    }

    async attacknews(from?: number, to?: number): Promise<Errorable<INews[]>> {
        return this.apiQueryToArray({ route: 'faction', selection: 'attacknews', from: from, to: to }, 'id');
    }

    async attacks(from?: number, to?: number): Promise<Errorable<AttackResponse>> {
        return this.apiQueryToArray({ route: 'faction', selection: 'attacks', from: from, to: to });
    }

    async attacksfull(from?: number, to?: number): Promise<Errorable<IAttackFull[]>> {
        return this.apiQueryToArray({ route: 'faction', selection: 'attacksfull', jsonOverride: 'attacks', from: from, to: to });
    }

    async basic(id?: string): Promise<Errorable<IFaction>> {
        return this.faction(id);
    }

    /**
     * Gets a list of amory booster items.
     *
     * @returns An array of armory boosters
     */
    async boosters(): Promise<Errorable<IBooster[]>> {
        return this.apiQuery({ route: 'faction', selection: 'boosters' });
    }

    async cesium(): Promise<undefined> {
        throw new Error('Method not implemented.');
    }

    async chain(): Promise<Errorable<IChain>> {
        return this.apiQuery({ route: 'faction', selection: 'chain' });
    }

    async chainreport(): Promise<Errorable<IChainReport>> {
        const query = await fetch(this.buildUri({ route: 'faction', selection: 'chainreport' }), {
            headers: { 'Content-Type': 'application/json' },
            method: 'get'
        });
        return await query.json();
    }

    async chains(): Promise<Errorable<ICompleteChain[]>> {
        return this.apiQueryToArray({ route: 'faction', selection: 'chains' }, 'id');
    }

    async contributors(): Promise<undefined> {
        throw new Error('Method not implemented.');
    }

    /**
     * Gets members in order of their crime experience.
     *
     * @returns An array of member's Torn ids in order of their crime experience
     */
    async crimeexp(): Promise<Errorable<number[]>> {
        return this.apiQueryToArray({ route: 'faction', selection: 'crimeexp' });
    }

    async crimenews(from?: number, to?: number): Promise<Errorable<INews[]>> {
        return this.apiQueryToArray({ route: 'faction', selection: 'crimenews', from: from, to: to }, 'id');
    }

    async crimes(from?: number, to?: number): Promise<Errorable<ICrime[]>> {
        return await this.apiQueryToArray<ICrime>({ route: 'faction', selection: 'crimes', from: from, to: to }, 'id');
    }

    async currency(): Promise<Errorable<ICurrency>> {
        return this.apiQuery({ route: 'faction', selection: 'currency', jsonOverride: '' });
    }

    async donations(): Promise<Errorable<IDonation[]>> {
        return this.apiQueryToArray({ route: 'faction', selection: 'donations' }, 'id');
    }

    async drugs(): Promise<Errorable<IDrug[]>> {
        return this.apiQuery({ route: 'faction', selection: 'drugs' });
    }

    async fundsnews(from?: number, to?: number): Promise<Errorable<INews[]>> {
        return this.apiQueryToArray({ route: 'faction', selection: 'fundsnews', from: from, to: to }, 'id');
    }

    async mainnews(from?: number, to?: number): Promise<Errorable<INews[]>> {
        return this.apiQueryToArray({ route: 'faction', selection: 'mainnews', from: from, to: to }, 'id');
    }

    async medical(): Promise<Errorable<IMedical[]>> {
        return this.apiQuery({ route: 'faction', selection: 'medical' });
    }

    async membershipnews(from?: number, to?: number): Promise<Errorable<INews[]>> {
        return this.apiQueryToArray({ route: 'faction', selection: 'membershipnews', from: from, to: to }, 'id');
    }

    async positions(): Promise<Errorable<IFactionPosition[]>> {
        return this.apiQueryToArray({ route: 'faction', selection: 'positions' }, 'title');
    }

    async reports(): Promise<Errorable<IFactionReport[]>> {
        return this.apiQueryToArray({ route: 'faction', selection: 'reports' });
    }

    async revives(): Promise<Errorable<IRevives[]>> {
        return this.apiQueryToArray({ route: 'faction', selection: 'revives' }, 'id');
    }

    async revivesfull(): Promise<Errorable<IRevivesFull[]>> {
        return this.apiQueryToArray({ route: 'faction', selection: 'revivesfull', jsonOverride: 'revives' }, 'id');
    }

    async stats(): Promise<Errorable<IStats>> {
        return this.apiQuery({ route: 'faction', selection: 'stats' });
    }

    /**
     * Gets a list of amory temporary items.
     *
     * @returns An array of armory temporary items
     */
    async temporary(): Promise<Errorable<ITemporary[]>> {
        return this.apiQuery({ route: 'faction', selection: 'temporary' });
    }

    async territory(): Promise<Errorable<ITerritory[]>> {
        return this.apiQueryToArray({ route: 'faction', selection: 'territory' }, 'id');
    }

    async territorynews(from?: number, to?: number): Promise<Errorable<INews[]>> {
        return this.apiQueryToArray({ route: 'faction', selection: 'territorynews', from: from, to: to }, 'id');
    }

    async upgrades(): Promise<Errorable<IUpgrade[]>> {
        return this.apiQueryToArray({ route: 'faction', selection: 'upgrades' }, 'id');
    }

    async weapons(): Promise<Errorable<IWeapon[]>> {
        return this.apiQuery({ route: 'faction', selection: 'weapons' });
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    private fixStringMap<V>(mapLike: any): Map<string, V> {
        const returnMap = new Map<string, V>();

        const ids = Object.keys(mapLike);
        for (let i = 0; i < ids.length; i++) {
            returnMap.set(ids[i], mapLike[ids[i]]);
        }

        return returnMap;
    }
}
