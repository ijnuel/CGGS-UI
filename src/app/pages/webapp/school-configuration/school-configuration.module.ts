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
import { SchoolConfigurationComponent } from './school-configuration.component';
import { SharedModule } from '../../../shared/shared.module';
import { CreateUpdateSchoolConfigurationComponent } from './create-update-school-configuration/create-update-school-configuration.component';
import { provideNativeDateAdapter } from '@angular/material/core';

const routes: Routes = [
    {
        path: '',
        component: SchoolConfigurationComponent,
    },

    {
        path: 'create',
        component: CreateUpdateSchoolConfigurationComponent,
    },

    {
        path: 'edit/:schoolConfigurationId',
        component: CreateUpdateSchoolConfigurationComponent,
    },
];

@NgModule({
    declarations: [SchoolConfigurationComponent, CreateUpdateSchoolConfigurationComponent],
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
export class SchoolConfigurationModule { }