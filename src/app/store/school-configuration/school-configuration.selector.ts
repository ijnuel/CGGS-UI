import { createSelector } from '@ngrx/store';
import {
  getSchoolConfigurationList,
  getSchoolConfigurationAll,
  getSchoolConfigurationByProperties,
  getSchoolConfigurationById,
  getExists,
  getCount,
  getLoading,
  getError,
  SchoolConfigurationState,
} from './school-configuration.reducer';

export const selectSchoolConfigurationState = (state: { schoolConfiguration: SchoolConfigurationState }) =>
  state.schoolConfiguration;

export const selectSchoolConfigurationList = createSelector(
  selectSchoolConfigurationState,
  getSchoolConfigurationList
);

export const selectSchoolConfigurationAll = createSelector(
  selectSchoolConfigurationState,
  getSchoolConfigurationAll
);

export const selectSchoolConfigurationByProperties = createSelector(
  selectSchoolConfigurationState,
  getSchoolConfigurationByProperties
);

export const selectSchoolConfigurationById = createSelector(
  selectSchoolConfigurationState,
  getSchoolConfigurationById
);

export const selectExists = createSelector(
  selectSchoolConfigurationState,
  getExists
);

export const selectCount = createSelector(
  selectSchoolConfigurationState,
  getCount
);

export const selectSchoolConfigurationLoading = createSelector(
  selectSchoolConfigurationState,
  getLoading
);

export const selectSchoolConfigurationError = createSelector(
  selectSchoolConfigurationState,
  getError
);

export const selectSchoolConfigurationCreateSuccess = createSelector(
    selectSchoolConfigurationState,
    (state) => state.createSuccess
);

export const selectSchoolConfigurationUpdateSuccess = createSelector(
    selectSchoolConfigurationState,
    (state) => state.updateSuccess
);