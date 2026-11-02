import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs';
import { AuthFacade } from '../../store/auth/auth.facade';
import { UserRolesEnum } from '../../types/auth';
import { ImpersonationService } from '../../services/impersonation.service';

// The API stores UTC times without a zone marker
export function asUtc(value: string): string {
  return /[zZ]|[+-]\d\d:\d\d$/.test(value) ? value : value + 'Z';
}

interface SupportSignInDialogData {
  userId: string;
  name: string;
}

@Component({
  selector: 'app-support-sign-in-dialog',
  template: `
    <h2 mat-dialog-title>Sign in as {{ data.name }}</h2>
    <mat-dialog-content>
      <p class="text-sm text-gray-600 mb-3">
        You will see the portal exactly as {{ data.name }} does, for up to 60 minutes. The session is recorded in the
        support log, and anything you change is recorded under your own name.
      </p>
      <mat-form-field class="w-full">
        <mat-label>Reason (optional)</mat-label>
        <textarea matInput [(ngModel)]="reason" rows="2" maxlength="500"
                  placeholder="e.g. Helping with a payment that is not showing"></textarea>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close()" [disabled]="starting">Cancel</button>
      <button mat-raised-button color="primary" (click)="start()" [disabled]="starting">
        {{ starting ? 'Signing in...' : 'Sign in as user' }}
      </button>
    </mat-dialog-actions>
  `,
})
export class SupportSignInDialogComponent {
  reason = '';
  starting = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SupportSignInDialogData,
    public dialogRef: MatDialogRef<SupportSignInDialogComponent>,
    private impersonationService: ImpersonationService,
  ) {}

  start(): void {
    this.starting = true;
    // On success the page reloads into the user's session
    this.impersonationService.start(this.data.userId, this.reason.trim() || null).subscribe({
      // The HTTP interceptor already shows the API's error message
      error: () => { this.starting = false; },
    });
  }
}

// "Sign in as user" support action, shown to admins and super admins only
@Component({
  selector: 'app-support-sign-in-button',
  template: `
    <button *ngIf="userId && (canImpersonate$ | async)" mat-stroked-button (click)="open()"
            style="color: var(--app-primary); border-color: var(--app-primary);">
      <mat-icon>support_agent</mat-icon>
      Sign in as user
    </button>
  `,
})
export class SupportSignInButtonComponent {
  @Input() userId: string | null | undefined;
  @Input() name = '';

  canImpersonate$ = this.authFacade.selectedCurrentUser$.pipe(
    map((user) => !user?.impersonatorName && (user?.userType === UserRolesEnum.SuperAdmin || user?.userType === UserRolesEnum.Admin)),
  );

  constructor(private authFacade: AuthFacade, private dialog: MatDialog) {}

  open(): void {
    if (!this.userId) return;
    this.dialog.open(SupportSignInDialogComponent, {
      width: '480px',
      data: { userId: this.userId, name: this.name } as SupportSignInDialogData,
    });
  }
}

// Shown across the app while an admin is signed in as another user
@Component({
  selector: 'app-impersonation-banner',
  template: `
    <div *ngIf="currentUser$ | async as user">
      <div *ngIf="user.impersonatorName"
           class="sticky top-16 z-30 bg-amber-100 border-b border-amber-300 text-amber-900 px-4 md:px-8 py-2 flex flex-wrap items-center gap-3 text-sm">
        <mat-icon class="!text-amber-700">support_agent</mat-icon>
        <span class="flex-1 min-w-[200px]">
          You are signed in as <strong>{{ user.firstName }} {{ user.lastName }}</strong> for support
          (by {{ user.impersonatorName }}<ng-container *ngIf="user.impersonationExpiresAt">, until {{ asUtc(user.impersonationExpiresAt) | date:'shortTime' }}</ng-container>).
          Changes are recorded under your name.
        </span>
        <button mat-raised-button color="primary" (click)="end()" [disabled]="ending">
          {{ ending ? 'Ending...' : 'End support session' }}
        </button>
      </div>
    </div>
  `,
})
export class ImpersonationBannerComponent {
  currentUser$ = this.authFacade.selectedCurrentUser$;
  ending = false;

  constructor(private authFacade: AuthFacade, private impersonationService: ImpersonationService) {}

  asUtc = asUtc;

  end(): void {
    this.ending = true;
    this.impersonationService.stop().subscribe({ error: () => { this.ending = false; } });
  }
}
