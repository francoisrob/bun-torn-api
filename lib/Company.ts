import { TornAPIBase } from './TornAPIBase';
import { ICompanyDetailed, ICompany, ICompanyEmployee, ICompanyProfile, INews, ICompanyStock, Errorable } from './Interfaces';

export class Company extends TornAPIBase {
    constructor(apiKey: string, comment: string) {
        super(apiKey, comment);
    }

    async multi(endpoints: string[], id?: string): Promise<Errorable<Record<string, object>>> {
        return this.multiQuery('company', endpoints, id);
    }

    async applications(): Promise<undefined> {
        throw new Error('Method not implemented.');
    }

    async companies(id: string): Promise<Errorable<ICompany[]>> {
        return this.apiQueryToArray({ route: 'company', selection: 'companies', jsonOverride: 'company', id: id });
    }

    async detailed(): Promise<Errorable<ICompanyDetailed>> {
        return this.apiQuery({ route: 'company', selection: 'detailed', jsonOverride: 'company_detailed' });
    }

    async employees(id?: string): Promise<Errorable<ICompanyEmployee[]>> {
        return this.apiQueryToArray({ route: 'company', selection: 'employees', jsonOverride: 'company_employees', id: id }, 'id');
    }

    async news(from?: number, to?: number): Promise<Errorable<INews[]>> {
        return this.apiQueryToArray({ route: 'company', selection: 'news', from: from, to: to }, 'id');
    }

    async profile(id?: string): Promise<Errorable<ICompanyProfile>> {
        const query = await fetch(this.buildUri({ route: 'company', selection: 'profile', id: id }), {
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
                const companyProfile: ICompanyProfile = response.data.company;
                companyProfile.employees = this.fixStringArray(companyProfile.employees, 'id');
                return companyProfile;
            }
        }

        return TornAPIBase.GenericAPIError;
    }

    async stock(): Promise<Errorable<ICompanyStock[]>> {
        return this.apiQueryToArray({ route: 'company', selection: 'stock', jsonOverride: 'company_stock' }, 'name');
    }
}
