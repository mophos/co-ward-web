import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyOptions } from 'mydatepicker-th';
import * as Highcharts from 'highcharts';
import moment from 'moment';
import { PatientsCaseService } from 'src/app/manager2/services-new-dashboard/patients-case.service';
import { FilterService } from 'src/app/manager2/services-new-dashboard/filter.service';

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
      day: 27
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

  highcharts = null;
  lineChartOptions = {}

  @ViewChild('loading', { static: true }) loading: any;

  constructor(
    private patientsCaseService: PatientsCaseService,
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.loadData()
    this.getProvince()
    // this.getMinistry()
    this.getSubMinistry()
  }

  // async getMinistry () {
  //   try {
  //     const res:any = await this.filter.getMinistryList()
  //     if (res.ok) {
  //       this.listMinistry = res.rows
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

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
      const res:any = await this.patientsCaseService.getPatientsCase({
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
        this.setLineChartPatientEachCase()
        this.loading.hide()
      }
    } catch (error) {
      console.error(error)
      this.loading.hide()
    }
  }

  setLineChartPatientEachCase () {
    const startDate = moment(`${this.startDate.date.year}-${this.startDate.date.month}-${this.startDate.date.day}`, 'YYYY-MM-DD')
    const endDate = moment(`${this.endDate.date.year}-${this.endDate.date.month}-${this.endDate.date.day}`, 'YYYY-MM-DD')
    const diff = endDate.diff(startDate, 'days')
    const categories = []
    const severe = []
    const moderate = []
    const mild = []
    const asymptomatic = []

    for (let i = 0; i <= diff; i++) {
      categories.push(moment(startDate).format('DD-MM-YYYY'))
      startDate.add(1, 'days');
    }

    categories.forEach((categorie, i) => {
      if (this.items.severe && this.items.severe.length) {
        const data = this.items.severe.find(item => moment(item.date_admit).format('DD-MM-YYYY') === categorie)
        if (data) {
          severe.push(data.amount)
        } else {
          severe.push(0)
        }
      }
      if (this.items.moderate && this.items.moderate.length) {
        const data = this.items.moderate.find(item => moment(item.date_admit).format('DD-MM-YYYY') === categorie)
        if (data) {
          moderate.push(data.amount)
        } else {
          moderate.push(0)
        }
      }
      if (this.items.mild && this.items.mild.length) {
        const data = this.items.mild.find(item => moment(item.date_admit).format('DD-MM-YYYY') === categorie)
        if (data) {
          mild.push(data.amount)
        } else {
          mild.push(0)
        }
      }
      if (this.items.asymptomatic && this.items.asymptomatic.length) {
        const data = this.items.asymptomatic.find(item => moment(item.date_admit).format('DD-MM-YYYY') === categorie)
        if (data) {
          asymptomatic.push(data.amount)
        } else {
          asymptomatic.push(0)
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
      series: [{
          name: 'Severe Case',
          data: severe
      }, {
          name: 'Moderate Case',
          data: moderate
      }, {
          name: 'Mild Case',
          data: mild
      }, {
          name: 'Asymotimatic',
          data: asymptomatic
      }]
    }
    this.highcharts = Highcharts
  }
}
