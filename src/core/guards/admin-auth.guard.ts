import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard  {

  constructor(
    private router: Router
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let token = localStorage['token']
      if (token) {
        let decodedTokenData = JSON.parse(window.atob(token.split('.')[1]))
        if (decodedTokenData.exp > Math.floor(new Date().getTime() / 1000)) {
          var roles = decodedTokenData.role.split(',')
          if (roles.some((x: any) => ['SuperAdmin', 'Admin'].includes(x))) {
            return true;
          }
        }
      }

      localStorage['token'] = ''
      this.router.navigate(['auth'])
      return false;
  }
}
