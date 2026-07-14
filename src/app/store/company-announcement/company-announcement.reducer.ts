import { createReducer, on } from '@ngrx/store';
import { PaginatedResponseInterface, PageQueryInterface } from '../../types';
import { CompanyAnnouncementListInterface } from '../../types/company-announcement';
import * as CompanyAnnouncementActions from './company-announcement.actions';

export const companyAnnouncementFeatureKey = 'companyAnnouncement';

export interface CompanyAnnouncementState {
  companyAnnouncementList: PaginatedResponseInterface<CompanyAnnouncementListInterface[]> | null;
  companyAnnouncementAll: CompanyAnnouncementListInterface[] | null;
  companyAnnouncementById: CompanyAnnouncementListInterface | null;
  pageQuery: PageQueryInterface | null;
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  updateSuccess: boolean;
}

const initialState: CompanyAnnouncementState = {
  companyAnnouncementList: null,
  companyAnnouncementAll: null,
  companyAnnouncementById: null,
  pageQuery: null,
  loading: false,
  error: null,
  createSuccess: false,
  updateSuccess: false,
};

export const reducer = createReducer(
  initialState,

  on(CompanyAnnouncementActions.getCompanyAnnouncementAll, (state) => ({ ...state, loading: true, error: null })),
  on(CompanyAnnouncementActions.getCompanyAnnouncementAllSuccess, (state, { payload }) => ({ ...state, loading: false, companyAnnouncementAll: payload.entity })),
  on(CompanyAnnouncementActions.getCompanyAnnouncementAllFail, (state, { error }) => ({ ...state, loading: false, error })),

  on(CompanyAnnouncementActions.getCompanyAnnouncementList, (state, { pageQuery }) => ({ ...state, loading: true, error: null, pageQuery })),
  on(CompanyAnnouncementActions.getCompanyAnnouncementListSuccess, (state, { payload }) => ({ ...state, loading: false, companyAnnouncementList: payload.entity })),
  on(CompanyAnnouncementActions.getCompanyAnnouncementListFail, (state, { error }) => ({ ...state, loading: false, error })),

  on(CompanyAnnouncementActions.getCompanyAnnouncementById, (state) => ({ ...state, loading: true, error: null, companyAnnouncementById: null })),
  on(CompanyAnnouncementActions.getCompanyAnnouncementByIdSuccess, (state, { payload }) => ({ ...state, loading: false, companyAnnouncementById: payload.entity })),
  on(CompanyAnnouncementActions.getCompanyAnnouncementByIdFail, (state, { error }) => ({ ...state, loading: false, error })),

  on(CompanyAnnouncementActions.createCompanyAnnouncement, (state) => ({ ...state, loading: true, error: null, createSuccess: false })),
  on(CompanyAnnouncementActions.createCompanyAnnouncementSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    createSuccess: true,
    companyAnnouncementList: state.companyAnnouncementList
      ? { ...state.companyAnnouncementList, data: [payload.entity, ...(state.companyAnnouncementList.data ?? [])] }
      : null,
  })),
  on(CompanyAnnouncementActions.createCompanyAnnouncementFail, (state, { error }) => ({ ...state, loading: false, error, createSuccess: false })),

  on(CompanyAnnouncementActions.updateCompanyAnnouncement, (state) => ({ ...state, loading: true, error: null, updateSuccess: false })),
  on(CompanyAnnouncementActions.updateCompanyAnnouncementSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    updateSuccess: true,
    companyAnnouncementById: payload.entity,
    companyAnnouncementList: state.companyAnnouncementList
      ? { ...state.companyAnnouncementList, data: (state.companyAnnouncementList.data ?? []).map(i => i.id === payload.entity.id ? payload.entity : i) }
      : null,
  })),
  on(CompanyAnnouncementActions.updateCompanyAnnouncementFail, (state, { error }) => ({ ...state, loading: false, error, updateSuccess: false })),

  on(CompanyAnnouncementActions.deleteCompanyAnnouncement, (state) => ({ ...state, loading: true, error: null })),
  on(CompanyAnnouncementActions.deleteCompanyAnnouncementSuccess, (state) => ({ ...state, loading: false, companyAnnouncementById: null })),
  on(CompanyAnnouncementActions.deleteCompanyAnnouncementFail, (state, { error }) => ({ ...state, loading: false, error })),
);

export const getCompanyAnnouncementList = (state: CompanyAnnouncementState) => state.companyAnnouncementList;
export const getCompanyAnnouncementAll = (state: CompanyAnnouncementState) => state.companyAnnouncementAll;
export const getCompanyAnnouncementById = (state: CompanyAnnouncementState) => state.companyAnnouncementById;
export const getLoading = (state: CompanyAnnouncementState) => state.loading;
export const getError = (state: CompanyAnnouncementState) => state.error;
export const getCreateSuccess = (state: CompanyAnnouncementState) => state.createSuccess;
export const getUpdateSuccess = (state: CompanyAnnouncementState) => state.updateSuccess;
