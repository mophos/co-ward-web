import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { findIndex } from 'lodash';
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
  hospitalManageMenu: any;
  restockCollectionMenu: any;
  systemManageMenu: any;


  public jwtHelper = new JwtHelperService();
  constructor(
    private route: Router,
  ) {
    const decoded = this.jwtHelper.decodeToken(sessionStorage.getItem('token'));
    this.rights = decoded.rights;
    this.fullname = decoded.fullname;
    this.hospname = decoded.hospname;
    // this.restockMenu = findIndex(this.rights, { name: 'ADMIN_RESTOCK' }) === -1 ? false : true;
    // this.minMaxMenu = findIndex(this.rights, { name: 'ADMIN_MIN_MAX' }) === -1 ? false : true;
    // this.hospitalManageMenu = findIndex(this.rights, { name: 'ADMIN_MANAGE_HOSPITALS' }) === -1 ? false : true;
    // this.userManageMenu = findIndex(this.rights, { name: 'ADMIN_MANAGE_USERS' }) === -1 ? false : true;
    // this.suppliesManageMenu = findIndex(this.rights, { name: 'ADMIN_MANAGE_SUPPLIES' }) === -1 ? false : true;
    this.restockCollectionMenu = findIndex(this.rights, { name: 'ADMIN_RESTOCK_COLLECTION' }) === -1 ? false : true;
    this.systemManageMenu = findIndex(this.rights, { name: 'ADMIN_MANAGE_SYSTEMS' }) === -1 ? false : true;
  }

  ngOnInit() {
  }

  logout() {
    sessionStorage.removeItem('token');
    this.route.navigate(['/login']);
  }
}
