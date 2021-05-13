import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertService } from 'src/app/help/alert.service';
import { ReportService } from '../report.service';
import { findIndex } from 'lodash';
@Component({
  selector: 'app-report-dc',
  templateUrl: './report-dc.component.html',
  styleUrls: ['./report-dc.component.css']
})
export class ReportDcComponent implements OnInit {
  list: any = [];
  isLoadding = false;
  query = '';
  showPersons = false;
  @ViewChild('loading', { static: true }) loading: any;

  public jwtHelper = new JwtHelperService();
  rights: any;
  constructor(
    private alertService: AlertService,
    private service: ReportService,


  ) {
    const decoded = this.jwtHelper.decodeToken(sessionStorage.getItem('token'));
    this.rights = decoded.rights;
    this.showPersons = findIndex(this.rights, { name: 'STAFF_VIEW_PATIENT_INFO' }) === -1 ? false : true;
  }

  async ngOnInit() {
    await this.getList();

  }

  doEnter(e) {
    if (e.keyCode === 13) {
      this.getList();
    }
  }
  async getList() {

    try {
      this.isLoadding = true;
      const rs: any = await this.service.getCovidCaseDc(this.query);
      if (rs.ok) {
        this.list = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
      this.isLoadding = false;
    } catch (error) {
      this.isLoadding = false;
      this.alertService.error(error);
    }
  }

  async doExportExcel() {
    this.loading.show();
    try {
      const rs: any = await this.service.getCovidCaseDcExcel();
      console.log(rs);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('ผู้ป่วยทั้งหมด', 'xlsx', rs);
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
