import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { LoginService } from './login.service';
import { findIndex } from 'lodash';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { RegisterService } from '../register/register.service';
import { AlertService } from '../help/alert.service';
import thaiIdCard from 'thai-id-card';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  userTypeId: any;
  vendor: any;
  errorMessage: string = null;
  isError = false;
  version: any;
  isLogin: any = false;
  modalCheck: any = false;
  modalOTP: any = false;
  dateOtp: any = 0;
  refCode = false;


  passwordNew: any;
  usernameShow: any = '';
  cid: any = '';
  phoneNumber: any = '';
  checkCid: any;
  checkPhone: any;
  checkUser: any = false;
  isVerify = false;
  otp = '';
  userId = '';
  isSave = false;
  passwordConfirm: any = '';
  checkPassword: any;
  checkPasswordConfirm: any;
  demo = '';
  transactionID: any;
  @ViewChild('loading', { static: true }) loading: any;

  public jwtHelper = new JwtHelperService();
  constructor(
    private route: Router,
    private loginService: LoginService,
    private alertService: AlertService,
    private registerService: RegisterService,
  ) { }

  ngOnInit() {
    this.getVersion();
    this.getDemo();
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

  async getDemo() {
    try {
      const rs: any = await this.loginService.getDemo();
      if (rs.ok) {
        this.demo = 'Demo ทดสอบ Demo ทดสอบ Demo ';
        sessionStorage.setItem('demo', this.demo);
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
            this.route.navigate(['/admin2']);
          } else if (decoded.type === 'STAFF') {
            // if (findIndex(rights, { name: 'STAFF_REQUISITION_SUPPLIES' }) > -1) {
            //   this.route.navigate(['/staff/requisition-supplies']);
            // } else {
            //   this.route.navigate(['/staff/inventory']);
            // }
            this.route.navigate(['/staff2/home']);
          } else if (decoded.type === 'MANAGER') {
            this.route.navigate(['/manager2']);
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
    // this.route.navigate(['/register']);
    this.route.navigate(['/new-register']);
  }

  async enterCid() {
    if (this.cid.length === 13) {
      this.checkCid = thaiIdCard.verify(this.cid);
    } else {
      this.checkCid = false;
    }
  }

  async enterPhone() {
    this.checkPhone = /^([0-9]{10})$/.test(this.phoneNumber);
  }

  async enterPassword() {
    this.checkPassword = /^(?=.*[A-Za-z])(?=.*[0-9]).{8,}$/.test(this.passwordNew);
    if (this.passwordNew === this.passwordConfirm && this.checkPassword) {
      this.checkPasswordConfirm = true;
    } else if (this.passwordNew !== this.passwordConfirm) {
      this.checkPasswordConfirm = false;
    }
  }

  async enterPasswordConfirm() {
    if (this.passwordNew === this.passwordConfirm && this.checkPassword) {
      this.checkPasswordConfirm = true;
    } else if (this.passwordNew !== this.passwordConfirm) {
      this.checkPasswordConfirm = false;
    }
  }

  async forgotpPassword() {
    this.userId = null;
    this.checkUser = false;
    this.checkCid = false;
    this.checkPhone = false;
    this.isVerify = false;
    this.usernameShow = '';
    this.cid = '';
    this.phoneNumber = '';
    this.passwordNew = '';
    this.passwordConfirm = '';
    this.dateOtp = 0;
    this.modalCheck = true;
  }

  async onClickRequestOTP() {
    try {
      if (this.checkCid && this.checkPhone) {
        this.isSave = true;
        const rs: any = await this.loginService.getUsername(this.cid, this.phoneNumber);
        if (rs.rows.length) {
          this.usernameShow = rs.rows[0].username;
          this.userId = rs.rows[0].id;
          await this.sendRequestOTP();
          this.modalCheck = false;
          this.modalOTP = true;
        } else {
          this.alertService.error('ไม่พบเลขบัตรประชาชน หรือ เบอร์มือถือ ในระบบ');
        }
      } else {
        this.alertService.error('กรุณากรอกข้อมูลให้ถูกต้อง');
      }
      this.isSave = false;
    } catch (error) {
      this.isSave = false;
      this.alertService.error();
    }
    console.log('onClickRequestOTP');
    // this.sendRequestOTP();
  }

  async sendRequestOTP() {
    try {
      this.isSave = true;
      if (this.phoneNumber) {
        const date = (+moment().format('h') * 60) + +moment().format('m');
        if (this.dateOtp < date) {
          this.dateOtp = date + 5;
          const rs: any = await this.registerService.requestOTP(this.phoneNumber);
          if (rs.ok) {
            this.refCode = rs.ref_code;
            this.transactionID = rs.transaction_id;
            this.vendor = rs.vendor;
          }
        } else {
          this.alertService.error('กรุณารอ 5 นาที');
        }
      }
      this.isSave = false;
    } catch (error) {
      this.isSave = false;
      console.log(error);
    }
  }

  async verifyOTP() {
    try {
      if (this.otp) {
        this.isSave = true;
        const rs: any = await this.registerService.verifyOTP(this.phoneNumber, this.otp, this.transactionID, this.vendor);
        if (rs.ok) {
          this.alertService.success('ยืนยันสำเร็จ');
          this.isVerify = true;
        } else {
          this.alertService.error('OTP ไม่ถูกต้อง');
        }
      } else {
        this.alertService.error('กรอก OTP');
      }
      this.isSave = false;
    } catch (error) {
      this.isSave = false;
      console.log(error);
    }
  }

  async updatePassword() {
    try {
      const rs: any = await this.loginService.updatePassword(this.userId, this.passwordNew);
      if (rs.ok) {
        this.alertService.success('เปลี่ยนรหัสสำเร็จ');
        this.modalOTP = false;
      }
    } catch (error) {
      this.alertService.error();
    }
  }

}
