import { createAction, props } from '@ngrx/store';
import { GenericResponseInterface, ImportEntityInterface } from '../../types';

// Get Import Entities
export const getImportEntities = createAction('[DataImport] Get Import Entities');

export const getImportEntitiesSuccess = createAction(
  '[DataImport/API] Get Import Entities Success',
  props<{ payload: GenericResponseInterface<ImportEntityInterface[]> }>()
);

export const getImportEntitiesFail = createAction(
  '[DataImport/API] Get Import Entities Fail',
  props<{ error: string }>()
);

// Download Template
export const downloadImportTemplate = createAction(
  '[DataImport] Download Template',
  props<{ entity: ImportEntityInterface }>()
);

export const downloadImportTemplateSuccess = createAction(
  '[DataImport/API] Download Template Success'
);

export const downloadImportTemplateFail = createAction(
  '[DataImport/API] Download Template Fail',
  props<{ error: string }>()
);

// Import Data
export const importData = createAction(
  '[DataImport] Import Data',
  props<{ entityValue: string; entityDescription: string; file: File }>()
);

export const importDataSuccess = createAction(
  '[DataImport/API] Import Data Success',
  props<{ payload: GenericResponseInterface<any> }>()
);

export const importDataFail = createAction(
  '[DataImport/API] Import Data Fail',
  props<{ error: string }>()
);
