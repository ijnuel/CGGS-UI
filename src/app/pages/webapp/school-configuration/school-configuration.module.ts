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
import { ViewSchoolConfigurationComponent } from './view-school-configuration/view-school-configuration.component';

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
        path: 'edit/:id',
        component: CreateUpdateSchoolConfigurationComponent,
    },

    {
        path: 'view/:id',
        component: ViewSchoolConfigurationComponent,
    },
];

@NgModule({
    declarations: [SchoolConfigurationComponent, CreateUpdateSchoolConfigurationComponent, ViewSchoolConfigurationComponent],
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