import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleFacade } from '../../store/role/role.facade';
import { RoleWithPermissionsInterface } from '../../types';
import { Subject, combineLatest, takeUntil } from 'rxjs';

export interface RoleDialogData {
  title: string;
  userName: string;
  userId: string;
  mode: 'assign' | 'remove';
}

@Component({
  selector: 'app-role-dialog',
  template: `
    <h2 mat-dialog-title class="!text-lg !font-bold" style="color: var(--app-primary);">
      {{ data.title }}
    </h2>
    <mat-dialog-content>
      <p class="text-sm text-gray-500 mb-4">
        {{ data.mode === 'assign' ? 'Select a role to assign to' : 'Select a role to remove from' }}
        <strong>{{ data.userName }}</strong>
      </p>

      <div *ngIf="loading" class="flex justify-center py-4">
        <mat-spinner diameter="30"></mat-spinner>
      </div>

      <div *ngIf="!loading && roles.length === 0" class="text-center py-4 text-gray-400">
        <mat-icon class="!text-3xl">info</mat-icon>
        <p class="text-sm mt-1">{{ data.mode === 'remove' ? 'No roles assigned to this user' : 'No roles available' }}</p>
      </div>

      <div *ngIf="!loading" class="flex flex-col gap-2 max-h-64 overflow-y-auto">
        <div *ngFor="let role of roles"
          class="flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-150"
          [ngClass]="selectedRoleId === role.id
            ? (data.mode === 'remove' ? 'border-red-400 bg-red-50' : 'border-green-400 bg-green-50')
            : 'border-gray-200 bg-white hover:bg-gray-50'"
          (click)="selectedRoleId = role.id">
          <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            [ngClass]="selectedRoleId === role.id
              ? (data.mode === 'remove' ? 'bg-red-100' : 'bg-green-100')
              : 'bg-gray-100'">
            <mat-icon class="!text-base"
              [ngClass]="selectedRoleId === role.id
                ? (data.mode === 'remove' ? 'text-red-600' : 'text-green-600')
                : 'text-gray-400'">
              {{ selectedRoleId === role.id ? 'check_circle' : 'shield' }}
            </mat-icon>
          </div>
          <div>
            <p class="text-sm font-medium" [ngClass]="selectedRoleId === role.id
              ? (data.mode === 'remove' ? 'text-red-800' : 'text-green-800')
              : 'text-gray-700'">
              {{ role.name }}
            </p>
            <p class="text-xs text-gray-400">{{ role.permissions?.length || 0 }} permissions</p>
          </div>
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end" class="!pt-4">
      <button mat-button mat-dialog-close class="!text-gray-500">Cancel</button>
      <button mat-raised-button
        [disabled]="!selectedRoleId"
        (click)="onConfirm()"
        [style.background-color]="data.mode === 'assign' ? 'var(--app-primary)' : '#ef4444'"
        style="color: white;">
        {{ data.mode === 'assign' ? 'Assign Role' : 'Remove Role' }}
      </button>
    </mat-dialog-actions>
  `,
})
export class RoleDialogComponent implements OnInit, OnDestroy {
  roles: RoleWithPermissionsInterface[] = [];
  selectedRoleId: string | null = null;
  loading = true;
  private destroy$ = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<RoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoleDialogData,
    private roleFacade: RoleFacade
  ) {}

  ngOnInit() {
    this.roleFacade.getRoleAll();

    if (this.data.mode === 'remove') {
      this.roleFacade.getUserRoles(this.data.userId);
      combineLatest([this.roleFacade.roleAll$, this.roleFacade.userRoles$])
        .pipe(takeUntil(this.destroy$))
        .subscribe(([allRoles, userRoles]) => {
          if (allRoles && userRoles) {
            const userRoleSet = new Set(userRoles);
            this.roles = allRoles.filter(r => userRoleSet.has(r.name));
            this.loading = false;
          }
        });
    } else {
      this.roleFacade.roleAll$.pipe(takeUntil(this.destroy$)).subscribe((roles) => {
        if (roles) {
          this.roles = roles;
          this.loading = false;
        }
      });
    }
  }

  onConfirm() {
    if (this.selectedRoleId) {
      this.dialogRef.close({
        userId: this.data.userId,
        roleId: this.selectedRoleId,
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
