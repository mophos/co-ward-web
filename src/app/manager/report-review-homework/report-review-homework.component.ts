import { AlertService } from 'src/app/help/alert.service';
import { ReportService } from './../report.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-report-review-homework',
  templateUrl: './report-review-homework.component.html',
  styles: []
})
export class ReportReviewHomeworkComponent implements OnInit {


  @ViewChild('loading') loading: any;
  list = [];
  details = [];
  constructor(
    private reportService: ReportService,
    private alertService: AlertService
  ) { }

  async ngOnInit() {
    await this.getList();
    // await this.getDetail();
  }

  async getList() {
    try {
      this.loading.show();
      const rs: any = await this.reportService.homework();
      if (rs.ok) {
        this.list = rs.rows;
        await this.getDetail();
      } else {
        this.alertService.error(rs.error);
      }
      // this.loading.hide();
    } catch (error) {
      this.loading.hide();
      this.alertService.error(error);
    }
  }

  async getDetail() {
    try {
      this.loading.show();
      const rs: any = await this.reportService.homeworkDetail();
      if (rs.ok) {
        this.details = rs.rows;
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
