import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { ApplicationFacade } from '../../../../store/application/application.facade';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { getErrorMessageHelper } from '../../../../services/helper.service';
import { DropdownListInterface, ApplicationFormInterface } from '../../../../types';
import { SharedFacade } from '../../../../store/shared/shared.facade';

@Component({
    selector: 'app-create-update-application',
    templateUrl: './create-update-application.component.html',
    styleUrl: './create-update-application.component.scss',
})
export class CreateUpdateApplicationComponent implements OnInit, OnDestroy {
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
        private applicationFacade: ApplicationFacade,
        private fb: FormBuilder,
        private sharedFacade: SharedFacade
    ) {
        this.loading$ = this.applicationFacade.selectedLoading$;
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

        this.applicationFacade.createApplication({
            ...(this.formGroup.value as ApplicationFormInterface),
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
