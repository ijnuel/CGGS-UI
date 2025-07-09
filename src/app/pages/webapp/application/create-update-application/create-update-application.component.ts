import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { ApplicationFacade } from '../../../../store/application/application.facade';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { getErrorMessageHelper } from '../../../../services/helper.service';
import { DropdownListInterface, ApplicationFormInterface } from '../../../../types';
import { SharedFacade } from '../../../../store/shared/shared.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';

@Component({
    selector: 'app-create-update-application',
    templateUrl: './create-update-application.component.html',
    styleUrl: './create-update-application.component.scss',
})
export class CreateUpdateApplicationComponent implements OnInit, OnDestroy {
    loading$: Observable<boolean>;
    error$: Observable<string | null>;
    applicationById$: Observable<ApplicationFormInterface | null>;
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
        private applicationFacade: ApplicationFacade,
        private fb: FormBuilder,
        private sharedFacade: SharedFacade,
        private route: ActivatedRoute,
        private router: Router,
        private globalLoadingFacade: GlobalLoadingFacade
    ) {
        this.loading$ = this.applicationFacade.loading$;
        this.error$ = this.applicationFacade.error$;
        this.applicationById$ = this.applicationFacade.applicationById$;
        this.dropdownLoading$ = this.sharedFacade.selectedLoading$;

        this.formGroup = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(255)]],
        });
    }

    ngOnInit() {
        const applicationId = this.route.snapshot.params['id'];
        if (applicationId) {
            this.isEditMode = true;
            this.applicationFacade.getApplicationById(applicationId);
            this.applicationById$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
                if (data) {
                    this.formGroup.patchValue({
                        name: data.lastName
                    });
                }
            });
        }

        this.applicationFacade.createSuccess$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((success) => {
                if (success && !this.isEditMode) {
                    this.router.navigate(['/app/application']);
                    this.globalLoadingFacade.globalSuccessShow('Application created successfully', 3000);
                }
            });
        this.applicationFacade.updateSuccess$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((success) => {
                if (success && this.isEditMode) {
                    this.router.navigate(['/app/application']);
                    this.globalLoadingFacade.globalSuccessShow('Application updated successfully', 3000);
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

        const formData = this.formGroup.value as ApplicationFormInterface;
        if (this.isEditMode) {
            this.applicationFacade.updateApplication({
                ...formData,
                id: this.route.snapshot.params['id']
            });
        } else {
            this.applicationFacade.createApplication(formData);
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
