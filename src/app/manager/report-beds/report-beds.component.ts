import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { AlertService } from '../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IMyOptions } from 'mydatepicker-th';
import * as moment from 'moment';
@Component({
  selector: 'app-report-beds',
  templateUrl: './report-beds.component.html',
  styles: []
})
export class ReportBedsComponent implements OnInit {
  list: any;
  zone: any = '';
  dateset: any;
  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };
  dataDate: any;
  @ViewChild('loading' ,{ static: true }) loading: any;

  public jwtHelper = new JwtHelperService();

  constructor(
    private service: ReportService,
    private alertService: AlertService
  ) {
    this.dateset = {
      date: {
        year: moment().get('year'),
        month: moment().get('month') + 1,
        day: moment().get('date')
      }
    };
  }

  async ngOnInit() {
    await this.getList();
  }

  async getList() {
    this.loading.show();
    try {
      const date = this.dateset.date.year + '-' + this.dateset.date.month + '-' + this.dateset.date.day;
      const rs: any = await this.service.getBeds(this.zone, date);
      if (rs.ok) {
        this.list = rs.rows;
        this.dataDate = rs.rows[0].timestamp;
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

  async export() {
    this.loading.show();
    try {
      const rs: any = await this.service.getReportBedExcel();
      console.log(rs);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('report-bed', 'xlsx', rs);
        // this.downloadFile('รายงานการจ่ายยา(แยกตามสถานที่จ่าย)', 'xlsx', url);
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

  async click(z) {
    this.zone = z;
    this.getList();
  }

  doEnter() {
    this.getList();
  }
}
