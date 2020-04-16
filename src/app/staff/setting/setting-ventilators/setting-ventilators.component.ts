
import { SettingService } from './../../setting.service';
import { AlertService } from './../../../help/alert.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting-ventilators',
  templateUrl: './setting-ventilators.component.html',
  styles: []
})
export class SettingVentilatorsComponent implements OnInit {
  list = [];
  isLoading = false;
  isSave = false;
  constructor(
    private alertService: AlertService,
    private settingService: SettingService
  ) { }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    try {
      this.isLoading = true;
      const rs: any = await this.settingService.getVentilators();
      if (rs.ok) {
        this.list = rs.rows;
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
      const rs: any = await this.settingService.saveVentilator(this.list);
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
