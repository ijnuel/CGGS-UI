import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalService } from '../local-service/local.service';
import { AccountService, UserDto, UserResponseDto } from '../api-service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class guestGuard implements CanActivate {
  constructor(
    private localService: LocalService,
    private accountService: AccountService, 
    private router: Router
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser : UserResponseDto = this.localService.getCurrentUser();
    if (currentUser == undefined) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    console.log("redirecting to portal")
    this.router.navigate(['/portal']);
    return false;
  }
};
