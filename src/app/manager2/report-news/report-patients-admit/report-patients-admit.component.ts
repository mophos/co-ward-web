import { Component, OnInit } from '@angular/core';
import { IMyOptions } from '@tanjaae/mydatepicker';
import { PatientsAdmitService } from '../../serveices-new-report/patients-admit.service';
import moment from 'moment';

@Component({
  selector: 'app-report-patients-admit',
  templateUrl: './report-patients-admit.component.html',
  styleUrls: ['./report-patients-admit.component.css']
})
export class ReportPatientsAdmitComponent implements OnInit {

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
    private patientsAdmitService: PatientsAdmitService
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
      const res:any = await this.patientsAdmitService.getPatientAdmit({ date })
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
