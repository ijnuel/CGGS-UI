import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { ClassSubjectFacade } from '../../../../store/class-subject/class-subject.facade';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { getErrorMessageHelper } from '../../../../services/helper.service';
import { DropdownListInterface, ClassSubjectFormInterface } from '../../../../types';
import { SharedFacade } from '../../../../store/shared/shared.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';

@Component({
    selector: 'app-create-update-class-subject',
    templateUrl: './create-update-class-subject.component.html',
    styleUrl: './create-update-class-subject.component.scss',
})
export class CreateUpdateClassSubjectComponent implements OnInit, OnDestroy {
    loading$: Observable<boolean>;
    error$: Observable<string | null>;
    classSubjectById$: Observable<ClassSubjectFormInterface | null>;
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
        private classSubjectFacade: ClassSubjectFacade,
        private fb: FormBuilder,
        private sharedFacade: SharedFacade,
        private route: ActivatedRoute,
        private router: Router,
        private globalLoadingFacade: GlobalLoadingFacade
    ) {
        this.loading$ = this.classSubjectFacade.loading$;
        this.error$ = this.classSubjectFacade.error$;
        this.classSubjectById$ = this.classSubjectFacade.classSubjectById$;
        this.dropdownLoading$ = this.sharedFacade.selectedLoading$;

        this.formGroup = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(255)]],
        });
    }

    ngOnInit() {
        const classSubjectId = this.route.snapshot.params['id'];
        if (classSubjectId) {
            this.isEditMode = true;
            this.classSubjectFacade.getClassSubjectById(classSubjectId);
            this.classSubjectById$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
                if (data) {
                    this.formGroup.patchValue({
                        name: data.name
                    });
                }
            });
        }

        this.classSubjectFacade.createSuccess$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((success) => {
                if (success && !this.isEditMode && this.formGroup.touched) {
                    this.router.navigate(['/app/class-subject']);
                    this.globalLoadingFacade.globalSuccessShow('Class Subject created successfully', 3000);
                }
            });
        this.classSubjectFacade.updateSuccess$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((success) => {
                if (success && this.isEditMode && this.formGroup.touched) {
                    this.router.navigate(['/app/class-subject']);
                    this.globalLoadingFacade.globalSuccessShow('Class Subject updated successfully', 3000);
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

        const formData = this.formGroup.value as ClassSubjectFormInterface;
        if (this.isEditMode) {
            this.classSubjectFacade.updateClassSubject({
                ...formData,
                id: this.route.snapshot.params['id']
            });
        } else {
            this.classSubjectFacade.createClassSubject(formData);
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
