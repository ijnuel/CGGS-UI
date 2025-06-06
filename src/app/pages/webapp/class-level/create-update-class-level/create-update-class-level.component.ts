import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { ClassLevelFacade } from '../../../../store/class-level/class-level.facade';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { getErrorMessageHelper } from '../../../../services/helper.service';
import { DropdownListInterface, ClassLevelFormInterface } from '../../../../types';
import { SharedFacade } from '../../../../store/shared/shared.facade';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';

@Component({
    selector: 'app-create-update-class-level',
    templateUrl: './create-update-class-level.component.html',
    styleUrl: './create-update-class-level.component.scss',
})
export class CreateUpdateClassLevelComponent implements OnInit, OnDestroy {
    loading$: Observable<boolean>;
    dropdownLoading$: Observable<boolean>;

    formGroup: FormGroup<{
        name: FormControl;
    }>;

    get formControl() {
        return this.formGroup.controls;
    }
    today = new Date();

    unsubscribe$ = new Subject<void>();

    constructor(
        private classLevelFacade: ClassLevelFacade,
        private fb: FormBuilder,
        private sharedFacade: SharedFacade,
        private globalLoadingFacade: GlobalLoadingFacade
    ) {
        this.loading$ = this.classLevelFacade.selectedLoading$;
        this.dropdownLoading$ = this.sharedFacade.selectedLoading$;

        this.formGroup = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(255)]],
        });
    }

    ngOnInit() {
    }

    getErrorMessage(controlName: string): string | null {
        const control = this.formGroup.get(controlName) as FormControl;
        return getErrorMessageHelper(control);
    }

    submit() {
        this.formGroup.markAllAsTouched();

        if (!this.formGroup.valid) return;

        this.classLevelFacade.createClassLevel({
            ...(this.formGroup.value as ClassLevelFormInterface),
        }).subscribe(() => {
            this.globalLoadingFacade.globalSuccessShow('Class level created successfully', 3000);
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
