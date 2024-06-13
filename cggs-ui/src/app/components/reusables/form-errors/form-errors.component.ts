import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from 'src/app/helpers/models/formField';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrl: './form-errors.component.css'
})
export class FormErrorsComponent {
  @Input() public field!: FormField;
  @Input() public form!: FormGroup;

}
