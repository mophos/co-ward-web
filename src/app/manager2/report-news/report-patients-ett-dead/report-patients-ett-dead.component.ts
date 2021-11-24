import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-patients-ett-dead',
  templateUrl: './report-patients-ett-dead.component.html',
  styleUrls: ['./report-patients-ett-dead.component.css']
})
export class ReportPatientsEttDeadComponent implements OnInit {

  province = ''
  isSelectProvince = false

  constructor() { }

  ngOnInit() {
  }

  setSelectMultiProvince () {
    this.isSelectProvince = !this.isSelectProvince
  }

}
