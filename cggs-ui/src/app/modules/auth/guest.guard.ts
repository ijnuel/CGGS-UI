import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LocalService } from '../../services/local-service/local.service';
import { AccountService, UserDto } from '../../services/api-service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class guestGuard implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private localService: LocalService,
    private accountService: AccountService, 
    private router: Router
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const cookieValue = this.cookieService.get('AccessToken');
    const currentUser : UserDto = this.localService.getCurrentUser();
    console.log(cookieValue);
    console.log(currentUser);
    if (currentUser == undefined) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/home']);
    return false;
  }
};
