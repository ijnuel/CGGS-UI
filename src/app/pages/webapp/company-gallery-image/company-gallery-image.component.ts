import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { MatDialog } from '@angular/material/dialog';
import { CompanyGalleryImageFacade } from '../../../store/company-gallery-image/company-gallery-image.facade';
import * as CompanyGalleryImageAction from '../../../store/company-gallery-image/company-gallery-image.actions';
import { CompanyGalleryImageListInterface, PaginatedResponseInterface, PageQueryInterface } from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
import { tableHeader } from './table-header';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';

@Component({
  selector: 'app-company-gallery-image',
  templateUrl: './company-gallery-image.component.html',
  styleUrls: ['./company-gallery-image.component.scss'],
})
export class CompanyGalleryImageComponent implements OnDestroy {
  companyGalleryImageList$: Observable<PaginatedResponseInterface<CompanyGalleryImageListInterface[]> | null>;
  loading$: Observable<boolean>;

  tableHeaderData: TableHeaderInterface[] = tableHeader;
  private destroy$ = new Subject<void>();
  private lastQuery: PageQueryInterface = { start: 0, recordsPerPage: 10, pageIndex: 0 };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private facade: CompanyGalleryImageFacade,
    private actions$: Actions,
    private dialog: MatDialog,
    private toastService: ToastNotificationService,
  ) {
    this.companyGalleryImageList$ = this.facade.companyGalleryImageList$;
    this.loading$ = this.facade.loading$;

    this.actions$.pipe(
      ofType(CompanyGalleryImageAction.deleteCompanyGalleryImageSuccess),
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.toastService.openToast('Gallery image deleted', NotificationTypeEnums.SUCCESS);
      this.facade.getCompanyGalleryImageList(this.lastQuery);
    });
  }

  onQueryChange(query: PageQueryInterface) {
    this.lastQuery = query;
    this.facade.getCompanyGalleryImageList(query);
  }

  onRefresh() {
    this.facade.getCompanyGalleryImageList(this.lastQuery);
  }

  onView(row: CompanyGalleryImageListInterface) {
    this.router.navigate(['view', row.id], { relativeTo: this.route });
  }

  onEdit(row: CompanyGalleryImageListInterface) {
    this.router.navigate(['edit', row.id], { relativeTo: this.route });
  }

  onDelete(row: CompanyGalleryImageListInterface) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Delete gallery image "${row.caption || row.imageUrl}"?` },
    });
    ref.afterClosed().subscribe(confirmed => {
      if (confirmed) this.facade.deleteCompanyGalleryImage(row.id);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
