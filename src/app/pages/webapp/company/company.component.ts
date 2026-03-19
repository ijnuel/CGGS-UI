import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyFacade } from '../../../store/company/company.facade';
import { CompanyListInterface } from '../../../types/company';
import { PaginatedResponseInterface, PageQueryInterface } from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';
import { tableHeader } from './table-header';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent {
  companyList$: Observable<PaginatedResponseInterface<CompanyListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;
  private lastQuery: PageQueryInterface = { start: 0, recordsPerPage: 10, pageIndex: 0 };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private companyFacade: CompanyFacade,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.companyList$ = this.companyFacade.companyList$;
    this.loading$ = this.companyFacade.loading$;
  }

  onQueryChange(query: PageQueryInterface) {
    this.lastQuery = query;
    this.companyFacade.getCompanyList(query);
  }

  onRefresh() {
    this.companyFacade.getCompanyList(this.lastQuery);
  }

  onView(row: CompanyListInterface) {
    this.router.navigate(['view', row.id], { relativeTo: this.route });
  }

  onEdit(row: CompanyListInterface) {
    this.router.navigate(['edit', row.id], { relativeTo: this.route });
  }

  onDelete(row: CompanyListInterface) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Company',
        message: `Are you sure you want to delete "${row.name}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.companyFacade.deleteCompany(row.id);
        this.toastService.openToast('Company deleted successfully', NotificationTypeEnums.SUCCESS);
        this.companyFacade.getCompanyList(this.lastQuery);
      }
    });
  }
}
