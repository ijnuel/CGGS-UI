import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { ClassSubjectAssessmentFacade } from '../../../../store/class-subject-assessment/class-subject-assessment.facade';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { getErrorMessageHelper } from '../../../../services/helper.service';
import { DropdownListInterface, ClassSubjectAssessmentFormInterface } from '../../../../types';
import { SharedFacade } from '../../../../store/shared/shared.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';

@Component({
    selector: 'app-create-update-class-subject-assessment',
    templateUrl: './create-update-class-subject-assessment.component.html',
    styleUrl: './create-update-class-subject-assessment.component.scss',
})
export class CreateUpdateClassSubjectAssessmentComponent implements OnInit, OnDestroy {
    loading$: Observable<boolean>;
    error$: Observable<string | null>;
    classSubjectAssessmentById$: Observable<ClassSubjectAssessmentFormInterface | null>;
    dropdownLoading$: Observable<boolean>;

    formGroup: FormGroup<{
        name: FormControl;
    }>;

    get formControl() {
        return this.formGroup.controls;
    }
    today = new Date();
    isEditMode = false;
    unsubscribe$ = new Subject<void>();

    constructor(
        private classSubjectAssessmentFacade: ClassSubjectAssessmentFacade,
        private fb: FormBuilder,
        private sharedFacade: SharedFacade,
        private route: ActivatedRoute,
        private router: Router,
        private globalLoadingFacade: GlobalLoadingFacade
    ) {
        this.loading$ = this.classSubjectAssessmentFacade.loading$;
        this.error$ = this.classSubjectAssessmentFacade.error$;
        this.classSubjectAssessmentById$ = this.classSubjectAssessmentFacade.classSubjectAssessmentById$;
        this.dropdownLoading$ = this.sharedFacade.selectedLoading$;

        this.formGroup = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(255)]],
        });
    }

    ngOnInit() {
        const classSubjectAssessmentId = this.route.snapshot.params['id'];
        if (classSubjectAssessmentId) {
            this.isEditMode = true;
            this.classSubjectAssessmentFacade.getClassSubjectAssessmentById(classSubjectAssessmentId);
            this.classSubjectAssessmentById$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
                if (data) {
                    this.formGroup.patchValue({
                        name: data.name
                    });
                }
            });
        }

        this.classSubjectAssessmentFacade.createSuccess$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((success) => {
                if (success && !this.isEditMode) {
                    this.router.navigate(['/app/class-subject-assessment']);
                    this.globalLoadingFacade.globalSuccessShow('Class Subject Assessment created successfully', 3000);
                }
            });
        this.classSubjectAssessmentFacade.updateSuccess$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((success) => {
                if (success && this.isEditMode) {
                    this.router.navigate(['/app/class-subject-assessment']);
                    this.globalLoadingFacade.globalSuccessShow('Class Subject Assessment updated successfully', 3000);
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

        const formData = this.formGroup.value as ClassSubjectAssessmentFormInterface;
        if (this.isEditMode) {
            this.classSubjectAssessmentFacade.updateClassSubjectAssessment({
                ...formData,
                id: this.route.snapshot.params['id']
            });
        } else {
            this.classSubjectAssessmentFacade.createClassSubjectAssessment(formData);
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
