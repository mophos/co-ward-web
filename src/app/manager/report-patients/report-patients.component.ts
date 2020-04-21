import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { AlertService } from '../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
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
  date: any;

  total: any = 0;
  severe: any = 0;
  moderate: any = 0;
  mild: any = 0;
  asymptomatic: any = 0;
  ippui: any = 0;

  public jwtHelper = new JwtHelperService();
  @ViewChild('loading') loading: any;

  constructor(
    private service: ReportService,
    private alertService: AlertService
  ) { }

  async ngOnInit() {
    const date = new Date();
    this.date = {
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    };
    await this.getList();
  }

  async getList() {
    this.loading.show();
    try {
      const date = this.date.date.year + '-' + this.date.date.month + '-' + this.date.date.day;
      const rs: any = await this.service.getPatients(this.zone, date);
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
