import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { FamilyFacade } from '../../../../store/family/family.facade';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { getErrorMessageHelper } from '../../../../services/helper.service';
import { DropdownListInterface, FamilyFormInterface } from '../../../../types';
import { SharedFacade } from '../../../../store/shared/shared.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';

@Component({
    selector: 'app-create-update-family',
    templateUrl: './create-update-family.component.html',
    styleUrl: './create-update-family.component.scss',
})
export class CreateUpdateFamilyComponent implements OnInit, OnDestroy {
    loading$: Observable<boolean>;
    error$: Observable<string | null>;
    familyById$: Observable<FamilyFormInterface | null>;
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
        private familyFacade: FamilyFacade,
        private fb: FormBuilder,
        private sharedFacade: SharedFacade,
        private route: ActivatedRoute,
        private router: Router,
        private globalLoadingFacade: GlobalLoadingFacade
    ) {
        this.loading$ = this.familyFacade.loading$;
        this.error$ = this.familyFacade.error$;
        this.familyById$ = this.familyFacade.familyById$;
        this.dropdownLoading$ = this.sharedFacade.selectedLoading$;

        this.formGroup = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(255)]],
        });
    }

    ngOnInit() {
        const familyId = this.route.snapshot.params['id'];
        if (familyId) {
            this.isEditMode = true;
            this.familyFacade.getFamilyById(familyId);
            this.familyById$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
                if (data) {
                    this.formGroup.patchValue({
                        name: data.lastName
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

        const formData = this.formGroup.value as FamilyFormInterface;
        if (this.isEditMode) {
            this.familyFacade.updateFamily({
                ...formData,
                id: this.route.snapshot.params['id']
            });
            this.globalLoadingFacade.globalSuccessShow('Family updated successfully', 3000);
        } else {
            this.familyFacade.createFamily(formData);
            this.globalLoadingFacade.globalSuccessShow('Family created successfully', 3000);
        }

        // Navigate to the list page
        this.router.navigate(['/app/family']);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
