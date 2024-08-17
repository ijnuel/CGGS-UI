import { Injectable } from '@angular/core';
import { CountryService, EnumResponseModelListResult, EnumsService, LocalGovernmentAreaService, StateService, UserDto, UserResponseDto } from '../api-service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { FormField, FormFieldSelectOption } from 'src/app/helpers/models/formField';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteComponent } from 'src/app/components/reusables/delete/delete.component';
import { ObjectListResult } from '../api-service/model/objectListResult';

@Injectable({
  providedIn: 'root'
})
export class LocalService {


  constructor(
    private enumsService: EnumsService,
    private countryService: CountryService,
    private stateService: StateService,
    private localGovernmentAreaService: LocalGovernmentAreaService,
    private cookieService: CookieService,
    private modalDialog: NgbModal, 
    private toastr: ToastrService) { }

  public saveData(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getData(key: string): any {
    let data = localStorage.getItem(key) || undefined;
    return data ? JSON.parse(data) : null;
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  public setCurrentUser(value: UserResponseDto | undefined) {
    localStorage.setItem("currentUser", JSON.stringify(value));
  }
  public getCurrentUser(): UserResponseDto {
    let data = localStorage.getItem("currentUser");
    return data ? JSON.parse(data) : null;
  }
  public clearCurrentUser() {
    console.log("clear??")
    localStorage.removeItem("currentUser");
  }

  public setCountryFormOptions(formFields: FormField[], fieldName: string) {
    this.countryService.apiCountryGetAllGet().subscribe(
      res => this.setFormFieldSelectOptions(res, formFields, fieldName),
      err => this.errorHandler(err));
  }

  public setStateFormOptions(formFields: FormField[], fieldName: string) {
    this.stateService.apiStateGetAllGet().subscribe(
      res => this.setFormFieldSelectOptions(res, formFields, fieldName),
      err => this.errorHandler(err));
  }

  public setStateByCountryIdFormOptions(formFields: FormField[], fieldName: string, selectedValue: any) {
    this.stateService.apiStateGetByCountryIdGet(selectedValue).subscribe(
      res => this.setFormFieldSelectOptions(res, formFields, fieldName),
      err => this.errorHandler(err));
  }

  public setLGAFormOptions(formFields: FormField[], fieldName: string, selectedValue: any) {
    this.localGovernmentAreaService.apiLocalGovernmentAreaGetByStateIdGet(selectedValue).subscribe(
      res => this.setFormFieldSelectOptions(res, formFields, fieldName),
      err => this.errorHandler(err));
  }

  public setGenderFormOptions(formFields:FormField[], fieldName: string) {
    this.enumsService.apiEnumsGetGenderGet().subscribe(
      res => this.setFormFieldSelectOptions(res, formFields, fieldName),
      err => this.errorHandler(err));
  } 

  public setReligionFormOptions(formFields:FormField[], fieldName: string) {
    this.enumsService.apiEnumsGetReligionGet().subscribe(
      res => this.setFormFieldSelectOptions(res, formFields, fieldName),
      err => this.errorHandler(err));
  } 

  public setTermFormOptions(formFields:FormField[], fieldName: string) {
    this.enumsService.apiEnumsGetTermGet().subscribe(
      res => this.setFormFieldSelectOptions(res, formFields, fieldName),
      err => this.errorHandler(err));
  } 

  public setUserTypeFormOptions(formFields:FormField[], fieldName: string) {
    this.enumsService.apiEnumsGetUserTypeGet().subscribe(
      res => this.setFormFieldSelectOptions(res, formFields, fieldName),
      err => this.errorHandler(err));
  } 

  setFormFieldSelectOptions(res: EnumResponseModelListResult | ObjectListResult, formFields:FormField[], fieldName: string) {
    if (res.succeeded) {
      var formField = this.getFormFieldByName(formFields, fieldName);
      if (formField) {
        formField.inputOptions = res.entity?.map(item => {
          let option: FormFieldSelectOption = {
            value: item.value ?? item.id,
            description: item.description ?? item.name
          }
          return option;
        });
      }
    }
  }

  public getFormFieldByName(formFields:FormField[], name: string) : FormField | undefined {
    return formFields.find(field => field.name == name);
  }

  public successToast(message: string) {
    this.toastr.success(message, 'Success!');
  }

  public async confirmDelete(): Promise<boolean> {
    const dialogRef = this.modalDialog.open(DeleteComponent, {
      windowClass: 'myCustomModalClass',
      size: 'l',
      backdrop: 'static',
      keyboard: false,
      scrollable: true,
      centered: true
    });

    return dialogRef.result;
  }

  public errorHandler(err: any) {
    console.log("error here???")
    console.log(err)
    let validationErrors : any[][] | undefined;
    if (err?.error?.errors) {
      validationErrors = Object.values(err?.error?.errors);
    }
    let errorMessage = err?.error?.Message || 
      validationErrors?.find(x => x)?.find(x => x) || 
      err?.error?.entity ||
      err?.error?.message ||  
      err?.statusText || 
      err?.message ||
      err?.error?.ExceptionMessage ||
      "An error occurred!";
    if (err.status == 401) {
      this.clearCurrentUser();
      errorMessage = "Session Expired!";
      location.href = "/school-portal#errorMessage="+errorMessage.replace(" ", "/\+/g");
    }
    else if (err.status == 403) {
      errorMessage = "Unauthorized Access!";
      location.href = "/portal#errorMessage="+errorMessage.replace(" ", "/\+/g");
    }
    this.toastr.error(errorMessage, 'Error Occured!');
  }

}
