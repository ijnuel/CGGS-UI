import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { TeacherFacade } from '../../../../store/teacher/teacher.facade';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { getErrorMessageHelper } from '../../../../services/helper.service';
import { DropdownListInterface, TeacherFormInterface } from '../../../../types';
import { SharedFacade } from '../../../../store/shared/shared.facade';

@Component({
    selector: 'app-create-update-teacher',
    templateUrl: './create-update-teacher.component.html',
    styleUrl: './create-update-teacher.component.scss',
})
export class CreateUpdateTeacherComponent implements OnInit, OnDestroy {
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
        private teacherFacade: TeacherFacade,
        private fb: FormBuilder,
        private sharedFacade: SharedFacade
    ) {
        this.loading$ = this.teacherFacade.selectedLoading$;
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

        this.teacherFacade.createTeacher({
            ...(this.formGroup.value as TeacherFormInterface),
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
