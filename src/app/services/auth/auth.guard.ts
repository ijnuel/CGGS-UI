import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalService } from '../local-service/local.service';
import { AccountService, UserDto, UserResponseDto } from '../api-service';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class authGuard implements CanActivate {
  constructor(
    private localService: LocalService,
    private accountService: AccountService, 
    private router: Router,
    private cookieService: CookieService
    ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser : UserResponseDto = this.localService.getCurrentUser();
    if (currentUser != undefined) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    // await this.accountService.apiAccountLogoutPost();
    this.router.navigate(['']);
    return false;
  }
};
