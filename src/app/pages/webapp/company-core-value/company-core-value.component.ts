import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { MatDialog } from '@angular/material/dialog';
import { CompanyCoreValueFacade } from '../../../store/company-core-value/company-core-value.facade';
import * as CompanyCoreValueAction from '../../../store/company-core-value/company-core-value.actions';
import { CompanyCoreValueListInterface, PaginatedResponseInterface, PageQueryInterface } from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
import { tableHeader } from './table-header';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';

@Component({
  selector: 'app-company-core-value',
  templateUrl: './company-core-value.component.html',
  styleUrls: ['./company-core-value.component.scss'],
})
export class CompanyCoreValueComponent implements OnDestroy {
  companyCoreValueList$: Observable<PaginatedResponseInterface<CompanyCoreValueListInterface[]> | null>;
  loading$: Observable<boolean>;

  tableHeaderData: TableHeaderInterface[] = tableHeader;
  private destroy$ = new Subject<void>();
  private lastQuery: PageQueryInterface = { start: 0, recordsPerPage: 10, pageIndex: 0 };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private facade: CompanyCoreValueFacade,
    private actions$: Actions,
    private dialog: MatDialog,
    private toastService: ToastNotificationService,
  ) {
    this.companyCoreValueList$ = this.facade.companyCoreValueList$;
    this.loading$ = this.facade.loading$;

    this.actions$.pipe(
      ofType(CompanyCoreValueAction.deleteCompanyCoreValueSuccess),
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.toastService.openToast('Core value deleted', NotificationTypeEnums.SUCCESS);
      this.facade.getCompanyCoreValueList(this.lastQuery);
    });
  }

  onQueryChange(query: PageQueryInterface) {
    this.lastQuery = query;
    this.facade.getCompanyCoreValueList(query);
  }

  onRefresh() {
    this.facade.getCompanyCoreValueList(this.lastQuery);
  }

  onView(row: CompanyCoreValueListInterface) {
    this.router.navigate(['view', row.id], { relativeTo: this.route });
  }

  onEdit(row: CompanyCoreValueListInterface) {
    this.router.navigate(['edit', row.id], { relativeTo: this.route });
  }

  onDelete(row: CompanyCoreValueListInterface) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Delete core value "${row.title}"?` },
    });
    ref.afterClosed().subscribe(confirmed => {
      if (confirmed) this.facade.deleteCompanyCoreValue(row.id);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
