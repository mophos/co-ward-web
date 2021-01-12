import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { sumBy } from 'lodash';
import { IMyOptions } from 'mydatepicker-th';
import { AlertService } from 'src/app/help/alert.service';

@Component({
  selector: 'app-report-bed',
  templateUrl: './report-bed.component.html',
  styles: []
})
export class ReportBedComponent implements OnInit {


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
  sector: any;
  @ViewChild('loading') loading: any;

  public jwtHelper = new JwtHelperService();
  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };
  constructor(
    private reportService: ReportService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {
    const params = this.route.snapshot.params;
    this.sector = params.sector;
  }

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
      const rs: any = await this.reportService.getBed(date);
      if (rs.ok) {
        this.list = rs.rows;
        for (const i of this.list) {
          for (const a of i.provinces) {
            a.sum_aiir_covid_qty = sumBy(a.hospitals, 'aiir_covid_qty');
            a.sum_aiir_usage_qty = sumBy(a.hospitals, 'aiir_usage_qty');
            a.sum_aiir_inven_qty = sumBy(a.hospitals, 'aiir_covid_qty') - sumBy(a.hospitals, 'aiir_usage_qty');
            a.sum_modified_aiir_covid_qty = sumBy(a.hospitals, 'modified_aiir_covid_qty');
            a.sum_modified_aiir_usage_qty = sumBy(a.hospitals, 'modified_aiir_usage_qty');
            a.sum_modified_aiir_inven_qty = sumBy(a.hospitals, 'modified_aiir_covid_qty') - sumBy(a.hospitals, 'modified_aiir_usage_qty');
            a.sum_isolate_covid_qty = sumBy(a.hospitals, 'isolate_covid_qty');
            a.sum_isolate_usage_qty = sumBy(a.hospitals, 'isolate_usage_qty');
            a.sum_isolate_inven_qty = sumBy(a.hospitals, 'isolate_covid_qty') - sumBy(a.hospitals, 'isolate_usage_qty');
            a.sum_cohort_covid_qty = sumBy(a.hospitals, 'cohort_covid_qty');
            a.sum_cohort_usage_qty = sumBy(a.hospitals, 'cohort_usage_qty');
            a.sum_cohort_inven_qty = sumBy(a.hospitals, 'cohort_covid_qty') - sumBy(a.hospitals, 'cohort_usage_qty');
            a.sum_hospitel_covid_qty = sumBy(a.hospitals, 'hospitel_covid_qty');
            a.sum_hospitel_usage_qty = sumBy(a.hospitals, 'hospitel_usage_qty');
            a.sum_hospitel_inven_qty = sumBy(a.hospitals, 'hospitel_covid_qty') - sumBy(a.hospitals, 'hospitel_usage_qty');
          }
        }
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
      const rs: any = await this.reportService.getBedExport();
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
