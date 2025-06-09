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
import { ActivatedRoute, Router } from '@angular/router';

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
    originLGAId: FormControl;
    stateOfOriginId: FormControl;
    nationalityId: FormControl;
    homeAddress: FormControl;
    residentialCity: FormControl;
    residentialStateId: FormControl;
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

  isEditMode: boolean = false;

  constructor(
    private administratorFacade: AdministratorFacade,
    private fb: FormBuilder,
    private sharedFacade: SharedFacade,
    private route: ActivatedRoute,
    private router: Router
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
      nationalityId: null,
      stateOfOriginId: null,
      originLGAId: null,
      homeAddress: null,
      residentialStateId: null,
      residentialCity: null,
      administratorNo: null,
    });
  }

  ngOnInit() {
    initUserProfileForm(this.sharedFacade, this.formControl, this.unsubscribe$, this.selectedCountryStateList$, this.selectedStateLgaList$);
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.administratorFacade.getAdministratorById(id);
      this.administratorFacade.selectedAdministrator$.pipe(takeUntil(this.unsubscribe$)).subscribe(administrator => {
        if (administrator) {
          this.formGroup.patchValue(administrator);
        }
      });
    }
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.formGroup.get(controlName) as FormControl;
    return getErrorMessageHelper(control);
  }

  submit() {
    this.formGroup.markAllAsTouched();

    if (!this.formGroup.valid) return;

    if (this.isEditMode) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.administratorFacade.updateAdministrator({
          ...(this.formGroup.value as AdministratorFormInterface),
          id: id
        });
      }
    } else {
      this.administratorFacade.createAdministrator({
        ...(this.formGroup.value as AdministratorFormInterface),
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

