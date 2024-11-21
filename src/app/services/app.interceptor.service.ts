import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!localStorage.getItem('Optiva_auth')) return next.handle(request);

    const authData: {
      bearer_token: string;
    } = JSON.parse(localStorage.getItem('app_auth')!);

    const modifiedRequest = request.clone({
      headers: request.headers.set(
        'Authorization',
        `Bearer ${authData.bearer_token}`
      ),
      withCredentials: true
    });

    return next.handle(modifiedRequest);
  }
}
