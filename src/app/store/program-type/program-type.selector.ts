import { createSelector } from '@ngrx/store';
import * as fromProgramType from './program-type.reducer';
import * as fromApp from '../app.reducer';

export const selectProgramTypeState = createSelector(
  fromApp.selectAppState,
  (state) => state[fromProgramType.programTypeFeatureKey]
);

export const selectProgramTypeList = createSelector(
  fromProgramType.selectProgramTypeState,
  fromProgramType.getProgramTypeList
);

export const selectProgramTypeById = createSelector(
  fromProgramType.selectProgramTypeState,
  fromProgramType.getProgramTypeById
);

export const selectLoading = createSelector(
  fromProgramType.selectProgramTypeState,
  fromProgramType.getLoading
);

export const selectError = createSelector(
  fromProgramType.selectProgramTypeState,
  fromProgramType.getError
);
