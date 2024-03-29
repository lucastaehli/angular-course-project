import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  /**
   * Adds the user token to the request in order to fetch data from firebase
   */
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      // only take one value from observable: get user and unsubscribe afterwards
      take(1),
      // wait on first observable to complete: get user and afterwards replace observable with new observable this.http.get
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
