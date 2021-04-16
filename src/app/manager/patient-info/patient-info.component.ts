import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from '../../help/alert.service';
import { PatientInfoService } from '../patient-info.service';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styles: []
})
export class PatientInfoComponent implements OnInit {
  list: any = [];
  query: any;
  @ViewChild('modalLoading', { static: true }) loadding: any;
  constructor(
    private alertService: AlertService,
    private patientService: PatientInfoService
  ) { }

  ngOnInit() {
  }

  async getList() {
    this.loadding.show();
    try {
      const rs: any = await this.patientService.getList(this.query);
      if (rs.ok) {
        this.loadding.hide();
        this.list = rs.rows;
        this.query = null;
      } else {
        this.loadding.hide();
        this.alertService.error('ไม่พบผู้ป่วย');
      }
    } catch (error) {
      this.loadding.hide();
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
