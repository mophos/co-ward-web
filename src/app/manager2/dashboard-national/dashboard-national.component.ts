import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard-national',
  templateUrl: './dashboard-national.component.html',
  styleUrls: ['./dashboard-national.component.css']
})
export class DashboardNationalComponent implements OnInit {

  highcharts = Highcharts;

  pieChartOptions = {}
  stackChartOptions = {}
  lineChartOptions = {}

  tabs = 0

  bed = {
    total: 39552,
    usageTotal: 15982,
    empty: 23570,
    usageTotalPercentage: 40.4,
    items: [
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

  patientEachIllness = {
    total: 15982,
    type1: 452,
    type2: 3995,
    type3: 8818,
    type4: 2165,
    type5: 552
  }

  constructor() { }

  ngOnInit() {
    this.setPieChartBed()
    this.setStackChartBed()
  }

  setTabs (value) {
    this.tabs = value
    this.loadChartData()
  }

  loadChartData () {
    if (this.tabs === 0) {
      this.setPieChartBed()
      this.setStackChartBed()
    } else if (this.tabs === 1) {
      this.setLineChartPatientEachIllness()
    } else {
      this.setLineChartPatientEachStatus()
    }
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

    this.bed.items.forEach(item => {
      labels.push(item.title)
    })

    this.bed.items.forEach(item => {
      emptys.push(item.empty)
    })

    this.bed.items.forEach(item => {
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
