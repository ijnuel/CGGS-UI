export interface AdministratorListInterface {
  id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: number;
  religion: number;
  dateOfBirth: Date;
  originLGAId: string;
  stateOfOriginId: string;
  nationalityId: string;
  homeAddress: string;
  residentialCity: string;
  residentialStateId: string;
  phoneNumber: string;
}

export interface AdministratorFormInterface {
  id?: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: number;
  religion: number;
  dateOfBirth: Date;
  originLGAId: string;
  stateOfOriginId: string;
  nationalityId: string;
  homeAddress: string;
  residentialCity: string;
  residentialStateId: string;
  phoneNumber: string;
}
