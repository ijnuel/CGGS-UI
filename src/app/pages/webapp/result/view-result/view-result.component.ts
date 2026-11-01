import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { async, combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { ResultFacade } from '../../../../store/result/result.facade';
import { SchoolTermSessionFacade } from '../../../../store/school-term-session/school-term-session.facade';
import { ClassFacade } from '../../../../store/class/class.facade';
import {
  ClassListInterface,
  SchoolTermSessionListInterface,
} from '../../../../types';
import {
  ToastNotificationService,
  NotificationTypeEnums,
} from '../../../../services/toast-notification.service';
import { getClassLabel } from '../../../../services/helper.service';
import { StaffAssignmentService } from '../../../../services/staff-assignment.service';

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.scss'],
})
export class ViewResultComponent implements OnInit, OnDestroy {
  viewResultForm: FormGroup<{
    schoolTermSessionId: FormControl<string | null>;
    classId: FormControl<string | null>;
    hideOverallPosition: FormControl<boolean | null>;
  }>;

  schoolTermSessions$: Observable<SchoolTermSessionListInterface[] | null>;
  classes$: Observable<ClassListInterface[] | null>;
  generatingClassResult$ = this.resultFacade.generatingClassResult$;
  generatingBroadSheet$ = this.resultFacade.generatingBroadSheet$;

  private destroy$ = new Subject<void>();
  private hasAutoSelectedSchoolTermSession = false;

  constructor(
    private fb: FormBuilder,
    private resultFacade: ResultFacade,
    private schoolTermSessionFacade: SchoolTermSessionFacade,
    private classFacade: ClassFacade,
    private toastService: ToastNotificationService,
    private staffAssignmentService: StaffAssignmentService
  ) {
    this.viewResultForm = this.fb.group({
      schoolTermSessionId: ['', Validators.required],
      classId: ['', Validators.required],
      hideOverallPosition: [false, Validators.required],
    });

    this.schoolTermSessions$ = this.schoolTermSessionFacade.schoolTermSessionAll$;
    // Staff can only view results for classes they are class teacher for
    this.classes$ = combineLatest([this.classFacade.classAll$, this.staffAssignmentService.myScope$()]).pipe(
      map(([classes, scope]) => {
        if (!classes || !scope) return classes;
        const formClassIds = new Set(scope.formClasses.map(c => c.classId));
        return classes.filter(c => formClassIds.has(c.id));
      })
    );
  }

  getClassName(item: ClassListInterface): string {
    return getClassLabel(item) || item?.name || '';
  }

  ngOnInit(): void {
    this.schoolTermSessionFacade.getSchoolTermSessionAll({
      nestedProperties: [{ name: 'session' }],
    });
    this.classFacade.getClassAll({
      nestedProperties: [
        { name: 'classLevel', innerNestedProperties: [{ name: 'programmeType' }] },
      ],
    });

    this.schoolTermSessions$
      .pipe(takeUntil(this.destroy$))
      .subscribe((sessions) => {
        if (this.hasAutoSelectedSchoolTermSession || !sessions || sessions.length === 0) {
          return;
        }
        const defaultSession = sessions.find((session) => session.isCurrent) ?? sessions[0];
        if (defaultSession && !this.formControl.schoolTermSessionId.value) {
          this.formControl.schoolTermSessionId.setValue(defaultSession.id);
          this.hasAutoSelectedSchoolTermSession = true;
        }
      });

    this.resultFacade.generatedClassResult$
      .pipe(
        filter((blob): blob is Blob => !!blob),
        takeUntil(this.destroy$)
      )
      .subscribe((blob) => {
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
        this.toastService.openToast('Result generated successfully', NotificationTypeEnums.SUCCESS);
        this.resultFacade.clearGeneratedClassResult();

        setTimeout(() => URL.revokeObjectURL(fileURL), 5000);
      });
    this.resultFacade.generatedBroadSheet$
      .pipe(
        filter((blob): blob is Blob => !!blob),
        takeUntil(this.destroy$)
      )
      .subscribe((blob) => {
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
        this.toastService.openToast('Broad sheet generated successfully', NotificationTypeEnums.SUCCESS);
        this.resultFacade.clearGeneratedBroadSheet();
      setTimeout(() => URL.revokeObjectURL(fileURL), 5000);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get formControl() {
    return this.viewResultForm.controls;
  }

  async generateResult(): Promise<void> {
    if (this.viewResultForm.invalid) {
      this.viewResultForm.markAllAsTouched();
      return;
    }
    const { schoolTermSessionId, classId, hideOverallPosition } = this.viewResultForm.value;
    if (schoolTermSessionId && classId) {
      this.resultFacade.generateClassResult(schoolTermSessionId, classId, hideOverallPosition ?? false);
      this.resultFacade.clearGeneratedBroadSheet();
    }
  }
  async generateBroadSheet(): Promise<void> {
    if (this.viewResultForm.invalid) {
      this.viewResultForm.markAllAsTouched();
      return;
    }
    const { schoolTermSessionId, classId } = this.viewResultForm.value;
    if (schoolTermSessionId && classId) {
      this.resultFacade.generateBroadSheet(schoolTermSessionId, classId);
      this.resultFacade.clearGeneratedClassResult();
    }
  }
}

