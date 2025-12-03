import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { StudentFacade } from '../../../../store/student/student.facade';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { initUserProfileForm } from '../../../../services/helper.service';
import { getErrorMessageHelper } from '../../../../services/helper.service';
import { ClassListInterface, DropdownListInterface, FamilyListInterface, StudentFormInterface } from '../../../../types';
import { SharedFacade } from '../../../../store/shared/shared.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';
import { FamilyFacade } from '../../../../store/family/family.facade';
import { ClassFacade } from '../../../../store/class/class.facade';
import { ProgramTypeFacade } from '../../../../store/program-type/program-type.facade';
import { ClassLevelFacade } from '../../../../store/class-level/class-level.facade';

@Component({
  selector: 'app-create-update-student',
  templateUrl: './create-update-student.component.html',
  styleUrl: './create-update-student.component.scss',
})
export class CreateUpdateStudentComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  studentById$: Observable<StudentFormInterface | null>;
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
    studentNo: FormControl;
    email: FormControl;
    familyId: FormControl;
    classId: FormControl;
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
    private studentFacade: StudentFacade,
    private fb: FormBuilder,
    private sharedFacade: SharedFacade,
    private route: ActivatedRoute,
    private router: Router,
    private globalLoadingFacade: GlobalLoadingFacade,
    private familyFacade: FamilyFacade,
    private classFacade: ClassFacade,
  ) {
    this.loading$ = this.studentFacade.loading$;
    this.error$ = this.studentFacade.error$;
    this.studentById$ = this.studentFacade.studentById$;
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
      classId: ['', [Validators.required]],
      religion: [0, [Validators.required]],
      gender: ['', [Validators.required]],
      nationalityId: ['00000000-0000-0000-0000-000000000000', [Validators.required]],
      stateOfOriginId: ['00000000-0000-0000-0000-000000000000', [Validators.required]],
      originLGAId: ['00000000-0000-0000-0000-000000000000', [Validators.required]],
      homeAddress: [''],
      residentialStateId: ['00000000-0000-0000-0000-000000000000', [Validators.required]],
      residentialCity: [''],
      studentNo: [''],
      familyId: null,
    });
  }

  ngOnInit() {
    this.familyFacade.getFamilyAll();
    this.classFacade.getClassAll();
    initUserProfileForm(this.sharedFacade, this.formControl, this.unsubscribe$, this.selectedCountryStateList$, this.selectedStateLgaList$);
    const studentId = this.route.snapshot.params['id'];
    if (studentId) {
      this.isEditMode = true;
      this.studentFacade.getStudentById(studentId);
      this.studentById$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
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
            studentNo: data.studentNo,
            familyId: data.familyId,
            classId: data.classId,
          });
        }
      });
    }

    this.studentFacade.createSuccess$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((success) => {
        if (success && !this.isEditMode && this.formGroup.touched) {
          this.router.navigate(['/app/student']);
          this.globalLoadingFacade.globalSuccessShow('Student created successfully', 3000);
        }
      });
    this.studentFacade.updateSuccess$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((success) => {
        if (success && this.isEditMode && this.formGroup.touched) {
          this.router.navigate(['/app/student']);
          this.globalLoadingFacade.globalSuccessShow('Student updated successfully', 3000);
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

    const formData = this.formGroup.value as StudentFormInterface;
    if (this.isEditMode) {
      this.studentFacade.updateStudent({
        ...formData,
        id: this.route.snapshot.params['id']
      });
    } else {
      this.studentFacade.createStudent(formData);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
