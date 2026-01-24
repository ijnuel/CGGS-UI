import { ClassSubjectListInterface } from "./class-subject";
import { StudentClassSubjectAssessmentScoreListInterface } from "./student-class-subject-assessment-score";

export interface ClassSubjectAssessmentListInterface {
    id: string;
    classSubjectId: string;
    assessmentType?: string;
    scoreWeigth: number;
    classSubject?: ClassSubjectListInterface;
    studentClassSubjectAssessmentScores?: StudentClassSubjectAssessmentScoreListInterface[];
}

export interface ClassSubjectAssessmentFormInterface {
    id?: string;
    name: string;
    description: string;
    classSubjectId: string;
    assessmentType: string;
    scoreWeigth: number;
}
