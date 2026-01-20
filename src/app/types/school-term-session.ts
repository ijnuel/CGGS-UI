export interface SchoolTermSessionListInterface {
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
    noOfOpenedDays: number;
}

export interface SchoolTermSessionFormInterface {
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
    noOfOpenedDays: number;
}
