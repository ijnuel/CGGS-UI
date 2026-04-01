import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { RoleFacade } from '../../../../store/role/role.facade';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { getErrorMessageHelper } from '../../../../services/helper.service';
import { RoleWithPermissionsInterface } from '../../../../types';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';

@Component({
  selector: 'app-create-update-role',
  templateUrl: './create-update-role.component.html',
  styleUrl: './create-update-role.component.scss',
})
export class CreateUpdateRoleComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  roleById$: Observable<RoleWithPermissionsInterface | null>;

  formGroup: FormGroup<{
    name: FormControl;
  }>;

  get formControl() {
    return this.formGroup.controls;
  }

  isEditMode = false;
  unsubscribe$ = new Subject<void>();

  constructor(
    private roleFacade: RoleFacade,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private globalLoadingFacade: GlobalLoadingFacade
  ) {
    this.loading$ = this.roleFacade.loading$;
    this.error$ = this.roleFacade.error$;
    this.roleById$ = this.roleFacade.roleById$;

    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  ngOnInit() {
    const roleId = this.route.snapshot.params['id'];
    if (roleId) {
      this.isEditMode = true;
      this.roleFacade.getRoleById(roleId);
      this.roleById$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
        if (data) {
          this.formGroup.patchValue({
            name: data.name,
          });
        }
      });
    }

    this.roleFacade.createSuccess$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((success) => {
        if (success && !this.isEditMode && this.formGroup.touched) {
          this.router.navigate(['/app/role']);
          this.globalLoadingFacade.globalSuccessShow('Role created successfully', 3000);
        }
      });

    this.roleFacade.updateSuccess$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((success) => {
        if (success && this.isEditMode && this.formGroup.touched) {
          this.router.navigate(['/app/role']);
          this.globalLoadingFacade.globalSuccessShow('Role updated successfully', 3000);
        }
      });
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.formGroup.get(controlName) as FormControl;
    return getErrorMessageHelper(control);
  }

  submit() {
    this.formGroup.markAllAsTouched();

    if (!this.formGroup.valid) return;

    const formData = this.formGroup.value;
    if (this.isEditMode) {
      this.roleFacade.updateRole({
        ...formData,
        id: this.route.snapshot.params['id'],
      } as any);
    } else {
      this.roleFacade.createRole(formData as any);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
