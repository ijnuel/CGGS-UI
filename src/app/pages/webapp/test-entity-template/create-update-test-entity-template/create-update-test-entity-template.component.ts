import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { TestEntityTemplateFacade } from '../../../../store/test-entity-template/test-entity-template.facade';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { getErrorMessageHelper } from '../../../../services/helper.service';
import { DropdownListInterface, TestEntityTemplateFormInterface } from '../../../../types';
import { SharedFacade } from '../../../../store/shared/shared.facade';

@Component({
    selector: 'app-create-update-test-entity-template',
    templateUrl: './create-update-test-entity-template.component.html',
    styleUrl: './create-update-test-entity-template.component.scss',
})
export class CreateUpdateTestEntityTemplateComponent implements OnInit, OnDestroy {
    loading$: Observable<boolean>;
    dropdownLoading$: Observable<boolean>;

    formGroup: FormGroup<{
        id: FormControl;
        name: FormControl;
    }>;

    get formControl() {
        return this.formGroup.controls;
    }
    today = new Date();

    unsubscribe$ = new Subject<void>();

    constructor(
        private testEntityTemplateFacade: TestEntityTemplateFacade,
        private fb: FormBuilder,
        private sharedFacade: SharedFacade
    ) {
        this.loading$ = this.testEntityTemplateFacade.selectedLoading$;
        this.dropdownLoading$ = this.sharedFacade.selectedLoading$;

        this.formGroup = this.fb.group({
            id: ['', [Validators.required, Validators.maxLength(255)]],
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

        this.testEntityTemplateFacade.createTestEntityTemplate({
            ...(this.formGroup.value as TestEntityTemplateFormInterface),
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
