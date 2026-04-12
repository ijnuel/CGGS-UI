import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AuthFacade } from '../../../store/auth/auth.facade';
import { StudentFacade } from '../../../store/student/student.facade';
import { SchoolTermSessionFacade } from '../../../store/school-term-session/school-term-session.facade';
import { SharedFacade } from '../../../store/shared/shared.facade';
import { GlobalLoadingFacade } from '../../../store/global-loading/global-loading.facade';
import {
  FeeListInterface,
  PaymentStatusEnum,
  InitiatePaymentRequest,
  StudentListInterface,
  SchoolTermSessionListInterface,
  DropdownListInterface,
} from '../../../types';
import { environment } from '../../../../environments/environment';
import { getClassLabel } from '../../../services/helper.service';
import { PaymentDialogComponent, PaymentDialogData, PaymentDialogResult } from './payment-dialog/payment-dialog.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private allFees$ = new BehaviorSubject<FeeListInterface[]>([]);
  private selectedTermSessionId$ = new BehaviorSubject<string | null>(null);

  loading$: Observable<boolean>;
  schoolTermSessionAll$: Observable<SchoolTermSessionListInterface[]>;
  filteredFees$: Observable<FeeListInterface[]>;
  gateways$: Observable<DropdownListInterface[]>;

  student: StudentListInterface | null = null;
  walletBalance = 0;
  initiatingPayment = false;

  readonly PaymentStatusEnum = PaymentStatusEnum;
  readonly getClassLabel = (fee: FeeListInterface) => getClassLabel(fee.studentClass?.class);

  constructor(
    private authFacade: AuthFacade,
    private studentFacade: StudentFacade,
    private schoolTermSessionFacade: SchoolTermSessionFacade,
    private sharedFacade: SharedFacade,
    private globalLoadingFacade: GlobalLoadingFacade,
    private dialog: MatDialog,
    private http: HttpClient,
  ) {
    this.loading$ = this.studentFacade.loading$;

    this.schoolTermSessionAll$ = this.schoolTermSessionFacade.schoolTermSessionAll$.pipe(
      map(ts => Array.isArray(ts) ? ts : ((ts as any)?.data ?? []))
    );

    this.gateways$ = this.sharedFacade.selectPaymentGatewayList$.pipe(
      map(list => list ?? [])
    );

    this.filteredFees$ = combineLatest([this.allFees$, this.selectedTermSessionId$]).pipe(
      map(([fees, termSessionId]) =>
        termSessionId ? fees.filter(f => f.schoolTermSessionId === termSessionId) : fees
      )
    );
  }

  ngOnInit() {
    this.schoolTermSessionFacade.getSchoolTermSessionAll();
    this.sharedFacade.getPaymentGatewayList();

    this.authFacade.selectedCurrentUser$.pipe(
      filter(u => !!u),
      take(1),
      takeUntil(this.destroy$)
    ).subscribe(currentUser => {
      this.studentFacade.getStudentByProperties({
        queryProperties: [{ name: 'userId', value: currentUser!.userId }],
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

      this.studentFacade.studentByProperties$.pipe(
        filter(students => !!students && students.length > 0),
        take(1),
        takeUntil(this.destroy$)
      ).subscribe(students => {
        this.student = students![0];
        this.walletBalance = this.student.studentWallet?.balance ?? 0;
        this.extractFees(this.student);
      });
    });
  }

  private extractFees(student: StudentListInterface) {
    const fees: FeeListInterface[] = [];
    for (const sc of student.studentClasses ?? []) {
      for (const fee of (sc.fees ?? []) as FeeListInterface[]) {
        fees.push({ ...fee, studentClass: sc as any });
      }
    }
    this.allFees$.next(fees);
  }

  onTermSessionChange(id: string | null) {
    this.selectedTermSessionId$.next(id);
  }

  openFundWalletDialog() {
    this.gateways$.pipe(take(1)).subscribe(gateways => {
      const ref = this.dialog.open(PaymentDialogComponent, {
        width: '480px',
        maxWidth: '95vw',
        data: { mode: 'wallet', maxAmount: 0, gateways } as PaymentDialogData,
      });
      ref.afterClosed().subscribe((result: PaymentDialogResult | undefined) => {
        if (result) this.initiatePaymentRequest(result);
      });
    });
  }

  openPayFeeDialog(fee: FeeListInterface) {
    const balance = this.getFeeBalance(fee);
    if (balance <= 0) {
      this.globalLoadingFacade.globalErrorShow('This fee is already fully paid', 3000);
      return;
    }
    this.gateways$.pipe(take(1)).subscribe(gateways => {
      const ref = this.dialog.open(PaymentDialogComponent, {
        width: '480px',
        maxWidth: '95vw',
        data: { mode: 'fee', maxAmount: balance, feeId: fee.id, gateways } as PaymentDialogData,
      });
      ref.afterClosed().subscribe((result: PaymentDialogResult | undefined) => {
        if (result) this.initiatePaymentRequest(result);
      });
    });
  }

  private initiatePaymentRequest(result: PaymentDialogResult) {
    if (!this.student) return;
    this.initiatingPayment = true;
    const callbackUrl = `${window.location.origin}/app/payment/success`;

    const payload: InitiatePaymentRequest = {
      gateway: result.gateway,
      amount: result.amount,
      email: this.student.email ?? '',
      name: `${this.student.firstName} ${this.student.lastName}`,
      studentId: this.student.id,
      phone: this.student.phoneNumber ?? '',
      callbackUrl,
      narration: result.feeId ? 'School fee payment' : 'Wallet top-up',
      feeId: result.feeId,
    };

    this.http.post<any>(
      `${environment.baseUrl}/PaymentGateway/initiate`,
      payload,
      { withCredentials: true }
    ).subscribe({
      next: (response) => {
        this.initiatingPayment = false;
        const entity = response?.entity;
        const paymentUrl: string | null =
          (typeof entity === 'string' ? entity : null)
          ?? entity?.authorizationUrl
          ?? entity?.paymentUrl
          ?? entity?.redirectUrl
          ?? entity?.url
          ?? entity?.link
          ?? entity?.checkoutUrl
          ?? (typeof response?.message === 'string' && response.message.startsWith('http') ? response.message : null)
          ?? null;

        if (paymentUrl && paymentUrl.startsWith('http')) {
          window.location.assign(paymentUrl);
        } else {
          this.globalLoadingFacade.globalErrorShow(
            'Payment initiated but no redirect URL was returned. Please contact support.',
            6000
          );
        }
      },
      error: () => {
        this.initiatingPayment = false;
        this.globalLoadingFacade.globalErrorShow('Failed to initiate payment', 3000);
      }
    });
  }

  getTermSessionLabel(ts: SchoolTermSessionListInterface): string {
    const session = ts.session?.name ?? ts.sessionId;
    const term = ts.termString ?? `Term ${ts.term}`;
    return `${session} — ${term}`;
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

  getFeeTotal(fee: FeeListInterface): number {
    return fee.feeLines?.reduce((sum, fl) => sum + (fl.amount || 0), 0) ?? 0;
  }

  getFeePaid(fee: FeeListInterface): number {
    return fee.feeLines?.reduce((sum, fl) => sum + (fl.settledAmount || 0), 0) ?? 0;
  }

  getFeeBalance(fee: FeeListInterface): number {
    return this.getFeeTotal(fee) - this.getFeePaid(fee);
  }

  isFeePaid(fee: FeeListInterface): boolean {
    return this.getFeeBalance(fee) <= 0;
  }

  getTermLabel(fee: FeeListInterface): string {
    const ts = fee.schoolTermSession;
    if (!ts) return '—';
    const term = ts.termString ?? `Term ${ts.term}`;
    const session = ts.session?.name ?? '';
    return session ? `${session} — ${term}` : term;
  }

  ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }
}
