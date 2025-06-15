export interface ClassSubjectListInterface {
    id: string;
    name: string;
    description: string;
    createdDate: string;
    classId: string;
    subjectId: string;
    sessionId: string;
    term: number;
}

export interface ClassSubjectFormInterface {
    id?: string;
    name: string;
    description: string;
    classId: string;
    subjectId: string;
    sessionId: string;
    term: number;
}
