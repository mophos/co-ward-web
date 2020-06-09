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
  listL2: any;
  listPlace: any;

  sumLocal: any = 0;
  sumCoward: any = 0;
  sumCowardAdmit: any = 0;
  sumPlace: any = 0;
  sumTotalCapacity: any = 0;
  sumPerson: any = 0;

  sum3: any = 0;
  sum4: any = 0;
  sum5: any = 0;
  sum6: any = 0;
  sum7: any = 0;

  @ViewChild('modalLoading') loading: any;
  constructor(
    private reportService: ReportService,
    private alertService: AlertService
  ) { }

  async ngOnInit() {
    await this.listLocal();
    await this.listLocalHotel();
    await this.listLocalSummaryZone();
    await this.listLocalSummaryZone2();
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

  async listLocalHotel() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.getLocalQuarantineHotel();
      if (rs.ok) {
        this.listPlace = rs.rows;
        for (const v of this.listPlace) {
          this.sumPlace += v.qty;
          this.sumTotalCapacity += v.total_capacity;
          this.sumPerson += v.person_qty;
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

  async listLocalSummaryZone2() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.summaryLocalQuarantineZone2();
      if (rs.ok) {
        this.listL2 = rs.rows;
        for (const v of this.listL2) {
          this.sum3 += v.m3;
          this.sum4 += v.m4;
          this.sum5 += v.m5;
          this.sum6 += v.m6;
          this.sum7 += v.m7;
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
