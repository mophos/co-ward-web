import { Component, OnInit } from '@angular/core';
import { IMyOptions } from '@tanjaae/mydatepicker';
import { PatientsZoneService } from '../../serveices-new-report/patients-zone.service';
import moment from 'moment';

@Component({
  selector: 'app-report-patients-zone',
  templateUrl: './report-patients-zone.component.html',
  styleUrls: ['./report-patients-zone.component.css']
})
export class ReportPatientsZoneComponent implements OnInit {

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
    private patientsZoneService: PatientsZoneService,
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
      const res:any = await this.patientsZoneService.getPatientZone({ date })
      if (res.ok) {
        this.items = res.rows
        console.log(res.rows)
      }
    } catch (error) {
      console.error(error)
    }
  }

}
