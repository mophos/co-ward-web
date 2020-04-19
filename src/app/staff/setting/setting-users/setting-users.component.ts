import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../user.service';
import { RegisterService } from '../../../register/register.service';
import { AlertService } from '../../../help/alert.service';

@Component({
  selector: 'app-setting-users',
  templateUrl: './setting-users.component.html',
  styles: []
})
export class SettingUsersComponent implements OnInit {

  query: any = '';
  list: any;
  userId: any;
  province: any;
  isNodeDrugs: any;
  isNodeSupplies: any;

  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private registerService: RegisterService,
  ) { }

  ngOnInit() {
    this.getListUser();
  }

  async getListUser() {
    try {
      const rs: any = await this.userService.getUser(this.query);
      if (rs.ok) {
        this.list = rs.rows;
      }
    } catch (error) {
      this.alertService.error();
    }
  }

  doEnter(e) {
    if (e.keyCode === 13) {
      this.getListUser();
    }
  }

  async removeUser(e) {
    try {
      const confirm = await this.alertService.confirm();
      if (confirm) {
        const rs: any = await this.userService.removeUser(e.id);
        if (rs.ok) {
          this.getListUser();
          this.alertService.success();
        }
      }
    } catch (error) {
      this.alertService.error();
    }
  }

  async editRights(e) {
    if (Object.values(e).length) {
      this.province = e.hosptype_id === '1' ? true : false;
      const id = e.id;
      try {
        const rs: any = await this.registerService.getNodeDrugs(id);
        if (rs.ok) {
          if (rs.rows.length) {
            this.isNodeDrugs = true;
          } else {
            this.isNodeDrugs = false;
          }
        } else {
          this.alertService.error(rs.error);
        }

        const rs2: any = await this.registerService.getNodeSupplies(id);
        if (rs2.ok) {
          if (rs2.rows.length) {
            this.isNodeSupplies = true;
          } else {
            this.isNodeSupplies = false;
          }
        } else {
          this.alertService.error(rs.error);
        }
      } catch (error) {
        this.alertService.error(error.message);
      }
    }

    console.log(this.province);
    console.log(this.isNodeDrugs);
    console.log(this.isNodeSupplies);
  }
}
