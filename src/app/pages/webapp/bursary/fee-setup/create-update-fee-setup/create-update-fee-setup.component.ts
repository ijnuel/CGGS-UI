import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FeeSetupFacade } from '../../../../../store/fee-setup/fee-setup.facade';
import { FeeTypeFacade } from '../../../../../store/fee-type/fee-type.facade';
import { ClassFacade } from '../../../../../store/class/class.facade';
import { SchoolTermSessionFacade } from '../../../../../store/school-term-session/school-term-session.facade';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { getErrorMessageHelper, getClassLabel } from '../../../../../services/helper.service';
import { FeeSetupListInterface, FeeTypeListInterface, ClassListInterface, SchoolTermSessionListInterface } from '../../../../../types';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalLoadingFacade } from '../../../../../store/global-loading/global-loading.facade';

@Component({
  selector: 'app-create-update-fee-setup',
  templateUrl: './create-update-fee-setup.component.html',
  styleUrls: ['./create-update-fee-setup.component.scss'],
})
export class CreateUpdateFeeSetupComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  feeSetupById$: Observable<FeeSetupListInterface | null>;
  feeTypeAll$: Observable<FeeTypeListInterface[] | null>;
  classList$: Observable<ClassListInterface[] | null>;
  schoolTermSessionAll$: Observable<SchoolTermSessionListInterface[] | null>;

  formGroup: FormGroup<{
    feeTypeId: FormControl;
    classId: FormControl;
    schoolTermSessionId: FormControl;
    amount: FormControl;
    inUse: FormControl;
  }>;

  get formControl() { return this.formGroup.controls; }

  readonly getClassLabel = getClassLabel;
  isEditMode = false;
  unsubscribe$ = new Subject<void>();

  constructor(
    private feeSetupFacade: FeeSetupFacade,
    private feeTypeFacade: FeeTypeFacade,
    private classFacade: ClassFacade,
    private schoolTermSessionFacade: SchoolTermSessionFacade,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private globalLoadingFacade: GlobalLoadingFacade
  ) {
    this.loading$ = this.feeSetupFacade.loading$;
    this.error$ = this.feeSetupFacade.error$;
    this.feeSetupById$ = this.feeSetupFacade.feeSetupById$;
    this.feeTypeAll$ = this.feeTypeFacade.feeTypeAll$;
    this.classList$ = this.classFacade.classAll$;
    this.schoolTermSessionAll$ = this.schoolTermSessionFacade.schoolTermSessionAll$;

    this.formGroup = this.fb.group({
      feeTypeId: ['', Validators.required],
      classId: ['', Validators.required],
      schoolTermSessionId: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      inUse: [false],
    });
  }

  ngOnInit() {
    this.feeTypeFacade.getFeeTypeAll();
    this.classFacade.getClassAll({ nestedProperties: [{ name: 'classLevel', innerNestedProperties: [{ name: 'programmeType' }] }] });
    this.schoolTermSessionFacade.getSchoolTermSessionAll({ nestedProperties: [{ name: 'session' }] });

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.feeSetupFacade.getFeeSetupById(id);
      this.feeSetupById$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
        if (data) {
          this.formGroup.patchValue({
            feeTypeId: data.feeTypeId,
            classId: data.classId,
            schoolTermSessionId: data.schoolTermSessionId,
            amount: data.amount,
            inUse: data.inUse,
          });
          // In edit mode, only amount is editable
          this.formControl.feeTypeId.disable();
          this.formControl.classId.disable();
          this.formControl.schoolTermSessionId.disable();
          this.formControl.inUse.disable();
        }
      });
    }

    this.feeSetupFacade.createSuccess$.pipe(takeUntil(this.unsubscribe$)).subscribe((success) => {
      if (success && !this.isEditMode && this.formGroup.touched) {
        this.router.navigate(['/app/bursary/fee-setup']);
        this.globalLoadingFacade.globalSuccessShow('Fee Setup created successfully', 3000);
      }
    });

    this.feeSetupFacade.updateSuccess$.pipe(takeUntil(this.unsubscribe$)).subscribe((success) => {
      if (success && this.isEditMode && this.formGroup.touched) {
        this.router.navigate(['/app/bursary/fee-setup']);
        this.globalLoadingFacade.globalSuccessShow('Fee Setup updated successfully', 3000);
      }
    });
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.formGroup.get(controlName) as FormControl;
    return getErrorMessageHelper(control);
  }

  getTermLabel(ts: SchoolTermSessionListInterface): string {
    const term = ts.termString ?? `Term ${ts.term}`;
    const session = ts.session?.name ?? '';
    return `${session} - ${term}`;
  }

  submit() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) return;

    const formData = this.formGroup.getRawValue();
    if (this.isEditMode) {
      this.feeSetupFacade.updateFeeSetup({ ...formData, id: this.route.snapshot.params['id'] } as any);
    } else {
      this.feeSetupFacade.createFeeSetup(formData as any);
    }
  }

  ngOnDestroy() { this.unsubscribe$.next(); this.unsubscribe$.complete(); }
}
