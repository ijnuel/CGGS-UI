import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { PaymentGatewaySetupFacade } from '../../../../store/payment-gateway-setup/payment-gateway-setup.facade';
import { SharedFacade } from '../../../../store/shared/shared.facade';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';
import { PaymentGatewaySetupListInterface } from '../../../../types/payment-gateway-setup';
import { DropdownListInterface } from '../../../../types';
import { getErrorMessageHelper } from '../../../../services/helper.service';
import { PaymentGatewayEnum } from '../../../../types/fee';

export interface PaymentGatewaySetupDialogData {
  id?: string;
}

@Component({
  selector: 'app-create-update-payment-gateway-setup',
  templateUrl: './create-update-payment-gateway-setup.component.html',
  styleUrls: ['./create-update-payment-gateway-setup.component.scss'],
})
export class CreateUpdatePaymentGatewaySetupComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  isEditMode = false;
  isLoading = false;
  gatewayOptions: DropdownListInterface[] = [];

  formGroup: FormGroup<{
    gateway: FormControl<number | null>;
    isActive: FormControl<boolean | null>;
    secretKey: FormControl<string | null>;
    publicKey: FormControl<string | null>;
    webhookSecret: FormControl<string | null>;
    contractCode: FormControl<string | null>;
    macKey: FormControl<string | null>;
    productId: FormControl<string | null>;
    payItemId: FormControl<string | null>;
    paymentPageUrl: FormControl<string | null>;
    baseUrl: FormControl<string | null>;
  }>;

  get fc() { return this.formGroup.controls; }

  get selectedGateway(): number | null { return this.fc.gateway.value; }
  get isPaystack(): boolean { return this.selectedGateway === PaymentGatewayEnum.Paystack; }
  get isFlutterwave(): boolean { return this.selectedGateway === PaymentGatewayEnum.Flutterwave; }
  get isMonnify(): boolean { return this.selectedGateway === PaymentGatewayEnum.Monnify; }
  get isInterswitch(): boolean { return this.selectedGateway === PaymentGatewayEnum.Interswitch; }

  gatewayLabelFn = (option: DropdownListInterface) => option.name;

  get secretKeyLabel(): string {
    return this.isInterswitch ? 'Client Secret' : 'Secret Key';
  }

  get secretKeyPlaceholder(): string {
    if (this.isPaystack) return 'sk_live_... or sk_test_...';
    if (this.isFlutterwave) return 'FLWSECK_TEST-...';
    return '';
  }

  get publicKeyLabel(): string {
    if (this.isMonnify) return 'API Key';
    if (this.isInterswitch) return 'Client ID';
    return 'Public Key';
  }

  get publicKeyPlaceholder(): string {
    if (this.isPaystack) return 'pk_live_... or pk_test_...';
    if (this.isFlutterwave) return 'FLWPUBK_TEST-...';
    return '';
  }

  constructor(
    private facade: PaymentGatewaySetupFacade,
    private sharedFacade: SharedFacade,
    private globalLoadingFacade: GlobalLoadingFacade,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateUpdatePaymentGatewaySetupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PaymentGatewaySetupDialogData,
  ) {
    this.formGroup = this.fb.group({
      gateway: [null as number | null, Validators.required],
      isActive: [true as boolean | null],
      secretKey: [null as string | null],
      publicKey: [null as string | null],
      webhookSecret: [null as string | null],
      contractCode: [null as string | null],
      macKey: [null as string | null],
      productId: [null as string | null],
      payItemId: [null as string | null],
      paymentPageUrl: [null as string | null],
      baseUrl: [null as string | null, Validators.required],
    });
  }

  ngOnInit() {
    this.sharedFacade.getPaymentGatewayList();
    this.sharedFacade.selectPaymentGatewayList$.pipe(takeUntil(this.destroy$))
      .subscribe((list: DropdownListInterface[] | null) => {
        this.gatewayOptions = list ?? [];
      });

    if (this.data?.id) {
      this.isEditMode = true;
      this.facade.getPaymentGatewaySetupById(this.data.id);
      this.facade.paymentGatewaySetupById$.pipe(
        filter(d => !!d && d.id === this.data.id),
        take(1),
        takeUntil(this.destroy$),
      ).subscribe((d: PaymentGatewaySetupListInterface | null) => {
        if (!d) return;
        this.formGroup.patchValue({
          gateway: d.gateway,
          isActive: d.isActive,
          secretKey: d.secretKey ?? null,
          publicKey: d.publicKey ?? null,
          webhookSecret: d.webhookSecret ?? null,
          contractCode: d.contractCode ?? null,
          macKey: d.macKey ?? null,
          productId: d.productId ?? null,
          payItemId: d.payItemId ?? null,
          paymentPageUrl: d.paymentPageUrl ?? null,
          baseUrl: d.baseUrl ?? null,
        });
        this.fc.gateway.disable();
      });
    }

    this.facade.createSuccess$.pipe(takeUntil(this.destroy$)).subscribe(success => {
      if (success && !this.isEditMode && this.formGroup.touched) {
        this.globalLoadingFacade.globalSuccessShow('Payment gateway setup created', 3000);
        this.dialogRef.close({ success: true });
      }
    });

    this.facade.updateSuccess$.pipe(takeUntil(this.destroy$)).subscribe(success => {
      if (success && this.isEditMode && this.formGroup.touched) {
        this.globalLoadingFacade.globalSuccessShow('Payment gateway setup updated', 3000);
        this.dialogRef.close({ success: true });
      }
    });

    this.facade.loading$.pipe(takeUntil(this.destroy$)).subscribe(l => this.isLoading = l);
  }

  getErrorMessage(name: string): string | null {
    return getErrorMessageHelper(this.formGroup.get(name) as FormControl);
  }

  submit() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) return;

    const raw = this.formGroup.getRawValue();
    if (this.isEditMode) {
      this.facade.updatePaymentGatewaySetup({ ...raw, id: this.data.id } as any);
    } else {
      this.facade.createPaymentGatewaySetup(raw as any);
    }
  }

  ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }
}
