import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { LoginService } from '../login/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { RegisterService } from '../register/register.service';
import { AlertService } from '../help/alert.service';
import thaiIdCard from 'thai-id-card';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styles: []
})
export class ResetPasswordComponent implements OnInit {

  username: string;
  password: string;
  vendor: any;
  isSave = false;
  userTypeId: any;
  errorMessage: string = null;
  isError = false;
  version: any;
  isLogin: any = false;
  modalCheck: any = true;
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

  passwordConfirm: any = '';
  checkPassword: any;
  checkPasswordConfirm: any;
  demo = '';
  redirect: any;
  transactionID: any;
  @ViewChild('loading' ,{static: false}) loading: any;

  public jwtHelper = new JwtHelperService();
  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private alertService: AlertService,
    private registerService: RegisterService,
  ) {
    this.route.queryParams.subscribe(params => {
      this.redirect = params.redirect ? params.redirect : null;
    });
    console.log(this.redirect);
  }

  ngOnInit() {
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
    if (this.checkCid && this.checkPhone) {
      try {
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
        // this.isSave = false;
      } catch (error) {
        this.isSave = false;
        this.alertService.error();
      }
    } else {
      this.alertService.error('กรุณากรอกข้อมูลให้ถูกต้อง');
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
    } catch (error) {
      console.log(error);
    }
  }

  async updatePassword() {
    try {
      const rs: any = await this.loginService.updatePassword2(this.userId, this.cid, this.passwordNew);
      if (rs.ok) {
        if (this.redirect) {
          window.location.href = this.redirect;
        } else {
          window.location.reload();
        }
      }
    } catch (error) {
      this.alertService.error();
    }
  }
}
