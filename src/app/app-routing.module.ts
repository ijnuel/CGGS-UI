import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './services/auth/auth.guard';
import { AccountComponent } from './pages/account/account.component';
import { guestGuard } from './services/auth/guest.guard';
import { LoginComponent } from './pages/account/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PortalComponent } from './pages/portal/portal.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminFormComponent } from './pages/admin/admin-form/admin-form.component';
import { AdminListComponent } from './pages/admin/admin-list/admin-list.component';

const routes: Routes = [
  { path: '', canActivate: [guestGuard], component: HomeComponent },
  // { path: 'school-portal', canActivate: [guestGuard], component: LoginComponent },
  { path: 'portal', canActivate: [authGuard], component: PortalComponent },
  { path: 'dashboards', canActivate: [authGuard], component: DashboardComponent },
  {
    path: "school-portal",
    canActivate: [guestGuard],
    children: [
      {
        path: "",
        component: LoginComponent
      },
    ]
  },
  {
    path: "admin",
    canActivate: [authGuard],
    children: [
      {
        path: "list",
        component: AdminListComponent
      },
    ]
  }
  // {
  //   path: 'home',
  //   canActivate: [authGuard],
  //   loadChildren: () =>
  //     import('./modules/home/home.module').then((m) => m.HomeModule),
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
