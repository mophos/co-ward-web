import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-patients-sum-daily',
  templateUrl: './report-patients-sum-daily.component.html',
  styleUrls: ['./report-patients-sum-daily.component.css']
})
export class ReportPatientsSumDailyComponent implements OnInit {

  province = ''
  isSelectProvince = false

  constructor() { }

  ngOnInit() {
  }

  setSelectMultiProvince () {
    this.isSelectProvince = !this.isSelectProvince
  }
  
}
