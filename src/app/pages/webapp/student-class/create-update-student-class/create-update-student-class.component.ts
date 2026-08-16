import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, combineLatest } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentClassFacade } from '../../../../store/student-class/student-class.facade';
import { StudentFacade } from '../../../../store/student/student.facade';
import { ClassFacade } from '../../../../store/class/class.facade';
import { SessionFacade } from '../../../../store/session/session.facade';
import { ProgrammeTypeStreamFacade } from '../../../../store/programme-type-stream/programme-type-stream.facade';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';
import { getErrorMessageHelper, getClassLabel } from '../../../../services/helper.service';
import {
    StudentListInterface,
    ClassListInterface,
    SessionListInterface,
    ProgrammeTypeStreamListInterface,
} from '../../../../types';

@Component({
    selector: 'app-create-update-student-class',
    templateUrl: './create-update-student-class.component.html',
    styleUrl: './create-update-student-class.component.scss',
})
export class CreateUpdateStudentClassComponent implements OnInit, OnDestroy {
    isEditMode = false;
    studentClassId: string | null = null;

    allStudents: StudentListInterface[] = [];
    allClasses: ClassListInterface[] = [];
    allSessions: SessionListInterface[] = [];
    allStreams: ProgrammeTypeStreamListInterface[] = [];
    availableStreams: ProgrammeTypeStreamListInterface[] = [];

    loading$ = this.studentClassFacade.loading$;

    formGroup: FormGroup<{
        studentId: FormControl;
        classId: FormControl;
        sessionId: FormControl;
        streamId: FormControl;
    }>;

    get formControl() { return this.formGroup.controls; }

    getClassLabelFn = (c: ClassListInterface): string => getClassLabel(c) || c?.name || '';
    getStudentLabelFn = (s: StudentListInterface): string =>
        [s.firstName, s.middleName, s.lastName].filter(Boolean).join(' ') || s.studentNo || s.id;
    getSessionLabelFn = (s: SessionListInterface): string =>
        s.name ?? s.id;

    unsubscribe$ = new Subject<void>();

    constructor(
        private studentClassFacade: StudentClassFacade,
        private studentFacade: StudentFacade,
        private classFacade: ClassFacade,
        private sessionFacade: SessionFacade,
        private programmeTypeStreamFacade: ProgrammeTypeStreamFacade,
        private globalLoadingFacade: GlobalLoadingFacade,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
    ) {
        this.formGroup = this.fb.group({
            studentId: ['', Validators.required],
            classId: ['', Validators.required],
            sessionId: ['', Validators.required],
            streamId: [null as string | null],
        });
    }

    ngOnInit() {
        this.studentClassId = this.route.snapshot.paramMap.get('studentClassId');
        this.isEditMode = !!this.studentClassId;

        this.classFacade.getClassAll({ nestedProperties: [{ name: 'classLevel', innerNestedProperties: [{ name: 'programmeType' }] }] });
        this.sessionFacade.getSessionAll();
        this.programmeTypeStreamFacade.getProgrammeTypeStreamAll();

        this.classFacade.classAll$.pipe(takeUntil(this.unsubscribe$)).subscribe(classes => {
            this.allClasses = classes ?? [];
            this.updateAvailableStreams();
        });

        this.sessionFacade.sessionAll$.pipe(takeUntil(this.unsubscribe$)).subscribe(sessions => {
            this.allSessions = sessions ?? [];
        });

        this.programmeTypeStreamFacade.programmeTypeStreamAll$.pipe(takeUntil(this.unsubscribe$)).subscribe(streams => {
            this.allStreams = streams ?? [];
            this.updateAvailableStreams();
        });

        this.formControl.classId.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
            this.formControl.streamId.setValue(null);
            this.updateAvailableStreams();
        });

        this.formControl.sessionId.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(sessionId => {
            if (!this.isEditMode && sessionId) {
                this.studentFacade.getStudentsWithoutClass(sessionId);
            }
        });

        if (this.isEditMode) {
            this.studentFacade.studentAll$.pipe(takeUntil(this.unsubscribe$)).subscribe(students => {
                this.allStudents = students ?? [];
            });
            this.studentFacade.getStudentAll();

            this.studentClassFacade.getStudentClassById(this.studentClassId!);
            combineLatest([
                this.studentClassFacade.studentClassById$.pipe(filter(d => !!d)),
                this.classFacade.classAll$.pipe(filter(c => !!c && c!.length > 0)),
                this.programmeTypeStreamFacade.programmeTypeStreamAll$.pipe(filter(s => !!s)),
            ]).pipe(take(1), takeUntil(this.unsubscribe$)).subscribe(([data]) => {
                this.formGroup.patchValue({
                    studentId: data!.studentId,
                    classId: data!.classId,
                    sessionId: data!.sessionId,
                    streamId: data!.streamId ?? null,
                });
                this.updateAvailableStreams();
                this.formControl.studentId.disable();
                this.formControl.sessionId.disable();
            });
        } else {
            this.studentFacade.studentsWithoutClass$.pipe(takeUntil(this.unsubscribe$)).subscribe(students => {
                this.allStudents = students ?? [];
            });

            this.sessionFacade.sessionAll$.pipe(takeUntil(this.unsubscribe$)).subscribe(sessions => {
                if (!sessions || this.formControl.sessionId.value) return;
                const current = sessions.find(s => s.isCurrent);
                if (current) {
                    this.formControl.sessionId.setValue(current.id);
                }
            });
        }

        this.studentClassFacade.createSuccess$.pipe(takeUntil(this.unsubscribe$)).subscribe(success => {
            if (success && !this.isEditMode && this.formGroup.touched) {
                this.globalLoadingFacade.globalSuccessShow('Student class created successfully', 3000);
                this.router.navigate(['..'], { relativeTo: this.route });
            }
        });

        this.studentClassFacade.updateSuccess$.pipe(takeUntil(this.unsubscribe$)).subscribe(success => {
            if (success && this.isEditMode && this.formGroup.touched) {
                this.globalLoadingFacade.globalSuccessShow('Student class updated successfully', 3000);
                this.router.navigate(['..'], { relativeTo: this.route });
            }
        });
    }

    private updateAvailableStreams(): void {
        const classId = this.formControl.classId.value;
        if (!classId) {
            this.availableStreams = [];
            this.formControl.streamId.clearValidators();
            this.formControl.streamId.updateValueAndValidity();
            return;
        }
        const selectedClass = this.allClasses.find(c => c.id === classId);
        const programTypeId = selectedClass?.classLevel?.programmeTypeId;
        this.availableStreams = programTypeId
            ? this.allStreams.filter(s => s.programTypeId === programTypeId)
            : [];

        if (this.availableStreams.length > 0) {
            this.formControl.streamId.setValidators(Validators.required);
        } else {
            this.formControl.streamId.clearValidators();
        }
        this.formControl.streamId.updateValueAndValidity();
    }

    getErrorMessage(controlName: string): string | null {
        const control = this.formGroup.get(controlName) as FormControl;
        return getErrorMessageHelper(control);
    }

    submit() {
        this.formGroup.markAllAsTouched();
        if (!this.formGroup.valid) return;

        const raw = this.formGroup.getRawValue();
        if (this.isEditMode) {
            this.studentClassFacade.updateStudentClass({ ...raw, id: this.studentClassId! });
        } else {
            this.studentClassFacade.createStudentClass(raw);
        }
    }

    cancel() {
        this.router.navigate(['..'], { relativeTo: this.route });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
