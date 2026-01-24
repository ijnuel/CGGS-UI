import { ClassSubjectListInterface } from "./class-subject";
import { CountryListInterface } from "./country";
import { LocalGovernmentAreaListInterface } from "./local-government-area";
import { StateListInterface } from "./state";
import { CurrentUserInterface } from "./user";

export interface StaffListInterface {
    id: string;
    staffNo?: string;
    userId?: string;
    email?: string;
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
    originLGA?: LocalGovernmentAreaListInterface;
    stateOfOrigin?: StateListInterface;
    nationality?: CountryListInterface;
    residentialState?: StateListInterface;
    user?: CurrentUserInterface;
    classSubjects?: ClassSubjectListInterface[];
}

export interface StaffFormInterface {
    id?: string;
    teacherNo: string;
    userId: string;
    email: string;
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
    staffNo: string;
}
