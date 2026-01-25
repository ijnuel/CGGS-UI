import { CountryListInterface } from "./country";
import { LocalGovernmentAreaListInterface } from "./local-government-area";
import { StateListInterface } from "./state";
import { CurrentUserInterface } from "./user";
import { CompanyListInterface } from "./company";

export interface AdministratorListInterface {
  id: string;
  userId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  gender: number;
  religion: number;
  dateOfBirth: Date;
  originLGAId: string;
  stateOfOriginId: string;
  nationalityId: string;
  homeAddress?: string;
  residentialCity?: string;
  residentialStateId: string;
  phoneNumber?: string;
  originLGA?: LocalGovernmentAreaListInterface;
  stateOfOrigin?: StateListInterface;
  nationality?: CountryListInterface;
  residentialState?: StateListInterface;
  user?: CurrentUserInterface;
  administratorCompanies?: CompanyListInterface[];
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
