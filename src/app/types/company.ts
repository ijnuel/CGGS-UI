import { AdministratorListInterface } from "./administrator";

export interface CompanyListInterface {
    id: string;
    name?: string;
    shortName?: string;
    domainName?: string;
    address?: string;
    description?: string;
    principalName?: string;
    teacherShortCode?: string;
    studentShortCode?: string;
    logo?: string;
    isCurrent?: boolean;
    administratorCompanies?: AdministratorListInterface[];
}

export interface CompanyFormInterface {
    id?: string;
    name?: string;
    shortName?: string;
    domainName?: string;
    address?: string;
    description?: string;
    principalName?: string;
    teacherShortCode?: string;
    studentShortCode?: string;
    logo?: string;
}
