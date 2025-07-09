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
import { ProgramTypeComponent } from './program-type.component';
import { SharedModule } from '../../../shared/shared.module';
import { CreateUpdateProgramTypeComponent } from './create-update-program-type/create-update-program-type.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ViewProgramTypeComponent } from './view-program-type/view-program-type.component';

const routes: Routes = [
    {
        path: '',
        component: ProgramTypeComponent,
    },

    {
        path: 'create',
        component: CreateUpdateProgramTypeComponent,
    },

    {
        path: 'edit/:id',
        component: CreateUpdateProgramTypeComponent,
    },

    {
        path: 'view/:id',
        component: ViewProgramTypeComponent,
    },
];

@NgModule({
    declarations: [ProgramTypeComponent, CreateUpdateProgramTypeComponent, ViewProgramTypeComponent],
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
export class ProgramTypeModule { }