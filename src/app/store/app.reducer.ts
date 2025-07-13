import { createFeatureSelector } from '@ngrx/store';

import * as fromAuth from './auth/auth.reducer';
import * as fromStudent from './student/student.reducer';
import * as fromShared from './shared/shared.reducer';
import * as fromAdministrator from './administrator/administrator.reducer';
import * as fromTestEntityTemplate from './test-entity-template/test-entity-template.reducer';
import * as fromProgrammeGradeRemark from './programme-grade-remark/programme-grade-remark.reducer';
import * as fromFamily from './family/family.reducer';
import * as fromClassSubjectAssessment from './class-subject-assessment/class-subject-assessment.reducer';
import * as fromClassSubject from './class-subject/class-subject.reducer';
import * as fromClassLevel from './class-level/class-level.reducer';
import * as fromClass from './class/class.reducer';
import * as fromSubject from './subject/subject.reducer';
import * as fromProgramType from './program-type/program-type.reducer';
import * as fromApplication from './application/application.reducer';
import * as fromState from './state/state.reducer';
import * as fromSession from './session/session.reducer';
import * as fromLocalGovernmentArea from './local-government-area/local-government-area.reducer';
import * as fromCountry from './country/country.reducer';
import * as fromCompany from './company/company.reducer';
import * as fromStudentClass from './student-class/student-class.reducer';
import * as fromSchoolTermSession from './school-term-session/school-term-session.reducer';
import * as fromStaff from './staff/staff.reducer';
import * as fromGlobalLoading from './global-loading/global-loading.reducer';

export const appFeatureKey = 'appFeatureKey';

export interface AppState {
  [fromAuth.authFeatureKey]: fromAuth.AuthState;
  [fromShared.sharedFeatureKey]: fromShared.SharedState;
  [fromAdministrator.administratorFeatureKey]: fromAdministrator.AdministratorState;
  [fromTestEntityTemplate.testEntityTemplateFeatureKey]: fromTestEntityTemplate.TestEntityTemplateState;
  [fromProgrammeGradeRemark.programmeGradeRemarkFeatureKey]: fromProgrammeGradeRemark.ProgrammeGradeRemarkState;
  [fromFamily.familyFeatureKey]: fromFamily.FamilyState;
  [fromStudent.studentFeatureKey]: fromStudent.StudentState;
  [fromClassSubjectAssessment.classSubjectAssessmentFeatureKey]: fromClassSubjectAssessment.ClassSubjectAssessmentState;
  [fromClassSubject.classSubjectFeatureKey]: fromClassSubject.ClassSubjectState;
  [fromClassLevel.classLevelFeatureKey]: fromClassLevel.ClassLevelState;
  [fromClass.classFeatureKey]: fromClass.ClassState;
  [fromSubject.subjectFeatureKey]: fromSubject.SubjectState;
  [fromProgramType.programTypeFeatureKey]: fromProgramType.ProgramTypeState;
  [fromApplication.applicationFeatureKey]: fromApplication.ApplicationState;
  [fromState.stateFeatureKey]: fromState.StateState;
  [fromSession.sessionFeatureKey]: fromSession.SessionState;
  [fromLocalGovernmentArea.localGovernmentAreaFeatureKey]: fromLocalGovernmentArea.LocalGovernmentAreaState;
  [fromCountry.countryFeatureKey]: fromCountry.CountryState;
  [fromCompany.companyFeatureKey]: fromCompany.CompanyState;
  [fromStudentClass.studentClassFeatureKey]: fromStudentClass.StudentClassState;
  [fromSchoolTermSession.schoolTermSessionFeatureKey]: fromSchoolTermSession.SchoolTermSessionState;
  [fromStaff.staffFeatureKey]: fromStaff.StaffState;
  [fromGlobalLoading.globalLoadingFeatureKey]: fromGlobalLoading.GlobalLoadingState;
}

export const reducers = {
  [fromAuth.authFeatureKey]: fromAuth.authReducer, // Updated to use authReducer
  [fromShared.sharedFeatureKey]: fromShared.reducer,
  [fromAdministrator.administratorFeatureKey]: fromAdministrator.reducer,
  [fromTestEntityTemplate.testEntityTemplateFeatureKey]: fromTestEntityTemplate.reducer,
  [fromProgrammeGradeRemark.programmeGradeRemarkFeatureKey]: fromProgrammeGradeRemark.reducer,
  [fromFamily.familyFeatureKey]: fromFamily.reducer,
  [fromStudent.studentFeatureKey]: fromStudent.reducer,
  [fromClassSubjectAssessment.classSubjectAssessmentFeatureKey]: fromClassSubjectAssessment.reducer,
  [fromClassSubject.classSubjectFeatureKey]: fromClassSubject.reducer,
  [fromClassLevel.classLevelFeatureKey]: fromClassLevel.reducer,
  [fromClass.classFeatureKey]: fromClass.reducer,
  [fromSubject.subjectFeatureKey]: fromSubject.reducer,
  [fromProgramType.programTypeFeatureKey]: fromProgramType.reducer,
  [fromApplication.applicationFeatureKey]: fromApplication.reducer,
  [fromState.stateFeatureKey]: fromState.reducer,
  [fromSession.sessionFeatureKey]: fromSession.reducer,
  [fromLocalGovernmentArea.localGovernmentAreaFeatureKey]: fromLocalGovernmentArea.reducer,
  [fromCountry.countryFeatureKey]: fromCountry.reducer,
  [fromCompany.companyFeatureKey]: fromCompany.reducer,
  [fromStudentClass.studentClassFeatureKey]: fromStudentClass.reducer,
  [fromSchoolTermSession.schoolTermSessionFeatureKey]: fromSchoolTermSession.reducer,
  [fromStaff.staffFeatureKey]: fromStaff.reducer,
  [fromGlobalLoading.globalLoadingFeatureKey]: fromGlobalLoading.reducer,
};

export const selectAppState = createFeatureSelector<AppState>(appFeatureKey);
