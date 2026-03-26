import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { SessionFacade } from '../../../store/session/session.facade';
import * as SessionAction from '../../../store/session/session.actions';
import { SessionListInterface } from '../../../types/session';
import { PaginatedResponseInterface, PageQueryInterface } from '../../../types';
import { TableHeaderInterface, TableActionInterface } from '../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';
import { tableHeader } from './table-header';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
})
export class SessionComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  sessionList$: Observable<PaginatedResponseInterface<SessionListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;
  customActions: TableActionInterface[] = [
    { key: 'set-current', label: 'Set as Current', icon: 'star', iconClass: '!text-amber-500', show: (row) => !row.isCurrent }
  ];
  private lastQuery: PageQueryInterface = { start: 0, recordsPerPage: 10, pageIndex: 0 };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sessionFacade: SessionFacade,
    private actions$: Actions,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.sessionList$ = this.sessionFacade.sessionList$;
    this.loading$ = this.sessionFacade.loading$;

    this.actions$.pipe(
      ofType(SessionAction.setSessionAsCurrentSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastService.openToast('Session set as current', NotificationTypeEnums.SUCCESS);
      this.sessionFacade.getSessionList(this.lastQuery);
    });

    this.actions$.pipe(
      ofType(SessionAction.deleteSessionSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastService.openToast('Session deleted successfully', NotificationTypeEnums.SUCCESS);
      this.sessionFacade.getSessionList(this.lastQuery);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onQueryChange(query: PageQueryInterface) {
    this.lastQuery = query;
    this.sessionFacade.getSessionList(query);
  }

  onRefresh() {
    this.sessionFacade.getSessionList(this.lastQuery);
  }

  onView(row: SessionListInterface) {
    this.router.navigate(['view', row.id], { relativeTo: this.route });
  }

  onEdit(row: SessionListInterface) {
    this.router.navigate(['edit', row.id], { relativeTo: this.route });
  }

  onCustomAction(event: { key: string; row: SessionListInterface }) {
    if (event.key === 'set-current') {
      this.sessionFacade.setSessionAsCurrent(event.row.id);
    }
  }

  onDelete(row: SessionListInterface) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Session',
        message: `Are you sure you want to delete "${row.name}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sessionFacade.deleteSession(row.id);
      }
    });
  }
}
