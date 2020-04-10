import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../../help/alert.service';
import { RequisitionService } from '../../requisition.service';
import * as findIndex from 'lodash/findIndex';
import thaiIdCard from 'thai-id-card';
import { AutocompleteHospitalRequisitionComponent } from '../../../help/autocomplete-hospital-requisition/autocomplete-hospital-requisition.component';

@Component({
  selector: 'app-requisition-supplies-new',
  templateUrl: './requisition-supplies-new.component.html',
  styles: []
})
export class RequisitionSuppliesNewComponent implements OnInit {

  isLoadding = false;
  modal = false;
  checkCid: any;

  list: any = [];
  title: any = [];
  patient: any = [];
  generics: any = [];

  genericsEdit = [];
  selectCid: any;

  onSelectPatient: any;

  titleId = null;
  hospCode: any;
  hospName: any;
  hn = '';
  passport = '';
  cid = '';
  fname = '';
  lname = '';
  reason = '';
  tel = '';

  errorHospcode = false;
  errorCid = false;
  errorPassport = false;
  errorHN = false;
  errorTitleName = false;
  errorFname = false;
  errorLname = false;
  errorTel = false;
  errorReason = false;
  @ViewChild('hospital') hospitals: AutocompleteHospitalRequisitionComponent;
  constructor(
    private router: Router,
    private alertService: AlertService,
    private requisitionService: RequisitionService
  ) { }

  ngOnInit() {
    this.getTitle();
    this.getGenerics();
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

  verifyInput() {
    try {
      this.clearError();
      if (this.cid.length === 13) {
        this.errorCid = !thaiIdCard.verify(this.cid);
      } else {
        this.errorCid = true;
      }

      if (this.errorCid) {
        if (!this.passport.length) {
          this.errorPassport = true;
        }
      }

      if (!this.hn.length) {
        this.errorHN = true;
      }


      if (!this.titleId) {
        this.errorTitleName = true;
      }

      if (!this.fname.length) {
        this.errorFname = true;
      }

      if (!this.lname.length) {
        this.errorLname = true;
      }

      if (this.errorHospcode ||
        this.errorCid ||
        this.errorPassport ||
        this.errorHN ||
        this.errorTitleName ||
        this.errorFname ||
        this.errorLname ||
        this.errorTel ||
        this.errorReason) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;

    }

  }

  async onClickAdd() {
    if (await this.verifyInput()) {


      const obj: any = {};
      obj.hn = this.hn;
      obj.cid = this.cid;
      obj.passport = this.passport;
      obj.fname = this.fname;
      obj.lname = this.lname;
      obj.title_id = this.titleId;
      obj.reason = this.reason;
      obj.tel = this.tel;
      obj.genercs = this.generics;
      const idx = findIndex(this.patient, { cid: this.cid });
      if (idx > -1) {
        this.alertService.error('รายการซ้ำ');
      } else {
        this.patient.push(obj);
        this.clearForm();
      }
    }
  }

  clearError() {
    this.errorHospcode = false;
    this.errorCid = false;
    this.errorPassport = false;
    this.errorHN = false;
    this.errorTitleName = false;
    this.errorFname = false;
    this.errorLname = false;
    this.errorTel = false;
    this.errorReason = false;
  }

  clearForm() {
    this.hn = null;
    this.cid = null;
    this.passport = null;
    this.fname = null;
    this.lname = null;
    this.titleId = null;
    this.reason = null;
    this.tel = null;
    this.getGenerics();
    this.clearError();
  }

  onClickOpenModal(l) {
    console.log(l);
    this.selectCid = l.cid;
    this.genericsEdit = l.generics;
    this.modal = true;
  }

  onClickSaveGeneric(){

  }

  async getGenerics() {
    try {
      this.isLoadding = true;
      const rs: any = await this.requisitionService.getGenerics();
      if (rs.ok) {
        this.generics = rs.rows;
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
      this.checkCid = false;
    }
  }

  remove(idx) {
    this.patient.splice(idx, 1);
  }

  async onClickSave() {
    const confirm = await this.alertService.confirm();
    if (confirm) {
      try {
        const head: any = {
          hospcode: this.hospCode
        };
        const rs: any = await this.requisitionService.saveRequisitionSupplies(head, this.patient);
        if (rs.ok) {
          this.alertService.success();
          this.router.navigate(['/staff/requisition-supplies']);
        } else {
          this.alertService.error();
        }
      } catch (error) {
        this.alertService.error(error);
      }
    }
  }
}
