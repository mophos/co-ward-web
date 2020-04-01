import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import * as findIndex from 'lodash/findIndex';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: []
})
export class LayoutComponent implements OnInit {

  fullname: any;
  hospname: any;
  collapsible = true;
  collapse = false;
  rights: any;
  restockMenu: any;
  minMaxMenu: any;
  userManageMenu: any;
  suppliesManageMenu: any;


  public jwtHelper = new JwtHelperService();
  constructor(
    private route: Router,
  ) {
    const decoded = this.jwtHelper.decodeToken(sessionStorage.getItem('token'));
    this.rights = decoded.rights;
    this.fullname = decoded.fullname;
    this.hospname = decoded.hospname;
    this.restockMenu = findIndex(this.rights, 'ADMIN_RESTOCK') === -1 ? false : true;
    this.minMaxMenu = findIndex(this.rights, 'ADMIN_MIN_MAX') === -1 ? false : true;
    this.userManageMenu = findIndex(this.rights, 'ADMIN_USER_MANAGE') === -1 ? false : true;
    this.suppliesManageMenu = findIndex(this.rights, 'ADMIN_SUPPLIES_MANAGE') === -1 ? false : true;
  }

  ngOnInit() {
  }

  logout() {
    sessionStorage.removeItem('token');
    this.route.navigate(['/login']);
  }
}
