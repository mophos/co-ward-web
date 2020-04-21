
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { AlertService } from '../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IMyOptions } from 'mydatepicker-th';
@Component({
  selector: 'app-report-supplies',
  templateUrl: './report-supplies.component.html',
  styles: []
})
export class ReportSuppliesComponent implements OnInit {
  @ViewChild('loading') loading: any;

  list: any;
  detail: any;
  query: any = '';
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
    const date = new Date();
    this.dateset = {
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    };
    this.dateShow = this.dateset.date.year + '-' + this.dateset.date.month + '-' + this.dateset.date.day;
  }

  async ngOnInit() {
    await this.getList();
    await this.getTotal();
  }

  async getList() {
    this.loading.show();
    try {
      const date = this.dateset.date.year + '-' + this.dateset.date.month + '-' + this.dateset.date.day;
      const rs: any = await this.service.getSupplies(date, this.query, this.zone);
      if (rs.ok) {
        this.list = rs.rows;
        this.zone = '';
        this.loading.hide();
      } else {
        this.zone = '';
        this.loading.hide();
        this.alertService.error();
      }
    } catch (error) {
      this.zone = '';
      this.loading.hide();
      this.alertService.error(error);
    }
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
    // await this.getSumByZone(z);
    await this.getList();
  }

  async getSumByZone(z) {
    this.loading.show();
    try {
      const rs: any = await this.service.getSumByZone(z);
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
  
  doEnter() {
    this.getList();
  }
}
