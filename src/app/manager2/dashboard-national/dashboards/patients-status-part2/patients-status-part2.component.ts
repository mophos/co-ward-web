import { Component, OnInit } from '@angular/core';
import { IMyOptions } from 'mydatepicker-th';
import * as Highcharts from 'highcharts';
import moment from 'moment';
import provinceJson from '../../../../../assets/provinces.json'
import { PatientsStatusService } from 'src/app/manager2/services-new-dashboard/patients-status.service';

@Component({
  selector: 'app-patients-status-part2',
  templateUrl: './patients-status-part2.component.html',
  styleUrls: ['./patients-status-part2.component.css']
})
export class PatientsStatusPart2Component implements OnInit {

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd-mm-yyyy',
    editableDateField: false,
    showClearDateBtn: false
  }

  chart:any = {}
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

  // startDate:any = {
  //   date: {
  //     year: moment().year(),
  //     month: moment().month() + 1,
  //     day: moment().date()
  //   }
  // }
  startDate:any = {
    date: {
      year: 2020,
      month: 4,
      day: 10
    }
  }
  // endDate:any = {
  //   date: {
  //     year: moment().year(),
  //     month: moment().month() + 1,
  //     day: moment().date()
  //   }
  // }
  endDate:any = {
    date: {
      year: 2020,
      month: 4,
      day: 30
    }
  }

  highcharts = null

  lineChartOptions = {}

  constructor(
    private patientsStatusService: PatientsStatusService
  ) { }

  ngOnInit() {
    this.loadDataTotal()
    this.loadDataChart()
  }

  formatNumber (value = 0) {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
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
    // this.loadData()
  }

  setSelectMultiProvince () {
    this.isSelectProvince = !this.isSelectProvince
  }

  checkProvince (province) {
    return this.provinceGroup.some(item => item === province)
  }

  async loadDataTotal () {
    try {
      const startDate = `${this.startDate.date.year}-${this.startDate.date.month}-${this.startDate.date.day}`
      const endDate = `${this.endDate.date.year}-${this.endDate.date.month}-${this.endDate.date.day}`
      const res:any = await this.patientsStatusService.getPatientsStatusCategory({
        startDate,
        endDate
      })
      if (res.ok) {
        this.chart = res.rows
      }
    } catch (error) {
      console.error(error)
    }
  }

  async loadDataChart () {
    try {
      const startDate = `${this.startDate.date.year}-${this.startDate.date.month}-${this.startDate.date.day}`
      const endDate = `${this.endDate.date.year}-${this.endDate.date.month}-${this.endDate.date.day}`
      const res:any = await this.patientsStatusService.getPatientsStatusEttDead({
        startDate,
        endDate
      })
      if (res.ok) {
        this.items = res.rows
        this.setLineChartPatientEachStatus()
      }
    } catch (error) {
      console.error(error)
    }
  }

  setLineChartPatientEachStatus () {
    const startDate = moment(`${this.startDate.date.year}-${this.startDate.date.month}-${this.startDate.date.day}`, 'YYYY-MM-DD')
    const endDate = moment(`${this.endDate.date.year}-${this.endDate.date.month}-${this.endDate.date.day}`, 'YYYY-MM-DD')
    const diff = endDate.diff(startDate, 'days')
    const categories = []
    const ett = []
    const death = []

    for (let i = 0; i <= diff; i++) {
      categories.push(moment(startDate).format('DD-MM-YYYY'))
      startDate.add(1, 'days');
    }

    console.log('categories ', categories)

    categories.forEach((categorie, i) => {
      if (this.items.deathCases && this.items.deathCases.length) {
        const data = this.items.deathCases.find(item => moment(item.date_admit).format('DD-MM-YYYY') === categorie)
        if (data) {
          death.push(data.amount)
        } else {
          death.push(0)
        }
      }
      if (this.items.invasionVentilatorCases && this.items.invasionVentilatorCases.length) {
        const data = this.items.invasionVentilatorCases.find(item => moment(item.date_admit).format('DD-MM-YYYY') === categorie)
        if (data) {
          ett.push(data.amount)
        } else {
          ett.push(0)
        }
      }
    })

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
        categories: categories
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top'
      },
      colors: ['#0880FF', '#FF0000'],
      series: [{
          name: 'ETT',
          data: ett
      }, {
          name: 'Dead',
          data: death
      }]
    }

    this.highcharts = Highcharts
  }
}
