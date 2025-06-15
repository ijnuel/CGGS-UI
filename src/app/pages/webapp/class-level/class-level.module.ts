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
import { ClassLevelComponent } from './class-level.component';
import { SharedModule } from '../../../shared/shared.module';
import { CreateUpdateClassLevelComponent } from './create-update-class-level/create-update-class-level.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ViewClassLevelComponent } from './view-class-level/view-class-level.component';

const routes: Routes = [
    {
        path: '',
        component: ClassLevelComponent,
    },

    {
        path: 'create',
        component: CreateUpdateClassLevelComponent,
    },

    {
        path: 'edit/:id',
        component: CreateUpdateClassLevelComponent,
    },

    {
        path: 'view/:id',
        component: ViewClassLevelComponent,
    },
];

@NgModule({
    declarations: [ClassLevelComponent, CreateUpdateClassLevelComponent, ViewClassLevelComponent],
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
export class ClassLevelModule { }