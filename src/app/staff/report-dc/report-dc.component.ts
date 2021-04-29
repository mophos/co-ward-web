import { Component, OnInit } from '@angular/core';
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
      console.log('dd');
      
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
}
