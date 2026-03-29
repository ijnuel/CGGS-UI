import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFacade } from '../../../store/auth/auth.facade';
import { AdministratorFacade } from '../../../store/administrator/administrator.facade';
import { StaffFacade } from '../../../store/staff/staff.facade';
import { StudentFacade } from '../../../store/student/student.facade';
import { SharedFacade } from '../../../store/shared/shared.facade';
import { GlobalLoadingFacade } from '../../../store/global-loading/global-loading.facade';
import { ProfileImageFacade } from '../../../store/profile-image/profile-image.facade';
import { ProfileImageEntityType } from '../../../store/profile-image/profile-image.actions';
import { getErrorMessageHelper, initUserProfileForm } from '../../../services/helper.service';
import { CurrentUserInterface } from '../../../types/user';
import { UserRolesEnum } from '../../../types/auth';
import { DropdownListInterface } from '../../../types';
import { AdministratorListInterface } from '../../../types/administrator';
import { StaffListInterface } from '../../../types/staff';
import { StudentListInterface } from '../../../types/student';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss',
})
export class UpdateProfileComponent implements OnInit, OnDestroy {
  currentUser: CurrentUserInterface | null = null;
  entityId: string | null = null;
  entityData: AdministratorListInterface | StaffListInterface | StudentListInterface | null = null;
  fetchLoading$!: Observable<boolean>;

  photoUrl: string | null = null;
  photoUploading = false;

  unsubscribe$ = new Subject<void>();

  genderList$: Observable<DropdownListInterface[] | null>;
  religionList$: Observable<DropdownListInterface[] | null>;
  countryList$: Observable<DropdownListInterface[] | null>;
  selectedCountryStateList$ = new BehaviorSubject<DropdownListInterface[] | null>(null);
  selectedStateLgaList$ = new BehaviorSubject<DropdownListInterface[] | null>(null);
  dropdownLoading$: Observable<boolean>;

  formGroup: FormGroup<{
    firstName: FormControl;
    lastName: FormControl;
    middleName: FormControl;
    dateOfBirth: FormControl;
    religion: FormControl;
    gender: FormControl;
    phoneNumber: FormControl;
    email: FormControl;
    nationalityId: FormControl;
    stateOfOriginId: FormControl;
    originLGAId: FormControl;
    homeAddress: FormControl;
    residentialStateId: FormControl;
    residentialCity: FormControl;
  }>;

