import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, tap, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { GlobalLoadingFacade } from '../store/global-loading/global-loading.facade';
import {
  ToastNotificationService,
  NotificationTypeEnums,
} from './toast-notification.service';

@Injectable({
  providedIn: 'root',
})
export class AppInterceptorService implements HttpInterceptor {
  constructor(
    private globalLoadingFacade: GlobalLoadingFacade,
    private toastNotificationService: ToastNotificationService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedRequest = request;

    return next.handle(modifiedRequest).pipe(
      tap((event: HttpEvent<any>) => {
        // Handle successful responses
        if (event instanceof HttpResponse) {
          const response = event.body;
          console.log(response);

          if (response) {
            let messageToShow = '';

            // Read message from backend
            if (response.message && response.message.trim()) {
              messageToShow = response.message;
            } else if (
              response.messages &&
              Array.isArray(response.messages) &&
              response.messages.length > 0
            ) {
              messageToShow = response.messages.join(', ');
            }

            if (messageToShow) {
              const notificationType =
                response.succeeded === false
                  ? NotificationTypeEnums.ERROR
                  : NotificationTypeEnums.SUCCESS;

              this.toastNotificationService.openToast(
                messageToShow,
                notificationType
              );
            }
          }
        }
      }),

      catchError((error: HttpErrorResponse) => {
        console.log('HTTP ERROR:', error);

        let errorMsg = 'An unexpected error occurred.';

        // ---------- CLIENT SIDE ERROR ----------
        if (error.error instanceof ErrorEvent) {
          console.log('This is client side error');
          errorMsg = error.error.message ?? errorMsg;
        }

        // ---------- SERVER SIDE ERROR ----------
        else {
          console.log('This is server side error');

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

        // Display error to user
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
