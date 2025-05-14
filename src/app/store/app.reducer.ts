import { createFeatureSelector } from '@ngrx/store';

import * as fromAuth from './auth/auth.reducer';
import * as fromStudent from './students/students.reducer';
import * as fromShared from './shared/shared.reducer';
import * as fromAdministrator from './administrator/administrator.reducer';
import * as fromTestEntityTemplate from './test-entity-template/test-entity-template.reducer';
import * as fromApplication from './application/application.reducer';
import * as fromParent from './parent/parent.reducer';
import * as fromState from './state/state.reducer';
import * as fromSession from './session/session.reducer';
import * as fromLocalGovernmentArea from './local-government-area/local-government-area.reducer';
import * as fromCountry from './country/country.reducer';
import * as fromCompany from './company/company.reducer';
import * as fromStudentClass from './student-class/student-class.reducer';
import * as fromSchoolConfiguration from './school-configuration/school-configuration.reducer';
import * as fromProgramType from './program-type/program-type.reducer';
import * as fromClassLevel from './class-level/class-level.reducer';
import * as fromClass from './class/class.reducer';
import * as fromTeacher from './teacher/teacher.reducer';
import * as fromGlobalLoading from './global-loading/global-loading.reducer';

export const appFeatureKey = 'appFeatureKey';

export interface AppState {
  [fromAuth.authFeatureKey]: fromAuth.AuthState;
  [fromStudent.studentsFeatureKey]: fromStudent.StudentsState;
  [fromShared.sharedFeatureKey]: fromShared.SharedState;
  [fromAdministrator.administratorFeatureKey]: fromAdministrator.AdministratorState;
  [fromTestEntityTemplate.testEntityTemplateFeatureKey]: fromTestEntityTemplate.TestEntityTemplateState;
  [fromApplication.applicationFeatureKey]: fromApplication.ApplicationState;
  [fromParent.parentFeatureKey]: fromParent.ParentState;
  [fromState.stateFeatureKey]: fromState.StateState;
  [fromSession.sessionFeatureKey]: fromSession.SessionState;
  [fromLocalGovernmentArea.localGovernmentAreaFeatureKey]: fromLocalGovernmentArea.LocalGovernmentAreaState;
  [fromCountry.countryFeatureKey]: fromCountry.CountryState;
  [fromCompany.companyFeatureKey]: fromCompany.CompanyState;
  [fromStudentClass.studentClassFeatureKey]: fromStudentClass.StudentClassState;
  [fromSchoolConfiguration.schoolConfigurationFeatureKey]: fromSchoolConfiguration.SchoolConfigurationState;
  [fromProgramType.programTypeFeatureKey]: fromProgramType.ProgramTypeState;
  [fromClassLevel.classLevelFeatureKey]: fromClassLevel.ClassLevelState;
  [fromClass.classFeatureKey]: fromClass.ClassState;
  [fromTeacher.teacherFeatureKey]: fromTeacher.TeacherState;
  [fromGlobalLoading.globalLoadingFeatureKey]: fromGlobalLoading.GlobalLoadingState;
}

export const reducers = {
  [fromAuth.authFeatureKey]: fromAuth.authReducer, // Updated to use authReducer
  [fromStudent.studentsFeatureKey]: fromStudent.reducer,
  [fromShared.sharedFeatureKey]: fromShared.reducer,
  [fromAdministrator.administratorFeatureKey]: fromAdministrator.reducer,
  [fromTestEntityTemplate.testEntityTemplateFeatureKey]: fromTestEntityTemplate.reducer,
  [fromApplication.applicationFeatureKey]: fromApplication.reducer,
  [fromParent.parentFeatureKey]: fromParent.reducer,
  [fromState.stateFeatureKey]: fromState.reducer,
  [fromSession.sessionFeatureKey]: fromSession.reducer,
  [fromLocalGovernmentArea.localGovernmentAreaFeatureKey]: fromLocalGovernmentArea.reducer,
  [fromCountry.countryFeatureKey]: fromCountry.reducer,
  [fromCompany.companyFeatureKey]: fromCompany.reducer,
  [fromStudentClass.studentClassFeatureKey]: fromStudentClass.reducer,
  [fromSchoolConfiguration.schoolConfigurationFeatureKey]: fromSchoolConfiguration.reducer,
  [fromProgramType.programTypeFeatureKey]: fromProgramType.reducer,
  [fromClassLevel.classLevelFeatureKey]: fromClassLevel.reducer,
  [fromClass.classFeatureKey]: fromClass.reducer,
  [fromTeacher.teacherFeatureKey]: fromTeacher.reducer,
  [fromGlobalLoading.globalLoadingFeatureKey]: fromGlobalLoading.reducer,
};

export const selectAppState = createFeatureSelector<AppState>(appFeatureKey);