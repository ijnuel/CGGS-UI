import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { ParentFacade } from '../../../../store/parent/parent.facade';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { getErrorMessageHelper } from '../../../../services/helper.service';
import { DropdownListInterface, ParentFormInterface } from '../../../../types';
import { SharedFacade } from '../../../../store/shared/shared.facade';

@Component({
    selector: 'app-create-update-parent',
    templateUrl: './create-update-parent.component.html',
    styleUrl: './create-update-parent.component.scss',
})
export class CreateUpdateParentComponent implements OnInit, OnDestroy {
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
        private parentFacade: ParentFacade,
        private fb: FormBuilder,
        private sharedFacade: SharedFacade
    ) {
        this.loading$ = this.parentFacade.selectedLoading$;
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

        this.parentFacade.createParent({
            ...(this.formGroup.value as ParentFormInterface),
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
