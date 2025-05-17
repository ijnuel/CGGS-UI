import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { AdministratorFacade } from '../../../../store/administrator/administrator.facade';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { getErrorMessageHelper, initUserProfileForm } from '../../../../services/helper.service';
import { DropdownListInterface, AdministratorFormInterface } from '../../../../types';
import { SharedFacade } from '../../../../store/shared/shared.facade';

@Component({
  selector: 'app-create-update-administrator',
  templateUrl: './create-update-administrator.component.html',
  styleUrl: './create-update-administrator.component.scss',
})
export class CreateUpdateAdministratorComponent implements OnInit, OnDestroy {
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
    administratorNo: FormControl;
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
    private administratorFacade: AdministratorFacade,
    private fb: FormBuilder,
    private sharedFacade: SharedFacade
  ) {
    this.loading$ = this.administratorFacade.selectedLoading$;
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
      administratorNo: null,
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

    this.administratorFacade.createAdministrator({
      ...(this.formGroup.value as AdministratorFormInterface),
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

