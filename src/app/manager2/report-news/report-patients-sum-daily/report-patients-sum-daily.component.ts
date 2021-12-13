import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyOptions } from '@tanjaae/mydatepicker';
import { PatientsSumDailyService } from '../../services-new-report/patients-sum-daily.service'
import { CalculateService } from '../../services-new-report/calculate.service';
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
  zone = ''
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
    private patientsSumDailyService: PatientsSumDailyService,
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

  async loadData () {
    try {
      this.isLoading = true
      const date = `${this.date.date.year}-${this.date.date.month}-${this.date.date.day}`
      const res:any = await this.patientsSumDailyService.getPatientSumDaily({ date })
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
