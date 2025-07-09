import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as StateAction from './state.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  StateListInterface,
} from '../../types';

export const stateFeatureKey = 'state';

export interface StateState {
  stateList: PaginatedResponseInterface<StateListInterface[]> | null;
  stateAll: StateListInterface[] | null;
  stateByProperties: StateListInterface[] | null;
  stateById: StateListInterface | null;
  exists: boolean | null;
  count: number | null;
  pageQuery: PageQueryInterface | null;
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  updateSuccess: boolean;
}

export const initialState: StateState = {
  stateList: null,
  stateAll: null,
  stateByProperties: null,
  stateById: null,
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
  on(StateAction.getStateAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StateAction.getStateAllSuccess, (state, { payload }) => ({
    ...state,
    stateAll: payload.entity,
    loading: false,
  })),
  on(StateAction.getStateAllFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get List
  on(StateAction.getStateList, (state, { pageQuery }) => ({
    ...state,
    pageQuery,
    loading: true,
    error: null,
  })),
  on(StateAction.getStateListSuccess, (state, { payload }) => ({
    ...state,
    stateList: payload.entity,
    loading: false,
  })),
  on(StateAction.getStateListFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Id
  on(StateAction.getStateById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StateAction.getStateByIdSuccess, (state, { payload }) => ({
    ...state,
    stateById: payload.entity,
    loading: false,
  })),
  on(StateAction.getStateByIdFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Properties
  on(StateAction.getStateByProperties, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StateAction.getStateByPropertiesSuccess, (state, { payload }) => ({
    ...state,
    stateByProperties: payload.entity,
    loading: false,
  })),
  on(StateAction.getStateByPropertiesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Exists
  on(StateAction.stateExists, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StateAction.stateExistsSuccess, (state, { payload }) => ({
    ...state,
    exists: payload.entity,
    loading: false,
  })),
  on(StateAction.stateExistsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Count
  on(StateAction.stateCount, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StateAction.stateCountSuccess, (state, { payload }) => ({
    ...state,
    count: payload.entity,
    loading: false,
  })),
  on(StateAction.stateCountFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(StateAction.createState, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
  })),
  on(StateAction.createStateSuccess, (state, { payload }) => ({
    ...state,
    stateList: state.stateList
      ? {
          ...state.stateList,
          data: [...state.stateList.data, payload.entity],
        }
      : null,
    loading: false,
    createSuccess: true,
  })),
  on(StateAction.createStateFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    createSuccess: false,
  })),

  // Update
  on(StateAction.updateState, (state) => ({
    ...state,
    loading: true,
    error: null,
    updateSuccess: false,
  })),
  on(StateAction.updateStateSuccess, (state, { payload }) => ({
    ...state,
    stateList: state.stateList
      ? {
          ...state.stateList,
          data: state.stateList.data.map((item: StateListInterface) =>
            item.id === payload.entity.id ? payload.entity : item
          ),
        }
      : null,
    stateById:
      state.stateById?.id === payload.entity.id
        ? payload.entity
        : state.stateById,
    loading: false,
    updateSuccess: true,
  })),
  on(StateAction.updateStateFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    updateSuccess: false,
  })),

  // Delete
  on(StateAction.deleteState, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StateAction.deleteStateSuccess, (state) => ({
    ...state,
    stateById: null,
    stateList: state.stateList
      ? {
          ...state.stateList,
          data: state.stateList.data.filter((item) => item.id !== state.stateById?.id),
        }
      : null,
    loading: false,
  })),
  on(StateAction.deleteStateFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Many
  on(StateAction.createManyStates, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StateAction.createManyStatesSuccess, (state, { payload }) => ({
    ...state,
    stateList: state.stateList
      ? {
          ...state.stateList,
          data: [...state.stateList.data, ...payload.entity],
        }
      : null,
    loading: false,
  })),
  on(StateAction.createManyStatesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Many
  on(StateAction.updateManyStates, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StateAction.updateManyStatesSuccess, (state, { payload }) => ({
    ...state,
    stateList: state.stateList
      ? {
          ...state.stateList,
          data: state.stateList.data.map((item: StateListInterface) => {
            const updatedItem = payload.entity.find((updated) => updated.id === item.id);
            return updatedItem || item;
          }),
        }
      : null,
    loading: false,
  })),
  on(StateAction.updateManyStatesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Many
  on(StateAction.deleteManyStates, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StateAction.deleteManyStatesSuccess, (state) => ({
    ...state,
    stateList: null,
    loading: false,
  })),
  on(StateAction.deleteManyStatesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const selectStateState = createFeatureSelector<StateState>(
  stateFeatureKey
);

export const getStateList = (state: StateState) => state.stateList;
export const getStateAll = (state: StateState) => state.stateAll;
export const getStateByProperties = (state: StateState) =>
  state.stateByProperties;
export const getStateById = (state: StateState) => state.stateById;
export const getExists = (state: StateState) => state.exists;
export const getCount = (state: StateState) => state.count;
export const getLoading = (state: StateState) => state.loading;
export const getError = (state: StateState) => state.error;
export const getCreateSuccess = (state: StateState) => state.createSuccess;
export const getUpdateSuccess = (state: StateState) => state.updateSuccess;
