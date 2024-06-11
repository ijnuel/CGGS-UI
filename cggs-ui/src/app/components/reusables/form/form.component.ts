import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormFieldSize, FormSelectFieldType } from 'src/app/helpers/enums/formFieldEnum';
import { FormField } from 'src/app/helpers/models/formField';
import { LocalService } from 'src/app/services/local-service/local.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  @Input() public formFields!: FormField[];
  @Input() public buttonLabel: string = "Submit";
  @Input() public formTitle!: string;
  @Input() public isModal!: boolean;
  @Output() submitEvent = new EventEmitter<any>();
  
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private localService: LocalService,
    @Optional() public activeModal: NgbActiveModal
    ) { }
  
  ngOnInit(): void {
    this.initForm();
  }

  closeModal(saved: boolean = false) {
    this.activeModal.close(saved);
  }


  
  // convenience getter for easy access to form fields
  get f() {
    return this.form.getRawValue();
  }

  initForm() {
    this.form = this.fb.group({});
    this.formFields.forEach(field => {
      let fieldValidators = this.setValidators(field.validations);
      this.form.addControl(field.name, this.fb.control(field.value, fieldValidators));
      this.fetchDependentField(field);
    });
  }

  setValidators(validations: any): any[] {
    let fieldValidators = [];
    if (validations.required) {
      fieldValidators.push(Validators.required);
    }
    if (validations.email) {
      fieldValidators.push(Validators.email);
    }
    if (validations.min != undefined) {
      fieldValidators.push(Validators.min(validations.min));
    }
    if (validations.max != undefined) {
      fieldValidators.push(Validators.max(validations.max));
    }
    if (validations.minLength != undefined) {
      fieldValidators.push(Validators.minLength(validations.minLength));
    }
    if (validations.maxLength != undefined) {
      fieldValidators.push(Validators.maxLength(validations.maxLength));
    }

    return fieldValidators;
  }

  submit() {
    this.submitEvent.emit(this.f);
  }

  getFieldColumn(columnWidth: FormFieldSize | undefined) : string {
    if (columnWidth == FormFieldSize.ExtraSmall) {
      return "col-md-4 col-lg-3"
    }
    else if (columnWidth == FormFieldSize.Small) {
      return "col-md-6 col-lg-4"
    }
    else if (columnWidth == FormFieldSize.Medium) {
      return "col-md-6 col-lg-6"
    }
    return "col-md-12 col-lg-12"
  }

  fetchDependentField(field: FormField) {
    let selectedValue = this.f[field.name];
    if (field.selectFieldType == FormSelectFieldType.Country) {
      let stateField = this.formFields.find(x => x.selectFieldType == FormSelectFieldType.State);
      if (stateField) {
        this.localService.setStateByCountryIdFormOptions(this.formFields, stateField.name, selectedValue);
      }
    }
    else if (field.selectFieldType == FormSelectFieldType.State) {
      let lgaField = this.formFields.find(x => x.selectFieldType == FormSelectFieldType.LGA);
      if (lgaField) {
        this.localService.setLGAFormOptions(this.formFields, lgaField.name, selectedValue);
      }
    }
  }
}
