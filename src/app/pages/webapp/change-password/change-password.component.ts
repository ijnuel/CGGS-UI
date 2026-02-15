import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { AuthFacade } from '../../../store/auth/auth.facade';
import { ChangePasswordDto } from '../../../types/auth';
import { ActionsSubject } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import * as AuthActions from '../../../store/auth/auth.actions';
import { getErrorMessageHelper } from '../../../services/helper.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup<{
    oldPassword: FormControl;
    newPassword: FormControl;
    confirmNewPassword: FormControl;
  }>;
  get formControl() {
    return this.formGroup.controls;
  }

  unsubscribe$ = new Subject<void>();
  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authFacade: AuthFacade,
    private actionsSubject: ActionsSubject
  ) {
    this.formGroup = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required]],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit() {
    this.authFacade
      .changePasswordSuccessAction()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['app/home']);
      });

    // Handle error case - reset loading state
    this.actionsSubject
      .pipe(
        ofType(AuthActions.changePasswordFail),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.isLoading = false;
      });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmNewPassword')?.value;
    
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      formGroup.get('confirmNewPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.formGroup.get(controlName) as FormControl;
    if (control?.hasError('passwordMismatch')) {
      return 'Passwords do not match';
    }
    return getErrorMessageHelper(control);
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const payload: ChangePasswordDto = {
      oldPassword: this.formControl.oldPassword.value,
      newPassword: this.formControl.newPassword.value,
      confirmNewPassword: this.formControl.confirmNewPassword.value,
    };

    this.authFacade.changePassword(payload);
  }

  onCancel() {
    this.router.navigate(['app/home']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
