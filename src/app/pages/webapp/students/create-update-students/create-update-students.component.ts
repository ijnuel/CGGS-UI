import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { StudentsFacade } from '../../../../store/students/students.facade';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { getErrorMessageHelper, initUserProfileForm } from '../../../../services/helper.service';
import { DropdownListInterface, StudentFormInterface } from '../../../../types';
import { SharedFacade } from '../../../../store/shared/shared.facade';
import { ToastNotificationService, NotificationTypeEnums } from '../../../../services/toast-notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-update-students',
  templateUrl: './create-update-students.component.html',
  styleUrl: './create-update-students.component.scss',
})
export class CreateUpdateStudentsComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  dropdownLoading$: Observable<boolean>;

  formGroup: FormGroup<{
    firstName: FormControl;
    lastName: FormControl;
    middleName: FormControl;
    dateOfBirth: FormControl;
    religion: FormControl;
    gender: FormControl;
    originLgaId: FormControl;
    stateOfOriginId: FormControl;
    nationalityId: FormControl;
    homeAddress: FormControl;
    residentialCity: FormControl;
    residentialStateId: FormControl;
    phoneNumber: FormControl;
    studentNo: FormControl;
    email: FormControl;
  }>;

  get formControl() {
    return this.formGroup.controls;
  }
  today = new Date();

  genderList$: Observable<DropdownListInterface[] | null>;
  religionList$: Observable<DropdownListInterface[] | null>;
  countryList$: Observable<DropdownListInterface[] | null>;

  selectedCountryStateList$ = new BehaviorSubject<
    DropdownListInterface[] | null
  >(null);
  selectedStateLgaList$ = new BehaviorSubject<DropdownListInterface[] | null>(
    null
  );

  unsubscribe$ = new Subject<void>();

  constructor(
    private studentsFacade: StudentsFacade,
    private fb: FormBuilder,
    private sharedFacade: SharedFacade,
    private toast: ToastNotificationService,
    private router: Router
  ) {
    this.loading$ = this.studentsFacade.selectedLoading$;
    this.dropdownLoading$ = this.sharedFacade.selectedLoading$;
    this.genderList$ = this.sharedFacade.selectGenderList$;
    this.religionList$ = this.sharedFacade.selectReligionList$;
    this.countryList$ = this.sharedFacade.selectCountryList$;

    this.formGroup = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(255)]],
      lastName: ['', [Validators.required, Validators.maxLength(255)]],
      middleName: ['', [Validators.maxLength(255)]],
      dateOfBirth: null,
      phoneNumber: null,
      email: null,
      religion: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      nationalityId: null,
      stateOfOriginId: null,
      originLgaId: null,
      homeAddress: null,
      residentialStateId: null,
      residentialCity: null,
      studentNo: null,
    });
  }

  ngOnInit() {
    initUserProfileForm(this.sharedFacade, this.formControl, this.unsubscribe$, this.selectedCountryStateList$, this.selectedStateLgaList$);    
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.formGroup.get(controlName) as FormControl;
    return getErrorMessageHelper(control);
  }

  submit() {
    this.formGroup.markAllAsTouched();

    if (!this.formGroup.valid) return;

    this.studentsFacade.createStudent({
      ...(this.formGroup.value as StudentFormInterface),
    });

    // Listen for loading to become false and no error, then show toast and navigate
    this.studentsFacade.selectedLoading$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((loading) => {
        if (!loading) {
          this.studentsFacade.selectedError$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((error) => {
              if (!error) {
                this.toast.openToast('Student created successfully!', NotificationTypeEnums.SUCCESS);
                this.router.navigate(['/app/students']);
              }
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
