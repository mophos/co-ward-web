import { PatientInfoService } from './../patient-info.service';
import { AlertService } from './../../help/alert.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-patient-info-details',
  templateUrl: './patient-info-details.component.html',
  styles: []
})
export class PatientInfoDetailsComponent implements OnInit {


  // cid: any;
  // @Input('setCid')
  // set setProducts(value: any) {
  //   this.cid = value;
  //   this.getList();
  // }
  @Input() cid: any;
  list = [];
  constructor(
    private alertService: AlertService,
    private patientService: PatientInfoService
  ) { }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    // this.loadding.show();
    try {
      const rs: any = await this.patientService.getListDetail(this.cid);
      if (rs.ok) {
        // this.loadding.hide();
        this.list = rs.rows;
        console.log(this.list);
        
        // this.query = null;
      } else {
        // this.loadding.hide();
        this.alertService.error('ไม่พบผู้ป่วย');
      }
    } catch (error) {
      // this.loadding.hide();
      this.alertService.error();
    }
  }

}
