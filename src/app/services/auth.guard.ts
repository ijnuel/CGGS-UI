import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, skipWhile, take, withLatestFrom } from 'rxjs/operators';
import { AuthFacade } from '../store/auth/auth.facade';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(public router: Router, private authFacade: AuthFacade) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authFacade.selectedLoading$.pipe(
      skipWhile((isInit) => isInit),
      withLatestFrom(this.authFacade.selectedCurrentUserId$),
      map(([, currentUserId]) => {
        console.log(currentUserId);
        if (currentUserId) return true;

        this.router.navigateByUrl('auth/login');

        return false;
      }),
      take(1)
    );
  }

  canActivateChild(): Observable<boolean | UrlTree> {
    return this.authFacade.selectedLoading$.pipe(
      skipWhile((isInit) => isInit),
      withLatestFrom(this.authFacade.selectedCurrentUserId$),
      map(([, currentUserId]) => {
        if (currentUserId) return true;

        this.router.navigateByUrl('auth/login');

        return false;
      }),
      take(1)
    );
  }
}
