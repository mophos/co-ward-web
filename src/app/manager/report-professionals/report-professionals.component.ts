import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { AlertService } from '../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as findIndex from 'lodash/findIndex';
@Component({
  selector: 'app-report-professionals',
  templateUrl: './report-professionals.component.html',
  styles: []
})
export class ReportProfessionalsComponent implements OnInit {
  query: any = '';
  list: any;

  @ViewChild('loading') loading: any;

  public jwtHelper = new JwtHelperService();

  constructor(
    private service: ReportService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    this.loading.show();
    try {
      const rs: any = await this.service.getPatients(this.query);
      if (rs.ok) {
        this.list = rs.rows;
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
}
