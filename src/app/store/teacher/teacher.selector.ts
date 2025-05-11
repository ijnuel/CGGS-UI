import { createSelector } from '@ngrx/store';
import * as fromTeacher from './teacher.reducer';
import * as fromApp from '../app.reducer';

export const selectTeacherState = createSelector(
  fromApp.selectAppState,
  (state) => state[fromTeacher.teacherFeatureKey]
);

export const selectTeacherList = createSelector(
  fromTeacher.selectTeacherState,
  fromTeacher.getTeacherList
);

export const selectTeacherById = createSelector(
  fromTeacher.selectTeacherState,
  fromTeacher.getTeacherById
);

export const selectLoading = createSelector(
  fromTeacher.selectTeacherState,
  fromTeacher.getLoading
);

export const selectError = createSelector(
  fromTeacher.selectTeacherState,
  fromTeacher.getError
);
