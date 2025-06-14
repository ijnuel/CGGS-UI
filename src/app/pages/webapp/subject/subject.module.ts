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
import { SubjectComponent } from './subject.component';
import { SharedModule } from '../../../shared/shared.module';
import { CreateUpdateSubjectComponent } from './create-update-subject/create-update-subject.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ViewSubjectComponent } from './view-subject/view-subject.component';

const routes: Routes = [
    {
        path: '',
        component: SubjectComponent,
    },

    {
        path: 'create',
        component: CreateUpdateSubjectComponent,
    },

    {
        path: 'edit/:id',
        component: CreateUpdateSubjectComponent,
    },

    {
        path: 'view/:id',
        component: ViewSubjectComponent,
    },
];

@NgModule({
    declarations: [SubjectComponent, CreateUpdateSubjectComponent, ViewSubjectComponent],
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
export class SubjectModule { }