import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { GlobalLoadingFacade } from '../store/global-loading/global-loading.facade';

@Injectable({
  providedIn: 'root',
})
export class AppInterceptorService implements HttpInterceptor {
  constructor(private globalLoadingFacade: GlobalLoadingFacade) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // IF WE WERE USING LOCAL STORAGE
    // const modifiedRequest = request.clone({
    //   headers: request.headers.set(
    //     'Authorization',
    //     `Bearer ${authData.bearer_token}`
    //   ),
    //   withCredentials: true,
    // });

    const modifiedRequest = request;

    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.log('This is client side error');
          errorMsg = `Error: ${error.error.message}`;
        } else {
          console.log('This is server side error');
          errorMsg = `${error?.error?.Message ?? 'Error happened'}`;

          if (error?.error?.validationFailures) {
            errorMsg = error?.error?.validationFailures.join(' ');
          }
        }

        this.globalLoadingFacade.globalErrorShow(
          errorMsg ?? 'Error happened',
          3500
        );

        // authentication failed reload page to remove all data stored
        if (error.status === 401) location.href = '/auth/login'; // call a logout functionality

        return throwError(() => error);
      })
    );
  }
}
