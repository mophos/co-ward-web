
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthChecksupplie implements CanActivate {
  public token: string;
  public jwtHelper = new JwtHelperService();

  constructor(private router: Router) { }

  canActivate() {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const rights = decodedToken.rights;

      if (rights) {
        if (this.jwtHelper.isTokenExpired(token)) {
          this.router.navigate(['login']);
          return false;
        } else {
          let isAccess = false;
          if (_.findIndex(rights, { name: 'STAFF_CHECK_SUPPLIES' }) > -1) {
            isAccess = true;
          } else {
            isAccess = false;
          }

          if (!isAccess) {
            this.router.navigate(['login']);
            return false;
          } else {
            return true;
          }
        }

      } else {
        this.router.navigate(['login']);
        return false;
      }

    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
