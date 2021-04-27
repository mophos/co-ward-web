import { AlertService } from '../../help/alert.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { sumBy, isEmpty } from 'lodash';
import { findIndex } from 'lodash';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ClrDatagridStateInterface } from '@clr/angular';

@Component({
  selector: 'app-report-admit-pui-case',
  templateUrl: './report-admit-pui-case.component.html',
  styles: []
})
export class ReportAdmitPuiCaseComponent implements OnInit {

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
  showPersons: any;
  rights: any;
  dataDate1: any;
  dataDate2: any;
  loadings = false;
  limit = 100;
  offset = 0;
  totalList = 0;
  public jwtHelper = new JwtHelperService();

  @ViewChild('loading', { static: true }) loading: any;
  constructor(
    private reportService: ReportService,
    private alertService: AlertService
  ) {
    const decoded = this.jwtHelper.decodeToken(sessionStorage.getItem('token'));
    this.rights = decoded.rights;
    this.showPersons = findIndex(this.rights, { name: 'MANAGER_REPORT_PERSON' }) === -1 ? false : true;
  }

  ngOnInit() {
    // this.getList();
    this.getSummary();
  }

  async refresh(state: ClrDatagridStateInterface) {
    if (!isEmpty(state)) {
      this.loadings = true;
      this.limit = +state.page.size;
      this.offset = (state.page.current - 1) * this.limit;
      await this.getList();
      this.loadings = false;
    }
    // const state.page.from, state.page.size
  }

  async getList() {
    try {
      this.loading.show();
      const rs: any = await this.reportService.admitPuiCase();
      if (rs.ok) {
        this.totalList = rs.total;
        this.list = rs.rows;
        this.dataDate2 = rs.rows[0].timestamp;
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
      const rs: any = await this.reportService.admitPuiCaseSummary();
      if (rs.ok) {
        this.summary = rs.rows;
        this.dataDate1 = rs.rows[0].timestamp;
        this.total = sumBy(rs.rows, 'pui');
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
    } catch (error) {
      this.alertService.error(error);
    }
  }


  async onClickExport() {
    this.loading.show();
    try {
      // this.dateShow = this.date.date.year + '-' + this.date.date.month + '-' + this.date.date.day;
      const rs: any = await this.reportService.admintPuiCaseExport();
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('รายงานผู้ป่วย ADMIT Confirm', 'xlsx', rs);
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
}
