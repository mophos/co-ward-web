import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyOptions } from '@tanjaae/mydatepicker';
import { PatientsZoneService } from '../../services-new-report/patients-zone.service';
import { CalculateService } from '../../services-new-report/calculate.service';
import moment from 'moment';

@Component({
  selector: 'app-report-patients-zone',
  templateUrl: './report-patients-zone.component.html',
  styleUrls: ['./report-patients-zone.component.css']
})
export class ReportPatientsZoneComponent implements OnInit {

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
  @ViewChild('loading', { static: true }) loading: any;

  constructor(
    private patientsZoneService: PatientsZoneService,
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
      const res:any = await this.patientsZoneService.getPatientZone({ date })
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
      const res:any = await this.patientsZoneService.exportExcelPatientZone({ date })
      if (res) {
        this.downloadFile('รายงานผู้ป่วยรายเขต', 'xlsx', res)
        this.loading.hide()
      }

    } catch (error) {
      console.error(error)
      this.loading.hide()
    }
  }

}
