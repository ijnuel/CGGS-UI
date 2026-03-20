import { createReducer, on } from '@ngrx/store';
import { ImportEntityInterface } from '../../types';
import * as DataImportAction from './data-import.actions';

export const dataImportFeatureKey = 'dataImport';

export interface DataImportState {
  importEntities: ImportEntityInterface[] | null;
  loading: boolean;
  isDownloading: boolean;
  isImporting: boolean;
  importSuccess: boolean;
  error: string | null;
}

const initialState: DataImportState = {
  importEntities: null,
  loading: false,
  isDownloading: false,
  isImporting: false,
  importSuccess: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  // Get Import Entities
  on(DataImportAction.getImportEntities, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(DataImportAction.getImportEntitiesSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    importEntities: payload.entity,
  })),
  on(DataImportAction.getImportEntitiesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Download Template
  on(DataImportAction.downloadImportTemplate, (state) => ({
    ...state,
    isDownloading: true,
    error: null,
  })),
  on(DataImportAction.downloadImportTemplateSuccess, (state) => ({
    ...state,
    isDownloading: false,
  })),
  on(DataImportAction.downloadImportTemplateFail, (state, { error }) => ({
    ...state,
    isDownloading: false,
    error,
  })),

  // Import Data
  on(DataImportAction.importData, (state) => ({
    ...state,
    isImporting: true,
    importSuccess: false,
    error: null,
  })),
  on(DataImportAction.importDataSuccess, (state) => ({
    ...state,
    isImporting: false,
    importSuccess: true,
  })),
  on(DataImportAction.importDataFail, (state, { error }) => ({
    ...state,
    isImporting: false,
    importSuccess: false,
    error,
  }))
);

export const getImportEntities = (state: DataImportState) => state.importEntities;
export const getLoading = (state: DataImportState) => state.loading;
export const getIsDownloading = (state: DataImportState) => state.isDownloading;
export const getIsImporting = (state: DataImportState) => state.isImporting;
export const getImportSuccess = (state: DataImportState) => state.importSuccess;
export const getError = (state: DataImportState) => state.error;
