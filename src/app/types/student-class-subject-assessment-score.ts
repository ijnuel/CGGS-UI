import { ClassSubjectAssessmentListInterface } from "./class-subject-assessment";
import { StudentListInterface } from "./student";

export interface StudentClassSubjectAssessmentScoreListInterface {
  id: string;
  studentId: string;
  classSubjectAssessmentId: string;
  score: number;
  skillGrade: string | null;
  student?: StudentListInterface; // StudentResponseDto
  classSubjectAssessment?: ClassSubjectAssessmentListInterface; // ClassSubjectAssessmentResponseDto
  comment: string;
}

export interface StudentClassSubjectAssessmentScoreFormInterface {
  id?: string;
  studentId: string;
  classSubjectAssessmentId: string;
  score: number;
  skillGrade?: number | null;
  comment: string;
}
