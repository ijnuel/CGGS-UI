import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FeeTypeFacade } from '../../../../../store/fee-type/fee-type.facade';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { getErrorMessageHelper } from '../../../../../services/helper.service';
import { FeeTypeListInterface } from '../../../../../types';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalLoadingFacade } from '../../../../../store/global-loading/global-loading.facade';

@Component({
  selector: 'app-create-update-fee-type',
  templateUrl: './create-update-fee-type.component.html',
  styleUrls: ['./create-update-fee-type.component.scss'],
})
export class CreateUpdateFeeTypeComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  feeTypeById$: Observable<FeeTypeListInterface | null>;

  formGroup: FormGroup<{
    name: FormControl;
    description: FormControl;
    createdByDefault: FormControl;
    compulsory: FormControl;
  }>;

  get formControl() { return this.formGroup.controls; }

  isEditMode = false;
  unsubscribe$ = new Subject<void>();

  constructor(
    private feeTypeFacade: FeeTypeFacade,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private globalLoadingFacade: GlobalLoadingFacade
  ) {
    this.loading$ = this.feeTypeFacade.loading$;
    this.error$ = this.feeTypeFacade.error$;
    this.feeTypeById$ = this.feeTypeFacade.feeTypeById$;

    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      description: [''],
      createdByDefault: [false],
      compulsory: [false],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.feeTypeFacade.getFeeTypeById(id);
      this.feeTypeById$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
        if (data) {
          this.formGroup.patchValue({
            name: data.name,
            description: data.description ?? '',
            createdByDefault: data.createdByDefault,
            compulsory: data.compulsory,
          });
        }
      });
    }

    this.feeTypeFacade.createSuccess$.pipe(takeUntil(this.unsubscribe$)).subscribe((success) => {
      if (success && !this.isEditMode && this.formGroup.touched) {
        this.router.navigate(['/app/bursary/fee-type']);
        this.globalLoadingFacade.globalSuccessShow('Fee Type created successfully', 3000);
      }
    });

    this.feeTypeFacade.updateSuccess$.pipe(takeUntil(this.unsubscribe$)).subscribe((success) => {
      if (success && this.isEditMode && this.formGroup.touched) {
        this.router.navigate(['/app/bursary/fee-type']);
        this.globalLoadingFacade.globalSuccessShow('Fee Type updated successfully', 3000);
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
      this.feeTypeFacade.updateFeeType({ ...formData, id: this.route.snapshot.params['id'] } as any);
    } else {
      this.feeTypeFacade.createFeeType(formData as any);
    }
  }

  ngOnDestroy() { this.unsubscribe$.next(); this.unsubscribe$.complete(); }
}
