import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../help/alert.service';
import { RequisitionService } from '../requisition.service';
import * as findIndex from 'lodash/findIndex';
import thaiIdCard from 'thai-id-card';
import { AutocompleteHospitalComponent } from 'src/app/help/autocomplete-hospital/autocomplete-hospital.component';
@Component({
  selector: 'app-requisition-new',
  templateUrl: './requisition-new.component.html',
  styles: []
})
export class RequisitionNewComponent implements OnInit {

  isLoadding = false;
  modal = false;
  checkCid: any

  list: any = [];
  title: any = [];
  patient: any = [];
  generics: any = [];

  onSelectPatient: any;

  titleId: any = 'all';
  hospCode: any;
  hospName: any;
  hn: any;
  passport: any;
  cid: any;
  fname: any;
  lname: any;
  reason: any;
  tel: any;

  @ViewChild('hospital') hospitals: AutocompleteHospitalComponent;
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

    let idx = findIndex(this.patient, { cid: this.cid });
    if (idx > -1) {
      this.alertService.error('รายการซ้ำ');
    } else {
      this.patient.push(obj);
      this.clearForm();
    }
  }

  clearForm() {
    this.hospCode = null;
    this.hospName = null;
    this.hn = null;
    this.cid = null;
    this.passport = null;
    this.fname = null;
    this.lname = null;
    this.titleId = null;
    this.reason = null;
    this.tel = null;
    this.hospitals.setQuery('');
  }

  modalAdd(l) {
    console.log(l);

    this.modal = true;
    if (l.generics !== undefined) {
      this.generics = l.generics;
    } else {
      this.getGenerics();
    }
    this.onSelectPatient = l;
  }

  async saveGenerics() {
    let confirm = await this.alertService.confirm();
    if (confirm) {
      let idx = findIndex(this.patient, { cid: this.onSelectPatient.cid });
      if (idx > -1) {
        this.patient[idx].generics = this.generics;
      }
      this.modal = false;
    }
  }

  async getGenerics() {
    try {
      this.isLoadding = true;
      const rs: any = await this.requisitionService.getGenerics();
      if (rs.ok) {
        this.generics = rs.rows;
        for (const v of this.generics) {
          v.qty = 0;
        }
      } else {
        this.alertService.error(rs.error);
      }
      this.isLoadding = false;
    } catch (error) {
      this.isLoadding = false;
      this.alertService.error(error);
    }
  }

  async enterCid() {
    if (this.cid.length == 13) {
      this.checkCid = thaiIdCard.verify(this.cid);
    } else {
      this.checkCid = false
    }
  }

  remove(idx) {
    this.patient.splice(idx, 1);
  }

  async saveAll() {
    let confirm = await this.alertService.confirm();
    if (confirm) {
      try {
        let rs: any = await this.requisitionService.save(this.patient);
        if (rs.ok) {
          this.alertService.success();
          this.router.navigate(['/staff/requisition']);
        } else {
          this.alertService.error();
        }
      } catch (error) {
        this.alertService.error(error);
      }
    }
  }
}
