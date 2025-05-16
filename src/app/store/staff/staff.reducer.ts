import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as StaffAction from './staff.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  StaffListInterface,
} from '../../types';

export const staffFeatureKey = 'staff';

export interface StaffState {
  staffList: PaginatedResponseInterface<StaffListInterface[]> | null;
  pageQuery: PageQueryInterface | null;
  staffById: StaffListInterface | null;
  loading: boolean;
  error: string | null;
}

export const initialState: StaffState = {
  staffList: null,
  pageQuery: null,
  staffById: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(StaffAction.getStaffList, (state, { pageQuery }) => {
    return {
      ...state,
      pageQuery,
      loading: true,
    };
  }),
  on(StaffAction.getStaffListSuccess, (state, action) => {
    return {
      ...state,
      staffList: action.payload?.entity,
      loading: false,
    };
  }),
  on(StaffAction.getStaffListFail, (state, action) => {
    return {
      ...initialState,
      loading: false,
      error: action.error,
    };
  })
);

export const getStaffList = (state: StaffState) => state.staffList;

export const getStaffById = (state: StaffState) => state.staffById;

export const getLoading = (state: StaffState) => state.loading;

export const getError = (state: StaffState) => state.error;

export const selectStaffState =
  createFeatureSelector<StaffState>(staffFeatureKey);
