import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { AlertService } from '../../help/alert.service';
import * as moment from 'moment';

@Component({
  selector: 'app-report-local-quarantine',
  templateUrl: './report-local-quarantine.component.html',
  styles: []
})
export class ReportLocalQuarantineComponent implements OnInit {
  listL: any = [];
  total: any;
  summaryZone: any = [];
  summaryProvince: any = [];

  sumLocal: any = 0;
  sumCoward: any = 0;
  sumCowardAdmit: any = 0;

  @ViewChild('modalLoading') loading: any;
  constructor(
    private reportService: ReportService,
    private alertService: AlertService
  ) { }

  async ngOnInit() {
    await this.listLocal();
    await this.listLocalSummaryZone();
    await this.listLocalSummaryProvince();
  }

  async listLocal() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.getLocalQuarantine();
      if (rs.ok) {
        this.listL = rs.rows.rowList;
        this.total = rs.rows.rowCount;
        for (const v of this.listL) {
          v.checkInDate = moment(v.checkInDate).format('YYYY-MM-DD');
          v.checkOutDate = moment(v.checkOutDate).format('YYYY-MM-DD');
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

  async listLocalSummaryZone() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.summaryLocalQuarantineZone();
      if (rs.ok) {
        this.summaryZone = rs.rows;
        for (const v of this.summaryZone) {
          this.sumLocal += v.local_q;
          this.sumCoward += v.person_total;
          this.sumCowardAdmit += v.admit;
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

  async listLocalSummaryProvince() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.summaryLocalQuarantineProvince();
      if (rs.ok) {
        this.summaryProvince = rs.rows;
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

}
