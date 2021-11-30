import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyOptions } from '@tanjaae/mydatepicker';
import { PatientsSumDailyService } from '../../serveices-new-report/patients-sum-daily.service'
import provinceJson from '../../../../assets/provinces.json'
import moment from 'moment';

@Component({
  selector: 'app-report-patients-sum-daily',
  templateUrl: './report-patients-sum-daily.component.html',
  styleUrls: ['./report-patients-sum-daily.component.css']
})
export class ReportPatientsSumDailyComponent implements OnInit {

  isLoading = false

  items:any = []
  zone = []
  provinceGroup = []
  displayProvince = ''
  provinces = provinceJson.data
  isSelectProvince = false
  date:any = {
    date: {
      year: moment().year(),
      month: moment().month() + 1,
      day: moment().date()
    }
  }
  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd-mm-yyyy',
    editableDateField: false,
    showClearDateBtn: false
  }
  @ViewChild('loading', { static: true }) loading: any;

  constructor(
    private patientsSumDailyService: PatientsSumDailyService
  ) { }

  ngOnInit() {
    // this.loadData()
  }

  selectZone () {
    // TODO : GET DATA AGAIN
    // this.loadData()
  }

  selectProvince (value) {
    const index = this.provinceGroup.findIndex(item => item === value)
    if (index > -1) {
      this.provinceGroup.splice(index, 1)
    } else {
      this.provinceGroup.push(value)
    }
  }

  setSelectMultiProvince () {
    this.isSelectProvince = !this.isSelectProvince
  }

  checkProvince (province) {
    return this.provinceGroup.some(item => item === province)
  }

  async loadData () {
    try {
      this.isLoading = true
      const res:any = await this.patientsSumDailyService.getPatientSumDaily()
      if (res.ok) {
        this.items = res.rows
        console.log('paitent sum daily ', res.rows)
        this.isLoading = false
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
      const res:any = await this.patientsSumDailyService.exportExcelPatientSumDaily({ date })
      if (res) {
        this.downloadFile('รายงานผู้ป่วย สะสม + วันนี้', 'xlsx', res)
        this.loading.hide()
      }

    } catch (error) {
      console.log(error)
      this.loading.hide()
    }
  }

}
