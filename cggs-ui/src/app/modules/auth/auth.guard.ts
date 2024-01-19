import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LocalService } from '../../services/local-service/local.service';
import { AccountService, UserDto, UserResponseDto } from '../../services/api-service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class authGuard implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private localService: LocalService,
    private accountService: AccountService, 
    private router: Router
    ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const cookieValue = this.cookieService.get('AccessToken');
    const currentUser : UserResponseDto = this.localService.getCurrentUser();
    console.log(cookieValue);
    console.log(currentUser);
    if (currentUser != undefined) {
      console.log('here')
      return true;
    }

    // not logged in so redirect to login page with the return url
    // await this.accountService.apiAccountLogoutPost();
    this.router.navigate(['']);
    return false;
  }
};
