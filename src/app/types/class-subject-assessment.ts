export interface ClassSubjectAssessmentListInterface {
    id: string;
    name: string;
    description: string;
    createdDate: string;
    classSubjectId: string;
    assessmentType: string;
    scoreWeigth: number;
}

export interface ClassSubjectAssessmentFormInterface {
    id?: string;
    name: string;
    description: string;
    classSubjectId: string;
    assessmentType: string;
    scoreWeigth: number;
}
