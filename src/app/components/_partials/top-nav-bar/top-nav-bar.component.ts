import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService, UserProfileDto } from 'src/app/services/api-service';
import { LocalService } from 'src/app/services/local-service/local.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css']
})
export class TopNavBarComponent implements OnInit {

  open: boolean = false;
  dataEmitter = new EventEmitter<boolean>();
  userProfile : UserProfileDto = {};

  logo = environment.logo;
  long_name = environment.long_name;
  short_name = environment.short_name;

  constructor(
    private accountService: AccountService,
    private localService: LocalService, 
    private router: Router
    ) {}
  
  
  ngOnInit(): void {
    this.getUserProfile();
  }
  
  getUserProfile() {
    this.accountService.apiAccountGetUserProfileGet('response').subscribe(
      res => {
        if (res.body?.succeeded) {
          this.userProfile = res.body?.entity!;
        }
        else {
          this.localService.errorHandler(res);
        }
      },
      err => this.localService.errorHandler(err)
      );
  }

  logout() {
    this.accountService.apiAccountLogoutPost().subscribe(
      res => {
        if (res.succeeded) {
          this.localService.clearCurrentUser();
          this.router.navigate(['']);
        }
      },
      (err) => {
        this.localService.errorHandler(err);
      });
  }
}
