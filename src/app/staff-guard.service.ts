import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class StaffGuard implements CanActivate {
  public token: string;
  public jwtHelper = new JwtHelperService();

  constructor(private router: Router) { }

  canActivate() {
    const token = sessionStorage.getItem('token');
    let isStaff = false;

    try {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const type = decodedToken.type;
      if (type === 'STAFF') {
        isStaff = true;
      } else {
        isStaff = false;
      }
    } catch (error) {
      isStaff = false;
    }

    if (token) {
      if (this.jwtHelper.isTokenExpired(token)) {
        this.router.navigate(['login']);
        return false;
      } else {
        if (isStaff) {
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }
      }
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
