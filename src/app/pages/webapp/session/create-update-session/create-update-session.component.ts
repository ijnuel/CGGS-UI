import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { SessionFacade } from '../../../../store/session/session.facade';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { getErrorMessageHelper } from '../../../../services/helper.service';
import { DropdownListInterface, SessionFormInterface } from '../../../../types';
import { SharedFacade } from '../../../../store/shared/shared.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';

@Component({
    selector: 'app-create-update-session',
    templateUrl: './create-update-session.component.html',
    styleUrl: './create-update-session.component.scss',
})
export class CreateUpdateSessionComponent implements OnInit, OnDestroy {
    loading$: Observable<boolean>;
    error$: Observable<string | null>;
    sessionById$: Observable<SessionFormInterface | null>;
    dropdownLoading$: Observable<boolean>;

    formGroup: FormGroup<{
        name: FormControl;
        isCurrent: FormControl;
        sNo: FormControl;
    }>;

    get formControl() {
        return this.formGroup.controls;
    }
    today = new Date();
    isEditMode = false;
    unsubscribe$ = new Subject<void>();

    constructor(
        private sessionFacade: SessionFacade,
        private fb: FormBuilder,
        private sharedFacade: SharedFacade,
        private route: ActivatedRoute,
        private router: Router,
        private globalLoadingFacade: GlobalLoadingFacade
    ) {
        this.loading$ = this.sessionFacade.loading$;
        this.error$ = this.sessionFacade.error$;
        this.sessionById$ = this.sessionFacade.sessionById$;
        this.dropdownLoading$ = this.sharedFacade.selectedLoading$;

        this.formGroup = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(255)]],
            isCurrent: [false, [Validators.required]],
            sNo: [0, [Validators.required, Validators.min(1)]]
        });
    }

    ngOnInit() {
        const sessionId = this.route.snapshot.params['id'];
        if (sessionId) {
            this.isEditMode = true;
            this.sessionFacade.getSessionById(sessionId);
            this.sessionById$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
                if (data) {
                    this.formGroup.patchValue({
                        name: data.name,
                        isCurrent: data.isCurrent,
                        sNo: data.sNo
                    });
                }
            });
        }

        this.sessionFacade.createSuccess$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((success) => {
                if (success && !this.isEditMode && this.formGroup.touched) {
                    this.router.navigate(['/app/session']);
                    this.globalLoadingFacade.globalSuccessShow('Session created successfully', 3000);
                }
            });
        this.sessionFacade.updateSuccess$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((success) => {
                if (success && this.isEditMode && this.formGroup.touched) {
                    this.router.navigate(['/app/session']);
                    this.globalLoadingFacade.globalSuccessShow('Session updated successfully', 3000);
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

        const formData = this.formGroup.value as SessionFormInterface;
        if (this.isEditMode) {
            this.sessionFacade.updateSession({
                ...formData,
                id: this.route.snapshot.params['id']
            });
        } else {
            this.sessionFacade.createSession(formData);
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
