import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { PrincipalRemarkFacade } from '../../../../store/principal-remark/principal-remark.facade';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { getErrorMessageHelper } from '../../../../services/helper.service';
import { DropdownListInterface, PrincipalRemarkFormInterface, PrincipalRemarkListInterface } from '../../../../types';
import { SharedFacade } from '../../../../store/shared/shared.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';

@Component({
    selector: 'app-create-update-principal-remark',
    templateUrl: './create-update-principal-remark.component.html',
    styleUrl: './create-update-principal-remark.component.scss',
})
export class CreateUpdatePrincipalRemarkComponent implements OnInit, OnDestroy {
    loading$: Observable<boolean>;
    error$: Observable<string | null>;
    principalRemarkById$: Observable<PrincipalRemarkListInterface | null>;
    dropdownLoading$: Observable<boolean>;

    formGroup: FormGroup<{
        remark: FormControl;
        minimumScore: FormControl;
        maximumScore: FormControl;
        programTypeId: FormControl;
    }>;

    get formControl() {
        return this.formGroup.controls;
    }
    today = new Date();
    isEditMode = false;
    unsubscribe$ = new Subject<void>();

    constructor(
        private principalRemarkFacade: PrincipalRemarkFacade,
        private fb: FormBuilder,
        private sharedFacade: SharedFacade,
        private route: ActivatedRoute,
        private router: Router,
        private globalLoadingFacade: GlobalLoadingFacade
    ) {
        this.loading$ = this.principalRemarkFacade.loading$;
        this.error$ = this.principalRemarkFacade.error$;
        this.principalRemarkById$ = this.principalRemarkFacade.principalRemarkById$;
        this.dropdownLoading$ = this.sharedFacade.selectedLoading$;

        this.formGroup = this.fb.group({
            remark: ['', [Validators.required, Validators.maxLength(255)]],
            minimumScore: [null, [Validators.required, Validators.min(0)]],
            maximumScore: [null, [Validators.required, Validators.min(0)]],
            programTypeId: ['', [Validators.required]],
        });
    }

    ngOnInit() {
        const principalRemarkId = this.route.snapshot.params['id'];
        if (principalRemarkId) {
            this.isEditMode = true;
            this.principalRemarkFacade.getPrincipalRemarkById(principalRemarkId);
            this.principalRemarkById$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
                if (data) {
                    this.formGroup.patchValue({
                        remark: data.remark,
                        minimumScore: data.minimumScore,
                        maximumScore: data.maximumScore,
                        programTypeId: data.programTypeId,
                    });
                }
            });
        }

        this.principalRemarkFacade.createSuccess$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((success) => {
                if (success && !this.isEditMode) {
                    this.router.navigate(['/app/principal-remark']);
                    this.globalLoadingFacade.globalSuccessShow('Principal Remark created successfully', 3000);
                }
            });
        this.principalRemarkFacade.updateSuccess$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((success) => {
                if (success && this.isEditMode) {
                    this.router.navigate(['/app/principal-remark']);
                    this.globalLoadingFacade.globalSuccessShow('Principal Remark updated successfully', 3000);
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

        const formData = this.formGroup.value as PrincipalRemarkFormInterface;
        if (this.isEditMode) {
            this.principalRemarkFacade.updatePrincipalRemark({
                ...formData,
                id: this.route.snapshot.params['id']
            });
        } else {
            this.principalRemarkFacade.createPrincipalRemark(formData);
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
