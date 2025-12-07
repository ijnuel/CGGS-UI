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
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PrincipalRemarkComponent } from './principal-remark.component';
import { SharedModule } from '../../../shared/shared.module';
import { CreateUpdatePrincipalRemarkComponent } from './create-update-principal-remark/create-update-principal-remark.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ViewPrincipalRemarkComponent } from './view-principal-remark/view-principal-remark.component';
import { PrincipalRemarkDialogComponent } from './principal-remark-dialog/principal-remark-dialog.component';

const routes: Routes = [
    {
        path: '',
        component: PrincipalRemarkComponent,
    },

    {
        path: 'create',
        component: CreateUpdatePrincipalRemarkComponent,
    },

    {
        path: 'edit/:id',
        component: CreateUpdatePrincipalRemarkComponent,
    },

    {
        path: 'view/:id',
        component: ViewPrincipalRemarkComponent,
    },
];

@NgModule({
    declarations: [
        PrincipalRemarkComponent,
        CreateUpdatePrincipalRemarkComponent,
        ViewPrincipalRemarkComponent,
        PrincipalRemarkDialogComponent,
    ],
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
        MatDialogModule,
        MatProgressSpinnerModule,
    ],
    providers: [provideNativeDateAdapter()],
})
export class PrincipalRemarkModule { }