import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  ApplicationListInterface,
  ApplicationFormInterface,
} from '../../types';

export const getApplicationList = createAction(
  '[Application] Get Application List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getApplicationListSuccess = createAction(
  '[Application/API] Get Application List Success',
  props<{
    payload: GenericResponseInterface<
      PaginatedResponseInterface<ApplicationListInterface[]>
    >;
  }>()
);

export const getApplicationListFail = createAction(
  '[Application/API] Get Application List Fail',
  props<{ error: string }>()
);

export const getApplicationById = createAction(
  '[Application] Get Application By Id',
  props<{ applicationId: string }>()
);

export const getApplicationByIdSuccess = createAction(
  '[Application/API] Get Application By Id Success',
  props<{
    payload: GenericResponseInterface<ApplicationListInterface>;
  }>()
);

export const getApplicationByIdFail = createAction(
  '[Application/API] Get Application By Id Fail',
  props<{ error: string }>()
);

export const createApplication = createAction(
  '[Application] Create Application',
  props<{ payload: ApplicationFormInterface }>()
);

export const createApplicationSuccess = createAction(
  '[Application/API] Create Application Success',
  props<{ message: string; application: ApplicationListInterface }>()
);

export const createApplicationFail = createAction(
  '[Application/API] Create Application Fail',
  props<{ error: string }>()
);

export const editApplication = createAction(
  '[Application] Edit Application',
  props<{ payload: ApplicationFormInterface }>()
);

export const editApplicationSuccess = createAction(
  '[Application/API] Edit Application Success',
  props<{ message: string; application: ApplicationListInterface }>()
);

export const editApplicationFail = createAction(
  '[Application/API] Edit Application Fail',
  props<{ error: string }>()
);
