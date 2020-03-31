import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../help/alert.service';
import { RequisitionService } from '../requisition.service';

@Component({
  selector: 'app-requisition-new',
  templateUrl: './requisition-new.component.html',
  styles: []
})
export class RequisitionNewComponent implements OnInit {

  isLoadding = false;

  list: any = [];
  title: any = [];
  patient: any = [];

  titleId: any;
  hospCode: any;
  hospName: any;
  hn: any;
  passport: any;
  cid: any;
  fname: any;
  lname: any;
  reason: any;
  tel: any;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private requisitionService: RequisitionService
  ) { }

  ngOnInit() {
    this.getTitle();
  }

  async getTitle() {
    try {
      this.isLoadding = true;
      const rs: any = await this.requisitionService.getTitle();
      if (rs.ok) {

        this.title = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
      this.isLoadding = false;
    } catch (error) {
      this.isLoadding = false;
      this.alertService.error(error);
    }
  }

  onSelectHosp(e) {
    this.hospCode = e.hospcode;
    this.hospName = e.hospname;
  }

  add() {
    const obj: any = {};
    obj.hospcode = this.hospCode;
    obj.hospname = this.hospName;
    obj.hn = this.hn;
    obj.cid = this.cid;
    obj.passport = this.passport;
    obj.fname = this.fname;
    obj.lname = this.lname;
    obj.title_id = this.titleId;
    obj.reason = this.reason;
    obj.tel = this.tel;

    this.patient.push(obj);
  }
}
