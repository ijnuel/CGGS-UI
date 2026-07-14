import { createReducer, on } from '@ngrx/store';
import { PaginatedResponseInterface, PageQueryInterface } from '../../types';
import { CompanyGalleryImageListInterface } from '../../types/company-gallery-image';
import * as CompanyGalleryImageActions from './company-gallery-image.actions';

export const companyGalleryImageFeatureKey = 'companyGalleryImage';

export interface CompanyGalleryImageState {
  companyGalleryImageList: PaginatedResponseInterface<CompanyGalleryImageListInterface[]> | null;
  companyGalleryImageAll: CompanyGalleryImageListInterface[] | null;
  companyGalleryImageById: CompanyGalleryImageListInterface | null;
  pageQuery: PageQueryInterface | null;
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  updateSuccess: boolean;
}

const initialState: CompanyGalleryImageState = {
  companyGalleryImageList: null,
  companyGalleryImageAll: null,
  companyGalleryImageById: null,
  pageQuery: null,
  loading: false,
  error: null,
  createSuccess: false,
  updateSuccess: false,
};

export const reducer = createReducer(
  initialState,

  on(CompanyGalleryImageActions.getCompanyGalleryImageAll, (state) => ({ ...state, loading: true, error: null })),
  on(CompanyGalleryImageActions.getCompanyGalleryImageAllSuccess, (state, { payload }) => ({ ...state, loading: false, companyGalleryImageAll: payload.entity })),
  on(CompanyGalleryImageActions.getCompanyGalleryImageAllFail, (state, { error }) => ({ ...state, loading: false, error })),

  on(CompanyGalleryImageActions.getCompanyGalleryImageList, (state, { pageQuery }) => ({ ...state, loading: true, error: null, pageQuery })),
  on(CompanyGalleryImageActions.getCompanyGalleryImageListSuccess, (state, { payload }) => ({ ...state, loading: false, companyGalleryImageList: payload.entity })),
  on(CompanyGalleryImageActions.getCompanyGalleryImageListFail, (state, { error }) => ({ ...state, loading: false, error })),

  on(CompanyGalleryImageActions.getCompanyGalleryImageById, (state) => ({ ...state, loading: true, error: null, companyGalleryImageById: null })),
  on(CompanyGalleryImageActions.getCompanyGalleryImageByIdSuccess, (state, { payload }) => ({ ...state, loading: false, companyGalleryImageById: payload.entity })),
  on(CompanyGalleryImageActions.getCompanyGalleryImageByIdFail, (state, { error }) => ({ ...state, loading: false, error })),

  on(CompanyGalleryImageActions.createCompanyGalleryImage, (state) => ({ ...state, loading: true, error: null, createSuccess: false })),
  on(CompanyGalleryImageActions.createCompanyGalleryImageSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    createSuccess: true,
    companyGalleryImageList: state.companyGalleryImageList
      ? { ...state.companyGalleryImageList, data: [payload.entity, ...(state.companyGalleryImageList.data ?? [])] }
      : null,
  })),
  on(CompanyGalleryImageActions.createCompanyGalleryImageFail, (state, { error }) => ({ ...state, loading: false, error, createSuccess: false })),

  on(CompanyGalleryImageActions.updateCompanyGalleryImage, (state) => ({ ...state, loading: true, error: null, updateSuccess: false })),
  on(CompanyGalleryImageActions.updateCompanyGalleryImageSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    updateSuccess: true,
    companyGalleryImageById: payload.entity,
    companyGalleryImageList: state.companyGalleryImageList
      ? { ...state.companyGalleryImageList, data: (state.companyGalleryImageList.data ?? []).map(i => i.id === payload.entity.id ? payload.entity : i) }
      : null,
  })),
  on(CompanyGalleryImageActions.updateCompanyGalleryImageFail, (state, { error }) => ({ ...state, loading: false, error, updateSuccess: false })),

  on(CompanyGalleryImageActions.deleteCompanyGalleryImage, (state) => ({ ...state, loading: true, error: null })),
  on(CompanyGalleryImageActions.deleteCompanyGalleryImageSuccess, (state) => ({ ...state, loading: false, companyGalleryImageById: null })),
  on(CompanyGalleryImageActions.deleteCompanyGalleryImageFail, (state, { error }) => ({ ...state, loading: false, error })),
);

export const getCompanyGalleryImageList = (state: CompanyGalleryImageState) => state.companyGalleryImageList;
export const getCompanyGalleryImageAll = (state: CompanyGalleryImageState) => state.companyGalleryImageAll;
export const getCompanyGalleryImageById = (state: CompanyGalleryImageState) => state.companyGalleryImageById;
export const getLoading = (state: CompanyGalleryImageState) => state.loading;
export const getError = (state: CompanyGalleryImageState) => state.error;
export const getCreateSuccess = (state: CompanyGalleryImageState) => state.createSuccess;
export const getUpdateSuccess = (state: CompanyGalleryImageState) => state.updateSuccess;
