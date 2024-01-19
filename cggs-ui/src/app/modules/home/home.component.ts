import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/api-service';
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
  ) { }
  logout() {
    this.localService.clearCurrentUser();
    this.accountService.apiAccountLogoutPost().subscribe(x => {
      if (x.succeeded) {
        this.router.navigate(['']);
      }
    });
  }

}
