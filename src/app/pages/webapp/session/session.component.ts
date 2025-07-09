import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionFacade } from '../../../store/session/session.facade';
import { SessionListInterface } from '../../../types/session';
import { PaginatedResponseInterface } from '../../../types';
import { PageQueryInterface } from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';
import { tableHeader } from './table-header';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
})
export class SessionComponent implements OnInit {
  sessionList$: Observable<PaginatedResponseInterface<SessionListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sessionFacade: SessionFacade,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.sessionList$ = this.sessionFacade.sessionList$;
    this.loading$ = this.sessionFacade.loading$;
  }

  ngOnInit() {
    this.loadSessions();
  }

  loadSessions() {
    this.sessionFacade.getSessionList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0
    });
  }

  onPageChange(event: PageQueryInterface) {
    this.sessionFacade.getSessionList(event);
  }

  onSearch(searchText: string) {
    this.sessionFacade.getSessionList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      searchText
    });
  }

  onFilter(filters: { name: string; value: string }[]) {
    this.sessionFacade.getSessionList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      queryProperties: filters
    });
  }

  onRefresh() {
    this.loadSessions();
  }

  onView(row: SessionListInterface) {
    this.router.navigate(['view', row.id], { relativeTo: this.route });
  }

  onEdit(row: SessionListInterface) {
    this.router.navigate(['edit', row.id], { relativeTo: this.route });
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
        this.toastService.openToast('Session deleted successfully', NotificationTypeEnums.SUCCESS);
        this.loadSessions();
      }
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
