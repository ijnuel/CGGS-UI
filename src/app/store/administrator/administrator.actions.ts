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
