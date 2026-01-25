import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  QueryInterface,
  CompanyListInterface,
  CompanyFormInterface,
} from '../../types';

// Get All (non-paginated)
export const getCompanyAll = createAction('[Company] Get All', props<{ query?: QueryInterface }>());

export const getCompanyAllSuccess = createAction(
  '[Company/API] Get All Success',
  props<{
    payload: GenericResponseInterface<CompanyListInterface[]>;
  }>()
);

export const getCompanyAllFail = createAction(
  '[Company/API] Get All Fail',
  props<{ error: string }>()
);

// Get All Paginated
export const getCompanyList = createAction(
  '[Company] Get List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getCompanyListSuccess = createAction(
  '[Company/API] Get List Success',
  props<{
    payload: GenericResponseInterface<PaginatedResponseInterface<CompanyListInterface[]>>;
  }>()
);

export const getCompanyListFail = createAction(
  '[Company/API] Get List Fail',
  props<{ error: string }>()
);

// Get By Id
export const getCompanyById = createAction(
  '[Company] Get By Id',
  props<{ companyId: string }>()
);

export const getCompanyByIdSuccess = createAction(
  '[Company/API] Get By Id Success',
  props<{
    payload: GenericResponseInterface<CompanyListInterface>;
  }>()
);

export const getCompanyByIdFail = createAction(
  '[Company/API] Get By Id Fail',
  props<{ error: string }>()
);

// Get By Properties
export const getCompanyByProperties = createAction(
  '[Company] Get By Properties',
  props<{ properties: Partial<CompanyFormInterface> }>()
);

export const getCompanyByPropertiesSuccess = createAction(
  '[Company/API] Get By Properties Success',
  props<{
    payload: GenericResponseInterface<CompanyListInterface[]>;
  }>()
);

export const getCompanyByPropertiesFail = createAction(
  '[Company/API] Get By Properties Fail',
  props<{ error: string }>()
);

// Exists
export const companyExists = createAction(
  '[Company] Exists',
  props<{ properties: Partial<CompanyFormInterface> }>()
);

export const companyExistsSuccess = createAction(
  '[Company/API] Exists Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const companyExistsFail = createAction(
  '[Company/API] Exists Fail',
  props<{ error: string }>()
);

// Count
export const companyCount = createAction('[Company] Count');

export const companyCountSuccess = createAction(
  '[Company/API] Count Success',
  props<{
    payload: GenericResponseInterface<number>;
  }>()
);

export const companyCountFail = createAction(
  '[Company/API] Count Fail',
  props<{ error: string }>()
);

// Create
export const createCompany = createAction(
  '[Company] Create',
  props<{ payload: CompanyFormInterface }>()
);

export const createCompanySuccess = createAction(
  '[Company/API] Create Success',
  props<{
    payload: GenericResponseInterface<CompanyListInterface>;
  }>()
);

export const createCompanyFail = createAction(
  '[Company/API] Create Fail',
  props<{ error: string }>()
);

// Update
export const updateCompany = createAction(
  '[Company] Update',
  props<{ payload: CompanyFormInterface }>()
);

export const updateCompanySuccess = createAction(
  '[Company/API] Update Success',
  props<{
    payload: GenericResponseInterface<CompanyListInterface>;
  }>()
);

export const updateCompanyFail = createAction(
  '[Company/API] Update Fail',
  props<{ error: string }>()
);

// Delete
export const deleteCompany = createAction(
  '[Company] Delete',
  props<{ companyId: string }>()
);

export const deleteCompanySuccess = createAction(
  '[Company/API] Delete Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteCompanyFail = createAction(
  '[Company/API] Delete Fail',
  props<{ error: string }>()
);

// Create Many
export const createManyCompanys = createAction(
  '[Company] Create Many',
  props<{ payload: CompanyFormInterface[] }>()
);

export const createManyCompanysSuccess = createAction(
  '[Company/API] Create Many Success',
  props<{
    payload: GenericResponseInterface<CompanyListInterface[]>;
  }>()
);

export const createManyCompanysFail = createAction(
  '[Company/API] Create Many Fail',
  props<{ error: string }>()
);

// Update Many
export const updateManyCompanys = createAction(
  '[Company] Update Many',
  props<{ payload: CompanyFormInterface[] }>()
);

export const updateManyCompanysSuccess = createAction(
  '[Company/API] Update Many Success',
  props<{
    payload: GenericResponseInterface<CompanyListInterface[]>;
  }>()
);

export const updateManyCompanysFail = createAction(
  '[Company/API] Update Many Fail',
  props<{ error: string }>()
);

// Delete Many
export const deleteManyCompanys = createAction(
  '[Company] Delete Many',
  props<{ companyIds: string[] }>()
);

export const deleteManyCompanysSuccess = createAction(
  '[Company/API] Delete Many Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteManyCompanysFail = createAction(
  '[Company/API] Delete Many Fail',
  props<{ error: string }>()
);
