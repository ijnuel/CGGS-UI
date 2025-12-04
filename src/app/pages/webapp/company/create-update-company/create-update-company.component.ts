import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { CompanyFacade } from '../../../../store/company/company.facade';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { getErrorMessageHelper } from '../../../../services/helper.service';
import { DropdownListInterface, CompanyFormInterface } from '../../../../types';
import { SharedFacade } from '../../../../store/shared/shared.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';

@Component({
    selector: 'app-create-update-company',
    templateUrl: './create-update-company.component.html',
    styleUrl: './create-update-company.component.scss',
})
export class CreateUpdateCompanyComponent implements OnInit, OnDestroy {
    loading$: Observable<boolean>;
    error$: Observable<string | null>;
    companyById$: Observable<CompanyFormInterface | null>;
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
        private companyFacade: CompanyFacade,
        private fb: FormBuilder,
        private sharedFacade: SharedFacade,
        private route: ActivatedRoute,
        private router: Router,
        private globalLoadingFacade: GlobalLoadingFacade
    ) {
        this.loading$ = this.companyFacade.loading$;
        this.error$ = this.companyFacade.error$;
        this.companyById$ = this.companyFacade.companyById$;
        this.dropdownLoading$ = this.sharedFacade.selectedLoading$;

        this.formGroup = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(255)]],
        });
    }

    ngOnInit() {
        const companyId = this.route.snapshot.params['id'];
        if (companyId) {
            this.isEditMode = true;
            this.companyFacade.getCompanyById(companyId);
            this.companyById$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
                if (data) {
                    this.formGroup.patchValue({
                        name: data.name
                    });
                }
            });
        }

        this.companyFacade.createSuccess$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((success) => {
                if (success && !this.isEditMode && this.formGroup.touched) {
                    this.router.navigate(['/app/company']);
                    this.globalLoadingFacade.globalSuccessShow('Company created successfully', 3000);
                }
            });
        this.companyFacade.updateSuccess$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((success) => {
                if (success && this.isEditMode && this.formGroup.touched) {
                    this.router.navigate(['/app/company']);
                    this.globalLoadingFacade.globalSuccessShow('Company updated successfully', 3000);
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

        const formData = this.formGroup.value as CompanyFormInterface;
        if (this.isEditMode) {
            this.companyFacade.updateCompany({
                ...formData,
                id: this.route.snapshot.params['id']
            });
        } else {
            this.companyFacade.createCompany(formData);
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
