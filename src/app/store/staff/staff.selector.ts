import { createSelector } from '@ngrx/store';
import * as fromStaff from './staff.reducer';
import * as fromApp from '../app.reducer';

export const selectStaffState = createSelector(
  fromApp.selectAppState,
  (state) => state[fromStaff.staffFeatureKey]
);

export const selectStaffList = createSelector(
  fromStaff.selectStaffState,
  fromStaff.getStaffList
);

export const selectStaffById = createSelector(
  fromStaff.selectStaffState,
  fromStaff.getStaffById
);

export const selectLoading = createSelector(
  fromStaff.selectStaffState,
  fromStaff.getLoading
);

export const selectError = createSelector(
  fromStaff.selectStaffState,
  fromStaff.getError
);
