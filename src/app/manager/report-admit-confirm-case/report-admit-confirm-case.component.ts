import { AlertService } from './../../help/alert.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { sumBy } from 'lodash';
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


  @ViewChild('loading') loading: any;
  constructor(
    private reportService: ReportService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getList();
    this.getSummary();
  }

  async getList() {
    try {
      this.loading.show();
      const rs: any = await this.reportService.admitConfirmCase();
      if (rs.ok) {
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
      const rs: any = await this.reportService.admitConfirmCaseSummary();
      if (rs.ok) {
        this.summary = rs.rows;
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
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }
}
