import { createAction, props } from '@ngrx/store';
import { GenericResponseInterface, PaginatedResponseInterface, PageQueryInterface, QueryInterface } from '../../types';
import { CompanyCoreValueListInterface, CompanyCoreValueFormInterface } from '../../types/company-core-value';

export const getCompanyCoreValueAll = createAction('[CompanyCoreValue] Get All', props<{ query?: QueryInterface }>());
export const getCompanyCoreValueAllSuccess = createAction('[CompanyCoreValue/API] Get All Success', props<{ payload: GenericResponseInterface<CompanyCoreValueListInterface[]> }>());
export const getCompanyCoreValueAllFail = createAction('[CompanyCoreValue/API] Get All Fail', props<{ error: string }>());

export const getCompanyCoreValueList = createAction('[CompanyCoreValue] Get List', props<{ pageQuery: PageQueryInterface }>());
export const getCompanyCoreValueListSuccess = createAction('[CompanyCoreValue/API] Get List Success', props<{ payload: GenericResponseInterface<PaginatedResponseInterface<CompanyCoreValueListInterface[]>> }>());
export const getCompanyCoreValueListFail = createAction('[CompanyCoreValue/API] Get List Fail', props<{ error: string }>());

export const getCompanyCoreValueById = createAction('[CompanyCoreValue] Get By Id', props<{ companyCoreValueId: string }>());
export const getCompanyCoreValueByIdSuccess = createAction('[CompanyCoreValue/API] Get By Id Success', props<{ payload: GenericResponseInterface<CompanyCoreValueListInterface> }>());
export const getCompanyCoreValueByIdFail = createAction('[CompanyCoreValue/API] Get By Id Fail', props<{ error: string }>());

export const createCompanyCoreValue = createAction('[CompanyCoreValue] Create', props<{ payload: CompanyCoreValueFormInterface }>());
export const createCompanyCoreValueSuccess = createAction('[CompanyCoreValue/API] Create Success', props<{ payload: GenericResponseInterface<CompanyCoreValueListInterface> }>());
export const createCompanyCoreValueFail = createAction('[CompanyCoreValue/API] Create Fail', props<{ error: string }>());

export const updateCompanyCoreValue = createAction('[CompanyCoreValue] Update', props<{ payload: CompanyCoreValueFormInterface }>());
export const updateCompanyCoreValueSuccess = createAction('[CompanyCoreValue/API] Update Success', props<{ payload: GenericResponseInterface<CompanyCoreValueListInterface> }>());
export const updateCompanyCoreValueFail = createAction('[CompanyCoreValue/API] Update Fail', props<{ error: string }>());

export const deleteCompanyCoreValue = createAction('[CompanyCoreValue] Delete', props<{ companyCoreValueId: string }>());
export const deleteCompanyCoreValueSuccess = createAction('[CompanyCoreValue/API] Delete Success', props<{ payload: GenericResponseInterface<boolean> }>());
export const deleteCompanyCoreValueFail = createAction('[CompanyCoreValue/API] Delete Fail', props<{ error: string }>());
