import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../help/alert.service';
import { PatientInfoService } from '../services/patient-info.service';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styles: []
})
export class PatientInfoComponent implements OnInit {
  list: any = [];
  query: any;

  constructor(
    private alertService: AlertService,
    private patientService: PatientInfoService
  ) { }

  ngOnInit() {
  }

  async getList() {
    try {
      const rs: any = await this.patientService.getList(this.query);
      if (rs.ok) {
        this.list.push(rs.rows);
        this.query = null;
      } else {
        this.alertService.error('ไม่พบผู้ป่วย');
      }
    } catch (error) {
      this.alertService.error();
    }
  }

  clear() {
    this.list = [];
  }

  async doEnter(e) {
    if (e.keyCode === 13) {
      await this.getList();
    }
  }

}
