import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { AdministratorFacade } from '../../../../store/administrator/administrator.facade';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { getErrorMessageHelper, initUserProfileForm } from '../../../../services/helper.service';
import { DropdownListInterface, AdministratorFormInterface } from '../../../../types';
import { SharedFacade } from '../../../../store/shared/shared.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';

@Component({
    selector: 'app-create-update-administrator',
    templateUrl: './create-update-administrator.component.html',
    styleUrl: './create-update-administrator.component.scss',
})
export class CreateUpdateAdministratorComponent implements OnInit, OnDestroy {
    loading$: Observable<boolean>;
    error$: Observable<string | null>;
    administratorById$: Observable<AdministratorFormInterface | null>;
    dropdownLoading$: Observable<boolean>;

    formGroup: FormGroup<{
        firstName: FormControl;
        lastName: FormControl;
        middleName: FormControl;
        dateOfBirth: FormControl;
        religion: FormControl;
        gender: FormControl;
        originLGAId: FormControl;
        stateOfOriginId: FormControl;
        nationalityId: FormControl;
        homeAddress: FormControl;
        residentialCity: FormControl;
        residentialStateId: FormControl;
        phoneNumber: FormControl;
        administratorNo: FormControl;
        email: FormControl;
    }>;

    get formControl() {
        return this.formGroup.controls;
    }
    today = new Date();
    isEditMode = false;
    unsubscribe$ = new Subject<void>();

    genderList$: Observable<DropdownListInterface[] | null>;
    religionList$: Observable<DropdownListInterface[] | null>;
    countryList$: Observable<DropdownListInterface[] | null>;

    selectedCountryStateList$ = new BehaviorSubject<
        DropdownListInterface[] | null
    >(null);
    selectedStateLgaList$ = new BehaviorSubject<DropdownListInterface[] | null>(
        null
    );


    constructor(
        private administratorFacade: AdministratorFacade,
        private fb: FormBuilder,
        private sharedFacade: SharedFacade,
        private route: ActivatedRoute,
        private router: Router,
        private globalLoadingFacade: GlobalLoadingFacade
    ) {
        this.loading$ = this.administratorFacade.loading$;
        this.error$ = this.administratorFacade.error$;
        this.administratorById$ = this.administratorFacade.administratorById$;
        this.dropdownLoading$ = this.sharedFacade.selectedLoading$;
        this.genderList$ = this.sharedFacade.selectGenderList$;
        this.religionList$ = this.sharedFacade.selectReligionList$;
        this.countryList$ = this.sharedFacade.selectCountryList$;

        this.formGroup = this.fb.group({
            firstName: ['', [Validators.required, Validators.maxLength(255)]],
            lastName: ['', [Validators.required, Validators.maxLength(255)]],
            middleName: ['', [Validators.maxLength(255)]],
            dateOfBirth: null,
            phoneNumber: null,
            email: null,
            religion: ['', [Validators.required]],
            gender: ['', [Validators.required]],
            nationalityId: null,
            stateOfOriginId: null,
            originLGAId: null,
            homeAddress: null,
            residentialStateId: null,
            residentialCity: null,
            administratorNo: null,
        });
    }

    ngOnInit() {
        initUserProfileForm(this.sharedFacade, this.formControl, this.unsubscribe$, this.selectedCountryStateList$, this.selectedStateLgaList$);
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.administratorFacade.getAdministratorById(id);
            this.administratorFacade.administratorById$.pipe(takeUntil(this.unsubscribe$)).subscribe(administrator => {
                if (administrator) {
                    this.formGroup.patchValue(administrator);
                }
            });
        }

        this.administratorFacade.createSuccess$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((success) => {
                if (success && !this.isEditMode) {
                    this.router.navigate(['/app/administrator']);
                    this.globalLoadingFacade.globalSuccessShow('Administrator created successfully', 3000);
                }
            });
        this.administratorFacade.updateSuccess$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((success) => {
                if (success && this.isEditMode) {
                    this.router.navigate(['/app/administrator']);
                    this.globalLoadingFacade.globalSuccessShow('Administrator updated successfully', 3000);
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

        const formData = this.formGroup.value as AdministratorFormInterface;
        if (this.isEditMode) {
            this.administratorFacade.updateAdministrator({
                ...formData,
                id: this.route.snapshot.params['id']
            });
        } else {
            this.administratorFacade.createAdministrator(formData);
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
