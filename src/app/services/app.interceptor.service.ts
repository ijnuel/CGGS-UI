import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import { GlobalLoadingFacade } from '../store/global-loading/global-loading.facade';

function serializeDates(value: any): any {
  if (value instanceof Date) {
    const y = value.getFullYear();
    const m = String(value.getMonth() + 1).padStart(2, '0');
    const d = String(value.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  if (Array.isArray(value)) {
    return value.map(serializeDates);
  }
  if (value !== null && typeof value === 'object') {
    const result: any = {};
    for (const key of Object.keys(value)) {
      result[key] = serializeDates(value[key]);
    }
    return result;
  }
  return value;
}

function extractErrorMessage(body: any): string {
  const fallback = 'An unexpected error occurred.';

  let parsed = body;
  if (typeof parsed === 'string') {
    try { parsed = JSON.parse(parsed); } catch { /* not JSON */ }
  }

  const msg =
    parsed?.message ??
    parsed?.Message ??
    parsed?.exceptionError ??
    parsed?.ExceptionError ??
    null;

  if (msg) return msg;

  // ModelState validation errors
  const modelErrors = parsed?.errors;
  if (modelErrors) {
    const messages: string[] = [];
    for (const key in modelErrors) {
      messages.push(...modelErrors[key]);
    }
    if (messages.length > 0) return messages.join('\n');
  }

  return fallback;
}

@Injectable({
  providedIn: 'root',
})
export class AppInterceptorService implements HttpInterceptor {
  constructor(private globalLoadingFacade: GlobalLoadingFacade) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedRequest = request.body
      ? request.clone({ body: serializeDates(request.body) })
      : request;

    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        // When responseType:'blob', Angular wraps the error body as a Blob.
        // Read it as text first, then extract the message.
        if (error.error instanceof Blob) {
          return from(error.error.text()).pipe(
            switchMap((text) => {
              this.showError(extractErrorMessage(text), error.status);
              return throwError(() => "Blob error: " + text);
            })
          );
        }

        // Client-side or standard server error
        const body = error.error instanceof ErrorEvent
          ? { message: error.error.message }
          : error.error;

        this.showError(extractErrorMessage(body), error.status);
        return throwError(() => "HTTP error: " + error.status);
      })
    );
  }

  private showError(message: string, status: number): void {
    console.log('Error intercepted:', { message, status });
    this.globalLoadingFacade.globalErrorShow(message, 3500);
    if (status === 401) {
      location.href = '/auth/login';
    }
  }
}
