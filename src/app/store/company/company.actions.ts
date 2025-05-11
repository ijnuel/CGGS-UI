import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  CompanyListInterface,
  CompanyFormInterface,
} from '../../types';

export const getCompanyList = createAction(
  '[Company] Get Company List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getCompanyListSuccess = createAction(
  '[Company/API] Get Company List Success',
  props<{
    payload: GenericResponseInterface<
      PaginatedResponseInterface<CompanyListInterface[]>
    >;
  }>()
);

export const getCompanyListFail = createAction(
  '[Company/API] Get Company List Fail',
  props<{ error: string }>()
);

export const getCompanyById = createAction(
  '[Company] Get Company By Id',
  props<{ companyId: string }>()
);

export const getCompanyByIdSuccess = createAction(
  '[Company/API] Get Company By Id Success',
  props<{
    payload: GenericResponseInterface<CompanyListInterface>;
  }>()
);

export const getCompanyByIdFail = createAction(
  '[Company/API] Get Company By Id Fail',
  props<{ error: string }>()
);

export const createCompany = createAction(
  '[Company] Create Company',
  props<{ payload: CompanyFormInterface }>()
);

export const createCompanySuccess = createAction(
  '[Company/API] Create Company Success',
  props<{ message: string; company: CompanyListInterface }>()
);

export const createCompanyFail = createAction(
  '[Company/API] Create Company Fail',
  props<{ error: string }>()
);

export const editCompany = createAction(
  '[Company] Edit Company',
  props<{ payload: CompanyFormInterface }>()
);

export const editCompanySuccess = createAction(
  '[Company/API] Edit Company Success',
  props<{ message: string; company: CompanyListInterface }>()
);

export const editCompanyFail = createAction(
  '[Company/API] Edit Company Fail',
  props<{ error: string }>()
);
