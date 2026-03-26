import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { StaffFacade } from '../../../store/staff/staff.facade';
import * as StaffAction from '../../../store/staff/staff.actions';
import { StaffListInterface } from '../../../types/staff';
import { PaginatedResponseInterface, PageQueryInterface } from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';
import { tableHeader } from './table-header';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class StaffComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  staffList$: Observable<PaginatedResponseInterface<StaffListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;
  private lastQuery: PageQueryInterface = { start: 0, recordsPerPage: 10, pageIndex: 0 };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private staffFacade: StaffFacade,
    private actions$: Actions,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.staffList$ = this.staffFacade.staffList$;
    this.loading$ = this.staffFacade.loading$;

    this.actions$.pipe(
      ofType(StaffAction.deleteStaffSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastService.openToast('Staff deleted successfully', NotificationTypeEnums.SUCCESS);
      this.staffFacade.getStaffList(this.lastQuery);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onQueryChange(query: PageQueryInterface) {
    this.lastQuery = query;
    this.staffFacade.getStaffList(query);
  }

  onRefresh() {
    this.staffFacade.getStaffList(this.lastQuery);
  }

  onView(row: StaffListInterface) {
    this.router.navigate(['view', row.id], { relativeTo: this.route });
  }

  onEdit(row: StaffListInterface) {
    this.router.navigate(['edit', row.id], { relativeTo: this.route });
  }

  onDelete(row: StaffListInterface) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Staff',
        message: `Are you sure you want to delete "${row.lastName}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.staffFacade.deleteStaff(row.id);
      }
    });
  }
}
