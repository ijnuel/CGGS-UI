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
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';

@Component({
    selector: 'app-create-update-class-level',
    templateUrl: './create-update-class-level.component.html',
    styleUrl: './create-update-class-level.component.scss',
})
export class CreateUpdateClassLevelComponent implements OnInit, OnDestroy {
    loading$: Observable<boolean>;
    error$: Observable<string | null>;
    classLevelById$: Observable<ClassLevelFormInterface | null>;
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
        private classLevelFacade: ClassLevelFacade,
        private fb: FormBuilder,
        private sharedFacade: SharedFacade,
        private route: ActivatedRoute,
        private router: Router,
        private globalLoadingFacade: GlobalLoadingFacade
    ) {
        this.loading$ = this.classLevelFacade.loading$;
        this.error$ = this.classLevelFacade.error$;
        this.classLevelById$ = this.classLevelFacade.classLevelById$;
        this.dropdownLoading$ = this.sharedFacade.selectedLoading$;

        this.formGroup = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(255)]],
        });
    }

    ngOnInit() {
        const classLevelId = this.route.snapshot.params['id'];
        if (classLevelId) {
            this.isEditMode = true;
            this.classLevelFacade.getClassLevelById(classLevelId);
            this.classLevelById$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
                if (data) {
                    this.formGroup.patchValue({
                        name: data.name
                    });
                }
            });
        }

        this.classLevelFacade.createSuccess$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((success) => {
                if (success && !this.isEditMode && this.formGroup.touched) {
                    this.router.navigate(['/app/class-level']);
                    this.globalLoadingFacade.globalSuccessShow('Class Level created successfully', 3000);
                }
            });
        this.classLevelFacade.updateSuccess$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((success) => {
                if (success && this.isEditMode && this.formGroup.touched) {
                    this.router.navigate(['/app/class-level']);
                    this.globalLoadingFacade.globalSuccessShow('Class Level updated successfully', 3000);
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

        const formData = this.formGroup.value as ClassLevelFormInterface;
        if (this.isEditMode) {
            this.classLevelFacade.updateClassLevel({
                ...formData,
                id: this.route.snapshot.params['id']
            });
        } else {
            this.classLevelFacade.createClassLevel(formData);
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
