import { Component, Inject, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericResponseInterface } from '../../types';
import { environment } from '../../../environments/environment';

export interface ResetPasswordDialogData {
  userId: string;
  name: string;
  email?: string | null;
}

interface ResetPasswordResult {
  userName: string;
  email: string;
  password: string;
  emailSent: boolean;
  emailError: string | null;
}

// Super admin password reset. The new password exists only in this dialog: the API does not
// store it, and it is cleared when the dialog closes.
@Component({
  selector: 'app-reset-password-dialog',
  template: `
    <h2 mat-dialog-title>Reset password</h2>

    <mat-dialog-content>
      <!-- Confirm -->
      <ng-container *ngIf="!result">
        <p class="text-sm text-gray-600 mb-4">
          Set a new temporary password for <strong>{{ data.name }}</strong>. Their current password stops working
          immediately, and they will have to choose a new password the next time they sign in.
        </p>
        <mat-checkbox [(ngModel)]="sendEmail" [disabled]="!data.email || resetting">
          Email the new password to {{ data.email || 'the user' }}
        </mat-checkbox>
        <p *ngIf="!data.email" class="text-xs text-gray-500 mt-1 ml-8">This account has no email address.</p>
      </ng-container>

      <!-- Result: shown once -->
      <ng-container *ngIf="result">
        <div class="rounded-lg border border-amber-200 bg-amber-50 p-3 mb-4 flex gap-2 text-sm text-amber-900">
          <mat-icon class="!text-amber-600 flex-shrink-0">visibility</mat-icon>
          <span>This password is shown only once. Copy it now: it cannot be viewed again after you close this window.</span>
        </div>

        <div class="mb-3">
          <p class="text-xs text-gray-500 uppercase tracking-wide">Username</p>
          <div class="flex items-center justify-between gap-2 rounded-lg border border-gray-200 px-3 py-2">
            <span class="font-medium">{{ result.userName }}</span>
            <button mat-button (click)="copy(result.userName, 'username')">
              <mat-icon>{{ copied === 'username' ? 'check' : 'content_copy' }}</mat-icon>
              {{ copied === 'username' ? 'Copied' : 'Copy' }}
            </button>
          </div>
          <p *ngIf="result.email && result.email !== result.userName" class="text-xs text-gray-500 mt-1">
            They can also sign in with {{ result.email }}
          </p>
        </div>

        <div class="mb-3">
          <p class="text-xs text-gray-500 uppercase tracking-wide">New password</p>
          <div class="flex items-center justify-between gap-2 rounded-lg border border-gray-200 px-3 py-2">
            <span class="font-mono text-lg tracking-wider select-all">{{ result.password }}</span>
            <button mat-button (click)="copy(result.password, 'password')">
              <mat-icon>{{ copied === 'password' ? 'check' : 'content_copy' }}</mat-icon>
              {{ copied === 'password' ? 'Copied' : 'Copy' }}
            </button>
          </div>
        </div>

        <p *ngIf="result.emailSent" class="text-sm text-gray-600 flex items-center gap-1">
          <mat-icon class="!text-base !w-4 !h-4">mark_email_read</mat-icon> Emailed to {{ result.email }}
        </p>
        <p *ngIf="result.emailError" class="text-sm text-red-600 flex items-center gap-1">
          <mat-icon class="!text-base !w-4 !h-4">error_outline</mat-icon> {{ result.emailError }}
        </p>
      </ng-container>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <ng-container *ngIf="!result">
        <button mat-button (click)="close()" [disabled]="resetting">Cancel</button>
        <button mat-raised-button color="warn" (click)="reset()" [disabled]="resetting">
          {{ resetting ? 'Resetting...' : 'Reset password' }}
        </button>
      </ng-container>
      <button *ngIf="result" mat-raised-button color="primary" (click)="close()">Done</button>
    </mat-dialog-actions>
  `,
})
export class ResetPasswordDialogComponent implements OnDestroy {
  sendEmail: boolean;
  resetting = false;
  result: ResetPasswordResult | null = null;
  copied: 'username' | 'password' | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ResetPasswordDialogData,
    private dialogRef: MatDialogRef<ResetPasswordDialogComponent>,
    private http: HttpClient,
  ) {
    this.sendEmail = !!data.email;
  }

  reset(): void {
    this.resetting = true;
    this.http
      .post<GenericResponseInterface<ResetPasswordResult>>(
        `${environment.baseUrl}/Account/AdminResetPassword`,
        { userId: this.data.userId, sendEmail: this.sendEmail && !!this.data.email },
        { withCredentials: true },
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => { this.resetting = false; this.result = response.entity; },
        // The HTTP interceptor already shows the API's error message
        error: () => { this.resetting = false; },
      });
  }

  copy(text: string, which: 'username' | 'password'): void {
    navigator.clipboard?.writeText(text).then(() => {
      this.copied = which;
      setTimeout(() => { if (this.copied === which) this.copied = null; }, 2000);
    });
  }

  close(): void {
    this.result = null;
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.result = null;
    this.destroy$.next();
    this.destroy$.complete();
  }
}
