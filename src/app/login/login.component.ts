import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { LoginService } from './login.service';
import * as findIndex from 'lodash/findIndex';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  userTypeId: any;
  errorMessage: string = null;
  isError = false;
  version: any;
  isLogin: any = false;

  @ViewChild('loading') loading: any;

  public jwtHelper = new JwtHelperService();
  constructor(private route: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.getVersion();
  }

  async getVersion() {
    try {
      const rs: any = await this.loginService.getVersion();
      if (rs.ok) {
        this.version = rs.message;
      }
    } catch (error) {

    }
  }

  async doLogin() {
    this.isLogin = true;
    this.loading.show();
    try {
      if (this.username && this.password) {
        const rs: any = await this.loginService.doLogin(this.username, this.password);
        if (rs.ok) {
          sessionStorage.setItem('token', rs.token);
          const decoded = this.jwtHelper.decodeToken(rs.token);
          if (decoded.type === 'ADMIN') {
            this.route.navigate(['/admin']);
          } else if (decoded.type === 'STAFF') {
            // if (findIndex(rights, { name: 'STAFF_REQUISITION_SUPPLIES' }) > -1) {
            //   this.route.navigate(['/staff/requisition-supplies']);
            // } else {
            //   this.route.navigate(['/staff/inventory']);
            // }
            this.route.navigate(['/staff/home']);
          } else if (decoded.type === 'MANAGER') {
            this.route.navigate(['/manager']);
          }
        } else {
          this.isError = true;
          this.errorMessage = 'ชื่อผู้ใช้งาน หรือ รหัสผ่าน ไม่ถูกต้อง';
          this.isLogin = false;
          this.loading.hide();
        }
      } else {
        this.isError = true;
        this.loading.hide();
        this.errorMessage = 'กรุณาระบุชื่อผู้ใช้งาน หรือ รหัสผ่าน';
        this.isLogin = false;
      }
    } catch (error) {
      this.isLogin = false;
      this.loading.hide();
    }
  }

  onKeyEnter(e) {
    if (+e.keyCode === 13) {
      this.doLogin();
    }
  }

  doRegister() {
    this.route.navigate(['/register']);
  }

}
