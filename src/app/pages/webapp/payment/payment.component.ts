import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { filter, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthFacade } from '../../../store/auth/auth.facade';
import { StudentFacade } from '../../../store/student/student.facade';
import { FeeFacade } from '../../../store/fee/fee.facade';
import { GlobalLoadingFacade } from '../../../store/global-loading/global-loading.facade';
import {
  FeeListInterface,
  FeeLineListInterface,
  PaymentGatewayEnum,
  PaymentStatusEnum,
  InitiatePaymentRequest,
  StudentListInterface,
} from '../../../types';
import { environment } from '../../../../environments/environment';
import { getClassLabel } from '../../../services/helper.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  loading$: Observable<boolean>;
  fees$: Observable<FeeListInterface[] | null>;

  student: StudentListInterface | null = null;
  initiatingPayment = false;
  readonly getClassLabel = (fee: FeeListInterface) => getClassLabel(fee.studentClass?.class);

  readonly gateways = [
    { value: PaymentGatewayEnum.Paystack, label: 'Paystack' },
    { value: PaymentGatewayEnum.Flutterwave, label: 'Flutterwave' },
    { value: PaymentGatewayEnum.Monnify, label: 'Monnify' },
  ];

  readonly PaymentStatusEnum = PaymentStatusEnum;

  constructor(
    private authFacade: AuthFacade,
    private studentFacade: StudentFacade,
    private feeFacade: FeeFacade,
    private globalLoadingFacade: GlobalLoadingFacade,
    private http: HttpClient
  ) {
    this.loading$ = this.feeFacade.loading$;
    this.fees$ = this.feeFacade.feeByProperties$;
  }

  ngOnInit() {
    this.authFacade.selectedCurrentUser$.pipe(
      filter(u => !!u),
      take(1),
      takeUntil(this.destroy$)
    ).subscribe(currentUser => {
      // Find student entity by userId
      this.studentFacade.getStudentByProperties({
        queryProperties: [{ name: 'userId', value: currentUser!.userId }],
        nestedProperties: [
          { name: 'studentClasses', innerNestedProperties: [
            { name: 'class' },
            { name: 'session' }
          ]}
        ]
      });

      this.studentFacade.studentByProperties$.pipe(
        filter(students => !!students && students.length > 0),
        take(1),
        takeUntil(this.destroy$)
      ).subscribe(students => {
        this.student = students![0];
        this.loadFees(this.student.id);
      });
    });
  }

  loadFees(studentId: string) {
    this.feeFacade.getFeeByProperties({
      queryProperties: [{ name: 'studentClass.studentId', value: studentId }],
      nestedProperties: [
        { name: 'studentClass', innerNestedProperties: [{ name: 'class' }, { name: 'session' }] },
        { name: 'schoolTermSession', innerNestedProperties: [{ name: 'session' }] },
        { name: 'feeLines', innerNestedProperties: [
          { name: 'feeType' },
          { name: 'feeSetup' },
          { name: 'payments' }
        ]}
      ]
    });
  }

  getStatusLabel(status: PaymentStatusEnum): string {
    switch (status) {
      case PaymentStatusEnum.Pending: return 'Pending';
      case PaymentStatusEnum.PartiallyPaid: return 'Partially Paid';
      case PaymentStatusEnum.Paid: return 'Paid';
      case PaymentStatusEnum.Overpaid: return 'Overpaid';
      default: return 'Unknown';
    }
  }

  getStatusClass(status: PaymentStatusEnum): string {
    switch (status) {
      case PaymentStatusEnum.Pending: return 'bg-yellow-100 text-yellow-700';
      case PaymentStatusEnum.PartiallyPaid: return 'bg-blue-100 text-blue-700';
      case PaymentStatusEnum.Paid: return 'bg-green-100 text-green-700';
      case PaymentStatusEnum.Overpaid: return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-600';
    }
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

  initiatePayment(fee: FeeListInterface, gateway: PaymentGatewayEnum) {
    if (!this.student) return;
    const balance = this.getFeeBalance(fee);
    if (balance <= 0) {
      this.globalLoadingFacade.globalErrorShow('This fee is already fully paid', 3000);
      return;
    }

    this.initiatingPayment = true;
    const callbackUrl = `${window.location.origin}/app/payment/success`;

    const payload: InitiatePaymentRequest = {
      gateway,
      amount: balance,
      email: this.student.email ?? '',
      name: `${this.student.firstName} ${this.student.lastName}`,
      phone: this.student.phoneNumber ?? '',
      callbackUrl,
      narration: `Fee payment for ${fee.schoolTermSession?.termString ?? 'Term'}`,
      feeId: fee.id,
    };

    this.http.post<any>(
      `${environment.baseUrl}/PaymentGateway/initiate`,
      payload,
      { withCredentials: true }
    ).subscribe({
      next: (response) => {
        this.initiatingPayment = false;
        // The API typically returns a payment URL to redirect to
        const paymentUrl = response?.entity?.authorizationUrl ?? response?.entity?.link ?? response?.entity?.checkoutUrl ?? response?.entity;
        if (paymentUrl && typeof paymentUrl === 'string' && paymentUrl.startsWith('http')) {
          window.location.href = paymentUrl;
        } else {
          this.globalLoadingFacade.globalSuccessShow('Payment initiated. Follow instructions from your gateway.', 5000);
        }
      },
      error: () => {
        this.initiatingPayment = false;
        this.globalLoadingFacade.globalErrorShow('Failed to initiate payment', 3000);
      }
    });
  }

  getTermLabel(fee: FeeListInterface): string {
    const ts = fee.schoolTermSession;
    if (!ts) return '—';
    const term = ts.termString ?? `Term ${ts.term}`;
    const session = ts.session?.name ?? '';
    return `${session} - ${term}`;
  }



  ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }
}
