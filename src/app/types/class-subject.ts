export interface ClassSubjectListInterface {
    id: string;
    name: string;
    description: string;
    createdDate: string;
    classId: string;
    subjectId: string;
    staffId: string;
    schoolTermSessionId: string;
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
