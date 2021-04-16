import { AlertService } from 'src/app/help/alert.service';
import { ReportService } from './../report.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { sumBy } from 'lodash';

@Component({
  selector: 'app-report-review-homework',
  templateUrl: './report-review-homework.component.html',
  styles: []
})
export class ReportReviewHomeworkComponent implements OnInit {


  @ViewChild('loading' ,{ static: true }) loading: any;
  list = [];
  details = [];
  selectRegister = 'all';

  government = 0;
  governmentRegister = 0;
  governmentPer = 0;
  private = 0;
  privateRegister = 0;
  privatePer = 0;
  constructor(
    private reportService: ReportService,
    private alertService: AlertService
  ) { }

  async ngOnInit() {
    await this.getList();
    // await this.getDetail();
  }

  onSelectRegister() {
    this.getDetail();
  }

  async getList() {
    try {
      this.loading.show();
      const rs: any = await this.reportService.homework();
      if (rs.ok) {
        this.list = rs.rows;
        this.government = sumBy(rs.rows, 'government');
        this.governmentRegister = sumBy(rs.rows, 'government_register');
        this.governmentPer = sumBy(rs.rows, 'government_register') / sumBy(rs.rows, 'government') * 100;
        this.private = sumBy(rs.rows, 'private');
        this.privateRegister = sumBy(rs.rows, 'private_register');
        this.privatePer = sumBy(rs.rows, 'private_register') / sumBy(rs.rows, 'private') * 100;
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
      const rs: any = await this.reportService.homeworkDetail(this.selectRegister);
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
