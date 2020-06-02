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

  @ViewChild('modalLoading') loading: any;
  constructor(
    private reportService: ReportService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.listLocal();
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

}
