import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { errorHandler } from 'src/app/helpers/errorHandler';
import { AccountService } from 'src/app/services/api-service';
import { LocalService } from 'src/app/services/local-service/local.service';

@Component({
  selector: 'app-account-dropdown',
  templateUrl: './account-dropdown.component.html',
  styleUrls: ['./account-dropdown.component.css']
})
export class AccountDropdownComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private localService: LocalService, 
    private router: Router
  ) {}

  _auth :any;
  _passport :any;
  _isApplication :any;
  links = [
    {
    title: "Change Password",
    slug: "/reset-password",
    icon: "password",
  },
];

  loading = false;
  notification = {};
  PassportData = "";

  async ngOnInit(): Promise<void> {
  }

  logoutUser(): void {
    this.accountService.apiAccountLogoutPost().subscribe(
      res => {
        console.log(res)
        if (res.succeeded) {
          this.localService.clearCurrentUser();
          this.router.navigate(['']);
        }
      },
      (err) => {
        errorHandler(err);
      });
  }
}

