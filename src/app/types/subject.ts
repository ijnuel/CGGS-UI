export interface SubjectListInterface {
    id: string;
    name: string;
    description: string;
    createdDate: string;
    subjectType: string;
}

export interface SubjectFormInterface {
    id?: string;
    name: string;
    description: string;
    subjectType: string;
}
