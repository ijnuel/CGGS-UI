import { CompanyListInterface } from "./company";

export interface AdministratorCompanyListInterface {
  id: string;
  administratorId: string;
  companyId: string;
  company?: CompanyListInterface;
}

export interface AdministratorCompanyFormInterface {
  id?: string;
  administratorId: string;
  companyId: string;
}