  get formControl() { return this.formGroup.controls; }
  today = new Date();
  readonly UserRolesEnum = UserRolesEnum;
  private fetched = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authFacade: AuthFacade,
    private administratorFacade: AdministratorFacade,
    private staffFacade: StaffFacade,
    private studentFacade: StudentFacade,
    private sharedFacade: SharedFacade,
    private globalLoadingFacade: GlobalLoadingFacade,
    private profileImageFacade: ProfileImageFacade,
  ) {
    this.genderList$ = this.sharedFacade.selectGenderList$;
    this.religionList$ = this.sharedFacade.selectReligionList$;
    this.countryList$ = this.sharedFacade.selectCountryList$;
    this.dropdownLoading$ = this.sharedFacade.selectedLoading$;

    this.formGroup = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(255)]],
      lastName: ['', [Validators.required, Validators.maxLength(255)]],
      middleName: ['', [Validators.maxLength(255)]],
      dateOfBirth: [null],
      religion: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phoneNumber: [null],
      email: [null],
      nationalityId: [null],
      stateOfOriginId: [null],
      originLGAId: [null],
      homeAddress: [null],
      residentialStateId: [null],
      residentialCity: [null],
    });
  }

  ngOnInit() {
    initUserProfileForm(
      this.sharedFacade, this.formControl, this.unsubscribe$,
      this.selectedCountryStateList$, this.selectedStateLgaList$
    );

    this.profileImageFacade.uploading$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(uploading => this.photoUploading = uploading);

    this.authFacade.selectedCurrentUser$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        if (user && !this.fetched) {
          this.currentUser = user;
          this.fetched = true;
          this.loadEntityByUser(user);
        }
      });
  }

  private loadEntityByUser(user: CurrentUserInterface) {
    const query = { queryProperties: [{ name: 'userId', value: user.userId }] };

    if (user.userType === UserRolesEnum.SuperAdmin || user.userType === UserRolesEnum.Admin) {
      this.fetchLoading$ = this.administratorFacade.loading$;
      this.administratorFacade.getAdministratorByProperties(query);
      this.administratorFacade.administratorByProperties$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(list => {
          if (list && list.length > 0 && !this.entityId) {
            this.entityId = list[0].id;
            this.entityData = list[0];
            this.formGroup.patchValue(list[0]);
            this.initPhotoUrl(this.entityId);
          }
        });
      this.administratorFacade.updateSuccess$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(success => {
          if (success && this.formGroup.touched) {
            this.globalLoadingFacade.globalSuccessShow('Profile updated successfully', 3000);
          }
        });

    } else if (user.userType === UserRolesEnum.Staff) {
      this.fetchLoading$ = this.staffFacade.loading$;
      this.staffFacade.getStaffByProperties(query);
      this.staffFacade.staffByProperties$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(list => {
          if (list && list.length > 0 && !this.entityId) {
            this.entityId = list[0].id;
            this.entityData = list[0];
            this.formGroup.patchValue(list[0]);
            this.initPhotoUrl(this.entityId);
          }
        });
      this.staffFacade.updateSuccess$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(success => {
          if (success && this.formGroup.touched) {
            this.globalLoadingFacade.globalSuccessShow('Profile updated successfully', 3000);
          }
        });

    } else if (user.userType === UserRolesEnum.Student) {
      this.fetchLoading$ = this.studentFacade.loading$;
      this.studentFacade.getStudentByProperties(query);
      this.studentFacade.studentByProperties$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(list => {
          if (list && list.length > 0 && !this.entityId) {
            this.entityId = list[0].id;
            this.entityData = list[0];
            this.formGroup.patchValue(list[0]);
            this.initPhotoUrl(this.entityId);
          }
        });
      this.studentFacade.updateSuccess$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(success => {
          if (success && this.formGroup.touched) {
            this.globalLoadingFacade.globalSuccessShow('Profile updated successfully', 3000);
          }
        });
    }
  }

  private initPhotoUrl(entityId: string) {
    this.profileImageFacade.loadCachedPhotoUrl(entityId);
    this.profileImageFacade.getPhotoUrl$(entityId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(url => this.photoUrl = url);
  }

  get entityType(): ProfileImageEntityType | null {
    if (!this.currentUser) return null;
    const t = this.currentUser.userType;
    if (t === UserRolesEnum.SuperAdmin || t === UserRolesEnum.Admin) return 'Administrator';
    if (t === UserRolesEnum.Staff) return 'Staff';
    if (t === UserRolesEnum.Student) return 'Student';
    return null;
  }

  get initials(): string {
    const first = this.formControl.firstName.value || this.currentUser?.firstName || '';
    const last = this.formControl.lastName.value || this.currentUser?.lastName || '';
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase() || 'U';
  }

  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file || !this.entityId || !this.entityType) return;

    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      this.globalLoadingFacade.globalErrorShow('Only JPEG, PNG, or WebP images are allowed', 3000);
      input.value = '';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      this.globalLoadingFacade.globalErrorShow('Image must be smaller than 5MB', 3000);
      input.value = '';
      return;
    }

    this.profileImageFacade.uploadProfileImage(this.entityType, this.entityId, file);
    input.value = '';
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.formGroup.get(controlName) as FormControl;
    return getErrorMessageHelper(control);
  }

  submit() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid || !this.entityId || !this.currentUser) return;

    const formData = this.formGroup.value;
    const user = this.currentUser;

    if (user.userType === UserRolesEnum.SuperAdmin || user.userType === UserRolesEnum.Admin) {
      this.administratorFacade.updateAdministrator({
        ...formData, id: this.entityId, userId: user.userId,
      } as any);

    } else if (user.userType === UserRolesEnum.Staff) {
      const staff = this.entityData as StaffListInterface;
      this.staffFacade.updateStaff({
        ...formData, id: this.entityId, userId: user.userId,
        staffNo: staff?.staffNo ?? '',
      } as any);

    } else if (user.userType === UserRolesEnum.Student) {
      const student = this.entityData as StudentListInterface;
      this.studentFacade.updateStudent({
        ...formData, id: this.entityId, userId: user.userId,
        studentNo: student?.studentNo ?? '',
        familyId: student?.familyId,
        classId: student?.classId,
      } as any);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
