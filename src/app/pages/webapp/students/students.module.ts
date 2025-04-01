import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { CreateUpdateStudentsComponent } from './create-update-students/create-update-students.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
  },

  {
    path: 'create',
    component: CreateUpdateStudentsComponent,
  },

  {
    path: 'edit/:studentId',
    component: CreateUpdateStudentsComponent,
  },
];

@NgModule({
  declarations: [StudentsComponent, CreateUpdateStudentsComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class StudentsModule {}
