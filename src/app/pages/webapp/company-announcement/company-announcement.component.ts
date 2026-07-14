import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { MatDialog } from '@angular/material/dialog';
import { CompanyAnnouncementFacade } from '../../../store/company-announcement/company-announcement.facade';
import * as CompanyAnnouncementAction from '../../../store/company-announcement/company-announcement.actions';
import { CompanyAnnouncementListInterface, PaginatedResponseInterface, PageQueryInterface } from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
import { tableHeader } from './table-header';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';

@Component({
  selector: 'app-company-announcement',
  templateUrl: './company-announcement.component.html',
  styleUrls: ['./company-announcement.component.scss'],
})
export class CompanyAnnouncementComponent implements OnDestroy {
  companyAnnouncementList$: Observable<PaginatedResponseInterface<CompanyAnnouncementListInterface[]> | null>;
  loading$: Observable<boolean>;

  tableHeaderData: TableHeaderInterface[] = tableHeader;
  private destroy$ = new Subject<void>();
  private lastQuery: PageQueryInterface = { start: 0, recordsPerPage: 10, pageIndex: 0 };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private facade: CompanyAnnouncementFacade,
    private actions$: Actions,
    private dialog: MatDialog,
    private toastService: ToastNotificationService,
  ) {
    this.companyAnnouncementList$ = this.facade.companyAnnouncementList$;
    this.loading$ = this.facade.loading$;

    this.actions$.pipe(
      ofType(CompanyAnnouncementAction.deleteCompanyAnnouncementSuccess),
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.toastService.openToast('Announcement deleted', NotificationTypeEnums.SUCCESS);
      this.facade.getCompanyAnnouncementList(this.lastQuery);
    });
  }

  onQueryChange(query: PageQueryInterface) {
    this.lastQuery = query;
    this.facade.getCompanyAnnouncementList(query);
  }

  onRefresh() {
    this.facade.getCompanyAnnouncementList(this.lastQuery);
  }

  onView(row: CompanyAnnouncementListInterface) {
    this.router.navigate(['view', row.id], { relativeTo: this.route });
  }

  onEdit(row: CompanyAnnouncementListInterface) {
    this.router.navigate(['edit', row.id], { relativeTo: this.route });
  }

  onDelete(row: CompanyAnnouncementListInterface) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Delete announcement "${row.title}"?` },
    });
    ref.afterClosed().subscribe(confirmed => {
      if (confirmed) this.facade.deleteCompanyAnnouncement(row.id);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
