import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { FeeListInterface, FeeLineListInterface, PaymentStatusEnum, StudentListInterface } from '../../../../types';
import { StudentFacade } from '../../../../store/student/student.facade';
import { environment } from '../../../../../environments/environment';
import { getClassLabel } from '../../../../services/helper.service';

export interface FeeEntry {
  fee: FeeListInterface;
  className: string;
}

export interface FeeGroup {
  sessionName: string;
  termLabel: string;
  sortKey: string;
  fees: FeeEntry[];
  total: number;
  paid: number;
  balance: number;
}

export interface StudentFeesDialogData {
  studentId: string;
  studentName: string;
  feeGroups: FeeGroup[];
  walletBalance: number;
}

interface PaymentFormState {
  form: FormGroup;
  submitting: boolean;
  error: string | null;
}

@Component({
  selector: 'app-student-fees-dialog',
  template: `
    <!-- Header -->
    <div class="flex items-center justify-between px-6 pt-5 pb-3 border-b border-gray-100">
      <div>
        <h2 class="text-lg font-bold" style="color: var(--app-primary);">Fees</h2>
        <p class="text-sm text-gray-500 mt-0.5">{{ data.studentName }}</p>
      </div>
      <button mat-icon-button (click)="close()">
        <mat-icon class="text-gray-400">close</mat-icon>
      </button>
    </div>

    <mat-dialog-content class="!px-6 !py-4 !max-h-[75vh]">

      <!-- Wallet balance -->
      <div class="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 mb-4">
        <mat-icon class="text-blue-400 flex-shrink-0">account_balance_wallet</mat-icon>
        <div>
          <p class="text-xs text-gray-500">Wallet Balance</p>
          <p class="text-base font-bold"
             [class.text-green-600]="walletBalance > 0"
             [class.text-gray-500]="walletBalance === 0">
            ₦{{ walletBalance | number:'1.2-2' }}
          </p>
        </div>
      </div>

      <!-- Refetch indicator -->
      <div *ngIf="refetching" class="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-lg px-4 py-2 mb-4">
        <mat-spinner diameter="16"></mat-spinner>
        <span class="text-sm text-blue-600">Refreshing fee data…</span>
      </div>

      <p *ngIf="feeGroups.length === 0 && !refetching" class="text-gray-400 text-sm py-4 text-center">
        No fees generated for this student yet.
      </p>

      <!-- Fee groups -->
      <div *ngFor="let group of feeGroups" class="border border-gray-100 rounded-lg mb-4 overflow-hidden">

        <!-- Group header -->
        <div class="px-4 py-3 bg-gray-50 flex flex-wrap items-center justify-between gap-2 cursor-pointer select-none"
             [class.border-b]="!isCollapsed(group.sortKey)"
             [class.border-gray-100]="!isCollapsed(group.sortKey)"
             (click)="toggleCollapse(group.sortKey)">
          <div class="flex items-center gap-2">
            <mat-icon class="!text-lg text-gray-400 transition-transform duration-200"
                      [class.-rotate-90]="isCollapsed(group.sortKey)">expand_more</mat-icon>
            <span class="text-sm font-semibold text-gray-700">{{ group.sessionName }}</span>
            <span class="text-gray-400 mx-0.5">·</span>
            <span class="text-sm text-gray-600">{{ group.termLabel }}</span>
          </div>
          <div class="flex items-center gap-3 text-sm flex-wrap" (click)="$event.stopPropagation()">
            <span class="text-gray-500">Total: <span class="font-semibold text-gray-700">₦{{ group.total | number:'1.2-2' }}</span></span>
            <span class="text-gray-500">Paid: <span class="font-medium text-green-600">₦{{ group.paid | number:'1.2-2' }}</span></span>
            <span class="text-gray-500">Bal:
              <span class="font-medium"
                    [class.text-red-500]="group.balance > 0"
                    [class.text-green-600]="group.balance <= 0">
                ₦{{ group.balance | number:'1.2-2' }}
              </span>
            </span>
          </div>
        </div>

        <!-- Fee entries -->
        <ng-container *ngIf="!isCollapsed(group.sortKey)">
          <div *ngFor="let entry of group.fees; let lastEntry = last"
               [class.border-b]="!lastEntry" [class.border-gray-100]="!lastEntry">

            <!-- Class sub-header + Record Fee Payment button -->
            <div class="px-4 py-2 flex items-center justify-between bg-white">
              <div class="flex items-center gap-2">
                <mat-icon class="!text-sm text-gray-400">school</mat-icon>
                <span class="text-sm font-medium text-gray-600">{{ entry.className }}</span>
              </div>
              <button mat-stroked-button class="!text-xs !h-7 !min-h-0"
                      style="color: var(--app-primary); border-color: var(--app-primary);"
                      *ngIf="getFeeBalance(entry.fee) > 0"
                      (click)="toggleFeeForm(entry.fee)">
                <mat-icon class="!text-sm !mr-0.5">add_card</mat-icon>
                {{ isFeeFormOpen(entry.fee.id) ? 'Cancel' : 'Record Fee Payment' }}
              </button>
            </div>

            <!-- Fee-level inline payment form -->
            <ng-container *ngIf="getFeeFormState('fee-' + entry.fee.id) as feeState">
              <div class="mx-4 mb-3 border border-gray-200 rounded-lg overflow-hidden">
                <div class="px-4 py-2 bg-gray-50 border-b border-gray-200">
                  <p class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Record Fee Payment</p>
                  <p class="text-xs text-gray-400 mt-0.5">Balance: ₦{{ getFeeBalance(entry.fee) | number:'1.2-2' }}</p>
                </div>
                <div class="px-4 py-3">
                  <div [formGroup]="feeState.form" class="grid grid-cols-2 gap-3">
                    <mat-form-field class="col-span-1">
                      <mat-label>Amount (₦)</mat-label>
                      <input matInput type="number" formControlName="amount" min="0.01" />
                      <mat-error>Required, max ₦{{ getFeeBalance(entry.fee) | number:'1.2-2' }}</mat-error>
                    </mat-form-field>
                    <mat-form-field class="col-span-1">
                      <mat-label>Payment Date</mat-label>
                      <input matInput type="date" formControlName="paymentDate" />
                      <mat-error>Required</mat-error>
                    </mat-form-field>
                    <mat-form-field class="col-span-1">
                      <mat-label>Payment Method</mat-label>
                      <input matInput formControlName="paymentMethod" placeholder="e.g. Cash, Transfer" />
                    </mat-form-field>
                    <mat-form-field class="col-span-1">
                      <mat-label>Transaction ID</mat-label>
                      <input matInput formControlName="transactionId" placeholder="Optional reference" />
                    </mat-form-field>
                    <mat-form-field class="col-span-2">
                      <mat-label>Narration</mat-label>
                      <input matInput formControlName="narration" placeholder="Optional note" />
                    </mat-form-field>
                  </div>
                  <p *ngIf="feeState.error" class="text-red-500 text-xs mt-1">{{ feeState.error }}</p>
                  <div class="flex justify-end gap-2 mt-2">
                    <button mat-button class="!text-sm" (click)="toggleFeeForm(entry.fee)">Cancel</button>
                    <button mat-raised-button color="primary" class="!text-sm"
                            [disabled]="feeState.submitting"
                            (click)="submitFeePayment(entry.fee)">
                      <mat-spinner *ngIf="feeState.submitting" diameter="14" class="inline-block !mr-1"></mat-spinner>
                      Post Payment
                    </button>
                  </div>
                </div>
              </div>
            </ng-container>

            <!-- Fee lines -->
            <div *ngIf="entry.fee.feeLines && entry.fee.feeLines.length > 0">
              <!-- Table header -->
              <div class="grid grid-cols-[1fr_auto_auto_auto_auto_auto] gap-x-3 px-6 py-1 bg-gray-50 border-t border-gray-100 text-xs text-gray-400 uppercase tracking-wide">
                <span>Fee Type</span>
                <span class="text-right">Amount</span>
                <span class="text-right">Paid</span>
                <span class="text-right">Balance</span>
                <span class="text-center">Status</span>
                <span></span>
              </div>

              <div *ngFor="let fl of entry.fee.feeLines" class="border-t border-gray-50">
                <!-- Fee line row -->
                <div class="grid grid-cols-[1fr_auto_auto_auto_auto_auto] gap-x-3 items-center px-6 py-2 text-sm">
                  <span class="text-gray-700 truncate">{{ fl.feeType?.name ?? '—' }}</span>
                  <span class="text-gray-500 text-right">₦{{ fl.amount | number:'1.2-2' }}</span>
                  <span class="text-green-600 text-right">₦{{ fl.settledAmount | number:'1.2-2' }}</span>
                  <span class="text-right font-medium"
                        [class.text-red-500]="(fl.amount - fl.settledAmount) > 0"
                        [class.text-green-600]="(fl.amount - fl.settledAmount) <= 0">
                    ₦{{ (fl.amount - fl.settledAmount) | number:'1.2-2' }}
                  </span>
                  <span class="inline-block px-2 py-0.5 rounded-full text-xs font-medium text-center"
                        [ngClass]="getStatusClass(fl.status)">
                    {{ getStatusLabel(fl.status) }}
                  </span>
                  <button mat-icon-button class="!w-7 !h-7"
                          *ngIf="(fl.amount - fl.settledAmount) > 0"
                          [matTooltip]="isLineFormOpen(fl.id) ? 'Cancel' : 'Record Payment'"
                          (click)="toggleLineForm(fl)">
                    <mat-icon class="!text-base" [class.text-red-400]="isLineFormOpen(fl.id)"
                              style="color: var(--app-primary)">
                      {{ isLineFormOpen(fl.id) ? 'close' : 'add_card' }}
                    </mat-icon>
                  </button>
                  <span *ngIf="(fl.amount - fl.settledAmount) <= 0" class="!w-7"></span>
                </div>

                <!-- Fee line inline payment form -->
                <ng-container *ngIf="getLineFormState('line-' + fl.id) as lineState">
                  <div class="mx-4 mb-3 border border-gray-200 rounded-lg overflow-hidden">
                    <div class="px-4 py-2 bg-gray-50 border-b border-gray-200">
                      <p class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Record Line Payment — {{ fl.feeType?.name }}</p>
                      <p class="text-xs text-gray-400 mt-0.5">Balance: ₦{{ (fl.amount - fl.settledAmount) | number:'1.2-2' }}</p>
                    </div>
                    <div class="px-4 py-3">
                      <div [formGroup]="lineState.form" class="grid grid-cols-2 gap-3">
                        <mat-form-field class="col-span-1">
                          <mat-label>Amount (₦)</mat-label>
                          <input matInput type="number" formControlName="amount" min="0.01" />
                          <mat-error>Required, max ₦{{ (fl.amount - fl.settledAmount) | number:'1.2-2' }}</mat-error>
                        </mat-form-field>
                        <mat-form-field class="col-span-1">
                          <mat-label>Payment Date</mat-label>
                          <input matInput type="date" formControlName="paymentDate" />
                          <mat-error>Required</mat-error>
                        </mat-form-field>
                        <mat-form-field class="col-span-1">
                          <mat-label>Payment Method</mat-label>
                          <input matInput formControlName="paymentMethod" placeholder="e.g. Cash, Transfer" />
                        </mat-form-field>
                        <mat-form-field class="col-span-1">
                          <mat-label>Transaction ID</mat-label>
                          <input matInput formControlName="transactionId" placeholder="Optional reference" />
                        </mat-form-field>
                        <mat-form-field class="col-span-2">
                          <mat-label>Narration</mat-label>
                          <input matInput formControlName="narration" placeholder="Optional note" />
                        </mat-form-field>
                      </div>
                      <p *ngIf="lineState.error" class="text-red-500 text-xs mt-1">{{ lineState.error }}</p>
                      <div class="flex justify-end gap-2 mt-2">
                        <button mat-button class="!text-sm" (click)="toggleLineForm(fl)">Cancel</button>
                        <button mat-raised-button color="primary" class="!text-sm"
                                [disabled]="lineState.submitting"
                                (click)="submitLinePayment(fl)">
                          <mat-spinner *ngIf="lineState.submitting" diameter="14" class="inline-block !mr-1"></mat-spinner>
                          Post Payment
                        </button>
                      </div>
                    </div>
                  </div>
                </ng-container>

              </div>
            </div>

          </div>
        </ng-container>

      </div>
    </mat-dialog-content>
  `,
})
export class StudentFeesDialogComponent implements OnInit, OnDestroy {
  readonly PaymentStatusEnum = PaymentStatusEnum;

