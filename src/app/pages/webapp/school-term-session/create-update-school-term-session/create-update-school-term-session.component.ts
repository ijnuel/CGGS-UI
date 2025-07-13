import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { SchoolTermSessionFacade } from '../../../../store/school-term-session/school-term-session.facade';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { getErrorMessageHelper } from '../../../../services/helper.service';
import { DropdownListInterface, SchoolTermSessionFormInterface, SessionListInterface } from '../../../../types';
import { SharedFacade } from '../../../../store/shared/shared.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';
import { SessionFacade } from '../../../../store/session/session.facade';

@Component({
    selector: 'app-create-update-school-term-session',
    templateUrl: './create-update-school-term-session.component.html',
    styleUrl: './create-update-school-term-session.component.scss',
})
export class CreateUpdateSchoolTermSessionComponent implements OnInit, OnDestroy {
    loading$: Observable<boolean>;
    error$: Observable<string | null>;
    schoolTermSessionById$: Observable<SchoolTermSessionFormInterface | null>;
    dropdownLoading$: Observable<boolean>;
    termList$: Observable<DropdownListInterface[] | null>;
    sessionList$: Observable<SessionListInterface[] | null>;

    formGroup: FormGroup<{
        sessionId: FormControl;
        term: FormControl;
        termStartDate: FormControl;
        termEndDate: FormControl;
    }>;

    get formControl() {
        return this.formGroup.controls;
    }
    today = new Date();
    isEditMode = false;
    unsubscribe$ = new Subject<void>();

    constructor(
        private schoolTermSessionFacade: SchoolTermSessionFacade,
        private fb: FormBuilder,
        private sharedFacade: SharedFacade,
        private sessionFacade: SessionFacade,
        private route: ActivatedRoute,
        private router: Router,
        private globalLoadingFacade: GlobalLoadingFacade
    ) {
        this.loading$ = this.schoolTermSessionFacade.loading$;
        this.error$ = this.schoolTermSessionFacade.error$;
        this.schoolTermSessionById$ = this.schoolTermSessionFacade.schoolTermSessionById$;
        this.dropdownLoading$ = this.sharedFacade.selectedLoading$;
        this.termList$ = this.sharedFacade.selectTermList$;
        this.sessionList$ = this.sessionFacade.sessionAll$;

        this.formGroup = this.fb.group({
            sessionId: ['', [Validators.required]],
            term: [0, [Validators.required, Validators.min(1), Validators.max(3)]],
            termStartDate: ['', [Validators.required]],
            termEndDate: ['', [Validators.required]]
        });
    }

    ngOnInit() {
        this.sessionFacade.getSessionAll();
        this.sharedFacade.getTermList();

        const schoolTermSessionId = this.route.snapshot.params['id'];
        if (schoolTermSessionId) {
            this.isEditMode = true;
            this.schoolTermSessionFacade.getSchoolTermSessionById(schoolTermSessionId);
            this.schoolTermSessionById$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
                if (data) {
                    this.formGroup.patchValue(data);
                }
            });
        }

        this.schoolTermSessionFacade.createSuccess$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((success) => {
                if (success && !this.isEditMode) {
                    this.router.navigate(['/app/school-term-session']);
                    this.globalLoadingFacade.globalSuccessShow('School Term Session created successfully', 3000);
                }
            });
        this.schoolTermSessionFacade.updateSuccess$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((success) => {
                if (success && this.isEditMode) {
                    this.router.navigate(['/app/school-term-session']);
                    this.globalLoadingFacade.globalSuccessShow('School Term Session updated successfully', 3000);
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

        const formData = this.formGroup.value as SchoolTermSessionFormInterface;
        if (this.isEditMode) {
            this.schoolTermSessionFacade.updateSchoolTermSession({
                ...formData,
                id: this.route.snapshot.params['id']
            });
        } else {
            this.schoolTermSessionFacade.createSchoolTermSession(formData);
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
