import { Component } from '@angular/core';
import { AccountService, UserLoginDto } from '../../../services/api-service';
import { LocalService } from '../../../services/local-service/local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private accountService: AccountService,
    private localService: LocalService, 
    private router: Router
  ) { }
  login() {
    let payload: UserLoginDto = {
      email: "a@a.com",
      password: "Ijesudunsin1."
    }
    this.accountService.apiAccountLoginPost(payload).subscribe(x => {
      if (x.succeeded) {
        this.localService.setCurrentUser(x.entity);
        this.router.navigate(['/home']);
      }
    });
  }
}
