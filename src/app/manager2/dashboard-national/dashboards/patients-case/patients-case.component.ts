import { Component, OnInit } from '@angular/core';
import { IMyOptions } from 'mydatepicker-th';
import * as Highcharts from 'highcharts';
import moment from 'moment';

@Component({
  selector: 'app-patients-case',
  templateUrl: './patients-case.component.html',
  styleUrls: ['./patients-case.component.css']
})
export class PatientsCaseComponent implements OnInit {

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
    this.setLineChartPatientEachIllness()
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

  setLineChartPatientEachIllness () {
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
      series: [{
          name: 'Severe Case',
          data: [151, 223, 64, 77, 89, 123, 33]
      }, {
          name: 'Moderate Case',
          data: [22, 333, 87, 101, 321, 32, 11]
      }, {
          name: 'Mild Case',
          data: [92, 932, 334, 29, 34, 30, 75]
      }, {
          name: 'Asymotimatic',
          data: [45, 212, 829, 111, 20, 40, 99]
      }, {
          name: 'PUI',
          data: [512, 93, 332, 93, 82, 138, 444]
      }]
    }
  }

}
