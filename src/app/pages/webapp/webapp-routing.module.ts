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