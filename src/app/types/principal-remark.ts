import { ProgramTypeListInterface } from "./program-type";

export interface PrincipalRemarkListInterface {
    id: string;
    programTypeId: string;
    minimumScore: number;
    maximumScore: number;
    remark?: string;
    programType?: ProgramTypeListInterface;
}

export interface PrincipalRemarkFormInterface {
    id?: string;
    programTypeId: string;
    minimumScore: number;
    maximumScore: number;
    remark: string;
}
