import { Component, OnInit } from '@angular/core';
import { IMyOptions } from 'mydatepicker-th';
import provinceJson from '../../../../../assets/provinces.json'
import * as Highcharts from 'highcharts';
import moment from 'moment';
import { BedsTypeService } from 'src/app/manager2/services-new-dashboard/beds-type.service';

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

  items:any = {
    results: []
  }
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
      year: 2021,
      month: 11,
      day: 1
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
      year: 2021,
      month: 12,
      day: 31
    }
  }

  highcharts = null

  pieChartOptions = {}
  stackChartOptions = {}

  constructor(
    private bedsTypeService: BedsTypeService
  ) { }

  ngOnInit() {
    // this.getMinistryList()
    // this.getSubMinistryList()
    this.loadData()
    // this.setPieChartBed()
    // this.setStackChartBed()
  }

  formatPercent (total, value) {
    const result = (value * 100) / total
    return result || 0
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
    this.loadData()
  }

  setSelectMultiProvince () {
    this.isSelectProvince = !this.isSelectProvince
  }

  checkProvince (province) {
    return this.provinceGroup.some(item => item === province)
  }

  async loadData () {
    try {
      const startDate = `${this.startDate.date.year}-${this.startDate.date.month}-${this.startDate.date.day}`
      const endDate = `${this.endDate.date.year}-${this.endDate.date.month}-${this.endDate.date.day}`
      const res:any = await this.bedsTypeService.getBedType({
        startDate,
        endDate
      })
      if (res.ok) {
        this.items = res.rows
        this.setPieChartBed()
        console.log('bed type ', res.rows)
      }
    } catch (error) {
      console.error(error)
    }
  }

  setPieChartBed () {
    const total = 100 - this.formatPercent(this.items.total_covid_qty, this.items.total_used_qty)
    const used = this.formatPercent(this.items.total_covid_qty, this.items.total_used_qty)

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
              y: total
            },
            {
              name: 'ครองเตียง',
              y: used
            }
          ]
        }
      ]
    }

    this.highcharts = Highcharts;
  }

  setStackChartBed () {

  }

}
