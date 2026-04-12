import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { FeeFacade } from '../../../../store/fee/fee.facade';
import { ClassFacade } from '../../../../store/class/class.facade';
import { SchoolTermSessionFacade } from '../../../../store/school-term-session/school-term-session.facade';
import * as FeeAction from '../../../../store/fee/fee.actions';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassListInterface, SchoolTermSessionListInterface } from '../../../../types';
import { ToastNotificationService, NotificationTypeEnums } from '../../../../services/toast-notification.service';
import { getErrorMessageHelper, getClassLabel } from '../../../../services/helper.service';

@Component({
  selector: 'app-generate-fees',
  templateUrl: './generate-fees.component.html',
  styleUrls: ['./generate-fees.component.scss'],
})
export class GenerateFeesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  generating$: Observable<boolean>;
  classList$: Observable<ClassListInterface[] | null>;
  schoolTermSessionAll$: Observable<SchoolTermSessionListInterface[] | null>;
  readonly getClassLabel = getClassLabel;

  form: FormGroup<{ schoolTermSessionId: FormControl; classId: FormControl }>;

  constructor(
    private feeFacade: FeeFacade,
    private classFacade: ClassFacade,
    private schoolTermSessionFacade: SchoolTermSessionFacade,
    private actions$: Actions,
    private fb: FormBuilder,
    private toastService: ToastNotificationService
  ) {
    this.generating$ = this.feeFacade.generating$;
    this.classList$ = this.classFacade.classAll$;
    this.schoolTermSessionAll$ = this.schoolTermSessionFacade.schoolTermSessionAll$;

    this.form = this.fb.group({
      schoolTermSessionId: ['', Validators.required],
      classId: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.classFacade.getClassAll({ nestedProperties: [{ name: 'classLevel', innerNestedProperties: [{ name: 'programmeType' }] }] });
    this.schoolTermSessionFacade.getSchoolTermSessionAll({ nestedProperties: [{ name: 'session' }] });

    this.actions$.pipe(
      ofType(FeeAction.generateFeesByTermSessionSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastService.openToast('Fees generated successfully', NotificationTypeEnums.SUCCESS);
      this.form.reset();
    });

    this.actions$.pipe(
      ofType(FeeAction.generateFeesByTermSessionFail),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastService.openToast('Failed to generate fees', NotificationTypeEnums.ERROR);
    });
  }

  getTermLabel(ts: SchoolTermSessionListInterface): string {
    const term = ts.termString ?? `Term ${ts.term}`;
    const session = ts.session?.name ?? '';
    return `${session} - ${term}`;
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.form.get(controlName) as FormControl;
    return getErrorMessageHelper(control);
  }

  generate() {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;
    this.feeFacade.generateFeesByTermSession(this.form.value as any);
  }

  ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }
}
