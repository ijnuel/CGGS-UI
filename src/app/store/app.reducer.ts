import { createFeatureSelector } from '@ngrx/store';

import * as fromAuth from './auth/auth.reducer';
import * as fromStudent from './students/students.reducer';
import * as fromGlobalLoading from './global-loading/global-loading.reducer';

export const appFeatureKey = 'appFeatureKey';

export interface AppState {
  [fromAuth.authFeatureKey]: fromAuth.AuthState;
  [fromStudent.studentsFeatureKey]: fromStudent.StudentsState;
  [fromGlobalLoading.globalLoadingFeatureKey]: fromGlobalLoading.GlobalLoadingState;
}

export const reducers = {
  [fromAuth.authFeatureKey]: fromAuth.reducer,
  [fromStudent.studentsFeatureKey]: fromStudent.reducer,
  [fromGlobalLoading.globalLoadingFeatureKey]: fromGlobalLoading.reducer,
};

export const selectAppState = createFeatureSelector<AppState>(appFeatureKey);
