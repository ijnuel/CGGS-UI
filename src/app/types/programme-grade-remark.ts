export interface ProgrammeGradeRemarkListInterface {
  id: string;
  programTypeId: string;
  minimumScore: number;
  maximumScore: number;
  grade: string;
  remark: string;
}

export interface ProgrammeGradeRemarkFormInterface {
  id?: string;
  programTypeId: string;
  minimumScore: number;
  maximumScore: number;
  grade: string;
  remark: string;
}
