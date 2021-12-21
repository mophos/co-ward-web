import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyOptions } from 'mydatepicker-th';
import { RespiratorService } from '../../services-new-report/respirator.service'
import { CalculateService } from '../../services-new-report/calculate.service';
import moment from 'moment';

@Component({
  selector: 'app-report-respirator',
  templateUrl: './report-respirator.component.html',
  styleUrls: ['./report-respirator.component.css']
})
export class ReportRespiratorComponent implements OnInit {

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
  @ViewChild('loading', { static: true }) loading: any;

  constructor(
    private respiratorService: RespiratorService,
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
      const res:any = await this.respiratorService.getRespirator({ date })
      if (res.ok) {
        this.items = res.rows
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

  async exportExcel() {
    try {
      this.loading.show()
      const date = `${this.date.date.year}-${this.date.date.month}-${this.date.date.day}`
      const res:any = await this.respiratorService.exportExcelRespirator({ date })
      if (res) {
        this.downloadFile('รายงานการใช้เครื่องช่วยหายใจ', 'xlsx', res)
        this.loading.hide()
      }

    } catch (error) {
      console.error(error)
      this.loading.hide()
    }
  }

}
