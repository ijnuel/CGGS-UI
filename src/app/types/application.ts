import { ClassLevelListInterface } from "./class-level";
import { StateListInterface } from "./state";
import { CountryListInterface } from "./country";
import { FamilyListInterface } from "./family";
import { LocalGovernmentAreaListInterface } from "./local-government-area";

export interface ApplicationListInterface {
    id: string;
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
    familyId: string;
    originLGA?: LocalGovernmentAreaListInterface;
    stateOfOrigin?: StateListInterface;
    nationality?: CountryListInterface;
    residentialState?: StateListInterface;
    family?: FamilyListInterface;
    classLevel?: ClassLevelListInterface;
}

export interface ApplicationFormInterface {
    id?: string;
    familyNo?: string;
    firstName: string;
    lastName: string;
    middleName: string;
    gender: number;
    religion: number;
    dateOfBirth: Date;
    originLGAId: string;
    stateOfOriginId: string;
    nationalityId: string;
    homeAddress: string;
    residentialCity: string;
    residentialStateId: string;
    phoneNumber: string;
}
