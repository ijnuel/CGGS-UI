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
import { ClassComponent } from './class.component';
import { SharedModule } from '../../../shared/shared.module';
import { CreateUpdateClassComponent } from './create-update-class/create-update-class.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ViewClassComponent } from './view-class/view-class.component';

const routes: Routes = [
    {
        path: '',
        component: ClassComponent,
    },

    {
        path: 'create',
        component: CreateUpdateClassComponent,
    },

    {
        path: 'edit/:id',
        component: CreateUpdateClassComponent,
    },

    {
        path: 'view/:id',
        component: ViewClassComponent,
    },
];

@NgModule({
    declarations: [ClassComponent, CreateUpdateClassComponent, ViewClassComponent],
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
export class ClassModule { }