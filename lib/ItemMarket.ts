import { TornAPIBase } from './TornAPIBase';
import { Errorable, IMarketItem, IPointsMarket } from './Interfaces';

export class ItemMarket extends TornAPIBase {
    constructor(apiKey: string, comment: string) {
        super(apiKey, comment);
    }

    async multi(endpoints: string[], id?: string): Promise<Errorable<Record<string, object>>> {
        return this.multiQuery('market', endpoints, id);
    }

    async all(id: string): Promise<Errorable<IMarketItem[]>> {
        const query = await fetch(this.buildUri({ route: 'market', selection: 'bazaar,itemmarket', id: id }), {
            headers: { 'Content-Type': 'application/json' },
            method: 'get'
        });
        if (query instanceof Error) {
            return { code: 0, error: query.message };
        } else {
            const response = await query.json();
            if (response.data && response.data.error) {
                return response.data.error;
            } else if (response.data) {
                return [...response.data.bazaar, ...response.data.itemmarket];
            }

            return TornAPIBase.GenericAPIError;
        }
    }

    async bazaar(id: string): Promise<Errorable<IMarketItem[]>> {
        return this.apiQuery({ route: 'market', selection: 'bazaar', id: id });
    }

    async itemmarket(id: string): Promise<Errorable<IMarketItem[]>> {
        return this.apiQuery({ route: 'market', selection: 'itemmarket', id: id });
    }

    async pointsmarket(): Promise<Errorable<IPointsMarket[]>> {
        return this.apiQueryToArray({ route: 'market', selection: 'pointsmarket' }, 'id');
    }
}
