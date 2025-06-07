import { createAction, props } from '@ngrx/store';
import { ClassSubjectInterface, ClassSubjectFormInterface } from '../../types/class-subject';
import { GenericResponseInterface, PaginatedResponseInterface, PageQueryInterface } from '../../types';

export const addSubjectToClass = createAction('[ClassSubject] Add Subject To Class', props<{ classId: string; subjectId: string }>());
export const addSubjectToClassSuccess = createAction('[ClassSubject/API] Add Subject To Class Success', props<{ payload: GenericResponseInterface<any> }>());
export const addSubjectToClassFail = createAction('[ClassSubject/API] Add Subject To Class Fail', props<{ error: string }>());

export const loadClassSubjects = createAction('[ClassSubject] Load All');
export const loadClassSubjectsSuccess = createAction('[ClassSubject/API] Load All Success', props<{ payload: GenericResponseInterface<ClassSubjectInterface[]> }>());
export const loadClassSubjectsFail = createAction('[ClassSubject/API] Load All Fail', props<{ error: string }>());

export const loadClassSubjectsPaginated = createAction('[ClassSubject] Load All Paginated', props<{ pageQuery: PageQueryInterface }>());
export const loadClassSubjectsPaginatedSuccess = createAction('[ClassSubject/API] Load All Paginated Success', props<{ payload: GenericResponseInterface<PaginatedResponseInterface<ClassSubjectInterface[]>> }>());
export const loadClassSubjectsPaginatedFail = createAction('[ClassSubject/API] Load All Paginated Fail', props<{ error: string }>());

export const getClassSubjectById = createAction('[ClassSubject] Get By Id', props<{ id: string }>());
export const getClassSubjectByIdSuccess = createAction('[ClassSubject/API] Get By Id Success', props<{ payload: GenericResponseInterface<ClassSubjectInterface> }>());
export const getClassSubjectByIdFail = createAction('[ClassSubject/API] Get By Id Fail', props<{ error: string }>());

export const getClassSubjectByProperties = createAction('[ClassSubject] Get By Properties', props<{ properties: Partial<ClassSubjectInterface> }>());
export const getClassSubjectByPropertiesSuccess = createAction('[ClassSubject/API] Get By Properties Success', props<{ payload: GenericResponseInterface<ClassSubjectInterface[]> }>());
export const getClassSubjectByPropertiesFail = createAction('[ClassSubject/API] Get By Properties Fail', props<{ error: string }>());

export const classSubjectExists = createAction('[ClassSubject] Exists', props<{ properties: Partial<ClassSubjectInterface> }>());
export const classSubjectExistsSuccess = createAction('[ClassSubject/API] Exists Success', props<{ payload: GenericResponseInterface<boolean> }>());
export const classSubjectExistsFail = createAction('[ClassSubject/API] Exists Fail', props<{ error: string }>());

export const classSubjectCount = createAction('[ClassSubject] Count');
export const classSubjectCountSuccess = createAction('[ClassSubject/API] Count Success', props<{ payload: GenericResponseInterface<number> }>());
export const classSubjectCountFail = createAction('[ClassSubject/API] Count Fail', props<{ error: string }>());

export const createClassSubject = createAction('[ClassSubject] Create', props<{ form: ClassSubjectFormInterface }>());
export const createClassSubjectSuccess = createAction('[ClassSubject/API] Create Success', props<{ payload: GenericResponseInterface<ClassSubjectInterface> }>());
export const createClassSubjectFail = createAction('[ClassSubject/API] Create Fail', props<{ error: string }>());

export const updateClassSubject = createAction('[ClassSubject] Update', props<{ id: string; form: ClassSubjectFormInterface }>());
export const updateClassSubjectSuccess = createAction('[ClassSubject/API] Update Success', props<{ payload: GenericResponseInterface<ClassSubjectInterface> }>());
export const updateClassSubjectFail = createAction('[ClassSubject/API] Update Fail', props<{ error: string }>());

export const deleteClassSubject = createAction('[ClassSubject] Delete', props<{ id: string }>());
export const deleteClassSubjectSuccess = createAction('[ClassSubject/API] Delete Success', props<{ payload: GenericResponseInterface<any> }>());
export const deleteClassSubjectFail = createAction('[ClassSubject/API] Delete Fail', props<{ error: string }>());

export const createManyClassSubjects = createAction('[ClassSubject] Create Many', props<{ forms: ClassSubjectFormInterface[] }>());
export const createManyClassSubjectsSuccess = createAction('[ClassSubject/API] Create Many Success', props<{ payload: GenericResponseInterface<ClassSubjectInterface[]> }>());
export const createManyClassSubjectsFail = createAction('[ClassSubject/API] Create Many Fail', props<{ error: string }>());

export const updateManyClassSubjects = createAction('[ClassSubject] Update Many', props<{ forms: ClassSubjectFormInterface[] }>());
export const updateManyClassSubjectsSuccess = createAction('[ClassSubject/API] Update Many Success', props<{ payload: GenericResponseInterface<ClassSubjectInterface[]> }>());
export const updateManyClassSubjectsFail = createAction('[ClassSubject/API] Update Many Fail', props<{ error: string }>());

export const deleteManyClassSubjects = createAction('[ClassSubject] Delete Many', props<{ ids: string[] }>());
export const deleteManyClassSubjectsSuccess = createAction('[ClassSubject/API] Delete Many Success', props<{ payload: GenericResponseInterface<any> }>());
export const deleteManyClassSubjectsFail = createAction('[ClassSubject/API] Delete Many Fail', props<{ error: string }>()); 