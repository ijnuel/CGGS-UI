import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RefundFacade } from '../../../../store/refund/refund.facade';
import { SharedFacade } from '../../../../store/shared/shared.facade';
import { RefundInterface } from '../../../../types/refund';
import { DropdownListInterface } from '../../../../types';

@Component({
  selector: 'app-refunds',
  templateUrl: './refunds.component.html',
})
export class RefundsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  refunds: RefundInterface[] = [];
  refundStatuses: DropdownListInterface[] = [];
  loading = true;
  actionLoading = false;
  error: string | null = null;
  successMessage: string | null = null;
  rejectNotesMap: Record<string, string> = {};

  constructor(
    private refundFacade: RefundFacade,
    private sharedFacade: SharedFacade
  ) {}

  ngOnInit() {
    this.sharedFacade.getRefundStatusList();
    this.refundFacade.getRefundAll();

    this.sharedFacade.selectRefundStatusList$
      .pipe(takeUntil(this.destroy$))
      .subscribe((list) => { this.refundStatuses = list ?? []; });

    this.refundFacade.refundAll$
      .pipe(takeUntil(this.destroy$))
      .subscribe((list) => { this.refunds = list ?? []; });

    this.refundFacade.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((l) => { this.loading = l; });

    this.refundFacade.actionLoading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((l) => { this.actionLoading = l; });

    this.refundFacade.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe((e) => { this.error = e; });

    this.refundFacade.processSuccess$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.successMessage = 'Refund processed successfully.';
        setTimeout(() => (this.successMessage = null), 4000);
      });

    this.refundFacade.rejectSuccess$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.successMessage = 'Refund rejected.';
        setTimeout(() => (this.successMessage = null), 4000);
      });
  }

  loadRefunds() {
    this.refundFacade.getRefundAll();
  }

  statusLabel(s: number): string {
    return this.refundStatuses.find((r) => r.value === s)?.name ?? 'Unknown';
  }

  statusClass(s: number): string {
    switch (s) {
      case 0: return 'bg-yellow-100 text-yellow-800';
      case 1: return 'bg-blue-100 text-blue-800';
      case 2: return 'bg-green-100 text-green-800';
      case 3: return 'bg-red-100 text-red-800';
      case 4: return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  }

  processRefund(refundId: string) {
    if (!confirm('Process this refund? This will contact the payment gateway.')) return;
    this.refundFacade.processRefund(refundId);
  }

  rejectRefund(refundId: string) {
    const notes = this.rejectNotesMap[refundId];
    if (!notes?.trim()) { this.error = 'Please enter a reason for rejection.'; return; }
    if (!confirm('Reject this refund request?')) return;
    this.rejectNotesMap[refundId] = '';
    this.refundFacade.rejectRefund(refundId, notes);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
