import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RoleComponent } from './role.component';
import { SharedModule } from '../../../shared/shared.module';
import { CreateUpdateRoleComponent } from './create-update-role/create-update-role.component';
import { ViewRoleComponent } from './view-role/view-role.component';

const routes: Routes = [
    {
        path: '',
        component: RoleComponent,
    },
    {
        path: 'create',
        component: CreateUpdateRoleComponent,
    },
    {
        path: 'edit/:id',
        component: CreateUpdateRoleComponent,
    },
    {
        path: 'view/:id',
        component: ViewRoleComponent,
    },
];

@NgModule({
    declarations: [RoleComponent, CreateUpdateRoleComponent, ViewRoleComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
    ],
})
export class RoleModule {}
