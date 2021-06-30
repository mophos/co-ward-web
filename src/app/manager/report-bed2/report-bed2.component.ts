import { AlertService } from 'src/app/help/alert.service';
import { ReportAllService } from './../report-all/report-all.service';
import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { filter } from 'lodash';

@Component({
  selector: 'app-report-bed2',
  templateUrl: './report-bed2.component.html',
  styles: []
})
export class ReportBed2Component implements OnInit {

  list = [];
  z1 = [];
  z2 = [];
  z3 = [];
  z4 = [];
  z5 = [];
  z6 = [];
  z7 = [];
  z8 = [];
  z9 = [];
  z10 = [];
  z11 = [];
  z12 = [];
  z13 = [];
  constructor(
    private reportService: ReportService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getReport();
    this.getReportProvince();
  }

  async getReport() {
    try {
      const rs: any = await this.reportService.reportBedZone();
      if (rs.ok) {
        this.list = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async getReportProvince() {
    try {
      const rs: any = await this.reportService.reportBedProvince();
      if (rs.ok) {
        // this.list = rs.rows;
        this.z1 = filter(rs.rows, { zone_code: '01' });
        this.z2 = filter(rs.rows, { zone_code: '02' });
        this.z3 = filter(rs.rows, { zone_code: '03' });
        this.z4 = filter(rs.rows, { zone_code: '04' });
        this.z5 = filter(rs.rows, { zone_code: '05' });
        this.z6 = filter(rs.rows, { zone_code: '06' });
        this.z7 = filter(rs.rows, { zone_code: '07' });
        this.z8 = filter(rs.rows, { zone_code: '08' });
        this.z9 = filter(rs.rows, { zone_code: '09' });
        this.z10 = filter(rs.rows, { zone_code: '10' });
        this.z11 = filter(rs.rows, { zone_code: '11' });
        this.z12 = filter(rs.rows, { zone_code: '12' });
        this.z13 = filter(rs.rows, { zone_code: '13' });
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }
}
