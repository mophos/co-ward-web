import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { findIndex } from 'lodash';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  fullname: any;
  hospname: any;
  rights: any;
  collapsible = true;
  collapse = false;
  reportResource: any;
  reportPatient: any;
  reportBed: any;
  reportLabPositive: any;
  public jwtHelper = new JwtHelperService();
  constructor(
    private route: Router,
  ) {
    const decoded = this.jwtHelper.decodeToken(sessionStorage.getItem('token'));
    this.rights = decoded.rights;
    this.fullname = decoded.fullname;
    this.hospname = decoded.hospname;
    this.reportResource = findIndex(this.rights, { name: 'MANAGER_REPORT_RESOURCE' }) === -1 ? false : true;
    this.reportPatient = findIndex(this.rights, { name: 'MANAGER_REPORT_PATIENT' }) === -1 ? false : true;
    this.reportBed = findIndex(this.rights, { name: 'MANAGER_REPORT_BED' }) === -1 ? false : true;
    this.reportLabPositive = findIndex(this.rights, { name: 'MANAGER_REPORT_LAB_POSITIVE' }) === -1 ? false : true;
  }

  ngOnInit() {
  }

  logout() {
    sessionStorage.removeItem('token');
    this.route.navigate(['/login']);
  }
}
