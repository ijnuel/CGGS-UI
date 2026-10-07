import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthFacade } from '../../../store/auth/auth.facade';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup<{ email: FormControl }>;
  sent = false;

  get formControl() {
    return this.formGroup.controls;
  }

  private unsubscribe$ = new Subject<void>();

  constructor(private fb: FormBuilder, private authFacade: AuthFacade) {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.authFacade.forgotPasswordSuccessAction()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.sent = true;
      });
  }

  onSubmit() {
    if (this.formGroup.invalid) return;
    this.authFacade.forgotPassword(this.formControl.email.value);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
