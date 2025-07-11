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
import { CreateUpdateProgrammeGradeRemarkComponent } from './create-update-programme-grade-remark/create-update-programme-grade-remark.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ViewProgrammeGradeRemarkComponent } from './view-programme-grade-remark/view-programme-grade-remark.component';

const routes: Routes = [
    {
        path: '',
        component: ProgrammeGradeRemarkComponent,
    },

    {
        path: 'create',
        component: CreateUpdateProgrammeGradeRemarkComponent,
    },

    {
        path: 'edit/:id',
        component: CreateUpdateProgrammeGradeRemarkComponent,
    },

    {
        path: 'view/:id',
        component: ViewProgrammeGradeRemarkComponent,
    },
];

@NgModule({
    declarations: [ProgrammeGradeRemarkComponent, CreateUpdateProgrammeGradeRemarkComponent, ViewProgrammeGradeRemarkComponent],
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
export class ProgrammeGradeRemarkModule { }