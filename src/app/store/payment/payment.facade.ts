import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaymentListInterface, FeeListInterface, FeeLineListInterface } from '../../types/fee';
import { ClassListInterface, PageQueryInterface, PaginatedResponseInterface, SchoolTermSessionListInterface, StudentClassListInterface, StudentListInterface } from '../../types';
import { TransactionListInterface } from '../../types/transaction';
import * as PaymentAction from './payment.actions';
import { selectPaymentList, selectPaymentLoading, selectPaymentError } from './payment.selector';
import { PaymentState } from './payment.reducer';
import { FeeFacade } from '../fee/fee.facade';
import { SchoolTermSessionFacade } from '../school-term-session/school-term-session.facade';
import { ClassFacade } from '../class/class.facade';
import { StudentFacade } from '../student/student.facade';
import { StudentClassFacade } from '../student-class/student-class.facade';
import { TransactionFacade } from '../transaction/transaction.facade';

@Injectable({ providedIn: 'root' })
export class PaymentFacade {
  paymentList$: Observable<PaginatedResponseInterface<PaymentListInterface[]> | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private store: Store<{ payment: PaymentState }>,
    private feeFacade: FeeFacade,
    private schoolTermSessionFacade: SchoolTermSessionFacade,
    private classFacade: ClassFacade,
    private studentFacade: StudentFacade,
    private studentClassFacade: StudentClassFacade,
    private transactionFacade: TransactionFacade,
  ) {
    const feeLineMap$ = this.feeFacade.feeLineAll$.pipe(
      map(lines => new Map<string, FeeLineListInterface>((lines ?? []).map(l => [l.id, l])))
    );
    const feeMap$ = this.feeFacade.feeAll$.pipe(
      map(fees => new Map<string, FeeListInterface>((fees ?? []).map(f => [f.id, f])))
    );
    const stsMap$ = this.schoolTermSessionFacade.schoolTermSessionAll$.pipe(
      map(sessions => new Map<string, SchoolTermSessionListInterface>((sessions ?? []).map(s => [s.id, s])))
    );
    const classMap$ = this.classFacade.classAll$.pipe(
      map(classes => new Map<string, ClassListInterface>((classes ?? []).map(c => [c.id, c])))
    );
    const studentMap$ = this.studentFacade.studentAll$.pipe(
      map(students => new Map<string, StudentListInterface>((students ?? []).map(s => [s.id, s])))
    );
    const studentClassMap$ = this.studentClassFacade.studentClassAll$.pipe(
      map(scs => new Map<string, StudentClassListInterface>((scs ?? []).map(sc => [sc.id, sc])))
    );
    const transactionMap$ = this.transactionFacade.transactionAll$.pipe(
      map(txns => new Map<string, TransactionListInterface>((txns ?? []).map(t => [t.id, t])))
    );

    this.paymentList$ = combineLatest([
      this.store.select(selectPaymentList),
      feeLineMap$,
      feeMap$,
      stsMap$,
      classMap$,
      studentMap$,
      studentClassMap$,
      transactionMap$,
    ]).pipe(
      map(([list, feeLineMap, feeMap, stsMap, classMap, studentMap, studentClassMap, transactionMap]) => {
        if (!list) return list;
        return {
          ...list,
          data: list.data.map(row => {
            const feeLine = row.feeLine ?? feeLineMap.get(row.feeLineId);
            const fee = feeLine ? (feeLine.fee ?? feeMap.get(feeLine.feeId)) : undefined;
            const sts = fee ? stsMap.get(fee.schoolTermSessionId) : undefined;
            const studentClass = fee ? studentClassMap.get(fee.studentClassId) : undefined;
            const student = studentClass ? studentMap.get(studentClass.studentId) : undefined;
            const cls = studentClass ? classMap.get(studentClass.classId) : undefined;
            const transaction = row.transaction ?? (row.transactionId ? transactionMap.get(row.transactionId) : undefined);

            return {
              ...row,
              transaction,
              feeLine: feeLine ? {
                ...feeLine,
                fee: fee ? {
                  ...fee,
                  schoolTermSession: sts ?? fee.schoolTermSession,
                  studentClass: studentClass ? {
                    ...studentClass,
                    student: student ?? studentClass.student,
                    class: cls ?? studentClass.class,
                  } : fee.studentClass,
                } : feeLine.fee,
              } : row.feeLine,
            };
          }),
        };
      })
    );

    this.loading$ = this.store.select(selectPaymentLoading);
    this.error$ = this.store.select(selectPaymentError);
  }

  loadReferenceData(): void {
    this.feeFacade.getFeeAll();
    this.feeFacade.getFeeLineAll();
    this.schoolTermSessionFacade.getSchoolTermSessionAll();
    this.classFacade.getClassAll();
    this.studentFacade.getStudentAll();
    this.studentClassFacade.getStudentClassAll();
    this.transactionFacade.getTransactionAll();
  }

  getPaymentList(pageQuery: PageQueryInterface): void {
    this.store.dispatch(PaymentAction.getPaymentList({ pageQuery }));
  }
}
