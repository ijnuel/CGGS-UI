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
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  env = environment;
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
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.authFacade.selectedCurrentUserId$.subscribe((id) => {
    });
  }

  ngOnInit() {
    this.authFacade
      .getCurrentUserSuccessAction()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.router.navigateByUrl('app/home');
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
