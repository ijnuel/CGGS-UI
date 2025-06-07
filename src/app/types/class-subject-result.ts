export interface ClassSubjectResultInterface {
  id: string;
  classSubjectId: string;
  studentId: string;
  score: number;
  // Add other fields as needed from your API
}

export interface ClassSubjectResultFormInterface {
  classSubjectId: string;
  studentId: string;
  score: number;
  // Add other fields as needed for creation/updating
}

export interface ClassSubjectResultListInterface extends ClassSubjectResultInterface {} 