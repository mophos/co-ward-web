import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyOptions } from 'mydatepicker-th';
import { PatientsHospitalService } from '../../services-new-report/patients-hospital.service'
import { CalculateService } from '../../services-new-report/calculate.service';
import provinceJson from '../../../../assets/provinces.json'
import moment from 'moment';

@Component({
  selector: 'app-report-patients-hospital',
  templateUrl: './report-patients-hospital.component.html',
  styleUrls: ['./report-patients-hospital.component.css']
})
export class ReportPatientsHospitalComponent implements OnInit {

  isLoading = false

  items:any = []
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
      month: 4,
      day: 27
    }
  }
  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd-mm-yyyy',
    editableDateField: false,
    showClearDateBtn: false
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
  provinces:any = []
  isSelectProvince = false
  @ViewChild('loading', { static: true }) loading: any;

  constructor(
    private patientsHospitalService: PatientsHospitalService,
    private cal: CalculateService
  ) { }

  ngOnInit() {
    this.loadData()
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
      const res:any = await this.patientsHospitalService.getPatientHospital({
        date,
        zone: this.zone,
        province: this.provinceGroup
      })
      if (res.ok) {
        this.items = res.rows
        console.log('patient hospital ', res.rows)
        this.isLoading = false

        const provinces = []
        res.rows.forEach(item => {
          if (!provinces.some(x => x.code === item.province_code)) {
            provinces.push({
              code: item.province_code,
              name: item.province_name
            })
          }
        })
        this.provinces = provinces
      }
    } catch (error) {
      console.error(error)
    }
  }

  downloadFile (name, type, data: any) {
    try {
      const url = window.URL.createObjectURL(new Blob([data]))
      const fileName = `${name}.${type}`
      const a = document.createElement('a')
      document.body.appendChild(a)
      a.setAttribute('style', 'display: none')
      a.href = url
      a.download = fileName
      a.click()
      window.URL.revokeObjectURL(url)
      a.remove()
    } catch (error) {
      console.log(error)
    }
  }

  async exportExcel() {
    try {
      this.loading.show()
      const date = `${this.date.date.year}-${this.date.date.month}-${this.date.date.day}`
      const res:any = await this.patientsHospitalService.exportExcelPatientHospital({
        date,
        zone: this.zone,
        province: this.provinceGroup
      })
      if (res) {
        this.downloadFile('รายงานผู้ป่วยรายสถานพยาบาล', 'xlsx', res)
        this.loading.hide()
      }

    } catch (error) {
      console.log(error)
      this.loading.hide()
    }
  }

}
