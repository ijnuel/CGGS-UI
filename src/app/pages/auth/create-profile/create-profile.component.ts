import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { AuthFacade } from '../../../store/auth/auth.facade';
import { DropdownListInterface, FamilyFormInterface } from '../../../types';
import { FamilyFacade } from '../../../store/family/family.facade';
import { SharedFacade } from '../../../store/shared/shared.facade';
import { getErrorMessageHelper, initUserProfileForm } from '../../../services/helper.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.scss',
})
export class CreateProfileComponent {
  loading$: Observable<boolean>;
  dropdownLoading$: Observable<boolean>;
  
  formGroup!: FormGroup<{
    email: FormControl;
    lastName: FormControl;
    religion: FormControl;
    originLgaId: FormControl;
    stateOfOriginId: FormControl;
    nationalityId: FormControl;
    homeAddress: FormControl;
    residentialCity: FormControl;
    residentialStateId: FormControl;
    phoneNumber: FormControl;
  }>;
  get formControl() {
    return this.formGroup.controls;
  }

  unsubscribe$ = new Subject<void>();
  showPassword = false;

  genderList$: Observable<DropdownListInterface[] | null>;
  religionList$: Observable<DropdownListInterface[] | null>;
  countryList$: Observable<DropdownListInterface[] | null>;


  selectedCountryStateList$ = new BehaviorSubject<
    DropdownListInterface[] | null
  >(null);
  selectedStateLgaList$ = new BehaviorSubject<DropdownListInterface[] | null>(
    null
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authFacade: AuthFacade,
    private familyFacade: FamilyFacade,
        private sharedFacade: SharedFacade
  ) {
    this.loading$ = this.familyFacade.selectedLoading$;
    this.dropdownLoading$ = this.sharedFacade.selectedLoading$;
    this.genderList$ = this.sharedFacade.selectGenderList$;
    this.religionList$ = this.sharedFacade.selectReligionList$;
    this.countryList$ = this.sharedFacade.selectCountryList$;

    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      lastName: ['', [Validators.required]],
      religion: ['', [Validators.required]],
      originLgaId: ['', [Validators.required]],
      stateOfOriginId: ['', [Validators.required]],
      nationalityId: ['', [Validators.required]],
      homeAddress: ['', [Validators.required]],
      residentialCity: ['', [Validators.required]],
      residentialStateId: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
    });
    this.authFacade.selectedCurrentUserId$.subscribe((id) => {
      console.log(id);
    });
  }

  ngOnInit() {
    initUserProfileForm(this.sharedFacade, this.formControl, this.unsubscribe$, this.selectedCountryStateList$, this.selectedStateLgaList$);
    this.authFacade
      .loginSuccessAction()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.router.navigateByUrl('app');
      });
  }

  onSubmit() {
    if (!this.formGroup.valid) return;

    this.familyFacade.createFamily(this.formGroup.value as FamilyFormInterface);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  
  getErrorMessage(controlName: string): string | null {
    const control = this.formGroup.get(controlName) as FormControl;
    return getErrorMessageHelper(control);
  }
}
