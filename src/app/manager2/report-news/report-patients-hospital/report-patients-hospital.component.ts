import { Component, OnInit } from '@angular/core';
import { IMyOptions } from 'mydatepicker-th';
import { PatientsHospitalService } from '../../serveices-new-report/patients-hospital.service'
import moment from 'moment';

@Component({
  selector: 'app-report-patients-hospital',
  templateUrl: './report-patients-hospital.component.html',
  styleUrls: ['./report-patients-hospital.component.css']
})
export class ReportPatientsHospitalComponent implements OnInit {

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
    private patientsHospitalService: PatientsHospitalService
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
      const res:any = await this.patientsHospitalService.getPatientHospital({ date })
      if (res.ok) {
        this.items = res.rows
        console.log('patient hospital ', res.rows)
        this.isLoading = false
      }
    } catch (error) {
      console.error(error)
    }
  }

}
