import { ClassSubjectListInterface } from "./class-subject";
import { SessionListInterface } from "./session";

export interface SchoolTermSessionListInterface {
    id: string;
    term: number;
    sessionId: string;
    termStartDate: string;
    termEndDate: string;
    isCurrent: boolean;
    noOfOpenedDays: number;
    session?: string;
    termString?: string;
    sessionObject?: SessionListInterface;
    classSubjects?: ClassSubjectListInterface[];
}

export interface SchoolTermSessionFormInterface {
    id?: string;
    name: string;
    description: string;
    createdDate: string;
    sessionId: string;
    session: string;
    term: number;
    termString: string;
    termEndDate: string;
    termStartDate: string;
    isCurrent : boolean;
    noOfOpenedDays: number;
}
