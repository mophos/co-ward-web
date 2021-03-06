import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyOptions } from 'mydatepicker-th';
import * as Highcharts from 'highcharts';
import moment from 'moment';
import { PatientsStatusService } from 'src/app/manager2/services-new-dashboard/patients-status.service';
import { FilterService } from 'src/app/manager2/services-new-dashboard/filter.service';

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
  selectedProvince = []
  displayProvince = ''
  provinces = []
  isSelectProvince = false
  sector = ''
  subMinistryCode = ''
  bedTypeId = ''
  listSubMinistry: any = []
  bedTypes:any = [
    { id: 1, name: 'AIIR' },
    { id: 2, name: 'Modified AIIR' },
    { id: 3, name: 'Isolate' },
    { id: 4, name: 'Cohort' },
    { id: 5, name: 'Hospitel' },
    { id: 7, name: 'Cohort ICU' },
    { id: 8, name: 'Home Isolation' },
    { id: 9, name: 'Community Isolation' },
    { id: 10, name: 'ระดับ 0 Home Isolation (stepdown)' },
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
  // startDate:any = {
  //   date: {
  //     year: 2020,
  //     month: 4,
  //     day: 10
  //   }
  // }
  endDate:any = {
    date: {
      year: moment().year(),
      month: moment().month() + 1,
      day: moment().date()
    }
  }
  // endDate:any = {
  //   date: {
  //     year: 2020,
  //     month: 4,
  //     day: 30
  //   }
  // }

  highcharts = null
  lineChartOptions = {}

  @ViewChild('loading', { static: true }) loading: any;

  constructor(
    private patientsStatusService: PatientsStatusService,
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.loadAllData()
    this.getSubMinistry()
    this.getProvince()
  }

  clearData () {
    this.chart = {}
    this.items = []
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
    this.clearData()
    this.loadAllData()
  }

  selectEndDate (value) {
    this.endDate = {
      date: value.date
    }
    this.clearData()
    this.loadAllData()
  }

  selectSector () {
    this.clearData()
    this.loadAllData()
  }

  selectSubMinistry () {
    this.clearData()
    this.loadAllData()
  }

  selectZone () {
    this.clearData()
    this.loadAllData()
  }

  selectBedType () {
    this.clearData()
    this.loadAllData()
  }

  selectProvince (value) {
    const index = this.selectedProvince.findIndex(item => item.code === value.code)
    if (index > -1) {
      this.selectedProvince.splice(index, 1)
    } else {
      this.selectedProvince.push(value)
    }
    this.clearData()
    this.loadAllData()
  }

  setSelectMultiProvince () {
    this.isSelectProvince = !this.isSelectProvince
  }

  checkProvince (province) {
    return this.selectedProvince.some(item => item.code === province.code)
  }

  async loadAllData () {
    try {
      this.loading.show()
      const requests = []
      requests.push(this.loadDataTotal())
      requests.push(this.loadDataChart())
      const res = await Promise.all(requests)
      if (res) {
        this.loading.hide()
      }
    } catch (error) {
      console.error(error)
      this.loading.hide()
    }
  }

  async loadDataTotal () {
    try {
      const startDate = `${this.startDate.date.year}-${this.startDate.date.month}-${this.startDate.date.day}`
      const endDate = `${this.endDate.date.year}-${this.endDate.date.month}-${this.endDate.date.day}`
      const res:any = await this.patientsStatusService.getPatientsStatusCategory({
        startDate,
        endDate,
        zone: this.zone,
        province: this.selectedProvince,
        sector: this.sector,
        subMinistry: this.subMinistryCode,
        bedType: this.bedTypeId
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
        endDate,
        zone: this.zone,
        province: this.selectedProvince,
        sector: this.sector,
        subMinistry: this.subMinistryCode,
        bedType: this.bedTypeId
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
