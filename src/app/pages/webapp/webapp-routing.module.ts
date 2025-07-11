import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebappComponent } from './webapp.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: WebappComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'student',
        loadChildren: () =>
          import('./student/student.module').then((m) => m.StudentModule),
      },
      { path: 'test-entity-template', loadChildren: () => import('./test-entity-template/test-entity-template.module').then((m) => m.TestEntityTemplateModule), },
      { path: 'programme-grade-remark', loadChildren: () => import('./programme-grade-remark/programme-grade-remark.module').then((m) => m.ProgrammeGradeRemarkModule), },
      { path: 'family', loadChildren: () => import('./family/family.module').then((m) => m.FamilyModule), },
      { path: 'class-subject-assessment', loadChildren: () => import('./class-subject-assessment/class-subject-assessment.module').then((m) => m.ClassSubjectAssessmentModule), },
      { path: 'class-subject', loadChildren: () => import('./class-subject/class-subject.module').then((m) => m.ClassSubjectModule), },
      { path: 'class-level', loadChildren: () => import('./class-level/class-level.module').then((m) => m.ClassLevelModule), },
      { path: 'class', loadChildren: () => import('./class/class.module').then((m) => m.ClassModule), },
      { path: 'subject', loadChildren: () => import('./subject/subject.module').then((m) => m.SubjectModule), },
      { path: 'program-type', loadChildren: () => import('./program-type/program-type.module').then((m) => m.ProgramTypeModule), },
      { path: 'application', loadChildren: () => import('./application/application.module').then((m) => m.ApplicationModule), },
      { path: 'state', loadChildren: () => import('./state/state.module').then((m) => m.StateModule), },
      { path: 'session', loadChildren: () => import('./session/session.module').then((m) => m.SessionModule), },
      { path: 'local-government-area', loadChildren: () => import('./local-government-area/local-government-area.module').then((m) => m.LocalGovernmentAreaModule), },
      { path: 'country', loadChildren: () => import('./country/country.module').then((m) => m.CountryModule), },
      { path: 'company', loadChildren: () => import('./company/company.module').then((m) => m.CompanyModule), },
      { path: 'student-class', loadChildren: () => import('./student-class/student-class.module').then((m) => m.StudentClassModule), },
      { path: 'school-configuration', loadChildren: () => import('./school-configuration/school-configuration.module').then((m) => m.SchoolConfigurationModule), },
      { path: 'staff', loadChildren: () => import('./staff/staff.module').then((m) => m.StaffModule), },
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule), },
      { path: 'admin-setup', loadChildren: () => import('./admin-setup/admin-setup.module').then((m) => m.AdminSetupModule), },
      { path: 'administrator', loadChildren: () => import('./administrator/administrator.module').then((m) => m.AdministratorModule), },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebappRoutingModule {}
