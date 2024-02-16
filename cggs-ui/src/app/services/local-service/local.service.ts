import { Injectable } from '@angular/core';
import { EnumResponseModelListResult, EnumsService, UserDto, UserResponseDto } from '../api-service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { FormField, FormFieldSelectOption } from 'src/app/helpers/models/formField';

@Injectable({
  providedIn: 'root'
})
export class LocalService {


  constructor(
    private enumsService: EnumsService,
    private cookieService: CookieService,
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
    localStorage.removeItem("currentUser");
  }

  public setCountryFormOptions(formFields: FormField[], fieldName: string) {
    throw new Error('Method not implemented.');
  }

  public setLGAFormOptions(formFields: FormField[], fieldName: string, selectedValue: any) {
    throw new Error('Method not implemented.');
  }

  public setStateFormOptions(formFields: FormField[], fieldName: string, selectedValue: any) {
    throw new Error('Method not implemented.');
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

  setFormFieldSelectOptions(res: EnumResponseModelListResult, formFields:FormField[], fieldName: string) {
    if (res.succeeded) {
      var formField = this.getFormFieldByName(formFields, fieldName);
      if (formField) {
        formField.inputOptions = res.entity?.map(item => {
          let option: FormFieldSelectOption = {
            value: item.value,
            description: item.description
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

  public errorHandler(err: any) {
    let errorMessage = err?.error?.ExceptionMessage ||
      err?.error?.message ||
      err?.message ||
      "An error occurred!";
    if (err.status == 401) {
      this.clearCurrentUser();
      location.href = "/school-portal#"+errorMessage.replace(" ", /\+/g);
    }
    else if (err.status == 403) {
      location.href = "/portal#"+errorMessage.replace(" ", /\+/g);
    }
    this.toastr.error(errorMessage, 'Error Occured!');
  }

}
