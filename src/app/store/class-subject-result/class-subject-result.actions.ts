import { createAction, props } from '@ngrx/store';
import { ClassSubjectResultInterface, ClassSubjectResultFormInterface } from '../../types/class-subject-result';
import { GenericResponseInterface, PaginatedResponseInterface, PageQueryInterface } from '../../types';

export const loadClassSubjectResults = createAction('[ClassSubjectResult] Load All');
export const loadClassSubjectResultsSuccess = createAction('[ClassSubjectResult/API] Load All Success', props<{ payload: GenericResponseInterface<ClassSubjectResultInterface[]> }>());
export const loadClassSubjectResultsFail = createAction('[ClassSubjectResult/API] Load All Fail', props<{ error: string }>());

export const loadClassSubjectResultsPaginated = createAction('[ClassSubjectResult] Load All Paginated', props<{ pageQuery: PageQueryInterface }>());
export const loadClassSubjectResultsPaginatedSuccess = createAction('[ClassSubjectResult/API] Load All Paginated Success', props<{ payload: GenericResponseInterface<PaginatedResponseInterface<ClassSubjectResultInterface[]>> }>());
export const loadClassSubjectResultsPaginatedFail = createAction('[ClassSubjectResult/API] Load All Paginated Fail', props<{ error: string }>());

export const getClassSubjectResultById = createAction('[ClassSubjectResult] Get By Id', props<{ id: string }>());
export const getClassSubjectResultByIdSuccess = createAction('[ClassSubjectResult/API] Get By Id Success', props<{ payload: GenericResponseInterface<ClassSubjectResultInterface> }>());
export const getClassSubjectResultByIdFail = createAction('[ClassSubjectResult/API] Get By Id Fail', props<{ error: string }>());

export const getClassSubjectResultByProperties = createAction('[ClassSubjectResult] Get By Properties', props<{ properties: Partial<ClassSubjectResultInterface> }>());
export const getClassSubjectResultByPropertiesSuccess = createAction('[ClassSubjectResult/API] Get By Properties Success', props<{ payload: GenericResponseInterface<ClassSubjectResultInterface[]> }>());
export const getClassSubjectResultByPropertiesFail = createAction('[ClassSubjectResult/API] Get By Properties Fail', props<{ error: string }>());

export const classSubjectResultExists = createAction('[ClassSubjectResult] Exists', props<{ properties: Partial<ClassSubjectResultInterface> }>());
export const classSubjectResultExistsSuccess = createAction('[ClassSubjectResult/API] Exists Success', props<{ payload: GenericResponseInterface<boolean> }>());
export const classSubjectResultExistsFail = createAction('[ClassSubjectResult/API] Exists Fail', props<{ error: string }>());

export const classSubjectResultCount = createAction('[ClassSubjectResult] Count');
export const classSubjectResultCountSuccess = createAction('[ClassSubjectResult/API] Count Success', props<{ payload: GenericResponseInterface<number> }>());
export const classSubjectResultCountFail = createAction('[ClassSubjectResult/API] Count Fail', props<{ error: string }>());

export const createClassSubjectResult = createAction('[ClassSubjectResult] Create', props<{ form: ClassSubjectResultFormInterface }>());
export const createClassSubjectResultSuccess = createAction('[ClassSubjectResult/API] Create Success', props<{ payload: GenericResponseInterface<ClassSubjectResultInterface> }>());
export const createClassSubjectResultFail = createAction('[ClassSubjectResult/API] Create Fail', props<{ error: string }>());

export const updateClassSubjectResult = createAction('[ClassSubjectResult] Update', props<{ id: string; form: ClassSubjectResultFormInterface }>());
export const updateClassSubjectResultSuccess = createAction('[ClassSubjectResult/API] Update Success', props<{ payload: GenericResponseInterface<ClassSubjectResultInterface> }>());
export const updateClassSubjectResultFail = createAction('[ClassSubjectResult/API] Update Fail', props<{ error: string }>());

export const deleteClassSubjectResult = createAction('[ClassSubjectResult] Delete', props<{ id: string }>());
export const deleteClassSubjectResultSuccess = createAction('[ClassSubjectResult/API] Delete Success', props<{ payload: GenericResponseInterface<any> }>());
export const deleteClassSubjectResultFail = createAction('[ClassSubjectResult/API] Delete Fail', props<{ error: string }>());

export const createManyClassSubjectResults = createAction('[ClassSubjectResult] Create Many', props<{ forms: ClassSubjectResultFormInterface[] }>());
export const createManyClassSubjectResultsSuccess = createAction('[ClassSubjectResult/API] Create Many Success', props<{ payload: GenericResponseInterface<ClassSubjectResultInterface[]> }>());
export const createManyClassSubjectResultsFail = createAction('[ClassSubjectResult/API] Create Many Fail', props<{ error: string }>());

export const updateManyClassSubjectResults = createAction('[ClassSubjectResult] Update Many', props<{ forms: ClassSubjectResultFormInterface[] }>());
export const updateManyClassSubjectResultsSuccess = createAction('[ClassSubjectResult/API] Update Many Success', props<{ payload: GenericResponseInterface<ClassSubjectResultInterface[]> }>());
export const updateManyClassSubjectResultsFail = createAction('[ClassSubjectResult/API] Update Many Fail', props<{ error: string }>());

export const deleteManyClassSubjectResults = createAction('[ClassSubjectResult] Delete Many', props<{ ids: string[] }>());
export const deleteManyClassSubjectResultsSuccess = createAction('[ClassSubjectResult/API] Delete Many Success', props<{ payload: GenericResponseInterface<any> }>());
export const deleteManyClassSubjectResultsFail = createAction('[ClassSubjectResult/API] Delete Many Fail', props<{ error: string }>()); 