import {
    IBank,
    ITornGym,
    IHonor,
    IItem,
    IMedal,
    IOrganisedCrime,
    IPawnshop,
    IRacket,
    IRaid,
    IStock,
    ITerritoryWar,
    ITornCompany,
    ITornProperty,
    ITornStats,
    IFactionTree,
    IKeyValue,
    ICard,
    IStockDetail,
    ITornEducation,
    IPokerTable,
    IChainReport,
    IRankedWar,
    IRankedWarReport,
    ITerritoryDetail,
    Errorable,
    ICityShop,
    IItemDetails,
    ISearchForCashCrimeStatus,
    IShopliftingCrimeStatus
} from './Interfaces';
import { TornAPIBase } from './TornAPIBase';

export class Torn extends TornAPIBase {
    constructor(apiKey: string, comment: string) {
        super(apiKey, comment);
    }

    async multi(endpoints: string[], id?: string): Promise<Errorable<Record<string, object>>> {
        return this.multiQuery('torn', endpoints, id);
    }

    async bank(): Promise<Errorable<IBank>> {
        return this.apiQuery({ route: 'torn', selection: 'bank' });
    }

    async cards(): Promise<Errorable<ICard[]>> {
        return this.apiQueryToArray({ route: 'torn', selection: 'cards' }, 'id');
    }

    async chainreport(id: number): Promise<Errorable<IChainReport>> {
        const query = await fetch(this.buildUri({ route: 'torn', selection: 'chainreport', id: id ? id.toString() : '' }), {
            headers: { 'Content-Type': 'application/json' },
            method: 'get'
        });
        return await query.json();
    }

    async cityshops(): Promise<Errorable<ICityShop[]>> {
        const query = await fetch(this.buildUri({ route: 'torn', selection: 'cityshops' }), {
            headers: { 'Content-Type': 'application/json' },
            method: 'get'
        });
        return await query.json();
    }

    async companies(): Promise<Errorable<ITornCompany[]>> {
        const query = await fetch(this.buildUri({ route: 'torn', selection: 'companies' }), {
            headers: { 'Content-Type': 'application/json' },
            method: 'get'
        });
        return await query.json();
    }

    async education(): Promise<Errorable<ITornEducation[]>> {
        return this.apiQueryToArray({ route: 'torn', selection: 'education' }, 'id');
    }

    async factiontree(): Promise<Errorable<IFactionTree[]>> {
        const query = await fetch(this.buildUri({ route: 'torn', selection: 'factiontree' }), {
            headers: { 'Content-Type': 'application/json' },
            method: 'get'
        });
        return await query.json();
    }

    async gyms(): Promise<Errorable<ITornGym[]>> {
        return this.apiQueryToArray({ route: 'torn', selection: 'gyms' }, 'id');
    }

    async honors(id?: string): Promise<Errorable<IHonor[]>> {
        return this.apiQueryToArray({ route: 'torn', selection: 'honors', id: id }, 'id');
    }

    async items(): Promise<Errorable<IItem[]>> {
        return this.apiQueryToArray({ route: 'torn', selection: 'items' }, 'id');
    }

    /**
     * Returns item details for a given item.
     * @param uid The unique number identifier of the item
     * @returns The IItemDetails
     */
    async itemdetails(uid: number): Promise<Errorable<IItemDetails>> {
        const query = await fetch(this.buildUri({ route: 'torn', selection: 'itemdetails', id: uid.toString() }), {
            headers: { 'Content-Type': 'application/json' },
            method: 'get'
        });
        return await query.json();
    }

    async logcategories(): Promise<Errorable<IKeyValue[]>> {
        return this.apiQueryToKeyValueArray({ route: 'torn', selection: 'logcategories' });
    }

    async logtypes(): Promise<Errorable<IKeyValue[]>> {
        return this.apiQueryToKeyValueArray({ route: 'torn', selection: 'logtypes' });
    }

