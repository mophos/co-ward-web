import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyOptions } from '@tanjaae/mydatepicker';
import { PatientsAdmitService } from '../../services-new-report/patients-admit.service';
import { CalculateService } from '../../services-new-report/calculate.service';
import * as moment from 'moment';

@Component({
  selector: 'app-report-patients-admit',
  templateUrl: './report-patients-admit.component.html',
  styleUrls: ['./report-patients-admit.component.css']
})
export class ReportPatientsAdmitComponent implements OnInit {

  isLoading = false

  items:any = []
  summaries:any = []
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
      day: 19
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
    private patientsAdmitService: PatientsAdmitService,
    private cal: CalculateService
  ) { }

  ngOnInit() {
    this.loadData()
    this.loadDataSummary()
  }

  getAge (value) {
    const now =  moment()
    const dateBirth = moment(value)
    return now.diff(dateBirth, 'years')
  }

  formatDate (value) {
    return moment(value).format('DD-MM-YYYY')
  }

  selectDate (value) {
    this.date = {
      date: value.date
    }
    this.items = []
    this.summaries = []
    this.loadData()
  }

  async loadData () {
    try {
      this.isLoading = true
      const date = `${this.date.date.year}-${this.date.date.month}-${this.date.date.day}`
      const res:any = await this.patientsAdmitService.getPatientAdmit({ date })
      if (res.ok) {
        this.items = res.rows.results
        this.isLoading = false
      }
    } catch (error) {
      console.error(error)
    }
  }

  async loadDataSummary () {
    try {
      this.isLoading = true
      const date = `${this.date.date.year}-${this.date.date.month}-${this.date.date.day}`
      const res:any = await this.patientsAdmitService.getPatientAdmitSummary({ date })
      if (res.ok) {
        this.summaries = res.rows
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
      console.error(error)
    }
  }

  async exportExcelSumData() {
    try {
      this.loading.show()
      const date = `${this.date.date.year}-${this.date.date.month}-${this.date.date.day}`
      const res:any = await this.patientsAdmitService.exportExcelPatientAdmitSummary({ date })
      if (res) {
        this.downloadFile('รายงานผู้ป่วย Admit(สะสม)', 'xlsx', res)
        this.loading.hide()
      }

    } catch (error) {
      console.error(error)
      this.loading.hide()
    }
  }

  async exportExcelList() {
    try {
      this.loading.show()
      const date = `${this.date.date.year}-${this.date.date.month}-${this.date.date.day}`
      const res:any = await this.patientsAdmitService.exportExcelPatientAdmit({ date })
      if (res) {
        this.downloadFile('รายงานผู้ป่วย Admit(ทั้งหมด)', 'xlsx', res)
        this.loading.hide()
      }

    } catch (error) {
      console.error(error)
      this.loading.hide()
    }
  }

}
