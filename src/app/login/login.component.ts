import { Component, OnInit } from '@angular/core';
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

  public jwtHelper = new JwtHelperService();
  constructor(private route: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.getVersion();
  }

  async getVersion() {
    try {
      let rs: any = await this.loginService.getVersion();
      if (rs.ok) {
        this.version = rs.message;
      }
    } catch (error) {

    }
  }

  async doLogin() {
    if (this.username && this.password) {
      const rs: any = await this.loginService.doLogin(this.username, this.password);

      if (rs.ok) {
        sessionStorage.setItem('token', rs.token);
        const decoded = this.jwtHelper.decodeToken(rs.token);
        const rights = decoded.rights;
        if (decoded.type === 'ADMIN') {
          this.route.navigate(['/admin']);
        } else if (decoded.type === 'STAFF') {
          if (findIndex(rights, { name: 'STAFF_REQUISITION' }) > -1) {
            this.route.navigate(['/staff/requisition']);
          } else {
            this.route.navigate(['/staff/inventory']);
          }
        } else if (decoded.type === 'MANAGER') {
          this.route.navigate(['/manager']);
        }
      } else {
        this.isError = true;
        this.errorMessage = 'ชื่อผู้ใช้งาน หรือ รหัสผ่าน ไม่ถูกต้อง';

      }
    } else {
      this.isError = true;
      this.errorMessage = 'กรุณาระบุชื่อผู้ใช้งาน หรือ รหัสผ่าน';
    }
  }

  onKeyEnter(e) {
    if (+e.keyCode === 13) {
      this.doLogin();
    }
  }

  register() {
    this.route.navigate(['/register-drug']);
  }

}
