
import { SettingService } from '../../setting.service';
import { AlertService } from '../../../help/alert.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting-medical-supplies',
  templateUrl: './setting-medical-supplies.component.html',
  styles: []
})
export class SettingMedicalSuppliesComponent implements OnInit {
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
      const rs: any = await this.settingService.getMedicalSupplies();
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
      const rs: any = await this.settingService.saveMedicalSupplies(this.list);
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
