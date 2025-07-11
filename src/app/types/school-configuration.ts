export interface SchoolConfigurationListInterface {
    id: string;
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
}

export interface SchoolConfigurationFormInterface {
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
}
