import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  TestEntityTemplateListInterface,
  TestEntityTemplateFormInterface,
} from '../../types';

export const getTestEntityTemplateList = createAction(
  '[TestEntityTemplate] Get TestEntityTemplate List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getTestEntityTemplateListSuccess = createAction(
  '[TestEntityTemplate/API] Get TestEntityTemplate List Success',
  props<{
    payload: GenericResponseInterface<
      PaginatedResponseInterface<TestEntityTemplateListInterface[]>
    >;
  }>()
);

export const getTestEntityTemplateListFail = createAction(
  '[TestEntityTemplate/API] Get TestEntityTemplate List Fail',
  props<{ error: string }>()
);

export const getTestEntityTemplateById = createAction(
  '[TestEntityTemplate] Get TestEntityTemplate By Id',
  props<{ testEntityTemplateId: string }>()
);

export const getTestEntityTemplateByIdSuccess = createAction(
  '[TestEntityTemplate/API] Get TestEntityTemplate By Id Success',
  props<{
    payload: GenericResponseInterface<TestEntityTemplateListInterface>;
  }>()
);

export const getTestEntityTemplateByIdFail = createAction(
  '[TestEntityTemplate/API] Get TestEntityTemplate By Id Fail',
  props<{ error: string }>()
);

export const createTestEntityTemplate = createAction(
  '[TestEntityTemplate] Create TestEntityTemplate',
  props<{ payload: TestEntityTemplateFormInterface }>()
);

export const createTestEntityTemplateSuccess = createAction(
  '[TestEntityTemplate/API] Create TestEntityTemplate Success',
  props<{ message: string; testEntityTemplate: TestEntityTemplateListInterface }>()
);

export const createTestEntityTemplateFail = createAction(
  '[TestEntityTemplate/API] Create TestEntityTemplate Fail',
  props<{ error: string }>()
);

export const editTestEntityTemplate = createAction(
  '[TestEntityTemplate] Edit TestEntityTemplate',
  props<{ payload: TestEntityTemplateFormInterface }>()
);

export const editTestEntityTemplateSuccess = createAction(
  '[TestEntityTemplate/API] Edit TestEntityTemplate Success',
  props<{ message: string; testEntityTemplate: TestEntityTemplateListInterface }>()
);

export const editTestEntityTemplateFail = createAction(
  '[TestEntityTemplate/API] Edit TestEntityTemplate Fail',
  props<{ error: string }>()
);
