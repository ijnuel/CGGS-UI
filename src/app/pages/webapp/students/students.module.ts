import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { SharedModule } from '../../../shared/shared.module';
import { StudentsTableListComponent } from './students-table-list/students-table-list.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
  },
];

@NgModule({
  declarations: [StudentsComponent, StudentsTableListComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class StudentsModule {}
