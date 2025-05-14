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
        path: 'students',
        loadChildren: () =>
          import('./students/students.module').then((m) => m.StudentsModule),
      },
      { path: 'test-entity-template', loadChildren: () => import('./test-entity-template/test-entity-template.module').then((m) => m.TestEntityTemplateModule), },
      { path: 'application', loadChildren: () => import('./application/application.module').then((m) => m.ApplicationModule), },
      { path: 'parent', loadChildren: () => import('./parent/parent.module').then((m) => m.ParentModule), },
      { path: 'state', loadChildren: () => import('./state/state.module').then((m) => m.StateModule), },
      { path: 'session', loadChildren: () => import('./session/session.module').then((m) => m.SessionModule), },
      { path: 'local-government-area', loadChildren: () => import('./local-government-area/local-government-area.module').then((m) => m.LocalGovernmentAreaModule), },
      { path: 'country', loadChildren: () => import('./country/country.module').then((m) => m.CountryModule), },
      { path: 'company', loadChildren: () => import('./company/company.module').then((m) => m.CompanyModule), },
      { path: 'student-class', loadChildren: () => import('./student-class/student-class.module').then((m) => m.StudentClassModule), },
      { path: 'school-configuration', loadChildren: () => import('./school-configuration/school-configuration.module').then((m) => m.SchoolConfigurationModule), },
      { path: 'program-type', loadChildren: () => import('./program-type/program-type.module').then((m) => m.ProgramTypeModule), },
      { path: 'class-level', loadChildren: () => import('./class-level/class-level.module').then((m) => m.ClassLevelModule), },
      { path: 'class', loadChildren: () => import('./class/class.module').then((m) => m.ClassModule), },
      { path: 'teacher', loadChildren: () => import('./teacher/teacher.module').then((m) => m.TeacherModule), },
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule), },
      { path: 'admin-setup', loadChildren: () => import('./admin-setup/admin-setup.module').then((m) => m.AdminSetupModule), },
      { path: 'administrator', loadChildren: () => import('./administrator/administrator.module').then((m) => m.AdministratorModule), },
      {
        path: 'staff',
        loadChildren: () =>
          import('./staff/staff.module').then((m) => m.StaffModule),
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebappRoutingModule {}
