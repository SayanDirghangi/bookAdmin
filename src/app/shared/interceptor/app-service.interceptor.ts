import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { ErrorPopupComponent } from '../popup/error-popup/error-popup.component';

@Injectable()
export class AppServiceInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let errorDetail: Record<string, unknown> | null = null;

    console.log('req...', request.url);

    if (!request.url.includes('api/trkinbound-drivers')) {
      // this.loaderService.show();
    }

    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            console.log('Event status:', event.status);

            if (
              event.url?.includes('api/account') &&
              !event.url?.includes('/intermediate') &&
              !event.url?.includes('assets/i18n')
            ) {
              if (event.status >= 400 && event.status <= 402) {
                errorDetail = {
                  statusText: event.statusText,
                  status: event.status,
                  url: event.url,
                  message: event.body
                };
              }
            }
          }
        },

        error: (error: HttpErrorResponse) => {
          console.log('Error status:', error.status);

          let errorObj: any;
          let errorPayload: any = error.error;
          let fieldErrors: Array<{
            fieldName: unknown;
            fieldErrorMessage: unknown;
          }> = [];

          // Handle ArrayBuffer error
          if (errorPayload instanceof ArrayBuffer) {
            const decodedError = String.fromCharCode(
              ...new Uint8Array(errorPayload)
            );
            errorPayload = this.tryParseJson(decodedError);
          }

          if (errorPayload) {
            errorObj =
              typeof errorPayload === 'string'
                ? this.tryParseJson(errorPayload)
                : errorPayload;
          }

          // Extract field errors if present
          if (Array.isArray(errorObj?.fieldErrors)) {
            fieldErrors = errorObj.fieldErrors.map((fe: any) => ({
              fieldName: fe.field,
              fieldErrorMessage: fe.message
            }));

            errorDetail = { fieldErrors };
          } else {
            errorDetail = {
              statusText: errorPayload?.title,
              status: errorPayload?.status,
              url: errorPayload?.path,
              message: errorPayload?.detail
            };
          }

          if (error.status === 401) {
            errorDetail = {
              statusText: 'Unauthorized',
              status: error.status,
              url: error.url ?? request.url,
              message:
                'The current user session is no longer valid. Please login again to continue use of the application'
            };
          }

          this.dialog.open(ErrorPopupComponent, {
            width: '700px',
            height: 'auto',
            data: { errorData: this.buildErrorDetailForPopup(errorDetail, error) },
            disableClose: true
          });
        }
      })
    );
  }

  private buildErrorDetailForPopup(
    errorDetail: Record<string, unknown> | null,
    error: HttpErrorResponse
  ): Record<string, unknown> {
    const fallbackMessage = 'Something went wrong. Please try again later.';
    const message = String(
      errorDetail?.['message'] ?? error.message ?? fallbackMessage
    ).trim();

    return {
      statusText: errorDetail?.['statusText'] ?? error.statusText,
      status: errorDetail?.['status'] ?? error.status,
      url: errorDetail?.['url'] ?? error.url,
      message: message || fallbackMessage,
      fieldErrors: Array.isArray(errorDetail?.['fieldErrors'])
        ? errorDetail?.['fieldErrors']
        : []
    };
  }

  private tryParseJson(value: string): unknown {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
}
