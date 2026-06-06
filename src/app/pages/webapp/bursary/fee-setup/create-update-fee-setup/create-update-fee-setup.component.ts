import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { catchError, filter, take, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FeeSetupFacade } from '../../../../../store/fee-setup/fee-setup.facade';
import { FeeTypeFacade } from '../../../../../store/fee-type/fee-type.facade';
import { ClassFacade } from '../../../../../store/class/class.facade';
import { SchoolTermSessionFacade } from '../../../../../store/school-term-session/school-term-session.facade';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { getErrorMessageHelper, getClassLabel } from '../../../../../services/helper.service';
import {
  FeeSetupListInterface,
  FeeTypeListInterface,
  ClassListInterface,
  SchoolTermSessionListInterface,
} from '../../../../../types';
import { GlobalLoadingFacade } from '../../../../../store/global-loading/global-loading.facade';
import { environment } from '../../../../../../environments/environment';

export interface FeeSetupDialogData {
  id?: string;
}

@Component({
  selector: 'app-create-update-fee-setup',
  templateUrl: './create-update-fee-setup.component.html',
  styleUrls: ['./create-update-fee-setup.component.scss'],
})
export class CreateUpdateFeeSetupComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  feeSetupById$: Observable<FeeSetupListInterface | null>;

  allClasses: ClassListInterface[] = [];
  allTermSessions: SchoolTermSessionListInterface[] = [];

  filteredFeeTypes: FeeTypeListInterface[] = [];
  feeTypesLoading = false;

  formGroup: FormGroup<{
    feeTypeId: FormControl;
    classId: FormControl;
    schoolTermSessionId: FormControl;
    amount: FormControl;
    inUse: FormControl;
  }>;

  get formControl() { return this.formGroup.controls; }

  getTermLabel = (ts: SchoolTermSessionListInterface): string => {
    const term = ts.termString ?? `Term ${ts.term}`;
    const session = ts.session?.name ?? '';
    return `${session} - ${term}`;
  };

  getClassLabelFn = (c: ClassListInterface): string => getClassLabel(c) || c?.name || '';

  isEditMode = false;
  unsubscribe$ = new Subject<void>();

  amountReadOnly = false;

  private allFeeTypes: FeeTypeListInterface[] = [];
  private existingFeeTypeIds = new Set<string>();

  constructor(
    private feeSetupFacade: FeeSetupFacade,
    private feeTypeFacade: FeeTypeFacade,
    private classFacade: ClassFacade,
    private schoolTermSessionFacade: SchoolTermSessionFacade,
    private http: HttpClient,
    private fb: FormBuilder,
    private globalLoadingFacade: GlobalLoadingFacade,
    public dialogRef: MatDialogRef<CreateUpdateFeeSetupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FeeSetupDialogData,
  ) {
    this.loading$ = this.feeSetupFacade.loading$;
    this.feeSetupById$ = this.feeSetupFacade.feeSetupById$;

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

    this.classFacade.classAll$.pipe(takeUntil(this.unsubscribe$)).subscribe(classes => {
      this.allClasses = classes ?? [];
    });

    this.schoolTermSessionFacade.schoolTermSessionAll$.pipe(takeUntil(this.unsubscribe$)).subscribe(sessions => {
      this.allTermSessions = sessions ?? [];
    });

    this.feeTypeFacade.feeTypeAll$.pipe(takeUntil(this.unsubscribe$)).subscribe(types => {
      this.allFeeTypes = types ?? [];
      this.recomputeFilteredTypes();
    });

    if (this.data?.id) {
      this.isEditMode = true;
      this.feeSetupFacade.getFeeSetupById(this.data.id);
      combineLatest([
        this.feeSetupById$.pipe(filter(d => !!d)),
        this.schoolTermSessionFacade.schoolTermSessionAll$.pipe(filter(s => !!s && s!.length > 0)),
      ]).pipe(take(1), takeUntil(this.unsubscribe$)).subscribe(([data, sessions]) => {
        this.formGroup.patchValue({
          feeTypeId: data!.feeTypeId,
          classId: data!.classId,
          schoolTermSessionId: data!.schoolTermSessionId,
          amount: data!.amount,
          inUse: data!.inUse,
        });
        this.formControl.feeTypeId.disable();
        this.formControl.classId.disable();
        this.formControl.schoolTermSessionId.disable();
        this.formControl.inUse.disable();

        if (data!.inUse) {
          const ts = sessions!.find(s => s.id === data!.schoolTermSessionId);
          if (!ts?.isCurrent) {
            this.formControl.amount.disable();
            this.amountReadOnly = true;
          }
        }
      });
    } else {
      this.formControl.feeTypeId.disable();

      this.schoolTermSessionFacade.schoolTermSessionAll$.pipe(takeUntil(this.unsubscribe$)).subscribe(sessions => {
        if (!sessions || this.formControl.schoolTermSessionId.value) return;
        const current = sessions.find(s => s.isCurrent);
        if (current) this.formControl.schoolTermSessionId.setValue(current.id);
      });

      this.formControl.schoolTermSessionId.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
        this.formControl.feeTypeId.setValue('');
        this.refreshExistingSetups();
      });

      this.formControl.classId.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
        this.formControl.feeTypeId.setValue('');
        this.refreshExistingSetups();
      });
    }

    this.feeSetupFacade.createSuccess$.pipe(takeUntil(this.unsubscribe$)).subscribe((success) => {
      if (success && !this.isEditMode && this.formGroup.touched) {
        this.globalLoadingFacade.globalSuccessShow('Fee Setup created successfully', 3000);
        this.dialogRef.close({ success: true });
      }
    });

    this.feeSetupFacade.updateSuccess$.pipe(takeUntil(this.unsubscribe$)).subscribe((success) => {
      if (success && this.isEditMode && this.formGroup.touched) {
        this.globalLoadingFacade.globalSuccessShow('Fee Setup updated successfully', 3000);
        this.dialogRef.close({ success: true });
      }
    });
  }

  private refreshExistingSetups() {
    const termId = this.formControl.schoolTermSessionId.value;
    const classId = this.formControl.classId.value;

    if (!termId || !classId) {
      this.existingFeeTypeIds = new Set();
      this.recomputeFilteredTypes();
      this.formControl.feeTypeId.disable();
      return;
    }

    this.feeTypesLoading = true;
    this.formControl.feeTypeId.disable();

    this.http.post<any>(
      `${environment.baseUrl}/FeeSetup/GetAll`,
      { queryProperties: [
        { name: 'classId', value: classId },
        { name: 'schoolTermSessionId', value: termId },
      ]},
      { withCredentials: true }
    ).pipe(
      catchError(() => of({ entity: [] }))
    ).subscribe(response => {
      const existing: FeeSetupListInterface[] = response?.entity ?? [];
      this.existingFeeTypeIds = new Set(existing.map((s: FeeSetupListInterface) => s.feeTypeId));
      this.recomputeFilteredTypes();
      this.feeTypesLoading = false;
      if (this.filteredFeeTypes.length > 0) this.formControl.feeTypeId.enable();
    });
  }

  private recomputeFilteredTypes() {
    this.filteredFeeTypes = this.allFeeTypes.filter(ft => !this.existingFeeTypeIds.has(ft.id));
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.formGroup.get(controlName) as FormControl;
    return getErrorMessageHelper(control);
  }

  submit() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) return;
    if (!this.isEditMode && !this.formGroup.getRawValue().feeTypeId) return;

    const formData = this.formGroup.getRawValue();
    if (this.isEditMode) {
      this.feeSetupFacade.updateFeeSetup({ ...formData, id: this.data.id } as any);
    } else {
      this.feeSetupFacade.createFeeSetup(formData as any);
    }
  }

  ngOnDestroy() { this.unsubscribe$.next(); this.unsubscribe$.complete(); }
}
