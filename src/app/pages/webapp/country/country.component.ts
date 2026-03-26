import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { CountryFacade } from '../../../store/country/country.facade';
import * as CountryAction from '../../../store/country/country.actions';
import { CountryListInterface } from '../../../types/country';
import { PaginatedResponseInterface, PageQueryInterface } from '../../../types';
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
export class CountryComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  countryList$: Observable<PaginatedResponseInterface<CountryListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;
  private lastQuery: PageQueryInterface = { start: 0, recordsPerPage: 10, pageIndex: 0 };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private countryFacade: CountryFacade,
    private actions$: Actions,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.countryList$ = this.countryFacade.countryList$;
    this.loading$ = this.countryFacade.loading$;

    this.actions$.pipe(
      ofType(CountryAction.deleteCountrySuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastService.openToast('Country deleted successfully', NotificationTypeEnums.SUCCESS);
      this.countryFacade.getCountryList(this.lastQuery);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onQueryChange(query: PageQueryInterface) {
    this.lastQuery = query;
    this.countryFacade.getCountryList(query);
  }

  onRefresh() {
    this.countryFacade.getCountryList(this.lastQuery);
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
      }
    });
  }
}
