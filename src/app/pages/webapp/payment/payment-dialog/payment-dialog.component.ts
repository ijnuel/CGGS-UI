import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DropdownListInterface } from '../../../../types';

export interface PaymentDialogData {
  mode: 'fee' | 'wallet';
  maxAmount: number;
  feeId?: string;
  gateways: DropdownListInterface[];
}

export interface PaymentDialogResult {
  amount: number;
  gateway: number;
  feeId?: string;
}

@Component({
  selector: 'app-payment-dialog',
  template: `
    <div class="flex items-center justify-between px-6 pt-5 pb-3 border-b border-gray-100">
      <div>
        <h2 class="text-lg font-bold" style="color: var(--app-primary);">
          {{ data.mode === 'wallet' ? 'Fund Wallet' : 'Pay Fee' }}
        </h2>
        <p class="text-sm text-gray-500 mt-0.5">
          {{ data.mode === 'wallet' ? 'Top up your school wallet' : 'Outstanding: ₦' + (data.maxAmount | number:'1.2-2') }}
        </p>
      </div>
      <button mat-icon-button (click)="close()">
        <mat-icon class="text-gray-400">close</mat-icon>
      </button>
    </div>

    <mat-dialog-content class="!px-6 !py-5 !max-h-[70vh]">
      <form [formGroup]="form" class="space-y-5">

        <!-- Amount -->
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Amount (₦)</mat-label>
          <input matInput type="number" formControlName="amount"
                 [max]="data.mode === 'fee' ? data.maxAmount : null"
                 min="1" step="0.01" placeholder="0.00" />
          <mat-hint *ngIf="data.mode === 'fee'">Max: ₦{{ data.maxAmount | number:'1.2-2' }}</mat-hint>
          <mat-error *ngIf="form.get('amount')?.hasError('required')">Amount is required</mat-error>
          <mat-error *ngIf="form.get('amount')?.hasError('min')">Amount must be greater than 0</mat-error>
          <mat-error *ngIf="form.get('amount')?.hasError('max')">
            Amount cannot exceed ₦{{ data.maxAmount | number:'1.2-2' }}
          </mat-error>
        </mat-form-field>

        <!-- Gateway -->
        <div>
          <p class="text-sm font-medium text-gray-700 mb-3">Select Payment Gateway</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label *ngFor="let gw of data.gateways"
                   class="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition-all"
                   [class.border-2]="form.get('gateway')?.value == gw.value"
                   [ngStyle]="form.get('gateway')?.value == gw.value
                     ? { 'border-color': 'var(--app-primary)', 'background': 'var(--app-primary-light, #eff6ff)' }
                     : { 'border-color': '#e5e7eb' }">
              <input type="radio" formControlName="gateway" [value]="gw.value" class="accent-primary" />
              <span class="text-sm font-medium text-gray-700">{{ gw.name }}</span>
            </label>
          </div>
          <mat-error *ngIf="form.get('gateway')?.touched && form.get('gateway')?.hasError('required')" class="text-xs mt-1">
            Please select a gateway
          </mat-error>
        </div>

      </form>
    </mat-dialog-content>

    <mat-dialog-actions class="!px-6 !pb-5 !pt-2 flex justify-end gap-3">
      <button mat-stroked-button (click)="close()">Cancel</button>
      <button mat-raised-button color="primary" (click)="confirm()" [disabled]="form.invalid">
        <mat-icon class="!text-base !mr-1">payment</mat-icon>
        Proceed
      </button>
    </mat-dialog-actions>
  `,
})
export class PaymentDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PaymentDialogData,
  ) {
    const amountValidators = [Validators.required, Validators.min(1)];
    if (data.mode === 'fee') {
      amountValidators.push(Validators.max(data.maxAmount));
    }
    this.form = this.fb.group({
      amount: [data.mode === 'fee' ? data.maxAmount : null, amountValidators],
      gateway: [null, Validators.required],
    });
  }

  ngOnInit() {}

  confirm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const result: PaymentDialogResult = {
      amount: +this.form.value.amount,
      gateway: +this.form.value.gateway,
      feeId: this.data.feeId,
    };
    this.dialogRef.close(result);
  }

  close() { this.dialogRef.close(); }
}
