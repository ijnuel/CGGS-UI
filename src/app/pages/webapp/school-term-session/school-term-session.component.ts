import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { SchoolTermSessionFacade } from '../../../store/school-term-session/school-term-session.facade';
import * as SchoolTermSessionAction from '../../../store/school-term-session/school-term-session.actions';
import { SchoolTermSessionListInterface } from '../../../types/school-term-session';
import { PaginatedResponseInterface, SessionListInterface } from '../../../types';
import { PageQueryInterface } from '../../../types';
import { TableHeaderInterface, TableActionInterface } from '../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';
import { tableHeader } from './table-header';
import { SessionFacade } from '../../../store/session/session.facade';

@Component({
  selector: 'app-school-term-session',
  templateUrl: './school-term-session.component.html',
  styleUrls: ['./school-term-session.component.scss'],
})
export class SchoolTermSessionComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  schoolTermSessionList$: Observable<PaginatedResponseInterface<SchoolTermSessionListInterface[]> | null>;
  sessionList$: Observable<SessionListInterface[] | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;
  customActions: TableActionInterface[] = [
    { key: 'set-current', label: 'Set as Current', icon: 'star', iconClass: '!text-amber-500', show: (row) => !row.isCurrent }
  ];

  private readonly nestedProperties = [{ name: 'session' }];
  private lastQuery: PageQueryInterface = { start: 0, recordsPerPage: 10, pageIndex: 0 };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private schoolTermSessionFacade: SchoolTermSessionFacade,
    private sessionFacade: SessionFacade,
    private actions$: Actions,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.sessionList$ = this.sessionFacade.sessionAll$;
    this.schoolTermSessionList$ = this.schoolTermSessionFacade.schoolTermSessionList$;
    this.loading$ = this.schoolTermSessionFacade.loading$;

    this.actions$.pipe(
      ofType(SchoolTermSessionAction.setSchoolTermSessionAsCurrentSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastService.openToast('School Term Session set as current', NotificationTypeEnums.SUCCESS);
      this.schoolTermSessionFacade.getSchoolTermSessionList(this.lastQuery);
    });

    this.actions$.pipe(
      ofType(SchoolTermSessionAction.deleteSchoolTermSessionSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastService.openToast('School Term Session deleted successfully', NotificationTypeEnums.SUCCESS);
      this.schoolTermSessionFacade.getSchoolTermSessionList(this.lastQuery);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onQueryChange(query: PageQueryInterface) {
    this.lastQuery = { ...query, nestedProperties: this.nestedProperties };
    this.schoolTermSessionFacade.getSchoolTermSessionList(this.lastQuery);
  }

  onRefresh() {
    this.schoolTermSessionFacade.getSchoolTermSessionList(this.lastQuery);
  }

  onView(row: SchoolTermSessionListInterface) {
    this.router.navigate(['view', row.id], { relativeTo: this.route });
  }

  onEdit(row: SchoolTermSessionListInterface) {
    this.router.navigate(['edit', row.id], { relativeTo: this.route });
  }

  onCustomAction(event: { key: string; row: SchoolTermSessionListInterface }) {
    if (event.key === 'set-current') {
      this.schoolTermSessionFacade.setSchoolTermSessionAsCurrent(event.row.id);
    }
  }

  onDelete(row: SchoolTermSessionListInterface) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete School Term Session',
        message: `Are you sure you want to delete "${row.session?.name} - ${row.termString}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.schoolTermSessionFacade.deleteSchoolTermSession(row.id);
      }
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
