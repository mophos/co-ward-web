import { AlertService } from './../../help/alert.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { sumBy } from 'lodash';
import { JwtHelperService } from '@auth0/angular-jwt';
import { findIndex } from 'lodash';
import * as moment from 'moment';
@Component({
  selector: 'app-report-admit-confirm-case',
  templateUrl: './report-admit-confirm-case.component.html',
  styles: []
})
export class ReportAdmitConfirmCaseComponent implements OnInit {

  list = [];
  summary = [];

  total = 0;
  severe = 0;
  moderate = 0;
  mild = 0;
  asymptomatic = 0;
  aiir = 0;
  modifiedAiir = 0;
  isolate = 0;
  cohort = 0;
  hospitel = 0;
  invasive = 0;
  noninvasive = 0;
  highFlow = 0;
  d1 = 0;
  d2 = 0;
  d3 = 0;
  d4 = 0;
  d5 = 0;
  d7 = 0;
  d8 = 0;
  rights: any;
  showPersons: any;
  dataDate1: any;
  dataDate2: any;
  public jwtHelper = new JwtHelperService();
  @ViewChild('loading', { static: true }) loading: any;
  constructor(
    private reportService: ReportService,
    private alertService: AlertService
  ) {
    const decoded = this.jwtHelper.decodeToken(sessionStorage.getItem('token'));
    this.rights = decoded.rights;
    this.showPersons = findIndex(this.rights, { name: 'STAFF_VIEW_PATIENT_INFO' }) === -1 ? false : true;
  }

  ngOnInit() {
    this.getList();
    this.getSummary();
  }

  async getList() {
    try {
      this.loading.show();
      const rs: any = await this.reportService.admitConfirmCase();
      if (rs.ok) {
        this.dataDate2 = rs.rows[0].timestamp;
        for (const v of rs.rows) {
          v.birth_date = moment(v.birth_date);
          v.old = moment().diff(v.birth_date, 'year');
        }
        this.list = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
      this.loading.hide();
    } catch (error) {
      this.loading.hide();
      this.alertService.error(error);
    }
  }

  async getSummary() {
    try {
      this.loading.show();
      const rs: any = await this.reportService.admitConfirmCaseSummary();
      if (rs.ok) {
        this.summary = rs.rows;
        this.dataDate1 = rs.rows[0].timestamp;
        this.total = sumBy(rs.rows, 'confirm');
        this.severe = sumBy(rs.rows, 'severe');
        this.moderate = sumBy(rs.rows, 'moderate');
        this.mild = sumBy(rs.rows, 'mild');
        this.asymptomatic = sumBy(rs.rows, 'asymptomatic');
        this.aiir = sumBy(rs.rows, 'aiir');
        this.modifiedAiir = sumBy(rs.rows, 'modified_aiir');
        this.isolate = sumBy(rs.rows, 'isolate');
        this.cohort = sumBy(rs.rows, 'cohort');
        this.hospitel = sumBy(rs.rows, 'hospitel');
        this.invasive = sumBy(rs.rows, 'invasive');
        this.noninvasive = sumBy(rs.rows, 'noninvasive');
        this.highFlow = sumBy(rs.rows, 'high_flow');
        this.d1 = sumBy(rs.rows, 'd1');
        this.d2 = sumBy(rs.rows, 'd2');
        this.d3 = sumBy(rs.rows, 'd3');
        this.d4 = sumBy(rs.rows, 'd4');
        this.d5 = sumBy(rs.rows, 'd5');
        this.d7 = sumBy(rs.rows, 'd7');
        this.d8 = sumBy(rs.rows, 'd8');
      } else {
        this.alertService.error(rs.error);
      }
      this.loading.hide();
    } catch (error) {
      this.loading.hide();
      this.alertService.error(error);
    }
  }

  async doExportExcel() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.admitConfirmCaseSummaryExcel();
      console.log(rs);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('report-admit-confirm-case', 'xlsx', rs);
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

  async doExportExcel2() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.admitConfirmCaseSummaryExcel2();
      console.log(rs);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('report-admit-confirm-case-all', 'xlsx', rs);
        // this.downloadFile('รายงานการจ่ายยา(แยกตามสถานที่จ่าย)', 'xlsx', url);
        this.loading.hide();
      }
    } catch (error) {
      console.log(error);
      this.alertService.error();
      this.loading.hide();
    }
  }
}
