import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CountryFacade } from '../../../store/country/country.facade';
import { CountryListInterface } from '../../../types/country';
import { PaginatedResponseInterface } from '../../../types';
import { PageQueryInterface } from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';
import { tableHeader } from './table-header';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  countryList$: Observable<PaginatedResponseInterface<CountryListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private countryFacade: CountryFacade,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.countryList$ = this.countryFacade.countryList$;
    this.loading$ = this.countryFacade.loading$;
  }

  ngOnInit() {
    this.loadCountrys();
  }

  loadCountrys() {
    this.countryFacade.getCountryList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0
    });
  }

  onPageChange(event: PageQueryInterface) {
    this.countryFacade.getCountryList(event);
  }

  onSearch(searchText: string) {
    this.countryFacade.getCountryList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      searchText
    });
  }

  onFilter(filters: { name: string; value: string }[]) {
    this.countryFacade.getCountryList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      queryProperties: filters
    });
  }

  onRefresh() {
    this.loadCountrys();
  }

  onView(row: CountryListInterface) {
    this.router.navigate(['view', row.id], { relativeTo: this.route });
  }

  onEdit(row: CountryListInterface) {
    this.router.navigate(['edit', row.id], { relativeTo: this.route });
  }

  onDelete(row: CountryListInterface) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Country',
        message: `Are you sure you want to delete "${row.name}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.countryFacade.deleteCountry(row.id);
        this.toastService.openToast('Country deleted successfully', NotificationTypeEnums.SUCCESS);
        this.loadCountrys();
      }
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
