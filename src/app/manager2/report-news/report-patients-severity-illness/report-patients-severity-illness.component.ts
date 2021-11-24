import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-patients-severity-illness',
  templateUrl: './report-patients-severity-illness.component.html',
  styleUrls: ['./report-patients-severity-illness.component.css']
})
export class ReportPatientsSeverityIllnessComponent implements OnInit {

  province = ''
  isSelectProvince = false

  constructor() { }

  ngOnInit() {
  }

  setSelectMultiProvince () {
    this.isSelectProvince = !this.isSelectProvince
  }

}
