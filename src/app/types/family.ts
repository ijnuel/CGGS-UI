import { ApplicationListInterface } from "./application";
import { CountryListInterface } from "./country";
import { LocalGovernmentAreaListInterface } from "./local-government-area";
import { StateListInterface } from "./state";
import { StudentListInterface } from "./student";
export interface FamilyListInterface {
    id: string;
    familyNo?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    gender: number;
    religion: number;
    dateOfBirth: Date;
    originLGAId: string;
    stateOfOriginId: string;
    nationalityId: string;
    homeAddress?: string;
    residentialCity?: string;
    residentialStateId: string;
    phoneNumber?: string;
    status: number;
    userId?: string;
    email?: string;
    originLGA?: LocalGovernmentAreaListInterface;
    stateOfOrigin?: StateListInterface;
    nationality?: CountryListInterface;
    residentialState?: StateListInterface;
    students?: StudentListInterface[];
    applications?: ApplicationListInterface[];
}

export interface FamilyFormInterface {
    id?: string;
    email: string;
    lastName: string;
    religion: number;
    originLgaId: string;
    stateOfOriginId: string;
    nationalityId: string;
    homeAddress: string;
    residentialCity: string;
    residentialStateId: string;
    phoneNumber: string;
}
