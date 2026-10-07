import { AdministratorListInterface } from "./administrator";

export interface CompanyListInterface {
    id: string;
    name?: string;
    shortName?: string;
    domainName?: string;
    address?: string;
    description?: string;
    mission?: string;
    vision?: string;
    principalName?: string;
    teacherShortCode?: string;
    studentShortCode?: string;
    logo?: string;
    isCurrent?: boolean;
    phoneNumber?: string;
    email?: string;
    whatsApp?: string;
    facebookUrl?: string;
    instagramUrl?: string;
    yearFounded?: number;
    administratorCompanies?: AdministratorListInterface[];
}

export interface CompanyFormInterface {
    id?: string;
    name?: string;
    shortName?: string;
    domainName?: string;
    address?: string;
    description?: string;
    mission?: string;
    vision?: string;
    principalName?: string;
    teacherShortCode?: string;
    studentShortCode?: string;
    logo?: string;
    phoneNumber?: string;
    email?: string;
    whatsApp?: string;
    facebookUrl?: string;
    instagramUrl?: string;
    yearFounded?: number;
}
