export interface ProgrammeGradeRemarkListInterface {
  id: string;
  programTypeId: string;
  minimumScore: number;
  maximumScore: number;
  grade?: string;
  remark?: string;
  programType?: any;
}

export interface ProgrammeGradeRemarkFormInterface {
  id?: string;
  programTypeId: string;
  minimumScore: number;
  maximumScore: number;
  grade: string;
  remark: string;
}
