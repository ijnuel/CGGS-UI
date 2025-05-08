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
import { AdministratorComponent } from './administrator.component';
import { SharedModule } from '../../../shared/shared.module';
import { CreateUpdateAdministratorComponent } from './create-update-administrator/create-update-administrator.component';
import { provideNativeDateAdapter } from '@angular/material/core';

const routes: Routes = [
    {
        path: '',
        component: AdministratorComponent,
    },

    {
        path: 'create',
        component: CreateUpdateAdministratorComponent,
    },

    {
        path: 'edit/:administratorId',
        component: CreateUpdateAdministratorComponent,
    },
];

@NgModule({
    declarations: [AdministratorComponent, CreateUpdateAdministratorComponent],
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
export class AdministratorModule { }