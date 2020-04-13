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
  hospTypeCode: any;
  collapsible = true;
  collapse = true;
  rights: any;
  requisitionMenu: any;
  requisitionSuppliesMenu: any;
  checkBedMenu: any;
  checkSuppliesMenu: any;
  balanceSuppliesMenu: any;
  balanceBedMeny: any;
  statusTrackingMenu: any;
  settingMenu: any;

  public jwtHelper = new JwtHelperService();
  constructor(
    private route: Router,
  ) {
    const decoded = this.jwtHelper.decodeToken(sessionStorage.getItem('token'));
    this.fullname = decoded.fullname;
    this.hospname = decoded.hospname;
    this.rights = decoded.rights;

    this.requisitionMenu = findIndex(this.rights, { name: 'STAFF_REQUISITION' }) === -1 ? false : true;
    this.requisitionSuppliesMenu = findIndex(this.rights, { name: 'STAFF_REQUISITION_SUPPLIES' }) === -1 ? false : true;
    this.checkBedMenu = findIndex(this.rights, { name: 'STAFF_CHECK_BEDS' }) === -1 ? false : true;
    this.checkSuppliesMenu = findIndex(this.rights, { name: 'STAFF_CHECK_SUPPLIES' }) === -1 ? false : true;
    this.balanceSuppliesMenu = findIndex(this.rights, { name: 'STAFF_STOCK_SUPPLIES' }) === -1 ? false : true;
    this.balanceBedMeny = findIndex(this.rights, { name: 'STAFF_STOCK_BEDS' }) === -1 ? false : true;
    this.statusTrackingMenu = findIndex(this.rights, { name: 'STAFF_STATUS_TRACKING' }) === -1 ? false : true;
    this.settingMenu = findIndex(this.rights, { name: 'STAFF_SETTINGS' }) === -1 ? false : true;

  }

  ngOnInit() {
  }

  logout() {
    sessionStorage.removeItem('token');
    this.route.navigate(['/login']);
  }
}
