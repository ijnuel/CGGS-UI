import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { RoleFacade } from '../../../store/role/role.facade';
import * as RoleAction from '../../../store/role/role.actions';
import { RoleWithPermissionsInterface } from '../../../types/role';
import { TableHeaderInterface } from '../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';
import { tableHeader } from './table-header';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  roleAll$: Observable<RoleWithPermissionsInterface[] | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;
  filteredRoles: RoleWithPermissionsInterface[] = [];
  searchText = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roleFacade: RoleFacade,
    private actions$: Actions,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.roleAll$ = this.roleFacade.roleAll$;
    this.loading$ = this.roleFacade.loading$;

    this.roleFacade.getRoleAll();

    this.roleAll$.pipe(takeUntil(this.destroy$)).subscribe((roles) => {
      this.filteredRoles = this.applySearch(roles ?? []);
    });

    this.actions$.pipe(
      ofType(RoleAction.deleteRoleSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastService.openToast('Role deleted successfully', NotificationTypeEnums.SUCCESS);
      this.roleFacade.getRoleAll();
    });

    this.actions$.pipe(
      ofType(RoleAction.invalidateCacheSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastService.openToast('Cache invalidated successfully', NotificationTypeEnums.SUCCESS);
      this.roleFacade.getRoleAll();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearch(text: string) {
    this.searchText = text;
    this.roleAll$.pipe(takeUntil(this.destroy$)).subscribe((roles) => {
      this.filteredRoles = this.applySearch(roles ?? []);
    });
  }

  applySearch(roles: RoleWithPermissionsInterface[]): RoleWithPermissionsInterface[] {
    if (!this.searchText) return roles;
    const lower = this.searchText.toLowerCase();
    return roles.filter(
      (r) => r.name?.toLowerCase().includes(lower)
    );
  }

  onRefresh() {
    this.roleFacade.getRoleAll();
  }

  onInvalidateCache() {
    this.roleFacade.invalidateCache();
  }

  onView(role: RoleWithPermissionsInterface) {
    this.router.navigate(['view', role.id], { relativeTo: this.route });
  }

  onEdit(role: RoleWithPermissionsInterface) {
    this.router.navigate(['edit', role.id], { relativeTo: this.route });
  }

  onDelete(role: RoleWithPermissionsInterface) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Role',
        message: `Are you sure you want to delete "${role.name}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.roleFacade.deleteRole(role.id);
      }
    });
  }
}
