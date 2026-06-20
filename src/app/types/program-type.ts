import { ClassLevelListInterface } from "./class-level";
import { ProgrammeGradeRemarkListInterface } from "./programme-grade-remark";

export interface ProgramTypeListInterface {
    id: string;
    name?: string;
    level: number;
    averagePromotionScore?: number;
    classLevels?: ClassLevelListInterface[];
    programmeGradeRemarks?: ProgrammeGradeRemarkListInterface[];
}

export interface ProgramTypeFormInterface {
    id?: string;
    name: string;
    description: string;
    level: number;
    averagePromotionScore: number;
}
