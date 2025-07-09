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
  staffAll: StaffListInterface[] | null;
  staffByProperties: StaffListInterface[] | null;
  staffById: StaffListInterface | null;
  exists: boolean | null;
  count: number | null;
  pageQuery: PageQueryInterface | null;
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  updateSuccess: boolean;
}

export const initialState: StaffState = {
  staffList: null,
  staffAll: null,
  staffByProperties: null,
  staffById: null,
  exists: null,
  count: null,
  pageQuery: null,
  loading: false,
  error: null,
  createSuccess: false,
  updateSuccess: false,
};

export const reducer = createReducer(
  initialState,
  // Get All
  on(StaffAction.getStaffAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StaffAction.getStaffAllSuccess, (state, { payload }) => ({
    ...state,
    staffAll: payload.entity,
    loading: false,
  })),
  on(StaffAction.getStaffAllFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get List
  on(StaffAction.getStaffList, (state, { pageQuery }) => ({
    ...state,
    pageQuery,
    loading: true,
    error: null,
  })),
  on(StaffAction.getStaffListSuccess, (state, { payload }) => ({
    ...state,
    staffList: payload.entity,
    loading: false,
  })),
  on(StaffAction.getStaffListFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Id
  on(StaffAction.getStaffById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StaffAction.getStaffByIdSuccess, (state, { payload }) => ({
    ...state,
    staffById: payload.entity,
    loading: false,
  })),
  on(StaffAction.getStaffByIdFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Properties
  on(StaffAction.getStaffByProperties, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StaffAction.getStaffByPropertiesSuccess, (state, { payload }) => ({
    ...state,
    staffByProperties: payload.entity,
    loading: false,
  })),
  on(StaffAction.getStaffByPropertiesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Exists
  on(StaffAction.staffExists, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StaffAction.staffExistsSuccess, (state, { payload }) => ({
    ...state,
    exists: payload.entity,
    loading: false,
  })),
  on(StaffAction.staffExistsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Count
  on(StaffAction.staffCount, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StaffAction.staffCountSuccess, (state, { payload }) => ({
    ...state,
    count: payload.entity,
    loading: false,
  })),
  on(StaffAction.staffCountFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(StaffAction.createStaff, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
  })),
  on(StaffAction.createStaffSuccess, (state, { payload }) => ({
    ...state,
    staffList: state.staffList
      ? {
          ...state.staffList,
          data: [...state.staffList.data, payload.entity],
        }
      : null,
    loading: false,
    createSuccess: true,
  })),
  on(StaffAction.createStaffFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    createSuccess: false,
  })),

  // Update
  on(StaffAction.updateStaff, (state) => ({
    ...state,
    loading: true,
    error: null,
    updateSuccess: false,
  })),
  on(StaffAction.updateStaffSuccess, (state, { payload }) => ({
    ...state,
    staffList: state.staffList
      ? {
          ...state.staffList,
          data: state.staffList.data.map((item: StaffListInterface) =>
            item.id === payload.entity.id ? payload.entity : item
          ),
        }
      : null,
    staffById:
      state.staffById?.id === payload.entity.id
        ? payload.entity
        : state.staffById,
    loading: false,
    updateSuccess: true,
  })),
  on(StaffAction.updateStaffFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    updateSuccess: false,
  })),

  // Delete
  on(StaffAction.deleteStaff, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StaffAction.deleteStaffSuccess, (state) => ({
    ...state,
    staffById: null,
    staffList: state.staffList
      ? {
          ...state.staffList,
          data: state.staffList.data.filter((item) => item.id !== state.staffById?.id),
        }
      : null,
    loading: false,
  })),
  on(StaffAction.deleteStaffFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Many
  on(StaffAction.createManyStaffs, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StaffAction.createManyStaffsSuccess, (state, { payload }) => ({
    ...state,
    staffList: state.staffList
      ? {
          ...state.staffList,
          data: [...state.staffList.data, ...payload.entity],
        }
      : null,
    loading: false,
  })),
  on(StaffAction.createManyStaffsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Many
  on(StaffAction.updateManyStaffs, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StaffAction.updateManyStaffsSuccess, (state, { payload }) => ({
    ...state,
    staffList: state.staffList
      ? {
          ...state.staffList,
          data: state.staffList.data.map((item: StaffListInterface) => {
            const updatedItem = payload.entity.find((updated) => updated.id === item.id);
            return updatedItem || item;
          }),
        }
      : null,
    loading: false,
  })),
  on(StaffAction.updateManyStaffsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Many
  on(StaffAction.deleteManyStaffs, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StaffAction.deleteManyStaffsSuccess, (state) => ({
    ...state,
    staffList: null,
    loading: false,
  })),
  on(StaffAction.deleteManyStaffsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const selectStaffState = createFeatureSelector<StaffState>(
  staffFeatureKey
);

export const getStaffList = (state: StaffState) => state.staffList;
export const getStaffAll = (state: StaffState) => state.staffAll;
export const getStaffByProperties = (state: StaffState) =>
  state.staffByProperties;
export const getStaffById = (state: StaffState) => state.staffById;
export const getExists = (state: StaffState) => state.exists;
export const getCount = (state: StaffState) => state.count;
export const getLoading = (state: StaffState) => state.loading;
export const getError = (state: StaffState) => state.error;
export const getCreateSuccess = (state: StaffState) => state.createSuccess;
export const getUpdateSuccess = (state: StaffState) => state.updateSuccess;
