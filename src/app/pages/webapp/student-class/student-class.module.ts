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
import { StudentClassComponent } from './student-class.component';
import { SharedModule } from '../../../shared/shared.module';
import { CreateUpdateStudentClassComponent } from './create-update-student-class/create-update-student-class.component';
import { provideNativeDateAdapter } from '@angular/material/core';

const routes: Routes = [
    {
        path: '',
        component: StudentClassComponent,
    },

    {
        path: 'create',
        component: CreateUpdateStudentClassComponent,
    },

    {
        path: 'edit/:studentClassId',
        component: CreateUpdateStudentClassComponent,
    },
];

@NgModule({
    declarations: [StudentClassComponent, CreateUpdateStudentClassComponent],
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
export class StudentClassModule { }