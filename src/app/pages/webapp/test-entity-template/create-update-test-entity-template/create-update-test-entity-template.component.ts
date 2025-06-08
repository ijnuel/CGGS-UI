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
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';

@Component({
    selector: 'app-create-update-test-entity-template',
    templateUrl: './create-update-test-entity-template.component.html',
    styleUrl: './create-update-test-entity-template.component.scss',
})
export class CreateUpdateTestEntityTemplateComponent implements OnInit, OnDestroy {
    loading$: Observable<boolean>;
    error$: Observable<string | null>;
    testEntityTemplateById$: Observable<TestEntityTemplateFormInterface | null>;
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
        private testEntityTemplateFacade: TestEntityTemplateFacade,
        private fb: FormBuilder,
        private sharedFacade: SharedFacade,
        private route: ActivatedRoute,
        private router: Router,
        private globalLoadingFacade: GlobalLoadingFacade
    ) {
        this.loading$ = this.testEntityTemplateFacade.loading$;
        this.error$ = this.testEntityTemplateFacade.error$;
        this.testEntityTemplateById$ = this.testEntityTemplateFacade.testEntityTemplateById$;
        this.dropdownLoading$ = this.sharedFacade.selectedLoading$;

        this.formGroup = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(255)]],
        });
    }

    ngOnInit() {
        const testEntityTemplateId = this.route.snapshot.params['id'];
        if (testEntityTemplateId) {
            this.isEditMode = true;
            this.testEntityTemplateFacade.getTestEntityTemplateById(testEntityTemplateId);
            this.testEntityTemplateById$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
                if (data) {
                    this.formGroup.patchValue({
                        name: data.name
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

        const formData = this.formGroup.value as TestEntityTemplateFormInterface;
        console.log(this.isEditMode);
        if (this.isEditMode) {
            this.testEntityTemplateFacade.updateTestEntityTemplate({
                ...formData,
                id: this.route.snapshot.params['id']
            });
            this.globalLoadingFacade.globalSuccessShow('Test Entity Template updated successfully', 3000);
        } else {
            this.testEntityTemplateFacade.createTestEntityTemplate(formData);
            this.globalLoadingFacade.globalSuccessShow('Test Entity Template created successfully', 3000);
        }

        // Navigate to the list page
        this.router.navigate(['/app/test-entity-template']);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
