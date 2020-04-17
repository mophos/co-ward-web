import { Component, OnInit } from '@angular/core';
import { SettingService } from '../setting.service';
import { AlertService } from 'src/app/help/alert.service';
import { findIndex } from 'lodash';
@Component({
  selector: 'app-manage-province-set-sup-user',
  templateUrl: './manage-province-set-sup-user.component.html',
  styles: []
})
export class ManageProvinceSetSupUserComponent implements OnInit {
  loading = false;
  list: any;
  total = 0;
  limit = 20;
  offset = 0;

  constructor(
    private settingService: SettingService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getProvinceUserList();
  }

  async getProvinceUserList() {
    try {
      this.loading = true;
      const rs: any = await this.settingService.getProvinceUserList(this.limit, this.offset);
      if (rs.ok) {
        this.list = rs.rows;
        this.total = rs.total;
      } else {
        this.alertService.error();
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.alertService.error(error);
    }
  }

  async onChangeRightAdmin(item) {
    const idx = findIndex(this.list, item);
    const confirm = await this.alertService.confirm();
    if (confirm) {
      if (idx > -1) {
        const rs: any = await this.settingService.changeRightSupUser(item.id, this.list[idx].rightAdmin);
        if (rs.ok) {
          this.alertService.success();
          // this.list[idx].rightAdmin = !this.list[idx].rightAdmin;
        } else {
          this.alertService.error();
          this.list[idx].rightAdmin = !this.list[idx].rightAdmin;
        }
      } else {
        this.list[idx].rightAdmin = !this.list[idx].rightAdmin;
      }
    } else {
      this.list[idx].rightAdmin = !this.list[idx].rightAdmin;
    }
  }

  async onChangeApproved(item) {
    const idx = findIndex(this.list, item);
    const confirm = await this.alertService.confirm();
    if (confirm) {
      if (idx > -1) {
        const rs: any = await this.settingService.changeApproved(item.id, this.list[idx].approved);
        if (rs.ok) {
          this.alertService.success();
          if (!this.list[idx].approved) { this.list[idx].rightAdmin = false; }
        } else {
          this.alertService.error();
          this.list[idx].approved = !this.list[idx].approved;
        }
      } else {
        this.list[idx].approved = !this.list[idx].approved;
      }
    } else {
      this.list[idx].approved = !this.list[idx].approved;
    }
  }
}
