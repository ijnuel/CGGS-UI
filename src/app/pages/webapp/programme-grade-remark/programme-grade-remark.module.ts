import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { ProgrammeGradeRemarkComponent } from './programme-grade-remark.component';
import { SharedModule } from '../../../shared/shared.module';
import { provideNativeDateAdapter } from '@angular/material/core';
import { GradeRemarkDialogComponent } from './grade-remark-dialog/grade-remark-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: ProgrammeGradeRemarkComponent,
  },
];

@NgModule({
  declarations: [ProgrammeGradeRemarkComponent, GradeRemarkDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule,
  ],
  providers: [provideNativeDateAdapter()],
})
export class ProgrammeGradeRemarkModule {}