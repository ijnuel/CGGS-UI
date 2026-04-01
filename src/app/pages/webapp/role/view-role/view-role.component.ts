import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, combineLatest, takeUntil } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { RoleFacade } from '../../../../store/role/role.facade';
import * as RoleAction from '../../../../store/role/role.actions';
import { RoleWithPermissionsInterface, PermissionInterface } from '../../../../types';
import { ToastNotificationService, NotificationTypeEnums } from '../../../../services/toast-notification.service';

interface PermissionGroup {
  group: string;
  permissions: (PermissionInterface & { assigned: boolean })[];
}

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.scss'],
})
export class ViewRoleComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;

  role: RoleWithPermissionsInterface | null = null;
  permissionGroups: PermissionGroup[] = [];
  private allPerms: PermissionInterface[] = [];
  private destroy$ = new Subject<void>();
  private toggling = false;
  roleId: string = '';

  constructor(
    private route: ActivatedRoute,
    private roleFacade: RoleFacade,
    private actions$: Actions,
    private location: Location,
    private toastService: ToastNotificationService
  ) {
    this.loading$ = this.roleFacade.loading$;
  }

  ngOnInit() {
    this.roleId = this.route.snapshot.params['id'];
    if (this.roleId) {
      this.roleFacade.getRoleById(this.roleId);
      this.roleFacade.getPermissions();
    }

    combineLatest([
      this.roleFacade.roleById$,
      this.roleFacade.permissions$
    ]).pipe(takeUntil(this.destroy$)).subscribe(([role, perms]) => {
      if (this.toggling) return;

      this.role = role;
      this.allPerms = perms ?? [];
      this.buildPermissionGroups();
    });

    // Listen for assign/remove success via actions (not selector) to avoid timing issues
    this.actions$.pipe(
      ofType(RoleAction.assignPermissionsSuccess, RoleAction.removePermissionsSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastService.openToast('Permissions updated successfully', NotificationTypeEnums.SUCCESS);
      // Refetch role — keep toggling=true until the fresh data arrives
      this.roleFacade.getRoleById(this.roleId);
    });

    // Only unlock toggling once the fresh role data actually arrives
    this.actions$.pipe(
      ofType(RoleAction.getRoleByIdSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toggling = false;
    });

    // Unlock on failure too so the UI isn't stuck
    this.actions$.pipe(
      ofType(RoleAction.assignPermissionsFail, RoleAction.removePermissionsFail, RoleAction.getRoleByIdFail),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toggling = false;
      // Refetch to reset to server state
      this.roleFacade.getRoleById(this.roleId);
    });
  }

  buildPermissionGroups() {
    if (!this.allPerms.length) return;

    const rolePermNames = new Set(this.role?.permissions ?? []);
    const groupMap = new Map<string, (PermissionInterface & { assigned: boolean })[]>();

    this.allPerms.forEach((perm) => {
      const group = perm.controller || 'General';
      if (!groupMap.has(group)) {
        groupMap.set(group, []);
      }
      groupMap.get(group)!.push({
        ...perm,
        assigned: rolePermNames.has(perm.permission),
      });
    });

    this.permissionGroups = Array.from(groupMap.entries())
      .map(([group, permissions]) => ({ group, permissions }))
      .sort((a, b) => a.group.localeCompare(b.group));
  }

  togglePermission(permission: PermissionInterface & { assigned: boolean }) {
    if (!this.role || this.toggling) return;

    this.toggling = true;
    permission.assigned = !permission.assigned;

    if (!permission.assigned) {
      this.roleFacade.removePermissions({
        roleId: this.role.id,
        permissions: [permission.permission],
      });
    } else {
      this.roleFacade.assignPermissions({
        roleId: this.role.id,
        permissions: [permission.permission],
      });
    }
  }

  isGroupAllAssigned(group: PermissionGroup): boolean {
    return group.permissions.every(p => p.assigned);
  }

  isGroupPartiallyAssigned(group: PermissionGroup): boolean {
    const assigned = group.permissions.filter(p => p.assigned).length;
    return assigned > 0 && assigned < group.permissions.length;
  }

  toggleGroup(group: PermissionGroup) {
    if (!this.role || this.toggling) return;

    this.toggling = true;
    const allAssigned = this.isGroupAllAssigned(group);

    if (allAssigned) {
      // Remove all permissions in this group
      const permsToRemove = group.permissions.map(p => p.permission);
      group.permissions.forEach(p => p.assigned = false);
      this.roleFacade.removePermissions({
        roleId: this.role.id,
        permissions: permsToRemove,
      });
    } else {
      // Assign all unassigned permissions in this group
      const permsToAssign = group.permissions.filter(p => !p.assigned).map(p => p.permission);
      group.permissions.forEach(p => p.assigned = true);
      this.roleFacade.assignPermissions({
        roleId: this.role.id,
        permissions: permsToAssign,
      });
    }
  }

  getAssignedCount(): number {
    let count = 0;
    this.permissionGroups.forEach((g) =>
      g.permissions.forEach((p) => { if (p.assigned) count++; })
    );
    return count;
  }

  getTotalCount(): number {
    let total = 0;
    this.permissionGroups.forEach((g) => (total += g.permissions.length));
    return total;
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
