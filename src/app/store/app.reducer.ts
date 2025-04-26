import { createFeatureSelector } from '@ngrx/store';

import * as fromAuth from './auth/auth.reducer';
import * as fromStudent from './students/students.reducer';
import * as fromAdministrator from './administrator/administrator.reducer';
import * as fromTestEntityTemplate from './test-entity-template/test-entity-template.reducer';
import * as fromGlobalLoading from './global-loading/global-loading.reducer';

export const appFeatureKey = 'appFeatureKey';

export interface AppState {
  [fromAuth.authFeatureKey]: fromAuth.AuthState;
  [fromStudent.studentsFeatureKey]: fromStudent.StudentsState;
  [fromAdministrator.administratorFeatureKey]: fromAdministrator.AdministratorState;
  [fromTestEntityTemplate.testEntityTemplateFeatureKey]: fromTestEntityTemplate.TestEntityTemplateState;
  [fromGlobalLoading.globalLoadingFeatureKey]: fromGlobalLoading.GlobalLoadingState;
}

export const reducers = {
  [fromAuth.authFeatureKey]: fromAuth.reducer,
  [fromStudent.studentsFeatureKey]: fromStudent.reducer,
  [fromAdministrator.administratorFeatureKey]: fromAdministrator.reducer,
  [fromTestEntityTemplate.testEntityTemplateFeatureKey]: fromTestEntityTemplate.reducer,
  [fromGlobalLoading.globalLoadingFeatureKey]: fromGlobalLoading.reducer,
};

export const selectAppState = createFeatureSelector<AppState>(appFeatureKey);
