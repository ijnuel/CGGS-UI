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
import { StaffComponent } from './staff.component';
import { SharedModule } from '../../../shared/shared.module';
import { CreateUpdateStaffComponent } from './create-update-staff/create-update-staff.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ViewStaffComponent } from './view-staff/view-staff.component';

const routes: Routes = [
    {
        path: '',
        component: StaffComponent,
    },

    {
        path: 'create',
        component: CreateUpdateStaffComponent,
    },

    {
        path: 'edit/:id',
        component: CreateUpdateStaffComponent,
    },

    {
        path: 'view/:id',
        component: ViewStaffComponent,
    },
];

@NgModule({
    declarations: [StaffComponent, CreateUpdateStaffComponent, ViewStaffComponent],
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
export class StaffModule { }