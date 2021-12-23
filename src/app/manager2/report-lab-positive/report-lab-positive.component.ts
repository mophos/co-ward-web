import { ReportService } from '../report.service';
import { AlertService } from './../../help/alert.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-lab-positive',
  templateUrl: './report-lab-positive.component.html',
  styles: []
})
export class ReportLabPositiveComponent implements OnInit {

  list = [];
  constructor(
    private alertService: AlertService,
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.getList();
  }
  
  async getList() {
    try {
      const rs: any = await this.reportService.getLabPositive();
      if (rs.ok) {
        this.list = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }
}
