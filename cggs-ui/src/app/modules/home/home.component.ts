import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService, UserLoginDto, UserResponseDto } from 'src/app/services/api-service';
import { LocalService } from 'src/app/services/local-service/local.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private accountService: AccountService,
    private localService: LocalService, 
    private router: Router
  ) {
   }


  logout() {
    this.accountService.apiAccountLogoutPost().subscribe(
      res => {
        console.log(res)
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
