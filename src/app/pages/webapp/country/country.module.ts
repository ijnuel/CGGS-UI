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
import { CountryComponent } from './country.component';
import { SharedModule } from '../../../shared/shared.module';
import { CreateUpdateCountryComponent } from './create-update-country/create-update-country.component';
import { provideNativeDateAdapter } from '@angular/material/core';

const routes: Routes = [
    {
        path: '',
        component: CountryComponent,
    },

    {
        path: 'create',
        component: CreateUpdateCountryComponent,
    },

    {
        path: 'edit/:countryId',
        component: CreateUpdateCountryComponent,
    },
];

@NgModule({
    declarations: [CountryComponent, CreateUpdateCountryComponent],
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
export class CountryModule { }