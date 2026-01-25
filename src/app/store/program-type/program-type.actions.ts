import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  ProgramTypeListInterface,
  ProgramTypeFormInterface,
  QueryInterface,
} from '../../types';

// Get All (non-paginated)
export const getProgramTypeAll = createAction(
  '[ProgramType] Get All',
  props<{ query?: QueryInterface }>()
);

export const getProgramTypeAllSuccess = createAction(
  '[ProgramType/API] Get All Success',
  props<{
    payload: GenericResponseInterface<ProgramTypeListInterface[]>;
  }>()
);

export const getProgramTypeAllFail = createAction(
  '[ProgramType/API] Get All Fail',
  props<{ error: string }>()
);

// Get All Paginated
export const getProgramTypeList = createAction(
  '[ProgramType] Get List',
  props<{
    pageQuery: PageQueryInterface
  }>()
);

export const getProgramTypeListSuccess = createAction(
  '[ProgramType/API] Get List Success',
  props<{
    payload: GenericResponseInterface<PaginatedResponseInterface<ProgramTypeListInterface[]>>;
  }>()
);

export const getProgramTypeListFail = createAction(
  '[ProgramType/API] Get List Fail',
  props<{ error: string }>()
);

// Get By Id
export const getProgramTypeById = createAction(
  '[ProgramType] Get By Id',
  props<{ programTypeId: string }>()
);

export const getProgramTypeByIdSuccess = createAction(
  '[ProgramType/API] Get By Id Success',
  props<{
    payload: GenericResponseInterface<ProgramTypeListInterface>;
  }>()
);

export const getProgramTypeByIdFail = createAction(
  '[ProgramType/API] Get By Id Fail',
  props<{ error: string }>()
);

// Get By Properties
export const getProgramTypeByProperties = createAction(
  '[ProgramType] Get By Properties',
  props<{ queryPropertiesString: string }>() // serialized QueryProperty[]
);

export const getProgramTypeByPropertiesSuccess = createAction(
  '[ProgramType/API] Get By Properties Success',
  props<{
    payload: GenericResponseInterface<ProgramTypeListInterface>;
  }>()
);

export const getProgramTypeByPropertiesFail = createAction(
  '[ProgramType/API] Get By Properties Fail',
  props<{ error: string }>()
);
// Exists
export const programTypeExists = createAction(
  '[ProgramType] Exists',
  props<{ id: string }>()
);

export const programTypeExistsSuccess = createAction(
  '[ProgramType/API] Exists Success',
  props<{ payload: GenericResponseInterface<boolean> }>()
);

export const programTypeExistsFail = createAction(
  '[ProgramType/API] Exists Fail',
  props<{ error: string }>()
);

// Count
export const programTypeCount = createAction('[ProgramType] Count');

export const programTypeCountSuccess = createAction(
  '[ProgramType/API] Count Success',
  props<{ payload: GenericResponseInterface<number> }>()
);

export const programTypeCountFail = createAction(
  '[ProgramType/API] Count Fail',
  props<{ error: string }>()
);

// Create
export const createProgramType = createAction(
  '[ProgramType] Create',
  props<{ payload: ProgramTypeFormInterface }>()
);

export const createProgramTypeSuccess = createAction(
  '[ProgramType/API] Create Success',
  props<{ payload: GenericResponseInterface<string> }>()
);

export const createProgramTypeFail = createAction(
  '[ProgramType/API] Create Fail',
  props<{ error: string }>()
);

// Update
export const updateProgramType = createAction(
  '[ProgramType] Update',
  props<{ payload: ProgramTypeFormInterface }>()
);

export const updateProgramTypeSuccess = createAction(
  '[ProgramType/API] Update Success',
  props<{ payload: GenericResponseInterface<string> }>()
);

export const updateProgramTypeFail = createAction(
  '[ProgramType/API] Update Fail',
  props<{ error: string }>()
);

// Delete
export const deleteProgramType = createAction(
  '[ProgramType] Delete',
  props<{ id: string }>()
);

export const deleteProgramTypeSuccess = createAction(
  '[ProgramType/API] Delete Success',
  props<{ payload: GenericResponseInterface<boolean> }>()
);

export const deleteProgramTypeFail = createAction(
  '[ProgramType/API] Delete Fail',
  props<{ error: string }>()
);

// Create Many
export const createManyProgramTypes = createAction(
  '[ProgramType] Create Many',
  props<{ payload: ProgramTypeFormInterface[] }>()
);

export const createManyProgramTypesSuccess = createAction(
  '[ProgramType/API] Create Many Success',
  props<{ payload: GenericResponseInterface<number> }>()
);

export const createManyProgramTypesFail = createAction(
  '[ProgramType/API] Create Many Fail',
  props<{ error: string }>()
);

// Update Many
export const updateManyProgramTypes = createAction(
  '[ProgramType] Update Many',
  props<{ payload: ProgramTypeFormInterface[] }>()
);

export const updateManyProgramTypesSuccess = createAction(
  '[ProgramType/API] Update Many Success',
  props<{ payload: GenericResponseInterface<number> }>()
);

export const updateManyProgramTypesFail = createAction(
  '[ProgramType/API] Update Many Fail',
  props<{ error: string }>()
);

// Delete Many
export const deleteManyProgramTypes = createAction(
  '[ProgramType] Delete Many',
  props<{ ids: string[] }>()
);

export const deleteManyProgramTypesSuccess = createAction(
  '[ProgramType/API] Delete Many Success',
  props<{ payload: GenericResponseInterface<number> }>()
);

export const deleteManyProgramTypesFail = createAction(
  '[ProgramType/API] Delete Many Fail',
  props<{ error: string }>()
);

// Get Data Import Template
export const getProgramTypeDataImportTemplate = createAction(
  '[ProgramType] Get Data Import Template'
);

export const getProgramTypeDataImportTemplateSuccess = createAction(
  '[ProgramType/API] Get Data Import Template Success',
  props<{ payload: any }>() // Replace 'any' with the correct type if available
);

export const getProgramTypeDataImportTemplateFail = createAction(
  '[ProgramType/API] Get Data Import Template Fail',
  props<{ error: string }>()
);

// ...existing code...
