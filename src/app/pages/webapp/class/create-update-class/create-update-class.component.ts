import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { ClassFacade } from '../../../../store/class/class.facade';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { getErrorMessageHelper } from '../../../../services/helper.service';
import { DropdownListInterface, ClassFormInterface } from '../../../../types';
import { SharedFacade } from '../../../../store/shared/shared.facade';

@Component({
    selector: 'app-create-update-class',
    templateUrl: './create-update-class.component.html',
    styleUrl: './create-update-class.component.scss',
})
export class CreateUpdateClassComponent implements OnInit, OnDestroy {
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
        private classFacade: ClassFacade,
        private fb: FormBuilder,
        private sharedFacade: SharedFacade
    ) {
        this.loading$ = this.classFacade.selectedLoading$;
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

        this.classFacade.createClass({
            ...(this.formGroup.value as ClassFormInterface),
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
