import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-patients-status',
  templateUrl: './report-patients-status.component.html',
  styleUrls: ['./report-patients-status.component.css']
})
export class ReportPatientsStatusComponent implements OnInit {

  province = ''
  isSelectProvince = false

  constructor() { }

  ngOnInit() {
  }

  setSelectMultiProvince () {
    this.isSelectProvince = !this.isSelectProvince
  }

}
