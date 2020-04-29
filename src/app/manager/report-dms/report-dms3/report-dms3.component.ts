import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/help/alert.service';
import { ReportDmsService } from '../report-dms.service';
import { IMyOptions } from 'mydatepicker-th';
import * as moment from 'moment';
import { sumBy, map } from 'lodash';
@Component({
  selector: 'app-report-dms3',
  templateUrl: './report-dms3.component.html',
  styles: []
})
export class ReportDms3Component implements OnInit {
  @ViewChild('loading') public loading;
  list: any;
  date: any;
  sum = {
    ip_pui: '-',
    asymptomatic: '-',
    mild: '-',
    moderate: '-',
    severe: '-'
  };
  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };
  constructor(
    private alertService: AlertService,
    private reportService: ReportDmsService, ) { }

  async ngOnInit() {
    this.date = {
      date: {
        year: moment().get('year'),
        month: moment().get('month') + 1,
        day: moment().get('date')
      }
    };
    await this.getList();
  }

  async getList() {
    this.loading.show();
    try {
      const date = this.date.date.year + '-' + this.date.date.month + '-' + this.date.date.day;
      const rs: any = await this.reportService.getReport3(date);
      if (rs.ok) {
        this.list = rs.rows;
        this.sum = {
          ip_pui: sumBy(this.list, 'ip_pui'),
          asymptomatic: sumBy(this.list, 'asymptomatic'),
          mild: sumBy(this.list, 'mild'),
          moderate: sumBy(this.list, 'moderate'),
          severe: sumBy(this.list, 'severe'),
        };
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
  async onClickExport() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.getReport3Excel(`${this.date.date.year}-${this.date.date.month}-29`);
      console.log(rs);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('รายงานการแจ้งจำนวนผู้ป่วยเพื่อเบิกเวชภัณฑ์​สิ้นเปลืองประจำวัน', 'xlsx', rs);
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
