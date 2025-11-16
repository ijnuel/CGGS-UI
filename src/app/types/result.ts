export interface StudentInterface {
  id: string;
  userId: string;
  email: string;
  studentNo: string;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: number;
  religion: number;
  dateOfBirth: string;
  originLGAId: string;
  stateOfOriginId: string;
  nationalityId: string;
  homeAddress: string;
  residentialCity: string;
  residentialStateId: string;
  phoneNumber: string;
  familyId: string;
  classId: string;
}

export interface ClassSubjectAssessmentInterface {
  id: string;
  classSubjectId: string;
  assessmentType: string;
  scoreWeigth: number;
}

export interface StudentAssessmentScoreInterface {
  id: string;
  student: StudentInterface;
  classSubjectAssessment: ClassSubjectAssessmentInterface;
  studentId: string;
  classSubjectAssessmentId: string;
  score: number;
  skillGrade: number | null;
}

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
  studentNo: string;
  studentName: string;
  assessmentScores: { [assessmentId: string]: number | null };
  skillGrades: { [assessmentId: string]: number | null };
  assessmentEntryIds?: { [assessmentId: string]: string | null };
}

export interface ResultMarkSheetFormInterface {
  schoolTermSessionId: string;
  classId: string;
  subjectId: string;
}

export interface ResultMarkSheetListInterface extends ResultMarkSheetInterface {} 