import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { IMyOptions } from 'mydatepicker-th';
import { ReportService } from '../report.service';
import { AlertService } from '../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-report-discharge-daily',
  templateUrl: './report-discharge-daily.component.html',
  styles: []
})
export class ReportDischargeDailyComponent implements OnInit {

  constructor(
    private service: ReportService,
    private alertService: AlertService
  ) { }
  dateDischarge: any;
  dateEntry: any;
  list: any;
  listEntry: any;
  @ViewChild('loading') loading: any;
  public jwtHelper = new JwtHelperService();
  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };

  ngOnInit() {
    this.dateDischarge = {
      date: {
        year: moment().get('year'),
        month: moment().get('month') + 1,
        day: moment().get('date')
      }
    };
    this.dateEntry = {
      date: {
        year: moment().get('year'),
        month: moment().get('month') + 1,
        day: moment().get('date')
      }
    };
    this.getdischargeDaily();
  }

  onChangeDateDischarge(e: any) {
    if (e.formatted !== '') {
      this.dateDischarge = { date: e.date };
      this.getdischargeDaily();
    }
  }

  onChangeDateEntry(e: any) {
    if (e.formatted !== '') {
      this.dateEntry = { date: e.date };
      this.getDischargeCaseEntryDate();
    }
  }

  async getdischargeDaily() {
    this.loading.show();
    try {
      const date = this.dateDischarge.date.year + '-' + this.dateDischarge.date.month + '-' + this.dateDischarge.date.day;
      const rs: any = await this.service.dischargeDaily(date);
      if (rs.ok) {
        this.list = rs.rows;
        this.loading.hide();
      } else {
        this.loading.hide();
        this.alertService.error();
      }
    } catch (error) {
      this.loading.hide();
      this.alertService.error(error);
    }
  }

  async getDischargeCaseEntryDate() {
    this.loading.show();
    try {
      const date = this.dateEntry.date.year + '-' + this.dateEntry.date.month + '-' + this.dateEntry.date.day;
      const rs: any = await this.service.dischargeCaseEntryDate(date);
      if (rs.ok) {
        this.listEntry = rs.rows;
        this.loading.hide();
      } else {
        this.loading.hide();
        this.alertService.error();
      }
    } catch (error) {
      this.loading.hide();
      this.alertService.error(error);
    }
  }

  async doExportExcel() {
    this.loading.show();
    try {
      const date = this.dateDischarge.date.year + '-' + this.dateDischarge.date.month + '-' + this.dateDischarge.date.day;
      const rs: any = await this.service.dischargeDailyExport(date);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('รายงานผู้ป่วย DISCHARGE', 'xlsx', rs);
        this.loading.hide();
      }
    } catch (error) {
      console.log(error);
      this.alertService.error();
      this.loading.hide();
    }
  }

  async doExportExcelEntryDate() {
    this.loading.show();
    try {
      const date = this.dateEntry.date.year + '-' + this.dateEntry.date.month + '-' + this.dateEntry.date.day;
      const rs: any = await this.service.dischargeCaseEntryDateExport(date);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('รายงานผู้ป่วย DISCHARGE ตามวันที่บันทึก', 'xlsx', rs);
        this.loading.hide();
      }
    } catch (error) {
      console.log(error);
      this.alertService.error();
      this.loading.hide();
    }
  }

  downloadFile(name, type, data: any) {
    try {
      const url = window.URL.createObjectURL(new Blob([data]));
      console.log(url);
      const fileName = `${name}.${type}`;
      // Debe haber una manera mejor de hacer esto...
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove(); // remove the element
    } catch (error) {
      console.log(error);
      this.alertService.error();
    }
  }

}
