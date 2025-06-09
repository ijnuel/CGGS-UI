import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  AdministratorListInterface,
  AdministratorFormInterface,
} from '../../types';

export const getAdministratorList = createAction(
  '[Administrator] Get Administrator List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getAdministratorListSuccess = createAction(
  '[Administrator/API] Get Administrator List Success',
  props<{
    payload: GenericResponseInterface<
      PaginatedResponseInterface<AdministratorListInterface[]>
    >;
  }>()
);

export const getAdministratorListFail = createAction(
  '[Administrator/API] Get Administrator List Fail',
  props<{ error: string }>()
);

export const getAdministratorById = createAction(
  '[Administrator] Get Administrator By Id',
  props<{ administratorId: string }>()
);

export const getAdministratorByIdSuccess = createAction(
  '[Administrator/API] Get Administrator By Id Success',
  props<{
    payload: GenericResponseInterface<AdministratorListInterface>;
  }>()
);

export const getAdministratorByIdFail = createAction(
  '[Administrator/API] Get Administrator By Id Fail',
  props<{ error: string }>()
);

export const createAdministrator = createAction(
  '[Administrator] Create Administrator',
  props<{ payload: AdministratorFormInterface }>()
);

export const createAdministratorSuccess = createAction(
  '[Administrator/API] Create Administrator Success',
  props<{ message: string; administrator: AdministratorListInterface }>()
);

export const createAdministratorFail = createAction(
  '[Administrator/API] Create Administrator Fail',
  props<{ error: string }>()
);

export const editAdministrator = createAction(
  '[Administrator] Edit Administrator',
  props<{ payload: AdministratorFormInterface }>()
);

export const editAdministratorSuccess = createAction(
  '[Administrator/API] Edit Administrator Success',
  props<{ message: string; administrator: AdministratorListInterface }>()
);

export const editAdministratorFail = createAction(
  '[Administrator/API] Edit Administrator Fail',
  props<{ error: string }>()
);

export const deleteAdministrator = createAction(
  '[Administrator] Delete Administrator',
  props<{ administratorId: string }>()
);

export const deleteAdministratorSuccess = createAction(
  '[Administrator/API] Delete Administrator Success',
  props<{ message: string }>()
);

export const deleteAdministratorFail = createAction(
  '[Administrator/API] Delete Administrator Fail',
  props<{ error: string }>()
);

export const getAdministratorAll = createAction(
  '[Administrator] Get All',
);

export const getAdministratorAllSuccess = createAction(
  '[Administrator/API] Get All Success',
  props<{ payload: any }>()
);

export const getAdministratorAllFail = createAction(
  '[Administrator/API] Get All Fail',
  props<{ error: string }>()
);

export const getAdministratorByProperties = createAction(
  '[Administrator] Get By Properties',
  props<{ queryProperties: any[] }>()
);

export const getAdministratorByPropertiesSuccess = createAction(
  '[Administrator/API] Get By Properties Success',
  props<{ payload: any }>()
);

export const getAdministratorByPropertiesFail = createAction(
  '[Administrator/API] Get By Properties Fail',
  props<{ error: string }>()
);

export const administratorExists = createAction(
  '[Administrator] Exists',
  props<{ id: string }>()
);

export const administratorExistsSuccess = createAction(
  '[Administrator/API] Exists Success',
  props<{ payload: boolean }>()
);

export const administratorExistsFail = createAction(
  '[Administrator/API] Exists Fail',
  props<{ error: string }>()
);

export const administratorCount = createAction(
  '[Administrator] Count',
);

export const administratorCountSuccess = createAction(
  '[Administrator/API] Count Success',
  props<{ payload: number }>()
);

export const administratorCountFail = createAction(
  '[Administrator/API] Count Fail',
  props<{ error: string }>()
);

export const createManyAdministrators = createAction(
  '[Administrator] Create Many',
  props<{ payload: any[] }>()
);

export const createManyAdministratorsSuccess = createAction(
  '[Administrator/API] Create Many Success',
  props<{ payload: any }>()
);

export const createManyAdministratorsFail = createAction(
  '[Administrator/API] Create Many Fail',
  props<{ error: string }>()
);

export const updateManyAdministrators = createAction(
  '[Administrator] Update Many',
  props<{ payload: any[] }>()
);

export const updateManyAdministratorsSuccess = createAction(
  '[Administrator/API] Update Many Success',
  props<{ payload: any }>()
);

export const updateManyAdministratorsFail = createAction(
  '[Administrator/API] Update Many Fail',
  props<{ error: string }>()
);

export const deleteManyAdministrators = createAction(
  '[Administrator] Delete Many',
  props<{ ids: string[] }>()
);

export const deleteManyAdministratorsSuccess = createAction(
  '[Administrator/API] Delete Many Success',
  props<{ payload: any }>()
);

export const deleteManyAdministratorsFail = createAction(
  '[Administrator/API] Delete Many Fail',
  props<{ error: string }>()
);
