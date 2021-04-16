import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { AlertService } from 'src/app/help/alert.service';
import * as moment from 'moment';
import { IMyOptions } from 'mydatepicker-th';
@Component({
  selector: 'app-report-patients-provinces',
  templateUrl: './report-patients-provinces.component.html',
  styles: []
})
export class ReportPatientsProvincesComponent implements OnInit {

  date = [];
  startDate: any;
  endDate: any;
  list = [];
  @ViewChild('loading' ,{static: false}) loading: any;
  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };
  constructor(
    private service: ReportService,
    private alertService: AlertService
  ) { }

  async ngOnInit() {
    this.startDate = {
      date: {
        year: moment().get('year'),
        month: moment().get('month') + 1,
        day: moment().get('date')
      }
    };
    this.endDate = {
      date: {
        year: moment().get('year'),
        month: moment().get('month') + 1,
        day: moment().get('date')
      }
    };
    await this.calDate();
  }

  async getList() {
    this.loading.show();
    try {
      const startDate = this.startDate.date.year + '-' + this.startDate.date.month + '-' + this.startDate.date.day;
      const endDate = this.endDate.date.year + '-' + this.endDate.date.month + '-' + this.endDate.date.day;
      const rs: any = await this.service.provinceCaseDate(startDate, endDate);
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

  onChangeStartDate(e) {
    this.startDate = e;
    this.calDate();
  }

  onChangeEndDate(e) {
    this.endDate = e;
    this.calDate();
  }

  calDate() {
    if (this.startDate > this.endDate) {
      const temp = this.startDate;
      this.startDate = this.endDate;
      this.endDate = temp;
    }
    const startDate = this.startDate.date.year + '-' + this.startDate.date.month + '-' + this.startDate.date.day;
    const endDate = this.endDate.date.year + '-' + this.endDate.date.month + '-' + this.endDate.date.day;
    const _startDate = moment(startDate, 'YYYY-MM-DD');
    const _endDate = moment(endDate, 'YYYY-MM-DD');
    let date = _startDate;
    const data = [];
    // _startDate.isSame
    while (_startDate.isSameOrBefore(_endDate)) {
      const _date = moment(date).format('YYYY-MM-DD');
      data.push(_date);
      date = date.add(1, 'days');
    }
    this.date = data;
    this.getList();

  }
}
