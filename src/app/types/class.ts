export interface ClassListInterface {
    id: string;
    name: string;
    description: string;
    createdDate: string;
    classLevelId: string;
}

export interface ClassFormInterface {
    id?: string;
    name: string;
    description: string;
    classLevelId: string;
}
