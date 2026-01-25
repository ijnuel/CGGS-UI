import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { StaffFacade } from '../../../../store/staff/staff.facade';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { initUserProfileForm } from '../../../../services/helper.service';
import { getErrorMessageHelper } from '../../../../services/helper.service';
import { ClassListInterface, DropdownListInterface, FamilyListInterface, StaffFormInterface, StaffListInterface } from '../../../../types';
import { SharedFacade } from '../../../../store/shared/shared.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';
import { FamilyFacade } from '../../../../store/family/family.facade';
import { ClassFacade } from '../../../../store/class/class.facade';
import { ProgramTypeFacade } from '../../../../store/program-type/program-type.facade';
import { ClassLevelFacade } from '../../../../store/class-level/class-level.facade';

@Component({
  selector: 'app-create-update-staff',
  templateUrl: './create-update-staff.component.html',
  styleUrl: './create-update-staff.component.scss',
})
export class CreateUpdateStaffComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  staffById$: Observable<StaffListInterface | null>;
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
    staffNo: FormControl;
    email: FormControl;
  }>;

  get formControl() {
    return this.formGroup.controls;
  }
  today = new Date();
  isEditMode = false;
  unsubscribe$ = new Subject<void>(); selectedCountryStateList$ = new BehaviorSubject<
    DropdownListInterface[] | null
  >(null);
  selectedStateLgaList$ = new BehaviorSubject<DropdownListInterface[] | null>(
    null
  );


  genderList$: Observable<DropdownListInterface[] | null>;
  religionList$: Observable<DropdownListInterface[] | null>;
  countryList$: Observable<DropdownListInterface[] | null>;
  familyList$: Observable<FamilyListInterface[] | null>;
  classList$: Observable<ClassListInterface[] | null>;

  constructor(
    private staffFacade: StaffFacade,
    private fb: FormBuilder,
    private sharedFacade: SharedFacade,
    private route: ActivatedRoute,
    private router: Router,
    private globalLoadingFacade: GlobalLoadingFacade,
    private familyFacade: FamilyFacade,
    private classFacade: ClassFacade,
  ) {
    this.loading$ = this.staffFacade.loading$;
    this.error$ = this.staffFacade.error$;
    this.staffById$ = this.staffFacade.staffById$;
    this.dropdownLoading$ = this.sharedFacade.selectedLoading$;
    this.genderList$ = this.sharedFacade.selectGenderList$;
    this.religionList$ = this.sharedFacade.selectReligionList$;
    this.countryList$ = this.sharedFacade.selectCountryList$;
    this.familyList$ = this.familyFacade.familyAll$;
    this.classList$ = this.classFacade.classAll$;

    this.formGroup = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(255)]],
      lastName: ['', [Validators.required, Validators.maxLength(255)]],
      middleName: ['', [Validators.maxLength(255)]],
      dateOfBirth: [new Date(), [Validators.required]],
      phoneNumber: [''],
      email: [''],
      religion: [0, [Validators.required]],
      gender: ['', [Validators.required]],
      nationalityId: ['00000000-0000-0000-0000-000000000000', [Validators.required]],
      stateOfOriginId: ['00000000-0000-0000-0000-000000000000', [Validators.required]],
      originLGAId: ['00000000-0000-0000-0000-000000000000', [Validators.required]],
      homeAddress: [''],
      residentialStateId: ['00000000-0000-0000-0000-000000000000', [Validators.required]],
      residentialCity: [''],
      staffNo: [''],
    });
  }

  ngOnInit() {
    this.familyFacade.getFamilyAll();
    this.classFacade.getClassAll();
    initUserProfileForm(this.sharedFacade, this.formControl, this.unsubscribe$, this.selectedCountryStateList$, this.selectedStateLgaList$);
    const staffId = this.route.snapshot.params['id'];
    if (staffId) {
      this.isEditMode = true;
      this.staffFacade.getStaffById(staffId);
      this.staffById$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
        if (data) {
          this.formGroup.patchValue({
            firstName: data.firstName,
            lastName: data.lastName,
            middleName: data.middleName,
            dateOfBirth: data.dateOfBirth,
            phoneNumber: data.phoneNumber,
            email: data.email,
            religion: data.religion,
            gender: data.gender,
            nationalityId: data.nationalityId,
            stateOfOriginId: data.stateOfOriginId,
            originLGAId: data.originLGAId,
            homeAddress: data.homeAddress,
            residentialStateId: data.residentialStateId,
            residentialCity: data.residentialCity,
            staffNo: data.staffNo,
          });
        }
      });
    }

    this.staffFacade.createSuccess$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((success) => {
        if (success && !this.isEditMode && this.formGroup.touched) {
          this.router.navigate(['/app/staff']);
          this.globalLoadingFacade.globalSuccessShow('Staff created successfully', 3000);
        }
      });
    this.staffFacade.updateSuccess$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((success) => {
        if (success && this.isEditMode && this.formGroup.touched) {
          this.router.navigate(['/app/staff']);
          this.globalLoadingFacade.globalSuccessShow('Staff updated successfully', 3000);
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

    const formData = this.formGroup.value as StaffFormInterface;
    if (this.isEditMode) {
      this.staffFacade.updateStaff({
        ...formData,
        id: this.route.snapshot.params['id']
      });
    } else {
      this.staffFacade.createStaff(formData);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
