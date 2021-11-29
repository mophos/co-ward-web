import { Component, OnInit } from '@angular/core';
import { IMyOptions } from '@tanjaae/mydatepicker';
import { PatientsDischargeService } from '../../serveices-new-report/patients-discharge.service'
import moment  from 'moment';

@Component({
  selector: 'app-report-patients-discharge',
  templateUrl: './report-patients-discharge.component.html',
  styleUrls: ['./report-patients-discharge.component.css']
})
export class ReportPatientsDischargeComponent implements OnInit {

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
    private patientsDischargeService: PatientsDischargeService
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
      const date = `${this.date.date.year}-${this.date.date.month}-${this.date.date.day}`
      const res:any = await this.patientsDischargeService.getPatientDischarge({ date })
      if (res.ok) {
        this.items = res.rows
        console.log('patient discharge ', res.rows)
      }
    } catch (error) {
      console.error(error)
    }
  }

}
