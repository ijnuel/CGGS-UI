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
import { ClassSubjectComponent } from './class-subject.component';
import { SharedModule } from '../../../shared/shared.module';
import { CreateUpdateClassSubjectComponent } from './create-update-class-subject/create-update-class-subject.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ViewClassSubjectComponent } from './view-class-subject/view-class-subject.component';

const routes: Routes = [
    {
        path: '',
        component: ClassSubjectComponent,
    },

    {
        path: 'create',
        component: CreateUpdateClassSubjectComponent,
    },

    {
        path: 'edit/:id',
        component: CreateUpdateClassSubjectComponent,
    },

    {
        path: 'view/:id',
        component: ViewClassSubjectComponent,
    },
];

@NgModule({
    declarations: [ClassSubjectComponent, CreateUpdateClassSubjectComponent, ViewClassSubjectComponent],
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
export class ClassSubjectModule { }