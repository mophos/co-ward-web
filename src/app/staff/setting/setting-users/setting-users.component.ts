import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../user.service';
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

  constructor(
    private alertService: AlertService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getListUser();
  }

  async getListUser() {
    try {
      let rs: any = await this.userService.getUser(this.query);
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
        let rs: any = await this.userService.removeUser(e.id);
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

  }
  // this.province = e.hosptype_id === '1' ? 'Y' : 'N';
}
