import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDataImport from './data-import.reducer';

export const selectDataImportState = createFeatureSelector<fromDataImport.DataImportState>(
  fromDataImport.dataImportFeatureKey
);

export const selectImportEntities = createSelector(
  selectDataImportState,
  fromDataImport.getImportEntities
);

export const selectDataImportLoading = createSelector(
  selectDataImportState,
  fromDataImport.getLoading
);

export const selectIsDownloading = createSelector(
  selectDataImportState,
  fromDataImport.getIsDownloading
);

export const selectIsImporting = createSelector(
  selectDataImportState,
  fromDataImport.getIsImporting
);

export const selectImportSuccess = createSelector(
  selectDataImportState,
  fromDataImport.getImportSuccess
);

export const selectDataImportError = createSelector(
  selectDataImportState,
  fromDataImport.getError
);
