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
import { ClassSubjectAssessmentComponent } from './class-subject-assessment.component';
import { SharedModule } from '../../../shared/shared.module';
import { CreateUpdateClassSubjectAssessmentComponent } from './create-update-class-subject-assessment/create-update-class-subject-assessment.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ViewClassSubjectAssessmentComponent } from './view-class-subject-assessment/view-class-subject-assessment.component';

const routes: Routes = [
    {
        path: '',
        component: ClassSubjectAssessmentComponent,
    },

    {
        path: 'create',
        component: CreateUpdateClassSubjectAssessmentComponent,
    },

    {
        path: 'edit/:id',
        component: CreateUpdateClassSubjectAssessmentComponent,
    },

    {
        path: 'view/:id',
        component: ViewClassSubjectAssessmentComponent,
    },
];

@NgModule({
    declarations: [ClassSubjectAssessmentComponent, CreateUpdateClassSubjectAssessmentComponent, ViewClassSubjectAssessmentComponent],
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
export class ClassSubjectAssessmentModule { }