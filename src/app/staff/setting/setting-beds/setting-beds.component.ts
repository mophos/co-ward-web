import { SettingService } from './../../setting.service';
import { AlertService } from './../../../help/alert.service';
import { Component, OnInit } from '@angular/core';
import * as findIndex from 'lodash/findIndex';

@Component({
  selector: 'app-setting-beds',
  templateUrl: './setting-beds.component.html',
  styles: []
})
export class SettingBedsComponent implements OnInit {

  list = [];
  remain = [];
  isLoading = false;
  isSave = false;
  constructor(
    private alertService: AlertService,
    private settingService: SettingService
  ) { }

  ngOnInit() {
    this.getRemain();
    this.getList();
  }

  async getList() {
    try {
      this.isLoading = true;
      const rs: any = await this.settingService.getBeds();
      if (rs.ok) {
        this.list = rs.rows;
        for (const v of this.list) {
          const idx = findIndex(this.remain, { id: v.bed_id });
          v.use_covid_qty = this.remain[idx].count === null ? 0 : this.remain[idx].count;
        }
      } else {
        this.alertService.error(rs.error);
      }
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      this.alertService.error(error);
    }
  }

  async getRemain() {
    try {
      this.isLoading = true;
      const rs: any = await this.settingService.getRemain();
      if (rs.ok) {
        this.remain = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      this.alertService.error(error);
    }
  }

  async onClickSave() {
    try {
      this.isSave = true;
      const rs: any = await this.settingService.saveBeds(this.list);
      if (rs.ok) {
        this.getList();
        this.alertService.success();
      } else {
        this.alertService.error(rs.error);
      }
      this.isSave = false;
    } catch (error) {
      this.isSave = false;
      this.alertService.error(error);
    }
  }
}
