import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
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
    const modifiedRequest = request;

    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {

        let errorMsg = 'An unexpected error occurred.';

        // ---------- CLIENT SIDE ERROR ----------
        if (error.error instanceof ErrorEvent) {
          errorMsg = error.error.message ?? errorMsg;
        }

        // ---------- SERVER SIDE ERROR ----------
        else {

          // Backend standard message
          errorMsg =
            error?.error?.message ??
            error?.error?.Message ??
            errorMsg;

          // Handle ModelState validation errors
          const modelErrors = error?.error?.errors;
          if (modelErrors) {
            const messages: string[] = [];

            for (const key in modelErrors) {
              const errs = modelErrors[key];
              messages.push(...errs);
            }

            if (messages.length > 0) {
              errorMsg = messages.join('<br>');
            }
          }
        }

        // Display error to user (webapp.component shows the toast via globalError$)
        this.globalLoadingFacade.globalErrorShow(
          errorMsg ?? 'Error occurred',
          3500
        );

        // Unauthenticated
        if (error.status === 401) {
          location.href = '/auth/login';
        }

        return throwError(() => error);
      })
    );
  }
}
