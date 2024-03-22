import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpContextToken } from '@angular/common/http';
import { NEVER, Observable, catchError, finalize, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Location } from '@angular/common';
export const NO_LOADER = new HttpContextToken(() => false);

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private _location: Location
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.context.get(NO_LOADER) === false) {
      this.ngxService.start()
    }

    var token = localStorage['token']

    // if (token) {
    //   let decodedTokenData = JSON.parse(window.atob(token.split('.')[1]))
    //   if (!(decodedTokenData.exp > Math.floor(new Date().getTime() / 1000))) {
    //     localStorage['token'] = ''
    //     this.router.navigate(['auth/login'])
    //     this.ngxService.stop()
    //     return NEVER;
    //   }
    // }

    request = request.clone({
      url: environment.apiUrl + request.url,
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    })

    return next.handle(request).pipe(
      finalize(() => {
        this.ngxService.stop()
      }),
      catchError((err: any) => {
        this.ngxService.stop()
        if (err.status === 401 || err.status == 403) {
          if (location.href.includes('/login')) {
            this.toastr.error(err.error.message)
          } else {
            this.router.navigate(['/auth/login'])
            // this.toastr.error('You are not Authorized for this Action')
            // this._location.back();
          }
        }
        return throwError(err)
      }));;
  }
}
