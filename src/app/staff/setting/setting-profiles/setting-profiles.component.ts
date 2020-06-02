import { RegisterService } from './../../../register/register.service';
import { SettingService } from './../../setting.service';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../help/alert.service';
import { findIndex } from 'lodash';

@Component({
  selector: 'app-setting-profiles',
  templateUrl: './setting-profiles.component.html',
  styles: []
})
export class SettingProfilesComponent implements OnInit {

  user: any;
  position: any;
  title: any;

  positionList = [];
  titleList = [];

  fname: any;
  lname: any;
  email: any;
  username: any;
  password: any;

  checkPassword: any;
  phoneNumber: any;
  checkPhone: any;
  checkEmail: any;
  checkPasswordConfirm: any;
  passwordConfirm: any = '';
  constructor(
    private settingService: SettingService,
    private alertService: AlertService,
    private registerService: RegisterService
  ) { }

  async ngOnInit() {
    await this.getPosition();
    await this.getTitle();
  }

  async getUserInfo() {
    try {
      const rs: any = await this.settingService.getUserInfo();
      if (rs.ok) {
        this.user = rs.rows;
        const idxPosition = findIndex(this.positionList, { id: +this.user[0].position_id });
        if (idxPosition > -1) {
          this.position = this.positionList[idxPosition].id;
        }
        const idxTitle = findIndex(this.titleList, { id: +this.user[0].title_id });
        if (idxTitle > -1) {
          this.title = this.titleList[idxTitle].id;
        }
        this.fname = this.user[0].fname;
        this.lname = this.user[0].lname;
        this.email = this.user[0].email;
        this.username = this.user[0].username;
        this.phoneNumber = this.user[0].telephone;
        this.checkEmail = true;
        this.checkPhone = true;
        this.checkPassword = true;
      } else {
        this.alertService.error();
      }
    } catch (error) {
      console.log(error);

      this.alertService.error(error);
    }
  }

  async getPosition() {
    try {
      const rs: any = await this.registerService.getPosition();
      if (rs.ok) {
        this.positionList = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error.message);
    }
  }

  async enterEmail() {
    this.checkEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(this.email);
  }

  async enterPhone() {
    this.checkPhone = /^([0-9]{10})$/.test(this.phoneNumber);
  }

  async enterPassword() {
    this.checkPassword = /^(?=.*[A-Za-z])(?=.*[0-9]).{8,}$/.test(this.password);
    if (this.password === this.passwordConfirm && this.checkPassword) {
      this.checkPasswordConfirm = true;
    } else if (this.password !== this.passwordConfirm) {
      this.checkPasswordConfirm = false;
    }
  }

  async enterPasswordConfirm() {
    if (this.password === this.passwordConfirm && this.checkPassword) {
      this.checkPasswordConfirm = true;
    } else if (this.password !== this.passwordConfirm) {
      this.checkPasswordConfirm = false;
    }
  }

  async getTitle() {
    try {
      const rs: any = await this.registerService.getTitle();
      if (rs.ok) {
        this.titleList = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error.message);
    }
  }

  async save() {
    const confirm = await this.alertService.confirm();
    if (confirm) {
      try {
        const objUser: any = {};
        objUser.position_id = this.position;
        objUser.title_id = this.title;
        objUser.fname = this.fname;
        objUser.lname = this.lname;
        if (this.password !== '') {
          objUser.password = this.password;
        }
        objUser.email = this.email;
        objUser.telephone = this.phoneNumber;
        const rs: any = await this.settingService.updateUser(objUser);

        if (rs.ok) {
          this.alertService.success();
          this.getUserInfo();
          this.password = '';
          this.passwordConfirm = '';
        } else {
          this.alertService.error();
        }
      } catch (error) {
        this.alertService.error();
      }
    }
  }

}
