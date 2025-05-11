import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  SchoolConfigurationListInterface,
  SchoolConfigurationFormInterface,
} from '../../types';

export const getSchoolConfigurationList = createAction(
  '[SchoolConfiguration] Get SchoolConfiguration List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getSchoolConfigurationListSuccess = createAction(
  '[SchoolConfiguration/API] Get SchoolConfiguration List Success',
  props<{
    payload: GenericResponseInterface<
      PaginatedResponseInterface<SchoolConfigurationListInterface[]>
    >;
  }>()
);

export const getSchoolConfigurationListFail = createAction(
  '[SchoolConfiguration/API] Get SchoolConfiguration List Fail',
  props<{ error: string }>()
);

export const getSchoolConfigurationById = createAction(
  '[SchoolConfiguration] Get SchoolConfiguration By Id',
  props<{ schoolConfigurationId: string }>()
);

export const getSchoolConfigurationByIdSuccess = createAction(
  '[SchoolConfiguration/API] Get SchoolConfiguration By Id Success',
  props<{
    payload: GenericResponseInterface<SchoolConfigurationListInterface>;
  }>()
);

export const getSchoolConfigurationByIdFail = createAction(
  '[SchoolConfiguration/API] Get SchoolConfiguration By Id Fail',
  props<{ error: string }>()
);

export const createSchoolConfiguration = createAction(
  '[SchoolConfiguration] Create SchoolConfiguration',
  props<{ payload: SchoolConfigurationFormInterface }>()
);

export const createSchoolConfigurationSuccess = createAction(
  '[SchoolConfiguration/API] Create SchoolConfiguration Success',
  props<{ message: string; schoolConfiguration: SchoolConfigurationListInterface }>()
);

export const createSchoolConfigurationFail = createAction(
  '[SchoolConfiguration/API] Create SchoolConfiguration Fail',
  props<{ error: string }>()
);

export const editSchoolConfiguration = createAction(
  '[SchoolConfiguration] Edit SchoolConfiguration',
  props<{ payload: SchoolConfigurationFormInterface }>()
);

export const editSchoolConfigurationSuccess = createAction(
  '[SchoolConfiguration/API] Edit SchoolConfiguration Success',
  props<{ message: string; schoolConfiguration: SchoolConfigurationListInterface }>()
);

export const editSchoolConfigurationFail = createAction(
  '[SchoolConfiguration/API] Edit SchoolConfiguration Fail',
  props<{ error: string }>()
);
