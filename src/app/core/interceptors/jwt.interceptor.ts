import {inject, Injectable} from '@angular/core';
import {
   HttpInterceptorFn
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);


  if (req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
    return next(req);
  }


  const token = authService.getToken();

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(authReq).pipe(
      catchError(error => {
        if (error.status === 401) {
          authService.logout();
          router.navigate(['/auth/login']);
        }
        return throwError(() => error);
      })
    );
  }

  return next(req);
};

