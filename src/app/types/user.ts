export interface CurrentUserInterface {
  userId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: GenderEnum;
  religion: ReligionEnum;
  dateOfBirth: Date;
  originLGA: string;
  stateOfOrigin: string;
  nationality: string;
  homeAddress: string;
  residentialCity: string;
  residentialState: string;
  phoneNumber: string;
}

export enum GenderEnum {
  MALE = 0,
  FEMALE = 1,
}

export enum ReligionEnum {
  CHRISTIANITY = 0,
  MUSLIM = 1,
}

export interface UserListInterface {
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

export interface UserFormInterface {
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
