import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-bed-each-type-chart',
  templateUrl: './bed-each-type-chart.component.html',
  styleUrls: ['./bed-each-type-chart.component.css']
})
export class BedEachTypeChartComponent implements OnInit {

  highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    title: {
      text: ""
    },
    xAxis: {
      title: {
        text: 'Thailand'
      },
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    yAxis: {
      title: {
        text: "Bed"
      }
    },
    series: [{
      data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 24.4, 19.3, 16.0, 18.4, 17.9],
      type: 'spline'
    }]
  }

  constructor() { }

  ngOnInit() {
  }

}
