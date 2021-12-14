import { Component, OnInit } from '@angular/core';
import { IMyOptions } from 'mydatepicker-th';
import * as Highcharts from 'highcharts';
import moment from 'moment';
import provinceJson from '../../../../../assets/provinces.json'

@Component({
  selector: 'app-patients-daily-status',
  templateUrl: './patients-daily-status.component.html',
  styleUrls: ['./patients-daily-status.component.css']
})
export class PatientsDailyStatusComponent implements OnInit {

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd-mm-yyyy',
    editableDateField: false,
    showClearDateBtn: false
  }

  items:any = []
  zone = ''
  zones = [
    { name: 'เขต 01', value: '01' },
    { name: 'เขต 02', value: '02' },
    { name: 'เขต 03', value: '03' },
    { name: 'เขต 04', value: '04' },
    { name: 'เขต 05', value: '05' },
    { name: 'เขต 06', value: '06' },
    { name: 'เขต 07', value: '07' },
    { name: 'เขต 08', value: '08' },
    { name: 'เขต 09', value: '09' },
    { name: 'เขต 10', value: '10' },
    { name: 'เขต 11', value: '11' },
    { name: 'เขต 12', value: '12' },
    { name: 'เขต 13', value: '13' }
  ]
  provinceGroup = []
  displayProvince = ''
  provinces = provinceJson.data
  isSelectProvince = false
  ministryCode = ''
  listMinistry:any = []
  listSubMinistry: any = []

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

  selectMinistry () {
    // TODO : CHANGE MINISTRY AND GET DATA
  }

  selectZone () {
    // TODO : CHANGE ZONE AND GET DATA
  }

  selectBedType () {
    // TODO : CHANGE BED TYPE AND GET DATA
  }

  selectProvince (value) {
    const index = this.provinceGroup.findIndex(item => item === value)
    if (index > -1) {
      this.provinceGroup.splice(index, 1)
    } else {
      this.provinceGroup.push(value)
    }
    this.items = []
    this.loadData()
  }

  setSelectMultiProvince () {
    this.isSelectProvince = !this.isSelectProvince
  }

  checkProvince (province) {
    return this.provinceGroup.some(item => item === province)
  }

  loadData () {
    // TODO : GET DATA
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
      colors: ['#0880FF', '#FF0000'],
      series: [{
          name: 'ETT',
          data: [151, 223, 64, 77, 89, 123, 33]
      }, {
          name: 'Dead',
          data: [92, 932, 334, 29, 34, 30, 75]
      }]
    }
  }

}
