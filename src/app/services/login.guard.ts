import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, skipWhile, take, withLatestFrom } from 'rxjs/operators';
import { AuthFacade } from '../store/auth/auth.facade';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(public router: Router, private authFacade: AuthFacade) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authFacade.selectedLoading$.pipe(
      skipWhile((isInit) => isInit),
      withLatestFrom(this.authFacade.selectedCurrentUserId$),
      map(([, currentUserId]) => {
        if (!currentUserId) return true;

        this.router.navigateByUrl('app');

        return false;
      }),
      take(1)
    );
  }
}
