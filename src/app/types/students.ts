export interface StudentsListInterface {
  id: string;
  userId: string;
  email: string;
  studentNo: string;
  classId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: number;
  religion: number;
  dateOfBirth: Date;
  originLGA: string;
  stateOfOrigin: string;
  nationality: string;
  homeAddress: string;
  residentialCity: string;
  residentialState: string;
  phoneNumber: string;
}

export interface StudentFormInterface {
  id?: string;
  userId: string;
  email: string;
  studentNo: string;
  classId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: number;
  religion: number;
  dateOfBirth: Date;
  originLGA: string;
  stateOfOrigin: string;
  nationality: string;
  homeAddress: string;
  residentialCity: string;
  residentialState: string;
  phoneNumber: string;
}
