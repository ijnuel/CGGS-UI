import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';
import { PaymentGatewaySetupComponent } from './payment-gateway-setup.component';
import { CreateUpdatePaymentGatewaySetupComponent } from './create-update-payment-gateway-setup/create-update-payment-gateway-setup.component';

const routes: Routes = [
  { path: '', component: PaymentGatewaySetupComponent },
];

@NgModule({
  declarations: [
    PaymentGatewaySetupComponent,
    CreateUpdatePaymentGatewaySetupComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDialogModule,
  ],
})
export class PaymentGatewaySetupModule {}
