import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  StaffListInterface,
  StaffFormInterface,
} from '../../types';

export const getStaffList = createAction(
  '[Staff] Get Staff List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getStaffListSuccess = createAction(
  '[Staff/API] Get Staff List Success',
  props<{
    payload: GenericResponseInterface<
      PaginatedResponseInterface<StaffListInterface[]>
    >;
  }>()
);

export const getStaffListFail = createAction(
  '[Staff/API] Get Staff List Fail',
  props<{ error: string }>()
);

export const getStaffById = createAction(
  '[Staff] Get Staff By Id',
  props<{ staffId: string }>()
);

export const getStaffByIdSuccess = createAction(
  '[Staff/API] Get Staff By Id Success',
  props<{
    payload: GenericResponseInterface<StaffListInterface>;
  }>()
);

export const getStaffByIdFail = createAction(
  '[Staff/API] Get Staff By Id Fail',
  props<{ error: string }>()
);

export const createStaff = createAction(
  '[Staff] Create Staff',
  props<{ payload: StaffFormInterface }>()
);

export const createStaffSuccess = createAction(
  '[Staff/API] Create Staff Success',
  props<{ message: string; staff: StaffListInterface }>()
);

export const createStaffFail = createAction(
  '[Staff/API] Create Staff Fail',
  props<{ error: string }>()
);

export const editStaff = createAction(
  '[Staff] Edit Staff',
  props<{ payload: StaffFormInterface }>()
);

export const editStaffSuccess = createAction(
  '[Staff/API] Edit Staff Success',
  props<{ message: string; staff: StaffListInterface }>()
);

export const editStaffFail = createAction(
  '[Staff/API] Edit Staff Fail',
  props<{ error: string }>()
);
