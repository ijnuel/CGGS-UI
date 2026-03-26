import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, skipWhile, take, withLatestFrom } from 'rxjs/operators';
import { AuthFacade } from '../store/auth/auth.facade';
import { UserRolesEnum } from '../types/auth';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivateChild {
  constructor(private router: Router, private authFacade: AuthFacade) {}

  canActivateChild(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.authFacade.selectedLoading$.pipe(
      skipWhile((isLoading) => isLoading),
      withLatestFrom(this.authFacade.selectedCurrentUser$),
      map(([, currentUser]) => {
        const allowedRoles = route.data['roles'] as UserRolesEnum[] | undefined;

        // No role restriction on this route — allow
        if (!allowedRoles || allowedRoles.length === 0) return true;

        // Not logged in — send to login
        if (!currentUser) return this.router.parseUrl('auth/login');

        // Role is allowed — allow
        if (allowedRoles.includes(currentUser.userType)) return true;

        // Logged in but wrong role — redirect to home
        return this.router.parseUrl('app/home');
      }),
      take(1)
    );
  }
}
