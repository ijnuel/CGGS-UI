import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { ProgramTypeFacade } from '../../../../store/program-type/program-type.facade';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { getErrorMessageHelper } from '../../../../services/helper.service';
import { DropdownListInterface, ProgramTypeFormInterface, ProgramTypeListInterface } from '../../../../types';
import { SharedFacade } from '../../../../store/shared/shared.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';

@Component({
    selector: 'app-create-update-program-type',
    templateUrl: './create-update-program-type.component.html',
    styleUrl: './create-update-program-type.component.scss',
})
export class CreateUpdateProgramTypeComponent implements OnInit, OnDestroy {
    loading$: Observable<boolean>;
    error$: Observable<string | null>;
    programTypeById$: Observable<ProgramTypeListInterface | null>;
    dropdownLoading$: Observable<boolean>;

    formGroup: FormGroup<{
        name: FormControl;
        level: FormControl;
    }>;

    get formControl() {
        return this.formGroup.controls;
    }
    today = new Date();
    isEditMode = false;
    unsubscribe$ = new Subject<void>();

    constructor(
        private programTypeFacade: ProgramTypeFacade,
        private fb: FormBuilder,
        private sharedFacade: SharedFacade,
        private route: ActivatedRoute,
        private router: Router,
        private globalLoadingFacade: GlobalLoadingFacade
    ) {
        this.loading$ = this.programTypeFacade.loading$;
        this.error$ = this.programTypeFacade.error$;
        this.programTypeById$ = this.programTypeFacade.programTypeById$;
        this.dropdownLoading$ = this.sharedFacade.selectedLoading$;

        this.formGroup = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(255)]],
            level: [null, [Validators.required, Validators.min(1)]],
        });
    }

    ngOnInit() {
        const programTypeId = this.route.snapshot.params['id'];
        if (programTypeId) {
            this.isEditMode = true;
            this.programTypeFacade.getProgramTypeById(programTypeId);
            this.programTypeById$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
                if (data) {
                    this.formGroup.patchValue({
                        name: data.name,
                        level: data.level,
                    });
                }
            });
        }

        this.programTypeFacade.createSuccess$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((success) => {
                if (success && !this.isEditMode && this.formGroup.touched) {
                    this.router.navigate(['/app/program-type']);
                    this.globalLoadingFacade.globalSuccessShow('Program Type created successfully', 3000);
                }
            });
        this.programTypeFacade.updateSuccess$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((success) => {
                if (success && this.isEditMode && this.formGroup.touched) {
                    this.router.navigate(['/app/program-type']);
                    this.globalLoadingFacade.globalSuccessShow('Program Type updated successfully', 3000);
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

        const formData = this.formGroup.value as ProgramTypeFormInterface;
        if (this.isEditMode) {
            this.programTypeFacade.updateProgramType({
                ...formData,
                id: this.route.snapshot.params['id']
            });
        } else {
            this.programTypeFacade.createProgramType(formData);
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