  feeGroups: FeeGroup[];
  walletBalance: number;
  refetching = false;

  private collapsedGroups = new Set<string>();
  private formStates = new Map<string, PaymentFormState>();
  private refreshNeeded = false;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private studentFacade: StudentFacade,
    public dialogRef: MatDialogRef<StudentFeesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentFeesDialogData,
  ) {
    this.feeGroups = data.feeGroups;
    this.walletBalance = data.walletBalance;
  }

  ngOnInit() {
    this.studentFacade.studentByProperties$.pipe(
      takeUntil(this.unsubscribe$),
      filter(() => this.refetching),
    ).subscribe(students => {
      const student = students?.[0];
      if (!student) return;
      this.computeFeeGroups(student);
      this.walletBalance = student.studentWallet?.balance ?? this.walletBalance;
      this.formStates.clear();
      this.refetching = false;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // ── Collapse ──────────────────────────────────────────────────────────────

  toggleCollapse(key: string) {
    if (this.collapsedGroups.has(key)) this.collapsedGroups.delete(key);
    else this.collapsedGroups.add(key);
  }

  isCollapsed(key: string): boolean {
    return this.collapsedGroups.has(key);
  }

  // ── Form helpers ──────────────────────────────────────────────────────────

  private todayStr(): string {
    return new Date().toISOString().substring(0, 10);
  }

  private buildForm(max: number): FormGroup {
    return this.fb.group({
      amount: [null, [Validators.required, Validators.min(0.01), Validators.max(max)]],
      paymentDate: [this.todayStr(), Validators.required],
      paymentMethod: ['Cash'],
      transactionId: [''],
      narration: [''],
    });
  }

  toggleFeeForm(fee: FeeListInterface) {
    const key = 'fee-' + fee.id;
    if (this.formStates.has(key)) { this.formStates.delete(key); return; }
    this.formStates.set(key, { form: this.buildForm(this.getFeeBalance(fee)), submitting: false, error: null });
  }

  toggleLineForm(fl: FeeLineListInterface) {
    const key = 'line-' + fl.id;
    if (this.formStates.has(key)) { this.formStates.delete(key); return; }
    this.formStates.set(key, { form: this.buildForm(fl.amount - fl.settledAmount), submitting: false, error: null });
  }

  isFeeFormOpen(feeId: string): boolean { return this.formStates.has('fee-' + feeId); }
  isLineFormOpen(lineId: string): boolean { return this.formStates.has('line-' + lineId); }

  getFeeFormState(key: string): PaymentFormState | null { return this.formStates.get(key) ?? null; }
  getLineFormState(key: string): PaymentFormState | null { return this.formStates.get(key) ?? null; }

  // ── Submit ────────────────────────────────────────────────────────────────

  submitFeePayment(fee: FeeListInterface) {
    const state = this.formStates.get('fee-' + fee.id);
    if (!state) return;
    if (state.form.invalid) { state.form.markAllAsTouched(); return; }
    state.submitting = true;
    state.error = null;
    this.http.post<any>(
      `${environment.baseUrl}/Payment/PostManualFeePayment`,
      { feeId: fee.id, ...state.form.value },
      { withCredentials: true }
    ).subscribe({
      next: () => {
        this.formStates.delete('fee-' + fee.id);
        this.refreshNeeded = true;
        this.reloadStudent();
      },
      error: (err) => {
        state.submitting = false;
        state.error = err?.error?.message ?? err?.message ?? 'Failed to post payment';
      },
    });
  }

  submitLinePayment(fl: FeeLineListInterface) {
    const state = this.formStates.get('line-' + fl.id);
    if (!state) return;
    if (state.form.invalid) { state.form.markAllAsTouched(); return; }
    state.submitting = true;
    state.error = null;
    this.http.post<any>(
      `${environment.baseUrl}/Payment/PostManualFeeLinePayment`,
      { feeLineId: fl.id, ...state.form.value },
      { withCredentials: true }
    ).subscribe({
      next: () => {
        this.formStates.delete('line-' + fl.id);
        this.refreshNeeded = true;
        this.reloadStudent();
      },
      error: (err) => {
        state.submitting = false;
        state.error = err?.error?.message ?? err?.message ?? 'Failed to post payment';
      },
    });
  }

  // ── Reload ────────────────────────────────────────────────────────────────

  private reloadStudent() {
    this.refetching = true;
    this.studentFacade.getStudentByProperties({
      queryProperties: [{ name: 'id', value: this.data.studentId }],
      nestedProperties: [
        {
          name: 'studentClasses',
          innerNestedProperties: [
            {
              name: 'class',
              innerNestedProperties: [
                { name: 'classLevel', innerNestedProperties: [{ name: 'programmeType' }] }
              ]
            },
            { name: 'session' },
            {
              name: 'fees',
              innerNestedProperties: [
                { name: 'schoolTermSession', innerNestedProperties: [{ name: 'session' }] },
                { name: 'feeLines', innerNestedProperties: [{ name: 'feeType' }, { name: 'feeSetup' }] }
              ]
            }
          ]
        },
        { name: 'studentWallet' }
      ]
    });
  }

  private computeFeeGroups(student: StudentListInterface) {
    const groupMap = new Map<string, FeeGroup>();

    for (const sc of (student.studentClasses ?? [])) {
      const fees = (sc.fees ?? []) as FeeListInterface[];
      const className = getClassLabel(sc.class) || sc.class?.name || '—';

      for (const fee of fees) {
        const ts = fee.schoolTermSession;
        if (!ts) continue;

        const sessionName = ts.session?.name ?? ts.sessionId;
        const termLabel = ts.termString ?? `Term ${ts.term}`;
        const sortKey = `${sessionName}_${termLabel}`;

        if (!groupMap.has(sortKey)) {
          groupMap.set(sortKey, { sessionName, termLabel, sortKey, fees: [], total: 0, paid: 0, balance: 0 });
        }

        const group = groupMap.get(sortKey)!;
        const total = fee.feeLines?.reduce((s, fl) => s + (fl.amount || 0), 0) ?? 0;
        const paid = fee.feeLines?.reduce((s, fl) => s + (fl.settledAmount || 0), 0) ?? 0;
        group.fees.push({ fee, className });
        group.total += total;
        group.paid += paid;
        group.balance += total - paid;
      }
    }

    this.feeGroups = Array.from(groupMap.values())
      .sort((a, b) => b.sessionName.localeCompare(a.sessionName) || a.termLabel.localeCompare(b.termLabel));
  }

  // ── Calculations ──────────────────────────────────────────────────────────

  getFeeBalance(fee: FeeListInterface): number {
    return fee.feeLines?.reduce((s, fl) => s + Math.max(0, fl.amount - fl.settledAmount), 0) ?? 0;
  }

  getStatusLabel(status: PaymentStatusEnum): string {
    const map: Record<number, string> = { 0: 'Pending', 1: 'Partially Paid', 2: 'Paid', 3: 'Overpaid' };
    return map[status] ?? 'Unknown';
  }

  getStatusClass(status: PaymentStatusEnum): string {
    const map: Record<number, string> = {
      0: 'bg-yellow-100 text-yellow-700',
      1: 'bg-blue-100 text-blue-700',
      2: 'bg-green-100 text-green-700',
      3: 'bg-purple-100 text-purple-700',
    };
    return map[status] ?? 'bg-gray-100 text-gray-600';
  }

  close() { this.dialogRef.close(this.refreshNeeded ? { refresh: true } : undefined); }
}
