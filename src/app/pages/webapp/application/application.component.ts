import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApplicationFacade } from '../../../store/application/application.facade';
import { ApplicationListInterface } from '../../../types/application';
import { PaginatedResponseInterface } from '../../../types';
import { PageQueryInterface } from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';
import { tableHeader } from './table-header';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {
  applicationList$: Observable<PaginatedResponseInterface<ApplicationListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private applicationFacade: ApplicationFacade,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.applicationList$ = this.applicationFacade.applicationList$;
    this.loading$ = this.applicationFacade.loading$;
  }

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {
    this.applicationFacade.getApplicationList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0
    });
  }

  onPageChange(event: PageQueryInterface) {
    this.applicationFacade.getApplicationList(event);
  }

  onSearch(searchText: string) {
    this.applicationFacade.getApplicationList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      searchText
    });
  }

  onFilter(filters: { name: string; value: string }[]) {
    this.applicationFacade.getApplicationList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      queryProperties: filters
    });
  }

  onRefresh() {
    this.loadApplications();
  }

  onView(row: ApplicationListInterface) {
    this.router.navigate(['view', row.id], { relativeTo: this.route });
  }

  onEdit(row: ApplicationListInterface) {
    this.router.navigate(['edit', row.id], { relativeTo: this.route });
  }

  onDelete(row: ApplicationListInterface) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Application',
        message: `Are you sure you want to delete "${row.lastName}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.applicationFacade.deleteApplication(row.id);
        this.toastService.openToast('Application deleted successfully', NotificationTypeEnums.SUCCESS);
        this.loadApplications();
      }
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
