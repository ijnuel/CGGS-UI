export interface StudentClassSubjectAssessmentScoreListInterface {
  id: string;
  studentId: string;
  classSubjectAssessmentId: string;
  score: number;
  skillGrade: string | null;
  student?: any; // StudentResponseDto
  classSubjectAssessment?: any; // ClassSubjectAssessmentResponseDto
}

export interface StudentClassSubjectAssessmentScoreFormInterface {
  id?: string;
  studentId: string;
  classSubjectAssessmentId: string;
  score: number;
  skillGrade?: string | null;
}
