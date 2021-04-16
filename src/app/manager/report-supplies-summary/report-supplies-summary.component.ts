import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { AlertService } from '../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IMyOptions } from 'mydatepicker-th';
import * as moment from 'moment';
@Component({
  selector: 'app-report-supplies-summary',
  templateUrl: './report-supplies-summary.component.html',
  styles: []
})
export class ReportSuppliesSummaryComponent implements OnInit {
  @ViewChild('loading' ,{static: false}) loading: any;

  detail: any;
  dateset: any;
  total: any;
  dateShow: any;
  sumZone: any;

  zone: any = '';
  zone1: any = 0;
  zone2: any = 0;
  zone3: any = 0;
  zone4: any = 0;
  zone5: any = 0;
  zone6: any = 0;
  zone7: any = 0;
  zone8: any = 0;
  zone9: any = 0;
  zone10: any = 0;
  zone11: any = 0;
  zone12: any = 0;
  zone13: any = 0;

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };
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
    this.dateShow = this.dateset.date.year + '-' + this.dateset.date.month + '-' + this.dateset.date.day;
  }

  async ngOnInit() {
    await this.getTotal();
  }


  async getTotal() {
    this.loading.show();
    try {
      const rs: any = await this.service.getTotal();
      if (rs.ok) {
        this.total = rs.rows;
        for (const v of this.total) {
          this.zone1 += v.zone1;
          this.zone2 += v.zone2;
          this.zone3 += v.zone3;
          this.zone4 += v.zone4;
          this.zone5 += v.zone5;
          this.zone6 += v.zone6;
          this.zone7 += v.zone7;
          this.zone8 += v.zone8;
          this.zone9 += v.zone9;
          this.zone10 += v.zone10;
          this.zone11 += v.zone11;
          this.zone12 += v.zone12;
          this.zone13 += v.zone13;
        }
        console.log(this.total);

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
