import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from "@angular/common/http";
import { Notify } from "notiflix";
import { Observable, tap } from "rxjs";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem("token");
    if (token) {
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
    }
    return next.handle(request).pipe(tap(() => {
    }, error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        Notify.failure("Invalid credentials", {
          position: "center-top",
          fontSize: "16px",
        });
      }
    }));
  }
}
