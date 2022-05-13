import { AlertService } from '../../help/alert.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { sumBy, findIndex } from 'lodash';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-report-admit-pui',
  templateUrl: './report-admit-pui.component.html',
  styles: []
})

export class ReportAdmitPuiComponent implements OnInit {

  list = [];
  summary = [];

  total = 0;
  pui = 0;
  atk = 0;
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

  lv3 = 0;
  lv22 = 0;
  lv21 = 0;
  lv1 = 0;
  lv0 = 0;
  homeIsolation = 0;
  communityIsolation = 0;
  d1 = 0;
  d2 = 0;
  d3 = 0;
  d4 = 0;
  d5 = 0;
  d7 = 0;
  d8 = 0;
  d26 = 0;
  d27 = 0;
  rights: any;
  dataDate1: any;
  dataDate2: any;
  showPersons: boolean;
  public jwtHelper = new JwtHelperService();

  @ViewChild('loading', { static: true }) loading: any;
  constructor(
    private reportService: ReportService,
    private alertService: AlertService
  ) {
    this.showPersons = findIndex(this.rights, { name: 'MANAGER_REPORT_PERSON' }) === -1 ? false : true;
  }

  ngOnInit() {
    this.getList();
    this.getSummary();
  }

  async getList() {
    try {
      this.loading.show();
      const rs: any = await this.reportService.admitPuiCase();
      if (rs.ok) {
        this.list = rs.rows;
        if (rs.rows.length) {
          this.dataDate2 = rs.rows[0].timestamp;
        }
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
        if (rs.rows.length) {
          this.dataDate1 = rs.rows[0].timestamp;
        }
        this.total = sumBy(rs.rows, 'pui') + sumBy(rs.rows, 'atk');
        this.pui = sumBy(rs.rows, 'pui');
        this.atk = sumBy(rs.rows, 'atk');
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
        this.lv3 = sumBy(rs.rows, 'lv3');
        this.lv22 = sumBy(rs.rows, 'lv22');
        this.lv21 = sumBy(rs.rows, 'lv21');
        this.lv1 = sumBy(rs.rows, 'lv1');
        this.lv0 = sumBy(rs.rows, 'lv0');
        this.communityIsolation = sumBy(rs.rows, 'community_isolation');
        this.homeIsolation = sumBy(rs.rows, 'home_isolation');
        this.d1 = sumBy(rs.rows, 'd1');
        this.d2 = sumBy(rs.rows, 'd2');
        this.d3 = sumBy(rs.rows, 'd3');
        this.d4 = sumBy(rs.rows, 'd4');
        this.d5 = sumBy(rs.rows, 'd5');
        this.d7 = sumBy(rs.rows, 'd7');
        this.d8 = sumBy(rs.rows, 'd8');
        this.d26 = sumBy(rs.rows, 'd26');
        this.d27 = sumBy(rs.rows, 'd27');

      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async doExportExcel() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.admitPuiCaseExport();
      console.log(rs);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('report-admit-pui-case', 'xlsx', rs);
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
