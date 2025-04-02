import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/website/website.module').then((m) => m.WebsiteModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'app',
    loadChildren: () =>
      import('./pages/webapp/webapp.module').then((m) => m.WebappModule),
    canActivate: [AuthGuard],
  },

  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
