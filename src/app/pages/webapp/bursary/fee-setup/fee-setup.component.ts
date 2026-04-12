import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { FeeSetupFacade } from '../../../../store/fee-setup/fee-setup.facade';
import { SchoolTermSessionFacade } from '../../../../store/school-term-session/school-term-session.facade';
import * as FeeSetupAction from '../../../../store/fee-setup/fee-setup.actions';
import {
  FeeSetupListInterface,
  PaginatedResponseInterface,
  PageQueryInterface,
  SchoolTermSessionListInterface,
} from '../../../../types';
import { TableHeaderInterface } from '../../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../../services/toast-notification.service';

const tableHeader: TableHeaderInterface[] = [
  { key: 'feeTypeName', nestedKey: 'feeType.name', type: 'text', name: 'Fee Type', sortable: false, filterable: false, align: 'left' },
  { key: 'className', nestedKey: 'class.name', type: 'text', name: 'Class', sortable: false, filterable: false, align: 'left' },
  { key: 'sessionName', nestedKey: 'schoolTermSession.session.name', type: 'text', name: 'Session', sortable: false, filterable: false, align: 'left' },
  { key: 'termString', nestedKey: 'schoolTermSession.termString', type: 'text', name: 'Term', sortable: false, filterable: false, align: 'left' },
  { key: 'amount', type: 'text', name: 'Amount (₦)', sortable: true, filterable: false, align: 'right', format: (v: number) => v?.toLocaleString('en-NG', { minimumFractionDigits: 2 }) ?? '0.00' },
  { key: 'inUse', type: 'text', name: 'In Use', sortable: false, filterable: false, align: 'center', format: (v: boolean) => v ? 'Yes' : 'No' },
];

@Component({
  selector: 'app-fee-setup',
  templateUrl: './fee-setup.component.html',
  styleUrls: ['./fee-setup.component.scss'],
})
export class FeeSetupComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  feeSetupList$: Observable<PaginatedResponseInterface<FeeSetupListInterface[]> | null>;
  loading$: Observable<boolean>;
  schoolTermSessionAll$: Observable<SchoolTermSessionListInterface[] | null>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;
  selectedTermSessionId = '';

  private baseNestedProperties = [
    { name: 'feeType' },
    { name: 'class' },
    { name: 'schoolTermSession', innerNestedProperties: [{ name: 'session' }] },
  ];
  private lastQuery: PageQueryInterface = {
    start: 0, recordsPerPage: 10, pageIndex: 0,
    nestedProperties: this.baseNestedProperties,
    sortProperties: [{ name: 'id', isDescending: true }],
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private feeSetupFacade: FeeSetupFacade,
    private schoolTermSessionFacade: SchoolTermSessionFacade,
    private actions$: Actions,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.feeSetupList$ = this.feeSetupFacade.feeSetupList$;
    this.loading$ = this.feeSetupFacade.loading$;
    this.schoolTermSessionAll$ = this.schoolTermSessionFacade.schoolTermSessionAll$;

    this.actions$.pipe(ofType(FeeSetupAction.deleteFeeSetupSuccess), takeUntil(this.destroy$))
      .subscribe(() => {
        this.toastService.openToast('Fee Setup deleted', NotificationTypeEnums.SUCCESS);
        this.feeSetupFacade.getFeeSetupList(this.lastQuery);
      });

    this.actions$.pipe(ofType(FeeSetupAction.deleteFeeSetupFail), takeUntil(this.destroy$))
      .subscribe(() => {
        this.toastService.openToast('Failed to delete Fee Setup', NotificationTypeEnums.ERROR);
      });
  }

  ngOnInit() {
    this.schoolTermSessionFacade.getSchoolTermSessionAll({ nestedProperties: [{ name: 'session' }] });
  }

  ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }

  getTermLabel(ts: SchoolTermSessionListInterface): string {
    const term = ts.termString ?? `Term ${ts.term}`;
    const session = ts.session?.name ?? '';
    return `${session} - ${term}`;
  }

  onTermSessionChange(termSessionId: string) {
    this.selectedTermSessionId = termSessionId;
    this.lastQuery = {
      ...this.lastQuery,
      start: 0, pageIndex: 0,
      queryProperties: termSessionId
        ? [{ name: 'schoolTermSessionId', value: termSessionId }]
        : [],
    };
    this.feeSetupFacade.getFeeSetupList(this.lastQuery);
  }

  canDelete(row: FeeSetupListInterface): boolean {
    return !row.inUse;
  }

  onQueryChange(query: PageQueryInterface) {
    this.lastQuery = {
      ...query,
      nestedProperties: this.baseNestedProperties,
      queryProperties: this.lastQuery.queryProperties,
      sortProperties: query.sortProperties?.length ? query.sortProperties : this.lastQuery.sortProperties,
    };
    this.feeSetupFacade.getFeeSetupList(this.lastQuery);
  }

  onRefresh() { this.feeSetupFacade.getFeeSetupList(this.lastQuery); }

  onEdit(row: FeeSetupListInterface) {
    this.router.navigate(['fee-setup/edit', row.id], { relativeTo: this.route.parent });
  }

  onDelete(row: FeeSetupListInterface) {
    if (row.inUse) {
      this.toastService.openToast('Cannot delete a Fee Setup that is in use', NotificationTypeEnums.ERROR);
      return;
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Fee Setup',
        message: `Are you sure you want to delete this fee setup?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.feeSetupFacade.deleteFeeSetup(row.id);
    });
  }
}
