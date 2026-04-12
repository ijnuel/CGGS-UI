import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FeeListInterface, PaymentStatusEnum } from '../../../../types';

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
  studentName: string;
  feeGroups: FeeGroup[];
  walletBalance: number;
}

@Component({
  selector: 'app-student-fees-dialog',
  template: `
    <div class="flex items-center justify-between px-6 pt-5 pb-3 border-b border-gray-100">
      <div>
        <h2 class="text-lg font-bold" style="color: var(--app-primary);">Fees</h2>
        <p class="text-sm text-gray-500 mt-0.5">{{ data.studentName }}</p>
      </div>
      <button mat-icon-button (click)="close()">
        <mat-icon class="text-gray-400">close</mat-icon>
      </button>
    </div>

    <mat-dialog-content class="!px-6 !py-4 !max-h-[70vh]">

      <!-- Wallet balance summary -->
      <div class="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 mb-4">
        <mat-icon class="text-blue-400 flex-shrink-0">account_balance_wallet</mat-icon>
        <div>
          <p class="text-xs text-gray-500">Wallet Balance</p>
          <p class="text-base font-bold" [class.text-green-600]="data.walletBalance > 0" [class.text-gray-500]="data.walletBalance === 0">
            ₦{{ data.walletBalance | number:'1.2-2' }}
          </p>
        </div>
      </div>

      <p *ngIf="data.feeGroups.length === 0" class="text-gray-400 text-sm py-4 text-center">
        No fees generated for this student yet.
      </p>

      <div *ngFor="let group of data.feeGroups" class="border border-gray-100 rounded-lg mb-4 overflow-hidden">

        <!-- Group header (clickable to collapse) -->
        <div class="px-4 py-3 bg-gray-50 flex flex-wrap items-center justify-between gap-2 cursor-pointer select-none"
             [class.border-b]="!isCollapsed(group.sortKey)"
             [class.border-gray-100]="!isCollapsed(group.sortKey)"
             (click)="toggleCollapse(group.sortKey)">
          <div class="flex items-center gap-2">
            <mat-icon class="!text-lg text-gray-400 transition-transform duration-200"
                      [class.-rotate-90]="isCollapsed(group.sortKey)">
              expand_more
            </mat-icon>
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

        <!-- Fee entries (collapsible) -->
        <ng-container *ngIf="!isCollapsed(group.sortKey)">
          <div *ngFor="let entry of group.fees; let lastEntry = last"
               [class.border-b]="!lastEntry" [class.border-gray-100]="!lastEntry">

            <!-- Class sub-header -->
            <div class="px-4 py-2 flex items-center gap-2 bg-white">
              <mat-icon class="!text-sm text-gray-400">school</mat-icon>
              <span class="text-sm font-medium text-gray-600">{{ entry.className }}</span>
            </div>

            <!-- Fee lines -->
            <div *ngIf="entry.fee.feeLines && entry.fee.feeLines.length > 0" class="divide-y divide-gray-50">
              <div *ngFor="let fl of entry.fee.feeLines"
                   class="flex items-center justify-between px-6 py-2 text-sm">
                <span class="text-gray-700">{{ fl.feeType?.name ?? '—' }}</span>
                <div class="flex items-center gap-4">
                  <span class="text-gray-500">₦{{ fl.amount | number:'1.2-2' }}</span>
                  <span class="inline-block px-2 py-0.5 rounded-full text-xs font-medium"
                        [ngClass]="getStatusClass(fl.status)">
                    {{ getStatusLabel(fl.status) }}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </ng-container>

      </div>

    </mat-dialog-content>
  `,
})
export class StudentFeesDialogComponent {
  readonly PaymentStatusEnum = PaymentStatusEnum;
  private collapsedGroups = new Set<string>();

  constructor(
    public dialogRef: MatDialogRef<StudentFeesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentFeesDialogData,
  ) {}

  toggleCollapse(key: string) {
    if (this.collapsedGroups.has(key)) {
      this.collapsedGroups.delete(key);
    } else {
      this.collapsedGroups.add(key);
    }
  }

  isCollapsed(key: string): boolean {
    return this.collapsedGroups.has(key);
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

  close() { this.dialogRef.close(); }
}
