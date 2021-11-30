import { Component, OnInit } from '@angular/core';
import { IMyOptions } from 'mydatepicker-th';
import * as Highcharts from 'highcharts';
import moment from 'moment';

@Component({
  selector: 'app-patients-status',
  templateUrl: './patients-status.component.html',
  styleUrls: ['./patients-status.component.css']
})
export class PatientsStatusComponent implements OnInit {

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd-mm-yyyy',
    editableDateField: false,
    showClearDateBtn: false
  }

  startDate:any = {
    date: {
      year: moment().year(),
      month: moment().month() + 1,
      day: moment().date()
    }
  }
  endDate:any = {
    date: {
      year: moment().year(),
      month: moment().month() + 1,
      day: moment().date()
    }
  }

  highcharts = Highcharts;

  lineChartOptions = {}

  constructor() { }

  ngOnInit() {
    this.setLineChartPatientEachStatus()
  }

  selectStartDate (value) {
    this.startDate = {
      date: value.date
    }
    // TODO : RE GET DATA
    // this.loadData()
  }

  selectEndDate (value) {
    this.endDate = {
      date: value.date
    }
    // TODO : RE GET DATA
    // this.loadData()
  }

  setLineChartPatientEachStatus () {
    this.lineChartOptions = {
      title: {
          text: ''
      },
      subtitle: {
          text: ''
      },
      yAxis: {
          title: {
              text: 'จำนวนคน'
          }
      },
      xAxis: {
        categories: [
          '15/11/2021',
          '16/11/2021',
          '17/11/2021',
          '18/11/2021',
          '19/11/2021',
          '20/11/2021',
          '21/11/2021',
          '22/11/2021'
        ]
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top'
      },
      colors: ['#0880FF', '#06F647', '#FF0000'],
      series: [{
          name: 'Admit',
          data: [151, 223, 64, 77, 89, 123, 33]
      }, {
          name: 'Discharge',
          data: [22, 333, 87, 101, 321, 32, 11]
      }, {
          name: 'Dead',
          data: [92, 932, 334, 29, 34, 30, 75]
      }]
    }
  }
}
