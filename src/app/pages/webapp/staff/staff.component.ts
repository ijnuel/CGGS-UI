import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { StaffFacade } from '../../../store/staff/staff.facade';
import * as StaffAction from '../../../store/staff/staff.actions';
import { StaffListInterface } from '../../../types/staff';
import { PaginatedResponseInterface, PageQueryInterface } from '../../../types';
import { TableHeaderInterface, TableActionInterface } from '../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { RoleDialogComponent, RoleDialogData } from '../../../shared/role-dialog/role-dialog.component';
import { RoleFacade } from '../../../store/role/role.facade';
import * as RoleAction from '../../../store/role/role.actions';
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

  roleActions: TableActionInterface[] = [
    {
      key: 'assign-role',
      label: 'Assign Role',
      icon: 'person_add',
      iconClass: '!text-green-600',
    },
    {
      key: 'remove-role',
      label: 'Remove Role',
      icon: 'person_remove',
      iconClass: '!text-orange-500',
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private staffFacade: StaffFacade,
    private roleFacade: RoleFacade,
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

    this.actions$.pipe(
      ofType(RoleAction.assignRoleSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastService.openToast('Role assigned successfully', NotificationTypeEnums.SUCCESS);
    });

    this.actions$.pipe(
      ofType(RoleAction.removeRoleSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastService.openToast('Role removed successfully', NotificationTypeEnums.SUCCESS);
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

  onCustomAction(event: { key: string; row: any }) {
    const row = event.row as StaffListInterface;
    const userName = `${row.firstName} ${row.lastName}`;

    if (event.key === 'assign-role') {
      this.openRoleDialog('assign', row.userId!, userName);
    } else if (event.key === 'remove-role') {
      this.openRoleDialog('remove', row.userId!, userName);
    }
  }

  private openRoleDialog(mode: 'assign' | 'remove', userId: string, userName: string) {
    const dialogRef = this.dialog.open(RoleDialogComponent, {
      width: '420px',
      data: {
        title: mode === 'assign' ? 'Assign Role' : 'Remove Role',
        userName,
        userId,
        mode,
      } as RoleDialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (mode === 'assign') {
          this.roleFacade.assignRole(result);
        } else {
          this.roleFacade.removeRole(result);
        }
      }
    });
  }
}
