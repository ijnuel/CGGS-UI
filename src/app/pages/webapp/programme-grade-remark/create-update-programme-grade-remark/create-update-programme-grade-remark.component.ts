import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { ProgrammeGradeRemarkFacade } from '../../../../store/programme-grade-remark/programme-grade-remark.facade';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { getErrorMessageHelper } from '../../../../services/helper.service';
import { DropdownListInterface, ProgrammeGradeRemarkFormInterface } from '../../../../types';
import { SharedFacade } from '../../../../store/shared/shared.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';

@Component({
    selector: 'app-create-update-programme-grade-remark',
    templateUrl: './create-update-programme-grade-remark.component.html',
    styleUrl: './create-update-programme-grade-remark.component.scss',
})
export class CreateUpdateProgrammeGradeRemarkComponent implements OnInit, OnDestroy {
    loading$: Observable<boolean>;
    error$: Observable<string | null>;
    programmeGradeRemarkById$: Observable<ProgrammeGradeRemarkFormInterface | null>;
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
        private programmeGradeRemarkFacade: ProgrammeGradeRemarkFacade,
        private fb: FormBuilder,
        private sharedFacade: SharedFacade,
        private route: ActivatedRoute,
        private router: Router,
        private globalLoadingFacade: GlobalLoadingFacade
    ) {
        this.loading$ = this.programmeGradeRemarkFacade.loading$;
        this.error$ = this.programmeGradeRemarkFacade.error$;
        this.programmeGradeRemarkById$ = this.programmeGradeRemarkFacade.programmeGradeRemarkById$;
        this.dropdownLoading$ = this.sharedFacade.selectedLoading$;

        this.formGroup = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(255)]],
        });
    }

    ngOnInit() {
        const programmeGradeRemarkId = this.route.snapshot.params['id'];
        if (programmeGradeRemarkId) {
            this.isEditMode = true;
            this.programmeGradeRemarkFacade.getProgrammeGradeRemarkById(programmeGradeRemarkId);
            this.programmeGradeRemarkById$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
                if (data) {
                    this.formGroup.patchValue({
                        name: data.name
                    });
                }
            });
        }

        this.programmeGradeRemarkFacade.createSuccess$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((success) => {
                if (success && !this.isEditMode) {
                    this.router.navigate(['/app/programme-grade-remark']);
                    this.globalLoadingFacade.globalSuccessShow('Programme Grade Remark created successfully', 3000);
                }
            });
        this.programmeGradeRemarkFacade.updateSuccess$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((success) => {
                if (success && this.isEditMode) {
                    this.router.navigate(['/app/programme-grade-remark']);
                    this.globalLoadingFacade.globalSuccessShow('Programme Grade Remark updated successfully', 3000);
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

        const formData = this.formGroup.value as ProgrammeGradeRemarkFormInterface;
        if (this.isEditMode) {
            this.programmeGradeRemarkFacade.updateProgrammeGradeRemark({
                ...formData,
                id: this.route.snapshot.params['id']
            });
        } else {
            this.programmeGradeRemarkFacade.createProgrammeGradeRemark(formData);
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
