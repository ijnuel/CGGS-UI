import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { AuthFacade } from '../../store/auth/auth.facade';
import { UserRolesEnum } from '../../types/auth';
import { ResetPasswordDialogComponent, ResetPasswordDialogData } from '../reset-password-dialog/reset-password-dialog.component';

// "Reset password" action for a user's account, shown to super admins only
@Component({
  selector: 'app-reset-password-button',
  template: `
    <button *ngIf="userId && (isSuperAdmin$ | async)" mat-stroked-button (click)="open()"
            style="color: var(--app-primary); border-color: var(--app-primary);">
      <mat-icon>lock_reset</mat-icon>
      Reset password
    </button>
  `,
})
export class ResetPasswordButtonComponent {
  @Input() userId: string | null | undefined;
  @Input() name = '';
  @Input() email: string | null | undefined;

  isSuperAdmin$ = this.authFacade.selectedCurrentUser$.pipe(map((user) => user?.userType === UserRolesEnum.SuperAdmin));

  constructor(private authFacade: AuthFacade, private dialog: MatDialog) {}

  open(): void {
    if (!this.userId) return;
    this.dialog.open(ResetPasswordDialogComponent, {
      width: '480px',
      disableClose: true,
      data: { userId: this.userId, name: this.name, email: this.email } as ResetPasswordDialogData,
    });
  }
}
