import { AdministratorListInterface } from "./administrator";

export interface CompanyListInterface {
    id: string;
    name?: string;
    isCurrent?: boolean;
    administratorCompanies?: AdministratorListInterface[];
}

export interface CompanyFormInterface {
    id?: string;
    name?: string;
    isCurrent: boolean;
}
