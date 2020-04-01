import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  fullname: any;
  hospname: any;
  collapsible = true;
  collapse = false;
  public jwtHelper = new JwtHelperService();
  constructor(
    private route: Router,
  ) {
    const decoded = this.jwtHelper.decodeToken(sessionStorage.getItem('token'));
    this.fullname = decoded.fullname;
    this.hospname = decoded.hospname;
  }

  ngOnInit() {
  }

  logout() {
    sessionStorage.removeItem('token');
    this.route.navigate(['/login']);
  }
}