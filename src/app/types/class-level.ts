import { ClassListInterface } from "./class";
import { ProgramTypeListInterface } from "./program-type";
import { ApplicationListInterface } from "./application";

export interface ClassLevelListInterface {
    id: string;
    name?: string;
    level: number;
    programmeTypeId: string;
    programmeType?: ProgramTypeListInterface;
    classes?: ClassListInterface[];
    applications?: ApplicationListInterface[];
}

export interface ClassLevelFormInterface {
    id?: string;
    name: string;
    description: string;
    programmeTypeId: string;
    level: number;
}
