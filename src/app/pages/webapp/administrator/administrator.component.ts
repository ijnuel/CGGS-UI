import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AdministratorFacade } from '../../../store/administrator/administrator.facade';
import { AdministratorListInterface } from '../../../types';
import { PaginatedResponseInterface } from '../../../types';
import { PageQueryInterface } from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';
import { tableHeader } from './table-header';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss'],
})
export class AdministratorComponent implements OnInit {
  administratorList$: Observable<PaginatedResponseInterface<AdministratorListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;
  pageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private administratorFacade: AdministratorFacade,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.administratorList$ = this.administratorFacade.selectAdministratorList$;
    this.loading$ = this.administratorFacade.selectedLoading$;
  }

  ngOnInit() {
    this.loadAdministrators();
  }

  loadAdministrators() {
    this.administratorFacade.getAdministratorList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0
    });
  }

  onPageChange(event: PageQueryInterface) {
    this.administratorFacade.getAdministratorList(event);
  }

  onSearch(searchText: string) {
    this.administratorFacade.getAdministratorList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      searchText
    });
  }

  onFilter(filters: { name: string; value: string }[]) {
    this.administratorFacade.getAdministratorList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      queryProperties: filters
    });
  }

  onRefresh() {
    this.loadAdministrators();
  }

  onView(row: AdministratorListInterface) {
    this.router.navigate(['view', row.id], { relativeTo: this.route });
  }

  onEdit(row: AdministratorListInterface) {
    this.router.navigate(['edit', row.id], { relativeTo: this.route });
  }

  onDelete(row: AdministratorListInterface) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Administrator',
        message: `Are you sure you want to delete "${row.firstName} ${row.lastName}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Implement delete logic here, e.g.:
        // this.administratorFacade.deleteAdministrator(row.id);
        this.toastService.openToast('Administrator deleted successfully', NotificationTypeEnums.SUCCESS);
        this.loadAdministrators();
      }
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
