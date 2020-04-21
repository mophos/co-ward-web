import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { AlertService } from '../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IMyOptions } from 'mydatepicker-th';
@Component({
  selector: 'app-report-beds',
  templateUrl: './report-beds.component.html',
  styles: []
})
export class ReportBedsComponent implements OnInit {
  list: any;
  zone: any = '';
  dateset: any;
  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };
  @ViewChild('loading') loading: any;

  public jwtHelper = new JwtHelperService();

  constructor(
    private service: ReportService,
    private alertService: AlertService
  ) {
    const date = new Date();
    this.dateset = {
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    };
  }

  async ngOnInit() {
    await this.getList();
  }

  async getList() {
    this.loading.show();
    try {
      const date = this.dateset.date.year + '-' + this.dateset.date.month + '-' + this.dateset.date.day;
      const rs: any = await this.service.getBeds(this.zone, date);
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
