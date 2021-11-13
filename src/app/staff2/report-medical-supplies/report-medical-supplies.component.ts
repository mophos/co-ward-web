import { AlertService } from '../../help/alert.service';
import { ReportService } from '../report.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-report-medical-supplies',
  templateUrl: './report-medical-supplies.component.html',
  styleUrls: []
})
export class ReportMedicalSuppliesComponent implements OnInit {

  @ViewChild('loading', { static: true }) loading: any;
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
      this.loading.show();
      const rs: any = await this.reportService.medicalSupplies();
      if (rs.ok) {
        this.list = rs.rows;
        this.loading.hide();
      } else {
        this.loading.hide();
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.loading.hide();
      this.alertService.error(error);
    }
  }
  // medical-supplies
}
