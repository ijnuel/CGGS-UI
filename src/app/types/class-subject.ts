import { ClassListInterface } from "./class";
import { ClassSubjectAssessmentListInterface } from "./class-subject-assessment";
import { SchoolTermSessionListInterface } from "./school-term-session";
import { StaffListInterface } from "./staff";
import { SubjectListInterface } from "./subject";

export interface ClassSubjectListInterface {
    id: string;
    isActive: boolean;
    classId: string;
    subjectId: string;
    staffId?: string;
    schoolTermSessionId: string;
    class?: ClassListInterface;
    subject?: SubjectListInterface;
    staff?: StaffListInterface;
    schoolTermSession?: SchoolTermSessionListInterface;
    classSubjectAssessments?: ClassSubjectAssessmentListInterface[];
}

export interface ClassSubjectFormInterface {
    id?: string;
    name: string;
    description: string;
    classId: string;
    subjectId: string;
    staffId: string;
    schoolTermSessionId: string;
}
