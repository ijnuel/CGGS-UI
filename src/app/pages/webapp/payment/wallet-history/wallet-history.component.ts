import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { AuthFacade } from '../../../../store/auth/auth.facade';
import { StudentFacade } from '../../../../store/student/student.facade';
import { WalletTransactionFacade } from '../../../../store/wallet-transaction/wallet-transaction.facade';
import { WalletTransactionInterface } from '../../../../types/wallet-transaction';

@Component({
  selector: 'app-wallet-history',
  templateUrl: './wallet-history.component.html',
})
export class WalletHistoryComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  transactions: WalletTransactionInterface[] = [];
  loading = true;
  walletBalance = 0;
  studentName = '';
  error: string | null = null;

  constructor(
    private authFacade: AuthFacade,
    private studentFacade: StudentFacade,
    private walletTransactionFacade: WalletTransactionFacade
  ) {}

  ngOnInit() {
    this.walletTransactionFacade.walletTransactionAll$
      .pipe(takeUntil(this.destroy$))
      .subscribe((list) => { this.transactions = list ?? []; });

    this.walletTransactionFacade.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((l) => { this.loading = l; });

    this.walletTransactionFacade.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe((e) => { if (e) this.error = 'Failed to load transaction history.'; });

    this.authFacade.selectedCurrentUser$.pipe(
      filter((u) => !!u),
      take(1),
      takeUntil(this.destroy$),
    ).subscribe((currentUser) => {
      this.studentFacade.getStudentByProperties({
        queryProperties: [{ name: 'userId', value: currentUser!.userId }],
        nestedProperties: [{ name: 'studentWallet' }],
      });

      this.studentFacade.studentByProperties$.pipe(
        filter((s) => !!s && s.length > 0),
        take(1),
        takeUntil(this.destroy$),
      ).subscribe((students) => {
        const student = students![0];
        this.studentName = `${student.firstName} ${student.lastName}`;
        this.walletBalance = student.studentWallet?.balance ?? 0;

        const walletId = student.studentWallet?.id;
        if (!walletId) { this.loading = false; return; }

        this.walletTransactionFacade.getWalletTransactionAll({
          queryProperties: [{ name: 'studentWalletId', value: walletId }],
          sortProperties: [{ name: 'transactionDate', isDescending: true }],
        });
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
