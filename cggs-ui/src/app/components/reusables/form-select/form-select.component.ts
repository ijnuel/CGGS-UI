import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from 'src/app/helpers/models/formField';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrl: './form-select.component.css'
})
export class FormSelectComponent {
  @Input() public field!: FormField;
  @Input() public formFields!: FormField[];
  @Input() public form!: FormGroup;

  @Output() changeEvent = new EventEmitter<any>();
  
  onChange() {
    this.changeEvent.emit(this.field);
  }
}