    async medals(): Promise<Errorable<IMedal[]>> {
        return this.apiQueryToArray({ route: 'torn', selection: 'medals' }, 'id');
    }

    async organisedcrimes(): Promise<Errorable<IOrganisedCrime[]>> {
        return this.apiQueryToArray({ route: 'torn', selection: 'organisedcrimes' }, 'id');
    }

    async pawnshop(): Promise<Errorable<IPawnshop>> {
        return this.apiQuery({ route: 'torn', selection: 'pawnshop' });
    }

    async properties(): Promise<Errorable<ITornProperty[]>> {
        return this.apiQueryToArray({ route: 'torn', selection: 'properties' }, 'id');
    }

    async pokertables(): Promise<Errorable<IPokerTable[]>> {
        return this.apiQueryToArray({ route: 'torn', selection: 'pokertables' }, 'id');
    }

    async rackets(): Promise<Errorable<IRacket[]>> {
        return this.apiQueryToArray({ route: 'torn', selection: 'rackets' }, 'id');
    }

    async raids(): Promise<Errorable<IRaid[]>> {
        return this.apiQueryToArray({ route: 'torn', selection: 'raids' }, 'id');
    }

    async rankedwars(): Promise<Errorable<IRankedWar[]>> {
        const query = await fetch(this.buildUri({ route: 'torn', selection: 'rankedwars' }), {
            headers: { 'Content-Type': 'application/json' },
            method: 'get'
        });
        return await query.json();
    }

    async rankedwarreport(id: string): Promise<Errorable<IRankedWarReport>> {
        const query = await fetch(this.buildUri({ route: 'torn', selection: 'rankedwarreports', id: id }), {
            headers: { 'Content-Type': 'application/json' },
            method: 'get'
        });
        return await query.json();
    }

    /**
     * Gets the Search For Cash crime status
     *
     * @returns ISearchForCashCrimeStatus object
     */
    async searchforcash(): Promise<Errorable<ISearchForCashCrimeStatus>> {
        return this.apiQuery({ route: 'torn', selection: 'searchforcash' });
    }

    /**
     * Gets the Shoplifting crime status
     *
     * @returns IShopliftingCrimeStatus object
     */
    async shoplifting(): Promise<Errorable<IShopliftingCrimeStatus>> {
        return this.apiQuery({ route: 'torn', selection: 'shoplifting' });
    }

    async stats(): Promise<Errorable<ITornStats>> {
        return this.apiQuery({ route: 'torn', selection: 'stats' });
    }

    async stocks(id?: string): Promise<Errorable<IStock[] | IStockDetail>> {
        if (id) {
            const query = await fetch(this.buildUri({ route: 'torn', selection: 'stocks', id: id }), {
                headers: { 'Content-Type': 'application/json' },
                method: 'get'
            });
            return await query.json();
        } else {
            return this.apiQueryToArray({ route: 'torn', selection: 'stocks' });
        }
    }

    async timestamp(): Promise<Errorable<number>> {
        return this.apiQuery({ route: 'torn', selection: 'timestamp' });
    }

    /**
     * Gets an array of ITerritoryDetail for the specified input territory list.
     *
     * @param terriorties Comma separated list of territories to get the details for. Max 50
     * @returns An array of ITerritoryDetail
     */
    async territory(terriorties: string): Promise<Errorable<ITerritoryDetail[]>> {
        return this.apiQueryToArray({ route: 'torn', selection: 'territory', id: terriorties }, 'id');
    }

    /**
     * Gets an array of Territory names.
     * @returns a string array of Territory names
     */
    async territorynames(): Promise<Errorable<string[]>> {
        return this.apiQueryToArray({ route: 'torn', selection: 'territorynames' });
    }

    /**
     * Gets an array of Territory wars.
     * @returns a string array of Territory wars
     */
    async territorywars(): Promise<Errorable<ITerritoryWar[]>> {
        return this.apiQueryToArray({ route: 'torn', selection: 'territorywars' }, 'id');
    }
}
