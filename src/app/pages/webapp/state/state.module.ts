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
import { StateComponent } from './state.component';
import { SharedModule } from '../../../shared/shared.module';
import { CreateUpdateStateComponent } from './create-update-state/create-update-state.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ViewStateComponent } from './view-state/view-state.component';

const routes: Routes = [
    {
        path: '',
        component: StateComponent,
    },

    {
        path: 'create',
        component: CreateUpdateStateComponent,
    },

    {
        path: 'edit/:id',
        component: CreateUpdateStateComponent,
    },

    {
        path: 'view/:id',
        component: ViewStateComponent,
    },
];

@NgModule({
    declarations: [StateComponent, CreateUpdateStateComponent, ViewStateComponent],
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
export class StateModule { }