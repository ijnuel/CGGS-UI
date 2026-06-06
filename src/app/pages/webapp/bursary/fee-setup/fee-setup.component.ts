import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { MatDialog } from '@angular/material/dialog';
import { FeeSetupFacade } from '../../../../store/fee-setup/fee-setup.facade';
import { SchoolTermSessionFacade } from '../../../../store/school-term-session/school-term-session.facade';
import { ClassFacade } from '../../../../store/class/class.facade';
import * as FeeSetupAction from '../../../../store/fee-setup/fee-setup.actions';
import {
  ClassListInterface,
  FeeSetupListInterface,
  PaginatedResponseInterface,
  PageQueryInterface,
  SchoolTermSessionListInterface,
} from '../../../../types';
import { TableHeaderInterface } from '../../../../types/table';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../../services/toast-notification.service';
import { CreateUpdateFeeSetupComponent, FeeSetupDialogData } from './create-update-fee-setup/create-update-fee-setup.component';
import { getClassLabel } from '../../../../services/helper.service';

const tableHeader: TableHeaderInterface[] = [
  { key: 'feeTypeName', nestedKey: 'feeType.name', type: 'text', name: 'Fee Type', sortable: false, filterable: false, align: 'left' },
  { key: 'className', nestedKey: 'class.name', type: 'text', name: 'Class', sortable: false, filterable: false, align: 'left', format: (_: any, row: any) => getClassLabel(row?.class) || row?.class?.name || '—' },
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
  tableHeaderData: TableHeaderInterface[] = tableHeader;

  termSessionFilterControl = new FormControl('');
  classFilterControl = new FormControl('');

  schoolTermSessions: SchoolTermSessionListInterface[] = [];
  allClasses: ClassListInterface[] = [];

  getTermLabel = (ts: SchoolTermSessionListInterface): string => {
    const term = ts.termString ?? `Term ${ts.term}`;
    const session = ts.session?.name ?? '';
    return `${session} - ${term}`;
  };

  getClassLabel = (c: ClassListInterface): string => getClassLabel(c) || c?.name || '';

  private baseNestedProperties = [
    { name: 'feeType' },
    { name: 'class', innerNestedProperties: [{ name: 'classLevel', innerNestedProperties: [{ name: 'programmeType' }] }] },
    { name: 'schoolTermSession', innerNestedProperties: [{ name: 'session' }] },
  ];
  private lastQuery: PageQueryInterface = {
    start: 0, recordsPerPage: 10, pageIndex: 0,
    nestedProperties: this.baseNestedProperties,
    sortProperties: [{ name: 'id', isDescending: true }],
  };

  constructor(
    private feeSetupFacade: FeeSetupFacade,
    private schoolTermSessionFacade: SchoolTermSessionFacade,
    private classFacade: ClassFacade,
    private actions$: Actions,
    private dialog: MatDialog,
    private toastService: ToastNotificationService,
  ) {
    this.feeSetupList$ = this.feeSetupFacade.feeSetupList$;
    this.loading$ = this.feeSetupFacade.loading$;

    this.actions$.pipe(ofType(FeeSetupAction.deleteFeeSetupSuccess), takeUntil(this.destroy$))
      .subscribe(() => {
        this.toastService.openToast('Fee Setup deleted', NotificationTypeEnums.SUCCESS);
        this.feeSetupFacade.getFeeSetupList(this.lastQuery);
      });

    this.actions$.pipe(ofType(FeeSetupAction.deleteFeeSetupFail), takeUntil(this.destroy$))
      .subscribe(() => this.toastService.openToast('Failed to delete Fee Setup', NotificationTypeEnums.ERROR));
  }

  ngOnInit() {
    this.schoolTermSessionFacade.getSchoolTermSessionAll({ nestedProperties: [{ name: 'session' }] });
    this.classFacade.getClassAll({ nestedProperties: [{ name: 'classLevel', innerNestedProperties: [{ name: 'programmeType' }] }] });

    this.classFacade.classAll$.pipe(takeUntil(this.destroy$)).subscribe(classes => {
      this.allClasses = classes ?? [];
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
        this.feeSetupFacade.getFeeSetupList(this.lastQuery);
      }
    });
  }

  ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }

  private buildQueryProperties(): { name: string; value: string }[] {
    const props: { name: string; value: string }[] = [];
    const termId = this.termSessionFilterControl.value;
    const classId = this.classFilterControl.value;
    if (termId) props.push({ name: 'schoolTermSessionId', value: termId });
    if (classId) props.push({ name: 'classId', value: classId });
    return props;
  }

  onTermSessionChange(termSessionId: string) {
    this.lastQuery = { ...this.lastQuery, start: 0, pageIndex: 0, queryProperties: this.buildQueryProperties() };
    this.feeSetupFacade.getFeeSetupList(this.lastQuery);
  }

  onClassChange(classId: string) {
    this.lastQuery = { ...this.lastQuery, start: 0, pageIndex: 0, queryProperties: this.buildQueryProperties() };
    this.feeSetupFacade.getFeeSetupList(this.lastQuery);
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

  openCreate() { this.openDialog(); }

  onEdit(row: FeeSetupListInterface) { this.openDialog(row.id); }

  private openDialog(id?: string) {
    const ref = this.dialog.open(CreateUpdateFeeSetupComponent, {
      width: '560px',
      maxWidth: '95vw',
      data: { id } as FeeSetupDialogData,
    });
    ref.afterClosed().subscribe(result => {
      if (result?.success) this.feeSetupFacade.getFeeSetupList(this.lastQuery);
    });
  }

  onDelete(row: FeeSetupListInterface) {
    if (row.inUse) {
      this.toastService.openToast('Cannot delete a Fee Setup that is in use', NotificationTypeEnums.ERROR);
      return;
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title: 'Delete Fee Setup', message: 'Are you sure you want to delete this fee setup?', confirmText: 'Delete', cancelText: 'Cancel' },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.feeSetupFacade.deleteFeeSetup(row.id);
    });
  }
}
