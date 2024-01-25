import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './services/auth/auth.guard';
import { AccountComponent } from './modules/account/account.component';
import { guestGuard } from './services/auth/guest.guard';
import { LoginComponent } from './modules/account/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PortalComponent } from './modules/portal/portal.component';

const routes: Routes = [
  { path: '', canActivate: [guestGuard], component: AccountComponent },
  { path: 'login', canActivate: [guestGuard], component: LoginComponent },
  { path: 'portal', canActivate: [authGuard], component: PortalComponent },
  { path: 'dashboards', canActivate: [authGuard], component: DashboardComponent, outlet: "portalOutlet" },
  {
    path: 'dashboardss',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/portal/portal.module').then((m) => m.PortalModule),
    outlet: "portalOutlet"
  },
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
