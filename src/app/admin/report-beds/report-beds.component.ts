
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
  @ViewChild('loading') loading: any;

  public jwtHelper = new JwtHelperService();

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
      const rs: any = await this.service.getAdminBeds();
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

  async click(z) {
    this.zone = z;
    this.getList();
  }

  doEnter() {
    this.getList();
  }
}
