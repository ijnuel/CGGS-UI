import { GenderEnum, ReligionEnum } from "./user";

export interface AdministratorListInterface {
  id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: GenderEnum;
  religion: ReligionEnum;
  dateOfBirth: string;
  originLGA: string;
  stateOfOrigin: string;
  nationality: string;
  homeAddress: string;
  residentialCity: string;
  residentialState: string;
  phoneNumber: string;
}

export interface AdministratorFormInterface {
  id?: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: GenderEnum;
  religion: ReligionEnum;
  dateOfBirth: string;
  originLGA: string;
  stateOfOrigin: string;
  nationality: string;
  homeAddress: string;
  residentialCity: string;
  residentialState: string;
  phoneNumber: string;
}
