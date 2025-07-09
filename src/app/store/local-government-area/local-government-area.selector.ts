import { createSelector } from '@ngrx/store';
import {
  getLocalGovernmentAreaList,
  getLocalGovernmentAreaAll,
  getLocalGovernmentAreaByProperties,
  getLocalGovernmentAreaById,
  getExists,
  getCount,
  getLoading,
  getError,
  LocalGovernmentAreaState,
} from './local-government-area.reducer';

export const selectLocalGovernmentAreaState = (state: { localGovernmentArea: LocalGovernmentAreaState }) =>
  state.localGovernmentArea;

export const selectLocalGovernmentAreaList = createSelector(
  selectLocalGovernmentAreaState,
  getLocalGovernmentAreaList
);

export const selectLocalGovernmentAreaAll = createSelector(
  selectLocalGovernmentAreaState,
  getLocalGovernmentAreaAll
);

export const selectLocalGovernmentAreaByProperties = createSelector(
  selectLocalGovernmentAreaState,
  getLocalGovernmentAreaByProperties
);

export const selectLocalGovernmentAreaById = createSelector(
  selectLocalGovernmentAreaState,
  getLocalGovernmentAreaById
);

export const selectExists = createSelector(
  selectLocalGovernmentAreaState,
  getExists
);

export const selectCount = createSelector(
  selectLocalGovernmentAreaState,
  getCount
);

export const selectLocalGovernmentAreaLoading = createSelector(
  selectLocalGovernmentAreaState,
  getLoading
);

export const selectLocalGovernmentAreaError = createSelector(
  selectLocalGovernmentAreaState,
  getError
);

export const selectLocalGovernmentAreaCreateSuccess = createSelector(
    selectLocalGovernmentAreaState,
    (state) => state.createSuccess
);

export const selectLocalGovernmentAreaUpdateSuccess = createSelector(
    selectLocalGovernmentAreaState,
    (state) => state.updateSuccess
);