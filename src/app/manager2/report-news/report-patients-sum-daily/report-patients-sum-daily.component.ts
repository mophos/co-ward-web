import { Component, OnInit } from '@angular/core';
import { IMyOptions } from '@tanjaae/mydatepicker';
import { PatientsSumDailyService } from '../../serveices-new-report/patients-sum-daily.service'
import provinceJson from '../../../../assets/provinces.json'
import moment from 'moment';

@Component({
  selector: 'app-report-patients-sum-daily',
  templateUrl: './report-patients-sum-daily.component.html',
  styleUrls: ['./report-patients-sum-daily.component.css']
})
export class ReportPatientsSumDailyComponent implements OnInit {

  items:any = []
  zone = []
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

  constructor(
    private patientsSumDailyService: PatientsSumDailyService
  ) { }

  ngOnInit() {
    // this.loadData()
  }

  selectZone () {
    // TODO : GET DATA AGAIN
    // this.loadData()
  }

  selectProvince (value) {
    const index = this.provinceGroup.findIndex(item => item === value)
    if (index > -1) {
      this.provinceGroup.splice(index, 1)
    } else {
      this.provinceGroup.push(value)
    }
  }

  setSelectMultiProvince () {
    this.isSelectProvince = !this.isSelectProvince
  }

  checkProvince (province) {
    return this.provinceGroup.some(item => item === province)
  }

  async loadData () {
    try {
      const res:any = await this.patientsSumDailyService.getPatientSumDaily()
      if (res.ok) {
        this.items = res.rows
        console.log('paitent sum daily ', res.rows)
      }
    } catch (error) {
      console.error(error)
    }
  }

}
