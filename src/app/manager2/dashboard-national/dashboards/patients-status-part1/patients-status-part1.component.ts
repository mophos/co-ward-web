import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyOptions } from 'mydatepicker-th';
import * as Highcharts from 'highcharts';
import moment from 'moment';
import { PatientsStatusService } from 'src/app/manager2/services-new-dashboard/patients-status.service';
import { FilterService } from 'src/app/manager2/services-new-dashboard/filter.service';

@Component({
  selector: 'app-patients-status-part1',
  templateUrl: './patients-status-part1.component.html',
  styleUrls: ['./patients-status-part1.component.css']
})
export class PatientsStatusPart1Component implements OnInit {

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
      day: 30
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
      month: 5,
      day: 30
    }
  }

  highcharts = null
  lineChartOptions = {}

  @ViewChild('loading', { static: true }) loading: any;

  constructor(
    private patientsStatusService: PatientsStatusService,
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
    this.items = []
    this.loadData()
  }

  selectEndDate (value) {
    this.endDate = {
      date: value.date
    }
    this.items = []
    this.loadData()
  }

  selectSector () {
    this.items = []
    this.loadData()
  }

  selectSubMinistry () {
    this.items = []
    this.loadData()
  }

  selectZone () {
    this.items = []
    this.loadData()
  }

  selectBedType () {
    this.items = []
    this.loadData()
  }

  selectProvince (value) {
    const index = this.selectedProvince.findIndex(item => item.code === value.code)
    if (index > -1) {
      this.selectedProvince.splice(index, 1)
    } else {
      this.selectedProvince.push(value)
    }
    this.items = []
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
      const res:any = await this.patientsStatusService.getPatientsStatus({
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
        this.loading.hide()
      }
    } catch (error) {
      console.error(error)
      this.loading.hide()
    }
  }

  setLineChartPatientEachStatus () {
    const startDate = moment(`${this.startDate.date.year}-${this.startDate.date.month}-${this.startDate.date.day}`, 'YYYY-MM-DD')
    const endDate = moment(`${this.endDate.date.year}-${this.endDate.date.month}-${this.endDate.date.day}`, 'YYYY-MM-DD')
    const diff = endDate.diff(startDate, 'days')
    const categories = []
    const admit = []
    const discharge = []
    const death = []

    for (let i = 0; i < diff; i++) {
      categories.push(moment(startDate).format('DD-MM-YYYY'))
      startDate.add(1, 'days');
    }

    categories.forEach((categorie, i) => {
      if (this.items.admit && this.items.admit.length) {
        const data = this.items.admit.find(item => moment(item.date_admit).format('DD-MM-YYYY') === categorie)
        if (data) {
          admit.push(data.amount)
        } else {
          admit.push(0)
        }
      }
      if (this.items.discharge && this.items.discharge.length) {
        const data = this.items.discharge.find(item => moment(item.date_admit).format('DD-MM-YYYY') === categorie)
        if (data) {
          discharge.push(data.amount)
        } else {
          discharge.push(0)
        }
      }
      if (this.items.death && this.items.death.length) {
        const data = this.items.death.find(item => moment(item.date_admit).format('DD-MM-YYYY') === categorie)
        if (data) {
          death.push(data.amount)
        } else {
          death.push(0)
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
        categories
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top'
      },
      colors: ['#0880FF', '#06F647', '#FF0000'],
      series: [{
          name: 'Admit',
          data: admit
      }, {
          name: 'Discharge',
          data: discharge
      }, {
          name: 'Death',
          data: death
      }]
    }
    this.highcharts = Highcharts
  }
}
