import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ToastNotificationService } from '../../services/toast-notification.service';
import { LoginGuard } from '../../services/login.guard';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'enroll',
        component: CreateProfileComponent,
        canActivate: [LoginGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [AuthComponent, LoginComponent, CreateProfileComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    SharedModule,
  ],
  providers: [ToastNotificationService],
})
export class AuthModule {}
