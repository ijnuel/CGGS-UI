import { FormControl } from '@angular/forms';

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
