import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportDmsService } from '../report-dms.service';
import { AlertService } from '../../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IMyOptions } from 'mydatepicker-th';
import * as moment from 'moment';
import { sumBy } from 'lodash';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-dms4',
  templateUrl: './report-dms4.component.html',
  styles: []
})
export class ReportDms4Component implements OnInit {
  list: any = [];
  zone: any = '';
  date: any;
  arDates: any = [];
  admit: any;
  discharge: any;
  dischargeHospitel: any;
  dischargeDeath: any;
  puiAdmit: any;
  puiDischarge: any;
  puiDischargeHospitel: any;
  puiDischargeDeath: any;

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };
  @ViewChild('loading') loading: any;
  sector: any;
  public jwtHelper = new JwtHelperService();

  constructor(
    private reportService: ReportDmsService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {
    const params = this.route.snapshot.params;
    this.sector = params.sector;
  }

  async ngOnInit() {
    this.date = moment().format('DD/MM/YYYY');
    await this.dates();
    await this.getList();
  }

  dates() {
    for (let v = 0; v < 10; v++) {
      this.arDates.push(moment().subtract(v, 'days').format('DD/MM/YYYY'));
    }
  }

  selectDate(date) {
    this.date = date;
    this.getList();
  }

  async getList() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.getReport4(moment(this.date).format('YYYY-MM-DD'), this.sector);
      if (rs.ok) {
        this.admit = sumBy(rs.rows, 'admit');
        this.discharge = sumBy(rs.rows, 'discharge');
        this.dischargeHospitel = sumBy(rs.rows, 'discharge_hospitel');
        this.dischargeDeath = sumBy(rs.rows, 'discharge_death');
        this.puiAdmit = sumBy(rs.rows, 'pui_admit');
        this.puiDischarge = sumBy(rs.rows, 'pui_discharge');
        this.puiDischargeHospitel = sumBy(rs.rows, 'pui_discharge_hospitel');
        this.puiDischargeDeath = sumBy(rs.rows, 'pui_discharge_death');

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

  // async click(z) {
  //   this.zone = z;
  //   this.getList();
  // }

  doEnter() {
    this.getList();
  }

  async onClickExport() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.getReport4Excel(moment(this.date).format('YYYY-MM-DD'), this.sector);
      console.log(rs);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('4.ยอดผู้ป่วยสะสมรวมที่รับไว้รักษาในโรงพยาบาล', 'xlsx', rs);
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
  //       this.downloadFile('report-dms2', 'csv', rs);
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

