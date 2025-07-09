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
import { SessionComponent } from './session.component';
import { SharedModule } from '../../../shared/shared.module';
import { CreateUpdateSessionComponent } from './create-update-session/create-update-session.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ViewSessionComponent } from './view-session/view-session.component';

const routes: Routes = [
    {
        path: '',
        component: SessionComponent,
    },

    {
        path: 'create',
        component: CreateUpdateSessionComponent,
    },

    {
        path: 'edit/:id',
        component: CreateUpdateSessionComponent,
    },

    {
        path: 'view/:id',
        component: ViewSessionComponent,
    },
];

@NgModule({
    declarations: [SessionComponent, CreateUpdateSessionComponent, ViewSessionComponent],
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
export class SessionModule { }