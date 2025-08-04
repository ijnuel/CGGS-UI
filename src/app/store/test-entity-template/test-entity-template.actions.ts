import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  TestEntityTemplateListInterface,
  TestEntityTemplateFormInterface,
} from '../../types';

// Get All (non-paginated)
export const getTestEntityTemplateAll = createAction(
  '[TestEntityTemplate] Get All',
  props<{ queryProperties?: string }>() // serialized QueryProperty[]
);

export const getTestEntityTemplateAllSuccess = createAction(
  '[TestEntityTemplate/API] Get All Success',
  props<{
    payload: GenericResponseInterface<TestEntityTemplateListInterface[]>;
  }>()
);

export const getTestEntityTemplateAllFail = createAction(
  '[TestEntityTemplate/API] Get All Fail',
  props<{ error: string }>()
);

// Get All Paginated
export const getTestEntityTemplateList = createAction(
  '[TestEntityTemplate] Get List',
  props<{
    start?: number;
    recordsPerPage?: number;
    searchText?: string;
    queryProperties?: string; // serialized QueryProperty[]
  }>()
);

export const getTestEntityTemplateListSuccess = createAction(
  '[TestEntityTemplate/API] Get List Success',
  props<{
    payload: GenericResponseInterface<PaginatedResponseInterface<TestEntityTemplateListInterface[]>>;
  }>()
);

export const getTestEntityTemplateListFail = createAction(
  '[TestEntityTemplate/API] Get List Fail',
  props<{ error: string }>()
);

// Get By Id
export const getTestEntityTemplateById = createAction(
  '[TestEntityTemplate] Get By Id',
  props<{ testEntityTemplateId: string }>()
);

export const getTestEntityTemplateByIdSuccess = createAction(
  '[TestEntityTemplate/API] Get By Id Success',
  props<{
    payload: GenericResponseInterface<TestEntityTemplateListInterface>;
  }>()
);

export const getTestEntityTemplateByIdFail = createAction(
  '[TestEntityTemplate/API] Get By Id Fail',
  props<{ error: string }>()
);

// Get By Properties
export const getTestEntityTemplateByProperties = createAction(
  '[TestEntityTemplate] Get By Properties',
  props<{ queryPropertiesString: string }>() // serialized QueryProperty[]
);

export const getTestEntityTemplateByPropertiesSuccess = createAction(
  '[TestEntityTemplate/API] Get By Properties Success',
  props<{
    payload: GenericResponseInterface<TestEntityTemplateListInterface[]>;
  }>()
);

export const getTestEntityTemplateByPropertiesFail = createAction(
  '[TestEntityTemplate/API] Get By Properties Fail',
  props<{ error: string }>()
);

// Exists
export const testEntityTemplateExists = createAction(
  '[TestEntityTemplate] Exists',
  props<{ id: string }>()
);

export const testEntityTemplateExistsSuccess = createAction(
  '[TestEntityTemplate/API] Exists Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const testEntityTemplateExistsFail = createAction(
  '[TestEntityTemplate/API] Exists Fail',
  props<{ error: string }>()
);

// Count
export const testEntityTemplateCount = createAction('[TestEntityTemplate] Count');

export const testEntityTemplateCountSuccess = createAction(
  '[TestEntityTemplate/API] Count Success',
  props<{
    payload: GenericResponseInterface<number>;
  }>()
);

export const testEntityTemplateCountFail = createAction(
  '[TestEntityTemplate/API] Count Fail',
  props<{ error: string }>()
);

// Create
export const createTestEntityTemplate = createAction(
  '[TestEntityTemplate] Create',
  props<{ payload: TestEntityTemplateFormInterface }>()
);

export const createTestEntityTemplateSuccess = createAction(
  '[TestEntityTemplate/API] Create Success',
  props<{
    payload: GenericResponseInterface<TestEntityTemplateListInterface>;
  }>()
);

export const createTestEntityTemplateFail = createAction(
  '[TestEntityTemplate/API] Create Fail',
  props<{ error: string }>()
);

// Update
export const updateTestEntityTemplate = createAction(
  '[TestEntityTemplate] Update',
  props<{ payload: TestEntityTemplateFormInterface }>()
);

export const updateTestEntityTemplateSuccess = createAction(
  '[TestEntityTemplate/API] Update Success',
  props<{
    payload: GenericResponseInterface<TestEntityTemplateListInterface>;
  }>()
);

export const updateTestEntityTemplateFail = createAction(
  '[TestEntityTemplate/API] Update Fail',
  props<{ error: string }>()
);

// Delete
export const deleteTestEntityTemplate = createAction(
  '[TestEntityTemplate] Delete',
  props<{ id: string }>()
);

export const deleteTestEntityTemplateSuccess = createAction(
  '[TestEntityTemplate/API] Delete Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteTestEntityTemplateFail = createAction(
  '[TestEntityTemplate/API] Delete Fail',
  props<{ error: string }>()
);

// Create Many
export const createManyTestEntityTemplates = createAction(
  '[TestEntityTemplate] Create Many',
  props<{ payload: TestEntityTemplateFormInterface[] }>()
);

export const createManyTestEntityTemplatesSuccess = createAction(
  '[TestEntityTemplate/API] Create Many Success',
  props<{
    payload: GenericResponseInterface<TestEntityTemplateListInterface[]>;
  }>()
);

export const createManyTestEntityTemplatesFail = createAction(
  '[TestEntityTemplate/API] Create Many Fail',
  props<{ error: string }>()
);

// Update Many
export const updateManyTestEntityTemplates = createAction(
  '[TestEntityTemplate] Update Many',
  props<{ payload: TestEntityTemplateFormInterface[] }>()
);

export const updateManyTestEntityTemplatesSuccess = createAction(
  '[TestEntityTemplate/API] Update Many Success',
  props<{
    payload: GenericResponseInterface<TestEntityTemplateListInterface[]>;
  }>()
);

export const updateManyTestEntityTemplatesFail = createAction(
  '[TestEntityTemplate/API] Update Many Fail',
  props<{ error: string }>()
);

// Delete Many
export const deleteManyTestEntityTemplates = createAction(
  '[TestEntityTemplate] Delete Many',
  props<{ ids: string[] }>()
);

export const deleteManyTestEntityTemplatesSuccess = createAction(
  '[TestEntityTemplate/API] Delete Many Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteManyTestEntityTemplatesFail = createAction(
  '[TestEntityTemplate/API] Delete Many Fail',
  props<{ error: string }>()
);

// Import/Export Endpoints
export const getTestEntityTemplateDataImportTemplate = createAction(
  '[TestEntityTemplate] Get Data Import Template'
);
export const getTestEntityTemplateDataImportTemplateSuccess = createAction(
  '[TestEntityTemplate/API] Get Data Import Template Success',
  props<{ payload: any }>()
);
export const getTestEntityTemplateDataImportTemplateFail = createAction(
  '[TestEntityTemplate/API] Get Data Import Template Fail',
  props<{ error: string }>()
);

export const importTestEntityTemplateData = createAction(
  '[TestEntityTemplate] Import Data',
  props<{ file: File }>()
);
export const importTestEntityTemplateDataSuccess = createAction(
  '[TestEntityTemplate/API] Import Data Success',
  props<{ payload: any }>()
);
export const importTestEntityTemplateDataFail = createAction(
  '[TestEntityTemplate/API] Import Data Fail',
  props<{ error: string }>()
);
