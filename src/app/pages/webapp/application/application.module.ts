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
import { ApplicationComponent } from './application.component';
import { SharedModule } from '../../../shared/shared.module';
import { CreateUpdateApplicationComponent } from './create-update-application/create-update-application.component';
import { provideNativeDateAdapter } from '@angular/material/core';

const routes: Routes = [
    {
        path: '',
        component: ApplicationComponent,
    },

    {
        path: 'create',
        component: CreateUpdateApplicationComponent,
    },

    {
        path: 'edit/:applicationId',
        component: CreateUpdateApplicationComponent,
    },
];

@NgModule({
    declarations: [ApplicationComponent, CreateUpdateApplicationComponent],
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
export class ApplicationModule { }