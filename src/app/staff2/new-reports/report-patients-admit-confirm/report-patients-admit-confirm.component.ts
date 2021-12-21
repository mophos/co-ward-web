import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyOptions } from 'mydatepicker-th';
import { NewReportService } from '../new-report.service';
import moment from 'moment';

@Component({
  selector: 'app-report-patients-admit-confirm',
  templateUrl: './report-patients-admit-confirm.component.html',
  styleUrls: ['./report-patients-admit-confirm.component.css']
})
export class ReportPatientsAdmitConfirmComponent implements OnInit {

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
    private newReportService: NewReportService,
    // private cal: CalculateService
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

  checkValue (value) {
    if (value !== undefined && (value !== null && !isNaN(value))) {
      return value
    }
    return '-'
  }

  async loadData () {
    try {
      this.isLoading = true
      const date = `${this.date.date.year}-${this.date.date.month}-${this.date.date.day}`
      const res:any = await this.newReportService.getPatientAdmit({ date })
      if (res.ok) {
        this.items = res.rows.results
        console.log(res.rows.results)
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
      const res:any = await this.newReportService.getPatientAdmitSummary({ date })
      if (res.ok) {
        this.summaries = res.rows
        console.log(res.rows)
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

  async exportExcelSumData() {
    try {
      this.loading.show()
      const date = `${this.date.date.year}-${this.date.date.month}-${this.date.date.day}`
      const res:any = await this.newReportService.exportExcelPatientAdmitSummary({ date })
      if (res) {
        this.downloadFile('รายงานผู้ป่วย Admit Confirm(สะสม)', 'xlsx', res)
        this.loading.hide()
      }

    } catch (error) {
      console.log(error)
      this.loading.hide()
    }
  }

  async exportExcelList() {
    try {
      this.loading.show()
      const date = `${this.date.date.year}-${this.date.date.month}-${this.date.date.day}`
      const res:any = await this.newReportService.exportExcelPatientAdmit({ date })
      if (res) {
        this.downloadFile('รายงานผู้ป่วย Admit Confirm(ทั้งหมด)', 'xlsx', res)
        this.loading.hide()
      }

    } catch (error) {
      console.log(error)
      this.loading.hide()
    }
  }

}
