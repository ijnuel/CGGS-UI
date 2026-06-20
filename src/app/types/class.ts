import { ClassLevelListInterface } from "./class-level";
import { StudentClassListInterface } from "./student-class";
import { StaffListInterface } from "./staff";
import { ClassSubjectListInterface } from "./class-subject";

export interface ClassListInterface {
    id: string;
    name?: string;
    description?: string;
    classLevelId: string;
    staffId?: string;
    nextClassId?: string;
    classLevel?: ClassLevelListInterface;
    staff?: StaffListInterface;
    nextClass?: ClassListInterface;
    classSubjects?: ClassSubjectListInterface[];
    studentClasses?: StudentClassListInterface[];
    // feeSetups?: FeeSetupListInterface[];
}

export interface ClassFormInterface {
    id?: string;
    name: string;
    description: string;
    classLevelId: string;
    staffId: string;
    nextClassId?: string;
}
