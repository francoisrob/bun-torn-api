import { Company } from './Company';
import { Faction } from './Faction';
import { ItemMarket } from './ItemMarket';
import { ITornApiError } from './Interfaces';
import { Property } from './Property';
import { Torn } from './Torn';
import { User } from './User';
import { ApiKey } from './Key';
import * as TornInterfaces from './Interfaces';

class TornAPI {
    constructor(apiKey?: string, comment?: string) {
        if (apiKey) {
            this.setKey(apiKey);
        }

        if (comment) {
            this.setComment(comment);
        }
    }

    private resetInternal(): void {
        this._torn = null;
        this._user = null;
        this._faction = null;
        this._property = null;
        this._itemmarket = null;
        this._company = null;
        this._apikey = null;
    }

    private apiKey = '';
    public setKey(apiKey: string): void {
        // only reset if the key has changed
        if (this.apiKey !== apiKey) {
            this.apiKey = apiKey;

            // when the key changes, reset all the internals
            this.resetInternal();
        }
    }

    private comment = '';
    public setComment(comment: string): void {
        // only reset if the comment has changed
        if (this.comment !== comment) {
            this.comment = comment;

            // when the comment changes, reset all the internals
            this.resetInternal();
        }
    }

    private _torn: Torn | null = null;
    get torn(): Torn {
        if (!this._torn) {
            this._torn = new Torn(this.apiKey, this.comment);
        }

        return this._torn;
    }

    private _user: User | null = null;
    get user(): User {
        if (!this._user) {
            this._user = new User(this.apiKey, this.comment);
        }

        return this._user;
    }

    private _faction: Faction | null = null;
    get faction(): Faction {
        if (!this._faction) {
            this._faction = new Faction(this.apiKey, this.comment);
        }

        return this._faction;
    }

    private _property: Property | null = null;
    get property(): Property {
        if (!this._property) {
            this._property = new Property(this.apiKey, this.comment);
        }

        return this._property;
    }

    private _company: Company | null = null;
    get company(): Company {
        if (!this._company) {
            this._company = new Company(this.apiKey, this.comment);
        }

        return this._company;
    }

    private _itemmarket: ItemMarket | null = null;
    get itemmarket(): ItemMarket {
        if (!this._itemmarket) {
            this._itemmarket = new ItemMarket(this.apiKey, this.comment);
        }

        return this._itemmarket;
    }

    private _apikey: ApiKey | null = null;
    get key(): ApiKey {
        if (!this._apikey) {
            this._apikey = new ApiKey(this.apiKey, this.comment);
        }

        return this._apikey;
    }

    public static isError(input: any): input is ITornApiError {
        if (input) {
            return input?.error !== undefined;
        }

        return true;
    }
}

export { TornAPI, TornInterfaces, Torn, Company, Faction, Property, User, ItemMarket };
