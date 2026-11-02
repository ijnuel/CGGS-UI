import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GenericResponseInterface } from '../types';
import { environment } from '../../environments/environment';

export interface ImpersonationSessionInterface {
  id: string;
  impersonatorName: string;
  impersonatorUserType: number;
  targetName: string;
  targetUserName: string;
  targetUserType: number;
  reason: string | null;
  startedAt: string;
  expiresAt: string;
  endedAt: string | null;
  status: 'Active' | 'Ended' | 'Expired';
}

const RETURN_URL_KEY = 'supportSignInReturnUrl';

// Admin "sign in as user" for support. Starting and ending swap the session cookie, so both
// finish with a full page load to drop any state held for the previous user.
@Injectable({
  providedIn: 'root',
})
export class ImpersonationService {
  private readonly baseUrl = `${environment.baseUrl}/Account`;

  constructor(private http: HttpClient) {}

  start(userId: string, reason: string | null): Observable<void> {
    return this.http
      .post<GenericResponseInterface<unknown>>(`${this.baseUrl}/StartImpersonation`, { userId, reason }, { withCredentials: true })
      .pipe(
        tap(() => {
          try { sessionStorage.setItem(RETURN_URL_KEY, location.pathname + location.search); } catch { /* storage unavailable */ }
          location.assign('/app/home');
        }),
        map(() => undefined),
      );
  }

  stop(): Observable<void> {
    return this.http
      .post<GenericResponseInterface<unknown>>(`${this.baseUrl}/StopImpersonation`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          let returnUrl = '/app/home';
          try { returnUrl = sessionStorage.getItem(RETURN_URL_KEY) || returnUrl; sessionStorage.removeItem(RETURN_URL_KEY); } catch { /* storage unavailable */ }
          location.assign(returnUrl);
        }),
        map(() => undefined),
      );
  }

  getSessions(): Observable<ImpersonationSessionInterface[]> {
    return this.http
      .get<GenericResponseInterface<ImpersonationSessionInterface[]>>(`${this.baseUrl}/GetImpersonationSessions`, { withCredentials: true })
      .pipe(map((r) => r.entity ?? []));
  }
}
