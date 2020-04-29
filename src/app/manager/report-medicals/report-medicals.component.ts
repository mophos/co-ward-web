import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { AlertService } from '../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IMyOptions } from 'mydatepicker-th';
import * as moment from 'moment';
@Component({
  selector: 'app-report-medicals',
  templateUrl: './report-medicals.component.html',
  styles: []
})
export class ReportMedicalsComponent implements OnInit {
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
    this.dateset = {
      date: {
        year: moment().get('year'),
        month: moment().get('month') + 1,
        day: moment().get('date')
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
      const rs: any = await this.service.getMedicals(this.zone, date);
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
}
