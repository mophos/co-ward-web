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
  collapse = false;
  rights: any;

  covidCaseMenu: any;
  covidCaseStatusMenu: any;
  covidApproveDrugsMenu: any;
  covidApproveSuppliesMenu: any;
  // ---------------------------------
  covidCaseRequisitionMenu: any;
  covidProductStock: any;
  surgicalSPHP: any;
  stockSuppliesMenu: any;
  trackingMenu: any;
  // ---------------------------------
  checkSuppliesMenu: any;
  // ---------------------------------
  settingBasicMenu: any;
  settingBedsMenu: any;
  settingMedicalSuppliesMenu: any;
  settingProfessionalMenu: any;
  settingUserMenu: any;
  settingProvinceSubUserMenu: any;
  // ---------------------------------
  reportPatientsMenu: any;

  public jwtHelper = new JwtHelperService();
  constructor(
    private route: Router,
  ) {
    const decoded = this.jwtHelper.decodeToken(sessionStorage.getItem('token'));
    this.fullname = decoded.fullname;
    this.hospname = decoded.hospname;
    this.rights = decoded.rights;

    this.covidCaseMenu = findIndex(this.rights, { name: 'STAFF_COVID_CASE' }) === -1 ? false : true;
    this.covidCaseStatusMenu = findIndex(this.rights, { name: 'STAFF_COVID_CASE_STATUS' }) === -1 ? false : true;
    this.covidApproveDrugsMenu = findIndex(this.rights, { name: 'STAFF_APPROVED_DRUGS' }) === -1 ? false : true;
    this.covidApproveSuppliesMenu = findIndex(this.rights, { name: 'STAFF_APPROVED_SUPPLIES' }) === -1 ? false : true;
    this.settingProvinceSubUserMenu = findIndex(this.rights, { name: 'STAFF_PROVINCE_SET_SUPER_USER' }) === -1 ? false : true;
    // ---------------------------------------------------------------------------------------------------
    this.covidCaseRequisitionMenu = findIndex(this.rights, { name: 'STAFF_COVID_CASE_REQUISITION' }) === -1 ? false : true;
    this.covidProductStock = findIndex(this.rights, { name: 'STAFF_STOCK_PRODUCTS' }) === -1 ? false : true;
    this.surgicalSPHP = findIndex(this.rights, { name: 'STAFF_SURGICAL_SPHP' }) === -1 ? false : true;
    this.stockSuppliesMenu = findIndex(this.rights, { name: 'STAFF_STOCK_SUPPLIES' }) === -1 ? false : true;
    this.trackingMenu = findIndex(this.rights, { name: 'STAFF_TRACKING' }) === -1 ? false : true;
    // ---------------------------------------------------------------------------------------------------
    this.checkSuppliesMenu = findIndex(this.rights, { name: 'STAFF_CHECK_SUPPLIES' }) === -1 ? false : true;
    this.reportPatientsMenu = findIndex(this.rights, { name: 'STAFF_REPORT_PATEINTS' }) === -1 ? false : true;
    // ---------------------------------------------------------------------------------------------------
    this.settingBasicMenu = findIndex(this.rights, { name: 'STAFF_SETTING_BASIC' }) === -1 ? false : true;
    this.settingBedsMenu = findIndex(this.rights, { name: 'STAFF_SETTING_BEDS' }) === -1 ? false : true;
    this.settingMedicalSuppliesMenu = findIndex(this.rights, { name: 'STAFF_SETTING_MEDICALSUPPLIE' }) === -1 ? false : true;
    this.settingProfessionalMenu = findIndex(this.rights, { name: 'STAFF_SETTING_PROFESSIONAL' }) === -1 ? false : true;
    this.settingUserMenu = findIndex(this.rights, { name: 'STAFF_SETTING_USERS' }) === -1 ? false : true;
  }

  ngOnInit() {
  }

  logout() {
    sessionStorage.removeItem('token');
    this.route.navigate(['/login']);
  }
}
