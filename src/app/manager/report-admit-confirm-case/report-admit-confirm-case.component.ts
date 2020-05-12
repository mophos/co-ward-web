import { AlertService } from './../../help/alert.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-report-admit-confirm-case',
  templateUrl: './report-admit-confirm-case.component.html',
  styles: []
})
export class ReportAdmitConfirmCaseComponent implements OnInit {

  list = [];
  @ViewChild('loading') loading: any;
  constructor(
    private reportService: ReportService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getList();
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

}
