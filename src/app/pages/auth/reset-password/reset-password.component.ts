import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthFacade } from '../../../store/auth/auth.facade';
import { ResetPasswordDto } from '../../../types/auth';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup<{
    newPassword: FormControl;
    confirmNewPassword: FormControl;
  }>;
  showPassword = false;
  private email = '';
  private token = '';
  private unsubscribe$ = new Subject<void>();

  get formControl() {
    return this.formGroup.controls;
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authFacade: AuthFacade
  ) {
    this.formGroup = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.email = this.route.snapshot.queryParamMap.get('email') ?? '';
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';

    this.authFacade.resetPasswordSuccessAction()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.router.navigateByUrl('/auth/login');
      });
  }

  onSubmit() {
    if (this.formGroup.invalid) return;
    if (this.formControl.newPassword.value !== this.formControl.confirmNewPassword.value) {
      this.formControl.confirmNewPassword.setErrors({ mismatch: true });
      return;
    }

    const payload: ResetPasswordDto = {
      email: this.email,
      token: this.token,
      newPassword: this.formControl.newPassword.value,
      confirmNewPassword: this.formControl.confirmNewPassword.value,
    };
    this.authFacade.resetPassword(payload);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
