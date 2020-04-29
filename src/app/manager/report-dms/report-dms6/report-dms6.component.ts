import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportDmsService } from '../report-dms.service';
import { AlertService } from '../../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { sumBy } from 'lodash';

@Component({
  selector: 'app-report-dms6',
  templateUrl: './report-dms6.component.html',
  styles: []
})
export class ReportDms6Component implements OnInit {
  list: any;
  zone: any = '';
  date: any;
  aiir1: any;
  aiir2: any;
  aiir3: any;
  modi1: any;
  modi2: any;
  modi3: any;
  iso1: any;
  iso2: any;
  iso3: any;
  coh1: any;
  coh2: any;
  coh3: any;
  host1: any;
  host2: any;
  host3: any;

  @ViewChild('loading') loading: any;

  public jwtHelper = new JwtHelperService();

  constructor(
    private reportService: ReportDmsService,
    private alertService: AlertService
  ) { }

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
      const rs: any = await this.reportService.getReport6(date);
      if (rs.ok) {
        this.aiir1 = sumBy(rs.rows, 'AIIR_qty');
        this.aiir2 = sumBy(rs.rows, 'AIIR_usage_qty');
        this.aiir3 = sumBy(rs.rows, 'AIIR_qty') - sumBy(rs.rows, 'AIIR_usage_qty');
        this.modi1 = sumBy(rs.rows, 'Modified AIIR_qty');
        this.modi2 = sumBy(rs.rows, 'Modified AIIR_usage_qty');
        this.modi3 = sumBy(rs.rows, 'Modified AIIR_qty') - sumBy(rs.rows, 'Modified AIIR_usage_qty');
        this.iso1 = sumBy(rs.rows, 'Isolate_qty');
        this.iso2 = sumBy(rs.rows, 'Isolate_usage_qty');
        this.iso3 = sumBy(rs.rows, 'Isolate_qty') - sumBy(rs.rows, 'Isolate_usage_qty');
        this.coh1 = sumBy(rs.rows, 'Cohort_qty');
        this.coh2 = sumBy(rs.rows, 'Cohort_usage_qty');
        this.coh3 = sumBy(rs.rows, 'Cohort_qty') - sumBy(rs.rows, 'Cohort_usage_qty');
        this.host1 = sumBy(rs.rows, 'Hospitel_qty');
        this.host2 = sumBy(rs.rows, 'Hospitel_usage_qty');
        this.host3 = sumBy(rs.rows, 'Hospitel_qty') - sumBy(rs.rows, 'Hospitel_usage_qty');

        this.list = rs.rows;
        console.log(this.list);

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

  async click(z) {
    this.zone = z;
    this.getList();
  }

  doEnter() {
    this.getList();
  }

  async doExportExcel() {
    this.loading.show();
    try {
      const date = this.date.date.year + '-' + this.date.date.month + '-' + this.date.date.day;
      const rs: any = await this.reportService.getReport6Excel(date);
      console.log(rs);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('report-dms6', 'xlsx', rs);
        // this.downloadFile('รายงานการจ่ายยา(แยกตามสถานที่จ่าย)', 'xlsx', url);
        this.loading.hide();
      }
    } catch (error) {
      console.log(error);
      this.alertService.error();
      this.loading.hide();
    }
  }

  // async doExportCsv() {
  //   this.loading.show();
  //   try {
  //     const rs: any = await this.reportService.getReportBedCsv();
  //     console.log(rs);
  //     if (!rs) {
  //       this.loading.hide();
  //     } else {
  //       this.downloadFile('รายการเติมยา', 'csv', rs);
  //       // this.downloadFile('รายงานการจ่ายยา(แยกตามสถานที่จ่าย)', 'xlsx', url);
  //       this.loading.hide();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     this.alertService.error();
  //     this.loading.hide();
  //   }
  // }

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
