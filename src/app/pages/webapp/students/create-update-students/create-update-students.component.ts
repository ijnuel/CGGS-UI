import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { StudentsFacade } from '../../../../store/students/students.facade';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { getErrorMessageHelper } from '../../../../services/helper.service';
import { DropdownListInterface, StudentFormInterface } from '../../../../types';
import { SharedFacade } from '../../../../store/shared/shared.facade';

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
    originLGA: FormControl;
    stateOfOrigin: FormControl;
    nationality: FormControl;
    homeAddress: FormControl;
    residentialCity: FormControl;
    residentialState: FormControl;
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
    private sharedFacade: SharedFacade
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
      nationality: null,
      stateOfOrigin: null,
      originLGA: null,
      homeAddress: null,
      residentialState: null,
      residentialCity: null,
      studentNo: null,
    });
  }

  ngOnInit() {
    this.sharedFacade.getGenderList();
    this.sharedFacade.getReligionList();
    this.sharedFacade.getCountryList();

    this.formControl.nationality.valueChanges.subscribe((countryId: string) => {
      if (countryId) {
        this.sharedFacade.getStateList(countryId);
      }
    });

    this.sharedFacade.selectStateList$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((states) => {
        this.selectedCountryStateList$.next(states ? [...states] : null);
      });

    this.formControl.stateOfOrigin.valueChanges.subscribe((stateId: string) => {
      if (stateId) {
        this.sharedFacade.getLgaList(stateId);
      }
    });

    this.sharedFacade.selectLgaList$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((lgas) => {
        this.selectedStateLgaList$.next(lgas ? [...lgas] : null);
      });
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
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
