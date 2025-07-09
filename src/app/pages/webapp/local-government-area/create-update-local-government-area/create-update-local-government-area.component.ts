import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { LocalGovernmentAreaFacade } from '../../../../store/local-government-area/local-government-area.facade';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { getErrorMessageHelper } from '../../../../services/helper.service';
import { DropdownListInterface, LocalGovernmentAreaFormInterface } from '../../../../types';
import { SharedFacade } from '../../../../store/shared/shared.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';

@Component({
    selector: 'app-create-update-local-government-area',
    templateUrl: './create-update-local-government-area.component.html',
    styleUrl: './create-update-local-government-area.component.scss',
})
export class CreateUpdateLocalGovernmentAreaComponent implements OnInit, OnDestroy {
    loading$: Observable<boolean>;
    error$: Observable<string | null>;
    localGovernmentAreaById$: Observable<LocalGovernmentAreaFormInterface | null>;
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
        private localGovernmentAreaFacade: LocalGovernmentAreaFacade,
        private fb: FormBuilder,
        private sharedFacade: SharedFacade,
        private route: ActivatedRoute,
        private router: Router,
        private globalLoadingFacade: GlobalLoadingFacade
    ) {
        this.loading$ = this.localGovernmentAreaFacade.loading$;
        this.error$ = this.localGovernmentAreaFacade.error$;
        this.localGovernmentAreaById$ = this.localGovernmentAreaFacade.localGovernmentAreaById$;
        this.dropdownLoading$ = this.sharedFacade.selectedLoading$;

        this.formGroup = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(255)]],
        });
    }

    ngOnInit() {
        const localGovernmentAreaId = this.route.snapshot.params['id'];
        if (localGovernmentAreaId) {
            this.isEditMode = true;
            this.localGovernmentAreaFacade.getLocalGovernmentAreaById(localGovernmentAreaId);
            this.localGovernmentAreaById$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
                if (data) {
                    this.formGroup.patchValue({
                        name: data.name
                    });
                }
            });
        }

        this.localGovernmentAreaFacade.createSuccess$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((success) => {
                if (success && !this.isEditMode) {
                    this.router.navigate(['/app/local-government-area']);
                    this.globalLoadingFacade.globalSuccessShow('Local Government Area created successfully', 3000);
                }
            });
        this.localGovernmentAreaFacade.updateSuccess$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((success) => {
                if (success && this.isEditMode) {
                    this.router.navigate(['/app/local-government-area']);
                    this.globalLoadingFacade.globalSuccessShow('Local Government Area updated successfully', 3000);
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

        const formData = this.formGroup.value as LocalGovernmentAreaFormInterface;
        if (this.isEditMode) {
            this.localGovernmentAreaFacade.updateLocalGovernmentArea({
                ...formData,
                id: this.route.snapshot.params['id']
            });
        } else {
            this.localGovernmentAreaFacade.createLocalGovernmentArea(formData);
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
