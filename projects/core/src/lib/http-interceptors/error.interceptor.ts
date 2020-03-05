import { HttpClientUtils } from "../utils/http-client.utils";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private message: MessageService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          this.message.addAll(HttpClientUtils.getAllErrorMessages(error));
        }
        return throwError(error);
      })
    );
  }
}
