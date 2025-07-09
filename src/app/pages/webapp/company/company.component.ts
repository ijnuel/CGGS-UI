import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyFacade } from '../../../store/company/company.facade';
import { CompanyListInterface } from '../../../types/company';
import { PaginatedResponseInterface } from '../../../types';
import { PageQueryInterface } from '../../../types';
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
export class CompanyComponent implements OnInit {
  companyList$: Observable<PaginatedResponseInterface<CompanyListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;

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

  ngOnInit() {
    this.loadCompanys();
  }

  loadCompanys() {
    this.companyFacade.getCompanyList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0
    });
  }

  onPageChange(event: PageQueryInterface) {
    this.companyFacade.getCompanyList(event);
  }

  onSearch(searchText: string) {
    this.companyFacade.getCompanyList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      searchText
    });
  }

  onFilter(filters: { name: string; value: string }[]) {
    this.companyFacade.getCompanyList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      queryProperties: filters
    });
  }

  onRefresh() {
    this.loadCompanys();
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
        this.loadCompanys();
      }
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
