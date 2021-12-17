import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyOptions } from 'mydatepicker-th';
import { NewReportService } from '../new-report.service';
import moment from 'moment';

@Component({
  selector: 'app-report-bed2',
  templateUrl: './report-bed2.component.html',
  styleUrls: ['./report-bed2.component.css']
})
export class ReportBed2Component implements OnInit {

  isLoading = false

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd-mm-yyyy',
    editableDateField: false,
    showClearDateBtn: false
  }
  // date:any = {
  //   date: {
  //     year: moment().year(),
  //     month: moment().month() + 1,
  //     day: moment().date()
  //   }
  // }
  date:any = {
    date: {
      year: 2020,
      month: 5,
      day: 27
    }
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
  provinces:any = []
  isSelectProvince = false
  @ViewChild('loading', { static: true }) loading: any;

  constructor(
    private newReportService: NewReportService,
  ) { }

  ngOnInit() {
    this.loadData()
  }

  checkValue (value) {
    if (value !== undefined && (value !== null && !isNaN(value))) {
      return value
    }
    return '-'
  }

  getRemaining (num1, num2) {
    if (!num1 && !num2) {
      return '-'
    }
    return (num1 || 0) - (num2 || 0)
  }

  selectDate (value) {
    this.date = {
      date: value.date
    }
    this.items = []
    this.loadData()
  }

  selectZone () {
    this.items = []
    this.loadData()
    this.isSelectProvince = false
  }

  selectProvince (value) {
    const index = this.provinceGroup.findIndex(item => item.code === value.code)
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
    return this.provinceGroup.some(item => item.name === province.name)
  }

  async loadData () {
    try {
      this.isLoading = true
      const date = `${this.date.date.year}-${this.date.date.month}-${this.date.date.day}`
      const res:any = await this.newReportService.getNewBeds({ date })
      if (res.ok) {
        const items = []

        res.rows.forEach((row, i) => {
          row.forEach((x, j) => {
            if (!items.some(item => item.hospcode === x.hospcode)) {
              items.push({
                zone_code: x.zone_code,
                province_code: x.province_code,
                province_name: x.province_name,
                hospcode: x.hospcode,
                hospname: x.hospname,
                level: x.level,
                sub_ministry_name: x.sub_ministry_name
              })
            }

            const index = items.findIndex(item => item.hospcode === x.hospcode)
            if (index > -1) {
              if (x.bed_name === 'ระดับ3 ใส่ท่อและเครื่องช่วยหายใจ') {
                items[index].level3_total = x.total
                items[index].level3_used = x.used
              } else if (x.bed_name === 'ระดับ 2.2 Oxygen high flow') {
                items[index].level2_2_total = x.total
                items[index].level2_2_used = x.used
              } else if (x.bed_name === 'ระดับ 2.2 Oxygen high flow') {
                items[index].level2_2_total = x.total
                items[index].level2_2_used = x.used
              } else if (x.bed_name === 'ระดับ 2.1 Oxygen high low') {
                items[index].level2_1_total = x.total
                items[index].level2_1_used = x.used
              } else if (x.bed_name === 'ระดับ 1 ไม่ใช่ Oxygen') {
                items[index].level1_total = x.total
                items[index].level1_used = x.used
              } else if (x.bed_name === 'ระดับ 0 Home Isolation (stepdown)') {
                items[index].level0_total = x.total
                items[index].level0_used = x.used
              } else if (x.bed_name === 'Home Isolation') {
                items[index].home_isolation_total = x.total
                items[index].home_isolation_used = x.used
              } else if (x.bed_name === 'Community Isolation') {
                items[index].community_isolation_total = x.total
                items[index].community_isolation_used = x.used
              } else if (x.bed_name === 'AIIR') {
                items[index].aiir_total = x.total
                items[index].aiir_used = x.used
              } else if (x.bed_name === 'Modified AIIR') {
                items[index].modified_aiir_total = x.total
                items[index].modified_aiir_used = x.used
              } else if (x.bed_name === 'Isolate') {
                items[index].isolate_total = x.total
                items[index].isolate_used = x.used
              } else if (x.bed_name === 'Cohort') {
                items[index].cohort_total = x.total
                items[index].cohort_used = x.used
              } else if (x.bed_name === 'Hospitel') {
                items[index].hospitel_total = x.total
                items[index].hospitel_used = x.used
              } else if (x.bed_name === 'Cohort ICU') {
                items[index].cohort_icu_total = x.total
                items[index].cohort_icu_used = x.used
              }
            }
          })
        })

        const provinces = []
        res.rows.forEach(row => {
          row.forEach(item => {
            if (!provinces.some(x => x.code === item.province_code)) {
              provinces.push({
                code: item.province_code,
                name: item.province_name
              })
            }
          })
        })
        this.provinces = provinces

        this.items = items
        console.log('beds hospital ', this.items)
        this.isLoading = false
      }
    } catch (error) {
      console.error(error)
    }
  }

}
