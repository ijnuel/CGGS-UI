import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SharedModule } from '../../../shared/shared.module';
import { CompanyCoreValueComponent } from './company-core-value.component';
import { CreateUpdateCompanyCoreValueComponent } from './create-update-company-core-value/create-update-company-core-value.component';
import { ViewCompanyCoreValueComponent } from './view-company-core-value/view-company-core-value.component';

const routes: Routes = [
  { path: '',         component: CompanyCoreValueComponent },
  { path: 'create',   component: CreateUpdateCompanyCoreValueComponent },
  { path: 'edit/:id', component: CreateUpdateCompanyCoreValueComponent },
  { path: 'view/:id', component: ViewCompanyCoreValueComponent },
];

@NgModule({
  declarations: [
    CompanyCoreValueComponent,
    CreateUpdateCompanyCoreValueComponent,
    ViewCompanyCoreValueComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  providers: [provideNativeDateAdapter()],
})
export class CompanyCoreValueModule {}
