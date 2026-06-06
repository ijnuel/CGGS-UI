import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { PaymentFacade } from '../../../../store/payment/payment.facade';
import { SchoolTermSessionFacade } from '../../../../store/school-term-session/school-term-session.facade';
import { StudentFacade } from '../../../../store/student/student.facade';
import { PaymentListInterface } from '../../../../types/fee';
import { PaginatedResponseInterface, PageQueryInterface, SchoolTermSessionListInterface, StudentListInterface } from '../../../../types';
import { TableHeaderInterface } from '../../../../types/table';
import { getClassLabel } from '../../../../services/helper.service';

const tableHeader: TableHeaderInterface[] = [
  { key: 'amountPaid', type: 'text', name: 'Amount Paid (₦)', sortable: true, filterable: false, align: 'right', format: (v: number) => v?.toLocaleString('en-NG', { minimumFractionDigits: 2 }) ?? '0.00' },
  { key: 'paymentDate', type: 'text', name: 'Payment Date', sortable: true, filterable: false, align: 'left', format: (v: string) => v ? new Date(v).toLocaleDateString('en-NG', { day: '2-digit', month: 'short', year: 'numeric' }) : '—' },
  { key: 'paymentMethod', type: 'text', name: 'Payment Method', sortable: false, filterable: false, align: 'left', format: (v: string) => v ?? '—' },
  { key: 'paymentReversed', type: 'text', name: 'Reversed', sortable: false, filterable: false, align: 'center', format: (v: boolean) => v ? 'Yes' : 'No' },
  { key: 'transactionId', type: 'text', name: 'Transaction ID', sortable: false, filterable: false, align: 'left', format: (v: string) => v ?? '—' },
  { key: 'session', nestedKey: 'feeLine.fee.schoolTermSession.session.name', type: 'text', name: 'Session', sortable: false, filterable: false, align: 'left', format: (_: any, row: any) => row?.feeLine?.fee?.schoolTermSession?.session?.name ?? '—' },
  { key: 'term', nestedKey: 'feeLine.fee.schoolTermSession.termString', type: 'text', name: 'Term', sortable: false, filterable: false, align: 'left', format: (_: any, row: any) => row?.feeLine?.fee?.schoolTermSession?.termString ?? '—' },
  { key: 'class', nestedKey: 'feeLine.fee.studentClass.class.name', type: 'text', name: 'Class', sortable: false, filterable: false, align: 'left', format: (_: any, row: any) => getClassLabel(row?.feeLine?.fee?.studentClass?.class) || row?.feeLine?.fee?.studentClass?.class?.name || '—' },
  { key: 'studentNo', nestedKey: 'feeLine.fee.studentClass.student.studentNo', type: 'text', name: 'Student No', sortable: false, filterable: false, align: 'left', format: (_: any, row: any) => row?.feeLine?.fee?.studentClass?.student?.studentNo ?? '—' },
  { key: 'createdBy', nestedKey: 'createdBy.userName', type: 'text', name: 'Created By', sortable: false, filterable: false, align: 'left', format: (_: any, row: any) => row?.createdBy?.userName ?? '—' },
];

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  paymentList$: Observable<PaginatedResponseInterface<PaymentListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;

  termSessionFilterControl = new FormControl('');
  studentFilterControl = new FormControl('');

  schoolTermSessions: SchoolTermSessionListInterface[] = [];
  allStudents: StudentListInterface[] = [];

  getTermLabel = (ts: SchoolTermSessionListInterface): string => {
    const term = ts.termString ?? `Term ${ts.term}`;
    const session = ts.session?.name ?? '';
    return `${session} - ${term}`;
  };

  getStudentLabel = (s: StudentListInterface): string =>
    `${s.firstName ?? ''} ${s.lastName ?? ''}`.trim();

  private baseNestedProperties = [
    { name: 'createdBy' },
    {
      name: 'feeLine',
      innerNestedProperties: [
        {
          name: 'fee',
          innerNestedProperties: [
            { name: 'schoolTermSession', innerNestedProperties: [{ name: 'session' }] },
            {
              name: 'studentClass',
              innerNestedProperties: [
                { name: 'student' },
                { name: 'class', innerNestedProperties: [{ name: 'classLevel', innerNestedProperties: [{ name: 'programmeType' }] }] },
              ],
            },
          ],
        },
      ],
    },
  ];

  private lastQuery: PageQueryInterface = {
    start: 0, recordsPerPage: 10, pageIndex: 0,
    nestedProperties: this.baseNestedProperties,
    sortProperties: [{ name: 'paymentDate', isDescending: true }],
  };

  constructor(
    private paymentFacade: PaymentFacade,
    private schoolTermSessionFacade: SchoolTermSessionFacade,
    private studentFacade: StudentFacade,
  ) {
    this.paymentList$ = this.paymentFacade.paymentList$;
    this.loading$ = this.paymentFacade.loading$;
  }

  ngOnInit() {
    this.schoolTermSessionFacade.getSchoolTermSessionAll({ nestedProperties: [{ name: 'session' }] });
    this.studentFacade.getStudentAll();

    this.studentFacade.studentAll$.pipe(takeUntil(this.destroy$)).subscribe(students => {
      this.allStudents = students ?? [];
    });

    this.schoolTermSessionFacade.schoolTermSessionAll$.pipe(
      filter(sessions => !!sessions && sessions!.length > 0),
      take(1),
      takeUntil(this.destroy$),
    ).subscribe(sessions => {
      this.schoolTermSessions = sessions!;
      const current = sessions!.find(s => s.isCurrent);
      if (current) {
        this.termSessionFilterControl.setValue(current.id, { emitEvent: false });
        this.onTermSessionChange(current.id);
      } else {
        this.paymentFacade.getPaymentList(this.lastQuery);
      }
    });
  }

  ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }

  private buildQueryProperties(): { name: string; value: string }[] {
    const props: { name: string; value: string }[] = [];
    const termId = this.termSessionFilterControl.value;
    const studentId = this.studentFilterControl.value;
    if (termId) props.push({ name: 'feeLine.fee.schoolTermSessionId', value: termId });
    if (studentId) props.push({ name: 'feeLine.fee.studentClass.studentId', value: studentId });
    return props;
  }

  onTermSessionChange(termSessionId: string) {
    this.lastQuery = { ...this.lastQuery, start: 0, pageIndex: 0, queryProperties: this.buildQueryProperties() };
    this.paymentFacade.getPaymentList(this.lastQuery);
  }

  onStudentChange(studentId: string) {
    this.lastQuery = { ...this.lastQuery, start: 0, pageIndex: 0, queryProperties: this.buildQueryProperties() };
    this.paymentFacade.getPaymentList(this.lastQuery);
  }

  onQueryChange(query: PageQueryInterface) {
    this.lastQuery = {
      ...query,
      nestedProperties: this.baseNestedProperties,
      queryProperties: this.lastQuery.queryProperties,
      sortProperties: query.sortProperties?.length ? query.sortProperties : this.lastQuery.sortProperties,
    };
    this.paymentFacade.getPaymentList(this.lastQuery);
  }

  onRefresh() { this.paymentFacade.getPaymentList(this.lastQuery); }
}
