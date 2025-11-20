export interface SessionListInterface {
    id: string;
    name: string;
    isCurrent: boolean;
    sNo: number;
    description: string;
    createdDate: string;
}

export interface SessionFormInterface {
    id?: string;
    name: string;
    description: string;
    isCurrent: boolean;
    sNo: number;
}
