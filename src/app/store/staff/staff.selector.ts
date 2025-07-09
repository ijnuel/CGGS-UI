import { createSelector } from '@ngrx/store';
import {
  getStaffList,
  getStaffAll,
  getStaffByProperties,
  getStaffById,
  getExists,
  getCount,
  getLoading,
  getError,
  StaffState,
} from './staff.reducer';

export const selectStaffState = (state: { staff: StaffState }) =>
  state.staff;

export const selectStaffList = createSelector(
  selectStaffState,
  getStaffList
);

export const selectStaffAll = createSelector(
  selectStaffState,
  getStaffAll
);

export const selectStaffByProperties = createSelector(
  selectStaffState,
  getStaffByProperties
);

export const selectStaffById = createSelector(
  selectStaffState,
  getStaffById
);

export const selectExists = createSelector(
  selectStaffState,
  getExists
);

export const selectCount = createSelector(
  selectStaffState,
  getCount
);

export const selectStaffLoading = createSelector(
  selectStaffState,
  getLoading
);

export const selectStaffError = createSelector(
  selectStaffState,
  getError
);

export const selectStaffCreateSuccess = createSelector(
    selectStaffState,
    (state) => state.createSuccess
);

export const selectStaffUpdateSuccess = createSelector(
    selectStaffState,
    (state) => state.updateSuccess
);