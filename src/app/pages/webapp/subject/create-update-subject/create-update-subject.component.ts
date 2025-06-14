import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { SubjectFacade } from '../../../../store/subject/subject.facade';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { getErrorMessageHelper } from '../../../../services/helper.service';
import { DropdownListInterface, SubjectFormInterface } from '../../../../types';
import { SharedFacade } from '../../../../store/shared/shared.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';

@Component({
    selector: 'app-create-update-subject',
    templateUrl: './create-update-subject.component.html',
    styleUrl: './create-update-subject.component.scss',
})
export class CreateUpdateSubjectComponent implements OnInit, OnDestroy {
    loading$: Observable<boolean>;
    error$: Observable<string | null>;
    subjectById$: Observable<SubjectFormInterface | null>;
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
        private subjectFacade: SubjectFacade,
        private fb: FormBuilder,
        private sharedFacade: SharedFacade,
        private route: ActivatedRoute,
        private router: Router,
        private globalLoadingFacade: GlobalLoadingFacade
    ) {
        this.loading$ = this.subjectFacade.loading$;
        this.error$ = this.subjectFacade.error$;
        this.subjectById$ = this.subjectFacade.subjectById$;
        this.dropdownLoading$ = this.sharedFacade.selectedLoading$;

        this.formGroup = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(255)]],
        });
    }

    ngOnInit() {
        const subjectId = this.route.snapshot.params['id'];
        if (subjectId) {
            this.isEditMode = true;
            this.subjectFacade.getSubjectById(subjectId);
            this.subjectById$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
                if (data) {
                    this.formGroup.patchValue({
                        name: data.name
                    });
                }
            });
        }

        this.error$.pipe(takeUntil(this.unsubscribe$)).subscribe((error) => {
            if (error) {
                this.globalLoadingFacade.globalErrorShow(error, 3000);
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

        const formData = this.formGroup.value as SubjectFormInterface;
        console.log(this.isEditMode);
        if (this.isEditMode) {
            this.subjectFacade.updateSubject({
                ...formData,
                id: this.route.snapshot.params['id']
            });
            this.globalLoadingFacade.globalSuccessShow('Subject updated successfully', 3000);
        } else {
            this.subjectFacade.createSubject(formData);
            this.globalLoadingFacade.globalSuccessShow('Subject created successfully', 3000);
        }

        // Navigate to the list page
        this.router.navigate(['/app/subject']);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
