import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormFieldConstants } from 'src/app/helpers/const/formFieldConst';
import { FormFieldSize, FormFieldType, FormSelectFieldType } from 'src/app/helpers/enums/formFieldEnum';
import { FormField } from 'src/app/helpers/models/formField';
import { AdministratorCreateDto, AdministratorService, EnumsService } from 'src/app/services/api-service';
import { LocalService } from 'src/app/services/local-service/local.service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrl: './admin-form.component.css'
})
export class AdminFormComponent implements OnInit {

  formFields: FormField[] = [
    FormFieldConstants.firstName(undefined, FormFieldSize.Small),
    FormFieldConstants.lastName(undefined, FormFieldSize.Small),
    FormFieldConstants.middleName(undefined, FormFieldSize.Small),
    FormFieldConstants.gender(undefined, FormFieldSize.Small),
    FormFieldConstants.religion(undefined, FormFieldSize.Small),
    FormFieldConstants.textField("email", "Email", true, "email", undefined, FormFieldSize.Small),
    FormFieldConstants.textField("phoneNumber", "Phone Number", true, "text", undefined, FormFieldSize.Small),
    FormFieldConstants.textField("dateOfBirth", "Date of Birth", true, "date", undefined, FormFieldSize.Small),
    FormFieldConstants.selectField("nationality", "Nationality", true, undefined, FormFieldSize.Small, FormSelectFieldType.Country),
    FormFieldConstants.selectField("stateOfOrigin", "State of origin", true, undefined, FormFieldSize.Small, FormSelectFieldType.State),
    FormFieldConstants.selectField("originLGA", "LGA", true, undefined, FormFieldSize.Small, FormSelectFieldType.LGA),
    FormFieldConstants.textField("homeAddress", "Home Address", true, "text", undefined, FormFieldSize.Small),
    FormFieldConstants.textField("residentialCity", "City/Town", true, "text", undefined, FormFieldSize.Small),
    FormFieldConstants.selectField("residentialState", "Residential State", true, undefined, FormFieldSize.Small),
  ]

  
  constructor(
    private administratorService: AdministratorService,
    private localService: LocalService, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initFormOptions();
  }

  initFormOptions() {
    this.localService.setGenderFormOptions(this.formFields, "gender");
    this.localService.setReligionFormOptions(this.formFields, "religion");
    this.localService.setCountryFormOptions(this.formFields, "nationality");
    this.localService.setStateFormOptions(this.formFields, "residentialState");
  }

  submit(formData: any) {
    let payload: AdministratorCreateDto = {
      ...formData,
      gender: parseInt(formData.gender),
      religion: parseInt(formData.religion)
    };
    console.log(payload)
    this.administratorService.apiAdministratorCreatePost(payload).subscribe(x => {
      if (x.succeeded) {
        this.localService.successToast(x.entity || "Admin created!");
        this.router.navigate(['/portal']);
      }
    },
    (err) => {
      this.localService.errorHandler(err);
    });
  }
}
