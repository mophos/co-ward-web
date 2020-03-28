import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AlertService } from '../../help/alert.service';
import * as findIndex from 'lodash/findIndex';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styles: []
})
export class ManageUserComponent implements OnInit {

  list: any = [];

  username: any;
  password: any;
  hospcode: any;
  prename: any;
  fname: any;
  lname: any;
  position: any;
  email: any;
  level: any;
  id: any;

  isUpdate = false;
  modal = false;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    try {
      const rs: any = await this.userService.getList();
      if (rs.ok) {
        this.list = rs.rows;
      } else {
        this.alertService.error();
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async onClickAdd() {
    this.modal = true;
    this.clearForm();
  }

  async clearForm() {
    this.username = null;
    this.password = null;
    this.hospcode = null;
    this.prename = null;
    this.fname = null;
    this.lname = null;
    this.position = null;
    this.email = null;
    this.level = null;
    this.id = null;
  }

  async save() {
    try {
      const data = {
        username: this.username,
        password: this.password,
        hospcode: this.hospcode,
        prename: this.prename,
        fname: this.fname,
        lname: this.lname,
        position: this.position,
        email: this.email,
        level: this.level
      }

      let rs: any;
      if (this.isUpdate) {
        rs = await this.userService.update(data, this.id);
      } else {
        rs = await this.userService.save(data);
      }

      if (rs.ok) {
        this.alertService.success();
        this.getList();
        this.modal = false;
      } else {
        this.alertService.error();
      }
    } catch (error) {
      this.alertService.error();
      this.modal = false;
    }
  }

  async onClickEdit(l) {
    this.modal = true;
    this.isUpdate = true;
    this.id = l.id;
    this.username = l.username;
    this.password = l.password;
    this.hospcode = l.hospcode;
    this.prename = l.prename;
    this.fname = l.fname;
    this.lname = l.lname;
    this.position = l.position;
    this.email = l.email;
    this.level = l.level;
  }

  async onClickRemove(l) {
    try {
      const confirm = await this.alertService.confirm();
      if (confirm) {
        const idx = findIndex(this.list, { id: +l.id });
        if (idx > -1) {
          const rs: any = await this.userService.remove(l.id);
          if (rs.ok) {
            this.list.splice(idx, 1);
          } else {
            this.alertService.error();
          }
        }
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }
}
