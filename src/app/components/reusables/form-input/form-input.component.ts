import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from 'src/app/helpers/models/formField';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.css'
})
export class FormInputComponent {
  @Input() public field!: FormField;
  @Input() public form!: FormGroup;

  @Output() changeEvent = new EventEmitter<any>();
  
  onChange() {
    this.changeEvent.emit(this.field);
  }
  
}
