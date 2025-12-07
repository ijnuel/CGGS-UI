import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as CompanyAction from './company.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  CompanyListInterface,
} from '../../types';

export const companyFeatureKey = 'company';

export interface CompanyState {
  companyList: PaginatedResponseInterface<CompanyListInterface[]> | null;
  companyAll: CompanyListInterface[] | null;
  companyByProperties: CompanyListInterface[] | null;
  companyById: CompanyListInterface | null;
  exists: boolean | null;
  count: number | null;
  pageQuery: PageQueryInterface | null;
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  updateSuccess: boolean;
}

export const initialState: CompanyState = {
  companyList: null,
  companyAll: null,
  companyByProperties: null,
  companyById: null,
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
  on(CompanyAction.getCompanyAll, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
    updateSuccess: false,
  })),
  on(CompanyAction.getCompanyAllSuccess, (state, { payload }) => ({
    ...state,
    companyAll: payload.entity,
    loading: false,
  })),
  on(CompanyAction.getCompanyAllFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get List
  on(CompanyAction.getCompanyList, (state, { pageQuery }) => ({
    ...state,
    pageQuery,
    loading: true,
    error: null,
    createSuccess: false,
    updateSuccess: false,
  })),
  on(CompanyAction.getCompanyListSuccess, (state, { payload }) => ({
    ...state,
    companyList: payload.entity,
    loading: false,
  })),
  on(CompanyAction.getCompanyListFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Id
  on(CompanyAction.getCompanyById, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
    updateSuccess: false,
  })),
  on(CompanyAction.getCompanyByIdSuccess, (state, { payload }) => ({
    ...state,
    companyById: payload.entity,
    loading: false,
  })),
  on(CompanyAction.getCompanyByIdFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Properties
  on(CompanyAction.getCompanyByProperties, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
    updateSuccess: false,
  })),
  on(CompanyAction.getCompanyByPropertiesSuccess, (state, { payload }) => ({
    ...state,
    companyByProperties: payload.entity,
    loading: false,
  })),
  on(CompanyAction.getCompanyByPropertiesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Exists
  on(CompanyAction.companyExists, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CompanyAction.companyExistsSuccess, (state, { payload }) => ({
    ...state,
    exists: payload.entity,
    loading: false,
  })),
  on(CompanyAction.companyExistsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Count
  on(CompanyAction.companyCount, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CompanyAction.companyCountSuccess, (state, { payload }) => ({
    ...state,
    count: payload.entity,
    loading: false,
  })),
  on(CompanyAction.companyCountFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(CompanyAction.createCompany, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
  })),
  on(CompanyAction.createCompanySuccess, (state, { payload }) => ({
    ...state,
    companyList: state.companyList
      ? {
          ...state.companyList,
          data: [...state.companyList.data, payload.entity],
        }
      : null,
    loading: false,
    createSuccess: true,
  })),
  on(CompanyAction.createCompanyFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    createSuccess: false,
  })),

  // Update
  on(CompanyAction.updateCompany, (state) => ({
    ...state,
    loading: true,
    error: null,
    updateSuccess: false,
  })),
  on(CompanyAction.updateCompanySuccess, (state, { payload }) => ({
    ...state,
    companyList: state.companyList
      ? {
          ...state.companyList,
          data: state.companyList.data.map((item: CompanyListInterface) =>
            item.id === payload.entity.id ? payload.entity : item
          ),
        }
      : null,
    companyById:
      state.companyById?.id === payload.entity.id
        ? payload.entity
        : state.companyById,
    loading: false,
    updateSuccess: true,
  })),
  on(CompanyAction.updateCompanyFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    updateSuccess: false,
  })),

  // Delete
  on(CompanyAction.deleteCompany, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CompanyAction.deleteCompanySuccess, (state) => ({
    ...state,
    companyById: null,
    companyList: state.companyList
      ? {
          ...state.companyList,
          data: state.companyList.data.filter((item) => item.id !== state.companyById?.id),
        }
      : null,
    loading: false,
  })),
  on(CompanyAction.deleteCompanyFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Many
  on(CompanyAction.createManyCompanys, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CompanyAction.createManyCompanysSuccess, (state, { payload }) => ({
    ...state,
    companyList: state.companyList
      ? {
          ...state.companyList,
          data: [...state.companyList.data, ...payload.entity],
        }
      : null,
    loading: false,
  })),
  on(CompanyAction.createManyCompanysFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Many
  on(CompanyAction.updateManyCompanys, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CompanyAction.updateManyCompanysSuccess, (state, { payload }) => ({
    ...state,
    companyList: state.companyList
      ? {
          ...state.companyList,
          data: state.companyList.data.map((item: CompanyListInterface) => {
            const updatedItem = payload.entity.find((updated) => updated.id === item.id);
            return updatedItem || item;
          }),
        }
      : null,
    loading: false,
  })),
  on(CompanyAction.updateManyCompanysFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Many
  on(CompanyAction.deleteManyCompanys, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CompanyAction.deleteManyCompanysSuccess, (state) => ({
    ...state,
    companyList: null,
    loading: false,
  })),
  on(CompanyAction.deleteManyCompanysFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const selectCompanyState = createFeatureSelector<CompanyState>(
  companyFeatureKey
);

export const getCompanyList = (state: CompanyState) => state.companyList;
export const getCompanyAll = (state: CompanyState) => state.companyAll;
export const getCompanyByProperties = (state: CompanyState) =>
  state.companyByProperties;
export const getCompanyById = (state: CompanyState) => state.companyById;
export const getExists = (state: CompanyState) => state.exists;
export const getCount = (state: CompanyState) => state.count;
export const getLoading = (state: CompanyState) => state.loading;
export const getError = (state: CompanyState) => state.error;
export const getCreateSuccess = (state: CompanyState) => state.createSuccess;
export const getUpdateSuccess = (state: CompanyState) => state.updateSuccess;
