import { Component, Input, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormFieldConstants } from 'src/app/helpers/const/formFieldConst';
import { FormFieldSize, FormFieldType, FormSelectFieldType } from 'src/app/helpers/enums/formFieldEnum';
import { FormField } from 'src/app/helpers/models/formField';
import { AdministratorCreateDto, AdministratorResponseDto, AdministratorService, AdministratorUpdateDto, EnumsService, StringResult } from 'src/app/services/api-service';
import { LocalService } from 'src/app/services/local-service/local.service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrl: './admin-form.component.css'
})
export class AdminFormComponent implements OnInit {

  @Input() public entityDto!: AdministratorResponseDto;
  @Input() public isModal!: boolean;

  formFields: FormField[] = []
  isNew: boolean = true;

  
  constructor(
    private administratorService: AdministratorService,
    private localService: LocalService, 
    private router: Router,
    @Optional() public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.isNew = !(this.entityDto?.id)
    this.initFormFields();
    console.log(this.isNew)
    this.initFormOptions();
  }

  initFormFields() {
    this.formFields = [
      FormFieldConstants.firstName(this.entityDto?.firstName, FormFieldSize.Small),
      FormFieldConstants.lastName(this.entityDto?.lastName, FormFieldSize.Small),
      FormFieldConstants.middleName(this.entityDto?.middleName, FormFieldSize.Small),
      FormFieldConstants.gender(this.entityDto?.gender, FormFieldSize.Small),
      FormFieldConstants.religion(this.entityDto?.religion, FormFieldSize.Small),
      FormFieldConstants.textField(this.entityDto?.email, "Email", "email",true, "email", FormFieldSize.Small),
      FormFieldConstants.textField(this.entityDto?.phoneNumber, "Phone Number", "phoneNumber", true, "text", FormFieldSize.Small),
      FormFieldConstants.textField(this.entityDto?.dateOfBirth, "Date of Birth", "dateOfBirth", true, "date", FormFieldSize.Small),
      FormFieldConstants.selectField(this.entityDto?.nationality, "Nationality", "nationality", true, FormFieldSize.Small, FormSelectFieldType.Country),
      FormFieldConstants.selectField(this.entityDto?.stateOfOrigin, "State of Origin", "stateOfOrigin", true, FormFieldSize.Small, FormSelectFieldType.State),
      FormFieldConstants.selectField(this.entityDto?.originLGA, "LGA", "originLGA", true, FormFieldSize.Small, FormSelectFieldType.LGA),
      FormFieldConstants.textField(this.entityDto?.homeAddress, "Home Address", "homeAddress", true, "text", FormFieldSize.Small),
      FormFieldConstants.textField(this.entityDto?.residentialCity, "City/Town", "residentialCity", true, "text", FormFieldSize.Small),
      FormFieldConstants.selectField(this.entityDto?.residentialState, "Residential State", "residentialState", true, FormFieldSize.Small),
    ]
  }

  initFormOptions() {
    this.localService.setGenderFormOptions(this.formFields, "gender");
    this.localService.setReligionFormOptions(this.formFields, "religion");
    this.localService.setCountryFormOptions(this.formFields, "nationality");
    this.localService.setStateFormOptions(this.formFields, "residentialState");
  }

  submit(formData: any) {
    if (this.isNew) {
      this.createAdmin(formData);
    }
    else {
      this.updateAdmin(formData);
    }
  }

  updateAdmin(formData: any) {
    let payload: AdministratorUpdateDto = {
      ...formData,
      gender: parseInt(formData.gender),
      religion: parseInt(formData.religion),
      id: this.entityDto?.id,
      userId: this.entityDto?.userId
    };
    this.administratorService.apiAdministratorUpdatePut(payload).subscribe((x: StringResult) => {
      if (x.succeeded) {
        this.localService.successToast(`Admin Updated!`);
        if (this.isModal) {
          this.activeModal.close(true);
        }
        else {
          this.router.navigate(['/admin/list']);
        }
      }
    },
    (err: any) => {
      this.localService.errorHandler(err);
    });
  }

  createAdmin(formData: any) {
    let payload: AdministratorCreateDto = {
      ...formData,
      gender: parseInt(formData.gender),
      religion: parseInt(formData.religion)
    };
    this.administratorService.apiAdministratorCreatePost(payload).subscribe((x: StringResult) => {
      if (x.succeeded) {
        this.localService.successToast(`Admin Created!`);
        if (this.isModal) {
          this.activeModal.close(true);
        }
        else {
          this.router.navigate(['/admin/list']);
        }
      }
    },
    (err: any) => {
      this.localService.errorHandler(err);
    });
  }
}
