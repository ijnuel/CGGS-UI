import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from '../../../shared/shared.module';
import { UpdateProfileComponent } from './update-profile.component';
import { provideNativeDateAdapter } from '@angular/material/core';

const routes: Routes = [
  { path: '', component: UpdateProfileComponent },
];

@NgModule({
  declarations: [UpdateProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
})
export class ProfileModule {}
