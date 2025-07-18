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
import { CompanyComponent } from './company.component';
import { SharedModule } from '../../../shared/shared.module';
import { CreateUpdateCompanyComponent } from './create-update-company/create-update-company.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ViewCompanyComponent } from './view-company/view-company.component';

const routes: Routes = [
    {
        path: '',
        component: CompanyComponent,
    },

    {
        path: 'create',
        component: CreateUpdateCompanyComponent,
    },

    {
        path: 'edit/:id',
        component: CreateUpdateCompanyComponent,
    },

    {
        path: 'view/:id',
        component: ViewCompanyComponent,
    },
];

@NgModule({
    declarations: [CompanyComponent, CreateUpdateCompanyComponent, ViewCompanyComponent],
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
export class CompanyModule { }