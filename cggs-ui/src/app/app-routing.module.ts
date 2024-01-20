import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './services/auth/auth.guard';
import { AccountComponent } from './modules/account/account.component';
import { guestGuard } from './services/auth/guest.guard';
import { LoginComponent } from './modules/account/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', canActivate: [guestGuard], component: AccountComponent },
  { path: 'login', canActivate: [guestGuard], component: LoginComponent },
  { path: 'home', canActivate: [authGuard], component: DashboardComponent },
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
