
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { AlertService } from '../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IMyOptions } from 'mydatepicker-th';
import * as moment from 'moment';
@Component({
  selector: 'app-check-supplies',
  templateUrl: './check-supplies.component.html',
  styles: []
})
export class CheckSuppliesComponent implements OnInit {
  list: any;
  detail: any;
  query: any = '';
  dateset: any;

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };

  @ViewChild('loading' ,{ static: true }) loading: any;
  public jwtHelper = new JwtHelperService();

  constructor(
    private service: ReportService,
    private alertService: AlertService
  ) {
    this.getList();
    this.dateset = {
      date: {
        year: moment().get('year'),
        month: moment().get('month') + 1,
        day: moment().get('date')
      }
    };
  }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    this.loading.show();
    try {
      const date = this.dateset.date.year + '-' + this.dateset.date.month + '-' + this.dateset.date.day;
      const rs: any = await this.service.getSupplies(date, this.query);
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

  doEnter() {
    this.getList();
  }
}
