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
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedModule } from '../../../shared/shared.module';
import { BursaryComponent } from './bursary.component';
import { FeeTypeComponent } from './fee-type/fee-type.component';
import { CreateUpdateFeeTypeComponent } from './fee-type/create-update-fee-type/create-update-fee-type.component';
import { FeeSetupComponent } from './fee-setup/fee-setup.component';
import { CreateUpdateFeeSetupComponent } from './fee-setup/create-update-fee-setup/create-update-fee-setup.component';
import { GenerateFeesComponent } from './generate-fees/generate-fees.component';

const routes: Routes = [
  {
    path: '',
    component: BursaryComponent,
    children: [
      { path: '', redirectTo: 'fee-type', pathMatch: 'full' },
      { path: 'fee-type', component: FeeTypeComponent },
      { path: 'fee-type/create', component: CreateUpdateFeeTypeComponent },
      { path: 'fee-type/edit/:id', component: CreateUpdateFeeTypeComponent },
      { path: 'fee-setup', component: FeeSetupComponent },
      { path: 'fee-setup/create', component: CreateUpdateFeeSetupComponent },
      { path: 'fee-setup/edit/:id', component: CreateUpdateFeeSetupComponent },
      { path: 'generate-fees', component: GenerateFeesComponent },
    ]
  }
];

@NgModule({
  declarations: [
    BursaryComponent,
    FeeTypeComponent,
    CreateUpdateFeeTypeComponent,
    FeeSetupComponent,
    CreateUpdateFeeSetupComponent,
    GenerateFeesComponent,
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
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatCardModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
})
export class BursaryModule {}
