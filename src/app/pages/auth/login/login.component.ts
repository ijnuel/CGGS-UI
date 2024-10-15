import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { AuthFacade } from '../../../store/auth/auth.facade';
import { LoginPayloadInterface } from '../../../types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formGroup!: FormGroup<{
    email: FormControl;
    password: FormControl;
  }>;
  get formControl() {
    return this.formGroup.controls;
  }

  unsubscribe$ = new Subject<void>();
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authFacade: AuthFacade
  ) {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.authFacade
      .loginSuccessAction()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.router.navigateByUrl('app');
      });
  }

  onSubmit() {
    if (!this.formGroup.valid) return;

    this.authFacade.login(this.formGroup.value as LoginPayloadInterface);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
