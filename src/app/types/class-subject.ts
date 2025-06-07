export interface ClassSubjectInterface {
  id: string;
  classId: string;
  subjectId: string;
  // Add other fields as needed from your API
}

export interface ClassSubjectFormInterface {
  classId: string;
  subjectId: string;
  // Add other fields as needed for creation/updating
}

export interface ClassSubjectListInterface extends ClassSubjectInterface {} 