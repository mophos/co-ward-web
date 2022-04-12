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

  async doExportExcel() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.exportMedicalSupplies();
      console.log(rs);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('report-patient-admit', 'xlsx', rs);
        this.loading.hide();
      }
    } catch (error) {
      console.log(error);
      this.alertService.error();
      this.loading.hide();
    }
  }

  downloadFile(name, type, data: any) {
    try {
      const url = window.URL.createObjectURL(new Blob([data]));
      console.log(url);
      const fileName = `${name}.${type}`;
      // Debe haber una manera mejor de hacer esto...
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove(); // remove the element
    } catch (error) {
      console.log(error);
      this.alertService.error();
    }
  }
}
