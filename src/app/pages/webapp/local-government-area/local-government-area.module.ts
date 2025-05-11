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
import { LocalGovernmentAreaComponent } from './local-government-area.component';
import { SharedModule } from '../../../shared/shared.module';
import { CreateUpdateLocalGovernmentAreaComponent } from './create-update-local-government-area/create-update-local-government-area.component';
import { provideNativeDateAdapter } from '@angular/material/core';

const routes: Routes = [
    {
        path: '',
        component: LocalGovernmentAreaComponent,
    },

    {
        path: 'create',
        component: CreateUpdateLocalGovernmentAreaComponent,
    },

    {
        path: 'edit/:localGovernmentAreaId',
        component: CreateUpdateLocalGovernmentAreaComponent,
    },
];

@NgModule({
    declarations: [LocalGovernmentAreaComponent, CreateUpdateLocalGovernmentAreaComponent],
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
export class LocalGovernmentAreaModule { }