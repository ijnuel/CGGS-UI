export interface ResultMarkSheetInterface {
  id: string;
  schoolTermSessionId: string;
  classId: string;
  subjectId: string;
  studentResults: StudentResultInterface[];
  // Add other fields as needed from your API
}

export interface StudentResultInterface {
  id: string;
  studentId: string;
  studentName: string;
  score: number;
  grade?: string;
  remark?: string;
  classSubjectAssessmentId?: string;
  classSubjectAssessmentName?: string;
  scoreWeight?: number;
  // Add other fields as needed
}

export interface AssessmentColumnInterface {
  id: string;
  name: string;
  scoreWeight: number;
}

export interface StudentAssessmentRowInterface {
  studentId: string;
  studentName: string;
  assessmentScores: { [assessmentId: string]: number | null };
}

export interface ResultMarkSheetFormInterface {
  schoolTermSessionId: string;
  classId: string;
  subjectId: string;
}

export interface ResultMarkSheetListInterface extends ResultMarkSheetInterface {} 