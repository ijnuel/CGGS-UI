import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { SchoolConfigurationFacade } from '../../../../store/school-configuration/school-configuration.facade';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { getErrorMessageHelper } from '../../../../services/helper.service';
import { DropdownListInterface, SchoolConfigurationFormInterface } from '../../../../types';
import { SharedFacade } from '../../../../store/shared/shared.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';

@Component({
    selector: 'app-create-update-school-configuration',
    templateUrl: './create-update-school-configuration.component.html',
    styleUrl: './create-update-school-configuration.component.scss',
})
export class CreateUpdateSchoolConfigurationComponent implements OnInit, OnDestroy {
    loading$: Observable<boolean>;
    error$: Observable<string | null>;
    schoolConfigurationById$: Observable<SchoolConfigurationFormInterface | null>;
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
        private schoolConfigurationFacade: SchoolConfigurationFacade,
        private fb: FormBuilder,
        private sharedFacade: SharedFacade,
        private route: ActivatedRoute,
        private router: Router,
        private globalLoadingFacade: GlobalLoadingFacade
    ) {
        this.loading$ = this.schoolConfigurationFacade.loading$;
        this.error$ = this.schoolConfigurationFacade.error$;
        this.schoolConfigurationById$ = this.schoolConfigurationFacade.schoolConfigurationById$;
        this.dropdownLoading$ = this.sharedFacade.selectedLoading$;

        this.formGroup = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(255)]],
        });
    }

    ngOnInit() {
        const schoolConfigurationId = this.route.snapshot.params['id'];
        if (schoolConfigurationId) {
            this.isEditMode = true;
            this.schoolConfigurationFacade.getSchoolConfigurationById(schoolConfigurationId);
            this.schoolConfigurationById$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
                if (data) {
                    this.formGroup.patchValue({
                        name: data.name
                    });
                }
            });
        }

        this.schoolConfigurationFacade.createSuccess$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((success) => {
                if (success && !this.isEditMode) {
                    this.router.navigate(['/app/school-configuration']);
                    this.globalLoadingFacade.globalSuccessShow('School Configuration created successfully', 3000);
                }
            });
        this.schoolConfigurationFacade.updateSuccess$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((success) => {
                if (success && this.isEditMode) {
                    this.router.navigate(['/app/school-configuration']);
                    this.globalLoadingFacade.globalSuccessShow('School Configuration updated successfully', 3000);
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

        const formData = this.formGroup.value as SchoolConfigurationFormInterface;
        if (this.isEditMode) {
            this.schoolConfigurationFacade.updateSchoolConfiguration({
                ...formData,
                id: this.route.snapshot.params['id']
            });
        } else {
            this.schoolConfigurationFacade.createSchoolConfiguration(formData);
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
