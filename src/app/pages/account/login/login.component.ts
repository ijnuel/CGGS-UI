import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService, EnumsService, UserLoginDto } from '../../../services/api-service';
import { LocalService } from '../../../services/local-service/local.service';
import { Router } from '@angular/router';
import { FormFieldSize, FormFieldType } from 'src/app/helpers/enums/formFieldEnum';
import { ToastrService } from 'ngx-toastr';
import { FormField } from 'src/app/helpers/models/formField';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formFields: FormField[] = [
    {
      name: "email",
      label: "Username/Email",
      textType: "email",
      fieldType: FormFieldType.Input,
      columnWidth: FormFieldSize.Large,
      validations: {
        required: true,
        email: true
      }
    },
    {
      name: "password",
      label: "Password",
      textType: "password",
      fieldType: FormFieldType.Input,
      columnWidth: FormFieldSize.Large,
      validations: {
        required: true,
        minLength: 8
      }
    },
    // {
    //   name: "select",
    //   label: "Testing Select",
    //   fieldType: FormFieldType.Select,
    //   columnWidth: FormFieldSize.Large,
    //   validations: {
    //     required: true
    //   },
    // }
  ]

  constructor(
    private accountService: AccountService,
    private enumsService: EnumsService,
    private localService: LocalService, 
    private router: Router,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
  }

  login(formData: any) {
    let payload: UserLoginDto = {
      ...formData
    };
    payload.userName = payload.email;
    this.accountService.apiAccountLoginPost(payload, 'response').subscribe(x => {
      if (x.body?.succeeded) {
        this.localService.setCurrentUser(x.body?.entity);
        this.router.navigate(['/portal']);
      }
    },
    (err) => {
      this.localService.errorHandler(err);
    });
  }

  // getGenders() {
  //   this.enumsService.apiEnumsGetGenderGet().subscribe(x => {
  //     if (x.succeeded) {
  //       var formField = this.localService.getFormFieldByName(this.formFields, "select");
  //       if (formField) {
  //         formField.inputOptions = x.entity?.map(item => {
  //           let option: FormFieldSelectOption = {
  //             value: item.value,
  //             description: item.description
  //           }
  //           return option;
  //         });
  //       }
  //     }
  //   },
  //   (err) => {
  //     this.localService.errorHandler(err);
  //   });
  // } 
}
