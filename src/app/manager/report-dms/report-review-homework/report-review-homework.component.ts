import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportDmsService } from '../report-dms.service';
import { AlertService } from '../../../help/alert.service';
// import { sumBy } from 'lodash';

@Component({
  selector: 'app-report-review-homework',
  templateUrl: './report-review-homework.component.html',
  styles: []
})
export class ReportReviewHomeworkComponent implements OnInit {

  @ViewChild('loading') loading: any;

  list = [];
  list2 = [];
  constructor(
    private reportService: ReportDmsService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getList();
    this.getList2();
  }

  async getList() {
    try {
      const rs: any = await this.reportService.getReportReviewHomeworkGov();
      if (rs.ok) {
        this.list = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async getList2() {
    try {
      const rs: any = await this.reportService.getReportReviewHomeworkComp();
      if (rs.ok) {
        this.list2 = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }
}
