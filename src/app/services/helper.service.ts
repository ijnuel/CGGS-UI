import { FormControl } from '@angular/forms';
import { SharedFacade } from '../store/shared/shared.facade';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { DropdownListInterface } from '../types';

export function getErrorMessageHelper(control: FormControl): string | null {
  if (control.errors && control.touched) {
    if (control.errors['required']) {
      return 'This field is required';
    } else if (control.errors['minlength']) {
      const requiredLength = control.errors['minlength'].requiredLength;
      return `Minimum length should be ${requiredLength}`;
    } else if (control.errors['maxlength']) {
      const requiredLength = control.errors['minlength'].requiredLength;
      return `Minimum length should be ${requiredLength}`;
    } else if (control.errors['email']) {
      return 'Invalid email';
    }
  }

  return null;
}

export function initUserProfileForm(
  sharedFacade: SharedFacade, 
  formControl: any, 
  unsubscribe$: Subject<void>, 
  selectedCountryStateList$: BehaviorSubject<DropdownListInterface[] | null>,
  selectedStateLgaList$: BehaviorSubject<DropdownListInterface[] | null>) {
    sharedFacade.getGenderList();
    sharedFacade.getReligionList();
    sharedFacade.getCountryList();

    formControl.nationalityId.valueChanges.subscribe((countryId: string) => {
      if (countryId) {
        sharedFacade.getStateList(countryId);
      }
    });

    sharedFacade.selectStateList$
      .pipe(takeUntil(unsubscribe$))
      .subscribe((states) => {
        selectedCountryStateList$.next(states ? [...states] : null);
      });

    formControl.stateOfOriginId.valueChanges.subscribe((stateId: string) => {
      if (stateId) {
        sharedFacade.getLgaList(stateId);
      }
    });

    sharedFacade.selectLgaList$
      .pipe(takeUntil(unsubscribe$))
      .subscribe((lgas) => {
        selectedStateLgaList$.next(lgas ? [...lgas] : null);
      });

}
