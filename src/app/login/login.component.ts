import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { LoginService } from './login.service';

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
  userTypes: any = [{ type: 'ผู้ใช้งานทั่วไป', id: 1 }, { type: 'ผู้ดูแลระบบ', id: 2 }];
  errorMessage: string = null;
  isError = false;

  public jwtHelper = new JwtHelperService();
  constructor(private route: Router, private loginService: LoginService) { }

  ngOnInit() {
  }

  async doLogin() {
    if (this.username && this.password) {
      const rs: any = await this.loginService.doLogin(this.username, this.password);
      if (rs.ok) {
        sessionStorage.setItem('token', rs.token);
        const decoded = this.jwtHelper.decodeToken(rs.token);
        if (decoded.type === 'ADMIN') {
          this.route.navigate(['/admin']);
        } else if (decoded.type === 'STAFF') {
          this.route.navigate(['/staff']);
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

}
