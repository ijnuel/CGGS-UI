import { CountryListInterface } from "./country";
import { FamilyListInterface } from "./family";
import { LocalGovernmentAreaListInterface } from "./local-government-area";
import { StateListInterface } from "./state";
import { StudentClassListInterface } from "./student-class";
import { StudentClassSubjectAssessmentScoreListInterface } from "./student-class-subject-assessment-score";
import { CurrentUserInterface } from "./user";

export interface StudentListInterface {
    id: string;
    studentNo?: string;
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
    familyId: string;
    classId: string;
    originLGA?: LocalGovernmentAreaListInterface;
    stateOfOrigin?: StateListInterface;
    nationality?: CountryListInterface;
    residentialState?: StateListInterface;
    user?: CurrentUserInterface;
    family?: FamilyListInterface;
    studentClasses?: StudentClassListInterface[];
    // fees?: FeeListInterface[];
    studentClassSubjectAssessmentScores?: StudentClassSubjectAssessmentScoreListInterface[];
}

export interface StudentFormInterface {
    id?: string;
    studentNo: string;
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
    familyId: string;
    classId: string;
}
