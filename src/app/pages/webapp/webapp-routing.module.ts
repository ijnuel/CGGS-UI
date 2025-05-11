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
      { path: 'teacher', loadChildren: () => import('./teacher/teacher.module').then((m) => m.TeacherModule), },
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule), },
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
