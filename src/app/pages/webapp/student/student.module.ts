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
import { StudentComponent } from './student.component';
import { SharedModule } from '../../../shared/shared.module';
import { CreateUpdateStudentComponent } from './create-update-student/create-update-student.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ViewStudentComponent } from './view-student/view-student.component';

const routes: Routes = [
    {
        path: '',
        component: StudentComponent,
    },

    {
        path: 'create',
        component: CreateUpdateStudentComponent,
    },

    {
        path: 'edit/:id',
        component: CreateUpdateStudentComponent,
    },

    {
        path: 'view/:id',
        component: ViewStudentComponent,
    },
];

@NgModule({
    declarations: [StudentComponent, CreateUpdateStudentComponent, ViewStudentComponent],
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
export class StudentModule { }