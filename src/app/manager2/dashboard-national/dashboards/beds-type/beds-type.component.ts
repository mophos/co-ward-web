import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyOptions } from 'mydatepicker-th';
import * as Highcharts from 'highcharts';
import moment from 'moment';
import { BedsTypeService } from 'src/app/manager2/services-new-dashboard/beds-type.service';
import { FilterService } from 'src/app/manager2/services-new-dashboard/filter.service';

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
  selectedProvince = []
  displayProvince = ''
  provinces = []
  isSelectProvince = false
  sector = ''
  subMinistryCode = ''
  bedTypeId = ''
  // listMinistry:any = []
  listSubMinistry: any = []
  bedTypes:any = [
    { id: 11, name: 'ระดับ 1 ไม่ใช้ Oxygen' },
    { id: 12, name: 'ระดับ 2.1 Oxygen low flow' },
    { id: 13, name: 'ระดับ 2.2 Oxygen high flow' },
    { id: 14, name: 'ระดับ 3 ใส่ท่อและเครื่องช่วยหายใจ' },
  ]

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

  highcharts = null
  pieChartOptions = {}
  stackChartOptions = {}

  @ViewChild('loading', { static: true }) loading: any;

  constructor(
    private bedsTypeService: BedsTypeService,
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.loadData()
    this.getSubMinistry()
    this.getProvince()
  }

  async getSubMinistry () {
    try {
      const res:any = await this.filterService.getSubMinistryList()
      if (res.ok) {
        this.listSubMinistry = res.rows
      }
    } catch (error) {
      console.error(error)
    }
  }

  async getProvince () {
    try {
      const res:any = await this.filterService.getProvince()
      if (res.ok) {
        this.provinces = res.rows
      }
    } catch (error) {
      console.error(error)
    }
  }

  filterItems (id) {
    if (this.items.results.length) {
      return this.items.results.find(item => item.bed_id === id) || []
    }
    return []
  }

  checkNaN (value) {
    return isNaN(value) ? 0 : this.formatNumber(value)
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

  clearData () {
    this.items = {
      results: []
    }
  }

  selectStartDate (value) {
    this.startDate = {
      date: value.date
    }
    this.clearData()
    this.loadData()
  }

  selectEndDate (value) {
    this.endDate = {
      date: value.date
    }
    this.clearData()
    this.loadData()
  }

  selectSector () {
    this.clearData()
    this.loadData()
  }

  selectSubMinistry () {
    this.clearData()
    this.loadData()
  }

  selectZone () {
    this.clearData()
    this.loadData()
  }

  selectBedType () {
    this.clearData()
    this.loadData()
  }

  selectProvince (value) {
    const index = this.selectedProvince.findIndex(item => item.code === value.code)
    if (index > -1) {
      this.selectedProvince.splice(index, 1)
    } else {
      this.selectedProvince.push(value)
    }
    this.clearData()
    this.loadData()
  }

  setSelectMultiProvince () {
    this.isSelectProvince = !this.isSelectProvince
  }

  checkProvince (province) {
    return this.selectedProvince.some(item => item.code === province.code)
  }

  async loadData () {
    try {
      this.loading.show()
      const startDate = `${this.startDate.date.year}-${this.startDate.date.month}-${this.startDate.date.day}`
      const endDate = `${this.endDate.date.year}-${this.endDate.date.month}-${this.endDate.date.day}`
      const res:any = await this.bedsTypeService.getBedType({
        startDate,
        endDate,
        zone: this.zone,
        province: this.selectedProvince,
        sector: this.sector,
        subMinistry: this.subMinistryCode,
        bedType: this.bedTypeId
      })
      if (res.ok) {
        this.items = res.rows
        this.setPieChartBed()
        this.loading.hide()
      }
    } catch (error) {
      console.error(error)
      this.loading.hide()
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
}
