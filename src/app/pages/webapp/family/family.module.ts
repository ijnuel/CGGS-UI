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
import { FamilyComponent } from './family.component';
import { SharedModule } from '../../../shared/shared.module';
import { CreateUpdateFamilyComponent } from './create-update-family/create-update-family.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ViewFamilyComponent } from './view-family/view-family.component';

const routes: Routes = [
    {
        path: '',
        component: FamilyComponent,
    },

    {
        path: 'create',
        component: CreateUpdateFamilyComponent,
    },

    {
        path: 'edit/:id',
        component: CreateUpdateFamilyComponent,
    },

    {
        path: 'view/:id',
        component: ViewFamilyComponent,
    },
];

@NgModule({
    declarations: [FamilyComponent, CreateUpdateFamilyComponent, ViewFamilyComponent],
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
export class FamilyModule { }