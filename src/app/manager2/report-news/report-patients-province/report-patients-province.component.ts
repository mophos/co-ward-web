import { Component, OnInit } from '@angular/core';
import { IMyOptions } from '@tanjaae/mydatepicker'
import { PatientsProvinceService } from '../../serveices-new-report/patients-province.service'
import moment from 'moment';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-report-patients-province',
  templateUrl: './report-patients-province.component.html',
  styleUrls: ['./report-patients-province.component.css']
})
export class ReportPatientsProvinceComponent implements OnInit {

  isLoading = false

  items:any = []
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

  constructor(
    private patientsProvinceService: PatientsProvinceService
  ) { }

  ngOnInit() {
    this.loadData()
  }

  selectDate (value) {
    this.date = {
      date: value.date
    }
    this.loadData()
  }

  async loadData () {
    try {
      this.isLoading = true
      const date = `${this.date.date.year}-${this.date.date.month}-${this.date.date.day}`
      const res:any = await this.patientsProvinceService.getPatientProvince({ date })
      if (res.ok) {
        this.items = res.rows
        console.log(res.rows)
        this.isLoading = false
      }
    } catch (error) {
      console.error(error)
    }
  }

}
