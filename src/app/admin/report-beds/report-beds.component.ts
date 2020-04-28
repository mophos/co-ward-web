
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { AlertService } from '../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-report-beds',
  templateUrl: './report-beds.component.html',
  styles: []
})
export class ReportBedsComponent implements OnInit {
  list: any;
  zone: any = '';
  date: any;
  @ViewChild('loading') loading: any;

  public jwtHelper = new JwtHelperService();

  constructor(
    private service: ReportService,
    private alertService: AlertService,
    private reportService: ReportService
  ) { }

  async ngOnInit() {
    await this.getList();
    this.date = new Date();
  }

  async getList() {
    this.loading.show();
    try {
      const rs: any = await this.service.getAdminBeds();
      if (rs.ok) {
        this.list = rs.rows;
        console.log(this.list);

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

  async click(z) {
    this.zone = z;
    this.getList();
  }

  doEnter() {
    this.getList();
  }

  async doExportExcel() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.getReportBedExcel();
      console.log(rs);
      if (!rs) {
      this.loading.hide();
    } else {
      this.downloadFile('รายการเติมยา', 'xlsx', rs);
      // this.downloadFile('รายงานการจ่ายยา(แยกตามสถานที่จ่าย)', 'xlsx', url);
      this.loading.hide();
    }
    } catch (error) {
      console.log(error);
      this.alertService.error();
      this.loading.hide();
    }
  }

  async doExportCsv() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.getReportBedCsv();
      console.log(rs);
      if (!rs) {
      this.loading.hide();
    } else {
      this.downloadFile('รายการเติมยา', 'csv', rs);
      // this.downloadFile('รายงานการจ่ายยา(แยกตามสถานที่จ่าย)', 'xlsx', url);
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
