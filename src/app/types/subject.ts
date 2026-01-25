import { ClassSubjectListInterface } from "./class-subject";

export interface SubjectListInterface {
    id: string;
    name?: string;
    subjectType: string;
    classSubjects?: ClassSubjectListInterface[];
}

export interface SubjectFormInterface {
    id?: string;
    name: string;
    description: string;
    subjectType: string;
}
