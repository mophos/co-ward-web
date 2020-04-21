import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { AlertService } from '../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as findIndex from 'lodash/findIndex';

@Component({
  selector: 'app-report-patients',
  templateUrl: './report-patients.component.html',
  styles: []
})
export class ReportPatientsComponent implements OnInit {
  list: any;
  detail: any;
  query: any = '';
  case: any;
  zone: any = '';

  total: any = 0;
  ippui: any = 0;
  severe: any = 0;
  moderate: any = 0;
  mild: any = 0;
  asymptomatic: any = 0;

  public jwtHelper = new JwtHelperService();
  @ViewChild('loading') loading: any;

  constructor(
    private service: ReportService,
    private alertService: AlertService
  ) { }

  async ngOnInit() {
    await this.getList();
  }

  async getList() {
    this.loading.show();
    try {
      const rs: any = await this.service.getPatients(this.zone);
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
}
