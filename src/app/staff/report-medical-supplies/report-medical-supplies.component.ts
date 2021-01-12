import { AlertService } from './../../help/alert.service';
import { ReportService } from './../report.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-medical-supplies',
  templateUrl: './report-medical-supplies.component.html',
  styleUrls: []
})
export class ReportMedicalSuppliesComponent implements OnInit {

  list = [];
  constructor(
    private reportService: ReportService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    try {
      const rs: any = await this.reportService.medicalSupplies();
      if (rs.ok) {
          this.list = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }
  // medical-supplies
}
