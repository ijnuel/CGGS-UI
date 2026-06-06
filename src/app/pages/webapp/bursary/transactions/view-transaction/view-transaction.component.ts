import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { TransactionFacade } from '../../../../../store/transaction/transaction.facade';
import * as TransactionAction from '../../../../../store/transaction/transaction.actions';
import { TransactionListInterface, TransactionStatus } from '../../../../../types/transaction';
import { ToastNotificationService, NotificationTypeEnums } from '../../../../../services/toast-notification.service';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.scss'],
})
export class ViewTransactionComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private transactionId = '';

  transaction: TransactionListInterface | null = null;
  loading = false;
  verifying = false;

  readonly TransactionStatus = TransactionStatus;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private transactionFacade: TransactionFacade,
    private actions$: Actions,
    private toastService: ToastNotificationService,
  ) {}

  ngOnInit() {
    this.transactionId = this.route.snapshot.paramMap.get('id') ?? '';

    this.transactionFacade.loading$.pipe(takeUntil(this.destroy$)).subscribe(l => this.loading = l);
    this.transactionFacade.verifying$.pipe(takeUntil(this.destroy$)).subscribe(v => this.verifying = v);

    this.transactionFacade.transactionById$.pipe(
      filter(t => !!t),
      takeUntil(this.destroy$),
    ).subscribe(t => this.transaction = t);

    this.actions$.pipe(ofType(TransactionAction.verifyTransactionSuccess), takeUntil(this.destroy$))
      .subscribe(() => this.toastService.openToast('Transaction verified successfully', NotificationTypeEnums.SUCCESS));

    this.actions$.pipe(ofType(TransactionAction.verifyTransactionFail), takeUntil(this.destroy$))
      .subscribe(() => this.toastService.openToast('Failed to verify transaction', NotificationTypeEnums.ERROR));

    if (this.transactionId) {
      this.transactionFacade.getTransactionById(this.transactionId);
    }
  }

  ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }

  get canVerify(): boolean {
    return this.transaction?.statusString === TransactionStatus.Pending;
  }

  verify() {
    if (this.transactionId) {
      this.transactionFacade.verifyTransaction(this.transactionId);
    }
  }

  goBack() { this.location.back(); }

  formatDate(value: string | undefined): string {
    if (!value) return '—';
    return new Date(value).toLocaleString('en-NG', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  formatAmount(value: number | undefined): string {
    return value?.toLocaleString('en-NG', { minimumFractionDigits: 2 }) ?? '0.00';
  }

  getStatusColor(): string {
    const map: Record<string, string> = {
      [TransactionStatus.Pending]: 'bg-yellow-100 text-yellow-700',
      [TransactionStatus.Successful]: 'bg-green-100 text-green-700',
      [TransactionStatus.Failed]: 'bg-red-100 text-red-700',
      [TransactionStatus.Abandoned]: 'bg-orange-100 text-orange-700',
      [TransactionStatus.Reversed]: 'bg-gray-100 text-gray-600',
    };
    return this.transaction ? (map[this.transaction.statusString ?? ''] ?? 'bg-gray-100 text-gray-600') : '';
  }
}
