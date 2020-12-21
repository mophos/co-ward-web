import { AlertService } from 'src/app/help/alert.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-dashboard',
  templateUrl: './login-dashboard.component.html',
  styleUrls: ['./login-dashboard.component.css']
})
export class LoginDashboardComponent implements OnInit {
  tel: any;
  otpResp = false;
  otp: any;
  vendor: any;
  transactionId: any;
  ref: any;
  isSave = false;
  loginErr = false;
  tellErr = false;
  public jwtHelper = new JwtHelperService();
  constructor(
    private route: Router,
    private loginService: LoginService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  async getOtp() {
    try {
      this.isSave = true;
      const rs: any = await this.loginService.requisOtp(this.tel);
      console.log(rs);
      if (rs.ok) {
        this.otpResp = true;
        this.ref = rs.ref_code;
        this.transactionId = rs.transaction_id;
        this.vendor = rs.vendor;
        this.tellErr = false;
      } else {
        this.tellErr = true;
        this.loginErr = false;
      }
      this.isSave = false;
    } catch (error) {
      this.isSave = false;
      this.alertService.serverError();

    }
  }

  async verifyOtp() {
    try {
      this.isSave = true;
      const rs: any = await this.loginService.verifyOtp(this.tel, this.transactionId, this.otp, this.vendor);
      if (rs.ok) {
        sessionStorage.setItem('token', rs.token);
        this.loginErr = false;
        const decoded = this.jwtHelper.decodeToken(rs.token);
        if (decoded.type === 'MANAGER') {
          this.route.navigate(['/manager']);
        }
      } else {
        this.tellErr = false;
        this.loginErr = true;
      }
      this.isSave = false;
    } catch (error) {
      this.isSave = false;
      this.alertService.serverError();
    }
  }

  async back() {
    this.otpResp = false;
    this.ref = null;
    this.transactionId = null;
    this.otp = null;
    this.vendor = null;
    this.tellErr = false;
    this.loginErr = false;
    this.tel = null;

  }

  async sumnmit() {

  }

}
