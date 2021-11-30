import { Component, OnInit } from '@angular/core';
import { IMyOptions } from 'mydatepicker-th';
import * as Highcharts from 'highcharts';
import moment from 'moment';

@Component({
  selector: 'app-beds-type',
  templateUrl: './beds-type.component.html',
  styleUrls: ['./beds-type.component.css']
})
export class BedsTypeComponent implements OnInit {

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

  pieChartOptions = {}
  stackChartOptions = {}

  report:any = {
    total: 39552,
    usageTotal: 15982,
    empty: 23570,
    usageTotalPercentage: 40.4,
    data: [
      {
        title: 'ระดับ 3',
        usage: 75,
        empty: 90
      },
      {
        title: 'ระดับ 2.2',
        usage: 85,
        empty: 66
      },
      {
        title: 'ระดับ 2.1',
        usage: 107,
        empty: 79
      },
      {
        title: 'ระดับ 1',
        usage: 427,
        empty: 319
      },
      {
        title: 'ระดับ 0',
        usage: 1306,
        empty: 836
      }
    ]
  }

  constructor() { }

  ngOnInit() {
    this.setPieChartBed()
    this.setStackChartBed()
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

  setPieChartBed () {
    this.pieChartOptions = {
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
      },
      title: {
          text: ''
      },
      // tooltip: {
      //     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      // },
      accessibility: {
          point: {
              valueSuffix: '%'
          }
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %'
              }
          }
      },
      colors: ['#E4E4E4', '#50B432'],
      series: [
        {
          name: '',
          data: [
            {
              name: 'เตียงว่าง',
              y: 59.6
            },
            {
              name: 'เตียงที่ถูกใช้งาน',
              y: 40.4
            }
          ]
        }
      ]
    }
  }

  setStackChartBed () {
    const labels = []
    const emptys = []
    const usages = []

    this.report.data.forEach(item => {
      labels.push(item.title)
    })

    this.report.data.forEach(item => {
      emptys.push(item.empty)
    })

    this.report.data.forEach(item => {
      usages.push(item.usage)
    })

    this.stackChartOptions = {
      chart: {
          type: 'column'
      },
      title: {
          text: ''
      },
      xAxis: {
        categories: labels
      },
      yAxis: {
          allowDecimals: false,
          min: 0,
          title: {
              text: 'จำนวนเตียง'
          }
      },
      tooltip: {
          formatter: function () {
              return '<b>' + this.x + '</b><br/>' +
                  this.series.name + ': ' + this.y + ' เตียง'
          }
      },
      plotOptions: {
          column: {
              stacking: 'normal'
          }
      },
      colors: ['#E4E4E4', '#50B432'],
      series: [
        {
          name: 'เตียงว่าง',
          data: emptys,
        },
        {
          name: 'เตียงถูกใช้งาน',
          data: usages,
        }
      ]
    }
  }

}
