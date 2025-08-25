import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SchoolTermSessionFacade } from '../../../store/school-term-session/school-term-session.facade';
import { SchoolTermSessionListInterface } from '../../../types/school-term-session';
import { PaginatedResponseInterface, SessionListInterface } from '../../../types';
import { PageQueryInterface } from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
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
export class SchoolTermSessionComponent implements OnInit {
  schoolTermSessionList$: Observable<PaginatedResponseInterface<SchoolTermSessionListInterface[]> | null>;
  sessionList$: Observable<SessionListInterface[] | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;

  sessionList: SessionListInterface[] = [];
  schoolTermSessionList: SchoolTermSessionListInterface[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private schoolTermSessionFacade: SchoolTermSessionFacade,
    private sessionFacade: SessionFacade,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.sessionList$ = this.sessionFacade.sessionAll$;
    this.schoolTermSessionList$ = this.schoolTermSessionFacade.schoolTermSessionList$;
    this.loading$ = this.schoolTermSessionFacade.loading$;
  }

  ngOnInit() {
    this.loadSchoolTermSessions();
  }

  loadSchoolTermSessions() {
    this.schoolTermSessionFacade.getSchoolTermSessionList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0
    });
  }

  onPageChange(event: PageQueryInterface) {
    this.schoolTermSessionFacade.getSchoolTermSessionList(event);
  }

  onSearch(searchText: string) {
    this.schoolTermSessionFacade.getSchoolTermSessionList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      searchText
    });
  }

  onFilter(filters: { name: string; value: string }[]) {
    this.schoolTermSessionFacade.getSchoolTermSessionList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      queryProperties: filters
    });
  }

  onRefresh() {
    this.loadSchoolTermSessions();
  }

  onView(row: SchoolTermSessionListInterface) {
    this.router.navigate(['view', row.id], { relativeTo: this.route });
  }

  onEdit(row: SchoolTermSessionListInterface) {
    this.router.navigate(['edit', row.id], { relativeTo: this.route });
  }

  onDelete(row: SchoolTermSessionListInterface) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete School Term Session',
        message: `Are you sure you want to delete "${row.name}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.schoolTermSessionFacade.deleteSchoolTermSession(row.id);
        this.toastService.openToast('School Term Session deleted successfully', NotificationTypeEnums.SUCCESS);
        this.loadSchoolTermSessions();
      }
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
