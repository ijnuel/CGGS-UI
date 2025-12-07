export interface PrincipalRemarkListInterface {
    id: string;
    programTypeId: string;
    minimumScore: number;
    maximumScore: number;
    remark: string;
    programType?: string; // Added for display purposes
}

export interface PrincipalRemarkFormInterface {
    id?: string;
    programTypeId: string;
    minimumScore: number;
    maximumScore: number;
    remark: string;
}
