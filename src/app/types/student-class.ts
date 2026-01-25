import { ClassListInterface } from "./class";
import { StudentListInterface } from "./student";
import { SessionListInterface } from "./session";

export interface StudentClassListInterface {
    id: string;
    studentId: string;
    classId: string;
    sessionId: string;
    studentFullName?: string;
    studentNo?: string;
    student?: StudentListInterface;
    class?: ClassListInterface;
    session?: SessionListInterface;
    // fees?: FeeListInterface[];
}

export interface StudentClassFormInterface {
    id?: string;
    studentId?: string;
    sessionId?: string;
    classId?: string;
    name?: string;
}
