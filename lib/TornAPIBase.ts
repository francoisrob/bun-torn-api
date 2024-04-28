import { IKeyValue, ITornApiError } from './Interfaces';

export abstract class TornAPIBase {
    protected apiKey: string;
    protected comment: string;
    protected static GenericAPIError = { code: 0, error: 'Unknown error occurred' };

    constructor(apiKey: string, comment: string) {
        this.apiKey = apiKey;
        this.comment = comment;
    }

    protected async apiQuery<T>(params: QueryParams): Promise<T | ITornApiError> {
        const query = await fetch(this.buildUri(params), {
            headers: { 'Content-Type': 'application/json' },
            method: 'get'
        });
        return await query.json();
    }

    protected async apiQueryToArray<T>(params: QueryParams, keyField?: string): Promise<T[] | ITornApiError> {
        const query = await fetch(this.buildUri(params), {
            headers: { 'Content-Type': 'application/json' },
            method: 'get'
        });
        return await query.json();
    }

    protected async apiQueryToKeyValueArray(params: QueryParams): Promise<IKeyValue[] | ITornApiError> {
        const query = await fetch(this.buildUri(params), {
            headers: { 'Content-Type': 'application/json' },
            method: 'get'
        });
        return await query.json();
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    protected fixStringArray<T>(mapLike: any, keyField: string): T[] {
        const returnArray: T[] = [];
        if (mapLike) {
            const ids = Object.keys(mapLike);
            for (let i = 0; i < ids.length; i++) {
                const id = ids[i];
                const field = mapLike[id];
                if (typeof field === 'object') {
                    if (keyField) {
                        field[keyField] = id;
                    }
                    returnArray.push(field);
                }
            }
        }

        return returnArray;
    }

    protected buildUri(params: QueryParams): string {
        const url = new URL(`${params.route}/${params.id}`, `https://api.torn.com`);
        url.searchParams.set('selections', params.selection);
        url.searchParams.set('key', this.apiKey);

        if (params.additionalSelections) {
            for (const key in params.additionalSelections) {
                url.searchParams.set(key, params.additionalSelections[key]);
            }
        }

        if (params.from) {
            url.searchParams.set('from', params.from.toString());
        }

        if (params.to) {
            url.searchParams.set('to', params.to.toString());
        }

        if (params.limit) {
            url.searchParams.set('limit', params.limit.toString());
        }

        if (params.timestamp) {
            url.searchParams.set('timestamp', params.timestamp.toString());
        }

        if (this.comment) {
            url.searchParams.set('comment', this.comment);
        }

        return url.toString();
    }

    protected async multiQuery<T>(route: string, endpoints: string[], id?: string): Promise<ITornApiError | Record<string, T>> {
        const query = await fetch(this.buildUri({ route: route, selection: endpoints.join(','), id: id }), {
            headers: { 'Content-Type': 'application/json' },
            method: 'get'
        });
        return await query.json();
    }
}

interface QueryParams {
    route: string;
    selection: string;
    id?: string;
    jsonOverride?: string;
    from?: number;
    to?: number;
    limit?: number;
    timestamp?: number;
    additionalSelections?: Record<string, string>;
}
