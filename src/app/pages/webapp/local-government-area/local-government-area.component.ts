import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { LocalGovernmentAreaFacade } from '../../../store/local-government-area/local-government-area.facade';
import * as LocalGovernmentAreaAction from '../../../store/local-government-area/local-government-area.actions';
import { LocalGovernmentAreaListInterface } from '../../../types/local-government-area';
import { PaginatedResponseInterface, PageQueryInterface } from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';
import { tableHeader } from './table-header';

@Component({
  selector: 'app-local-government-area',
  templateUrl: './local-government-area.component.html',
  styleUrls: ['./local-government-area.component.scss'],
})
export class LocalGovernmentAreaComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  localGovernmentAreaList$: Observable<PaginatedResponseInterface<LocalGovernmentAreaListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;
  private lastQuery: PageQueryInterface = { start: 0, recordsPerPage: 10, pageIndex: 0 };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private localGovernmentAreaFacade: LocalGovernmentAreaFacade,
    private actions$: Actions,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.localGovernmentAreaList$ = this.localGovernmentAreaFacade.localGovernmentAreaList$;
    this.loading$ = this.localGovernmentAreaFacade.loading$;

    this.actions$.pipe(
      ofType(LocalGovernmentAreaAction.deleteLocalGovernmentAreaSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastService.openToast('Local Government Area deleted successfully', NotificationTypeEnums.SUCCESS);
      this.localGovernmentAreaFacade.getLocalGovernmentAreaList(this.lastQuery);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onQueryChange(query: PageQueryInterface) {
    this.lastQuery = query;
    this.localGovernmentAreaFacade.getLocalGovernmentAreaList(query);
  }

  onRefresh() {
    this.localGovernmentAreaFacade.getLocalGovernmentAreaList(this.lastQuery);
  }

  onView(row: LocalGovernmentAreaListInterface) {
    this.router.navigate(['view', row.id], { relativeTo: this.route });
  }

  onEdit(row: LocalGovernmentAreaListInterface) {
    this.router.navigate(['edit', row.id], { relativeTo: this.route });
  }

  onDelete(row: LocalGovernmentAreaListInterface) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Local Government Area',
        message: `Are you sure you want to delete "${row.name}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.localGovernmentAreaFacade.deleteLocalGovernmentArea(row.id);
      }
    });
  }
}
