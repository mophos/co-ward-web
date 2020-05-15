import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { AlertService } from 'src/app/help/alert.service';

@Component({
  selector: 'app-report-records',
  templateUrl: './report-records.component.html',
  styles: []
})
export class ReportRecordsComponent implements OnInit {
  list: any = [];

  constructor(
    private reportService: ReportService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    try {
      const rs: any = await this.reportService.getRecords();
      if (rs.ok) {
        this.list = rs.rows;
        console.log(this.list);
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      console.log(error);
      this.alertService.error(error);
    }
  }
}
