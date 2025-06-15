export interface ClassLevelListInterface {
    id: string;
    name: string;
    description: string;
    createdDate: string;
    programmeTypeId: string;
    level: number;
}

export interface ClassLevelFormInterface {
    id?: string;
    name: string;
    description: string;
    programmeTypeId: string;
    level: number;
}
