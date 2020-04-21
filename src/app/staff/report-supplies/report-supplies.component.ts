import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { AlertService } from '../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as findIndex from 'lodash/findIndex';
import { IMyOptions } from 'mydatepicker-th';
@Component({
  selector: 'app-report-supplies',
  templateUrl: './report-supplies.component.html',
  styles: []
})
export class ReportSuppliesComponent implements OnInit {

  list: any;
  query: any = '';
  date: any;
  public jwtHelper = new JwtHelperService();
  @ViewChild('loading') loading: any;

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };

  constructor(
    private service: ReportService,
    private alertService: AlertService
  ) {
    const token = sessionStorage.getItem('token');
    const decoded = this.jwtHelper.decodeToken(token);

  }

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
      const rs: any = await this.service.getSupplies(date, null);
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

  onChangeDate() {
    this.getList();
    // console.log(e);

  }
  
}
