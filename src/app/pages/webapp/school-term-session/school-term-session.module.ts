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
import { SchoolTermSessionComponent } from './school-term-session.component';
import { SharedModule } from '../../../shared/shared.module';
import { CreateUpdateSchoolTermSessionComponent } from './create-update-school-term-session/create-update-school-term-session.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ViewSchoolTermSessionComponent } from './view-school-configuration/view-school-term-session.component';

const routes: Routes = [
    {
        path: '',
        component: SchoolTermSessionComponent,
    },

    {
        path: 'create',
        component: CreateUpdateSchoolTermSessionComponent,
    },

    {
        path: 'edit/:id',
        component: CreateUpdateSchoolTermSessionComponent,
    },

    {
        path: 'view/:id',
        component: ViewSchoolTermSessionComponent,
    },
];

@NgModule({
    declarations: [SchoolTermSessionComponent, CreateUpdateSchoolTermSessionComponent, ViewSchoolTermSessionComponent],
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
export class SchoolTermSessionModule { }