import { SchoolTermSessionListInterface } from "./school-term-session";
import { StudentClassListInterface } from "./student-class";

export interface SessionListInterface {
    id: string;
    name?: string;
    isCurrent: boolean;
    sNo: number;
    studentClasses?: StudentClassListInterface[];
    schoolTermSessions?: SchoolTermSessionListInterface[];
    // fees?: FeeListInterface[];
    // feeSetups?: FeeSetupListInterface[];
}

export interface SessionFormInterface {
    id?: string;
    name: string;
    description: string;
    isCurrent: boolean;
    sNo: number;
}
