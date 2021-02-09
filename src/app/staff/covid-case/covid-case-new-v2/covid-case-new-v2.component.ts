import { Component, OnInit, ViewChild } from '@angular/core';
import thaiIdCard from 'thai-id-card';
import { CovidCaseService } from './../../services/covid-case.service';
import { AlertService } from './../../../help/alert.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-covid-case-new-v2',
  templateUrl: './covid-case-new-v2.component.html',
  styleUrls: ['./covid-case-new-v2.component.css']
})
export class CovidCaseNewV2Component implements OnInit {
  isModelSearch = false;
  cid: any = '';
  passpost: any = '';
  typeRegister: any = 'NEW';
  caseType: any;

  province = '';
  peopleType = null;
  cidError = true;
  blankPassport = false;
  btn1: any;
  @ViewChild('loading') loading: any;
  constructor(
    private covidCaseService: CovidCaseService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.btn1 = 3;
  }

  activeButton() {
    if (!this.blankPassport) {
      this.cidError = false;
    } else {
      this.cidError = true;
    }
  }

  onKeyCid(e) {
    const cid = e.target.value;
    if (cid.length === 13) {
      if (thaiIdCard.verify(this.cid)) {
        this.cidError = false;
      } else {
        this.cidError = true;
      }
    } else {
      this.cidError = true;
    }
  }

  onKeyPassport(e) {
    const passpost = e.target.value;
    if (passpost.length >= 8) {
      this.cidError = false;
    } else {
      this.cidError = true;
    }
  }

  changePeopleType(v) {
    this.peopleType = v;
    this.cid = '';
    this.passpost = '';
  }

  async next() {
    try {
      this.isModelSearch = true;
      const type = this.peopleType === 'THAI' ? 'CID' : 'PASSPORT';
      const rs: any = await this.covidCaseService.checkNo(type, this.cid, this.passpost);
      if (rs.ok) {
        if (rs.case === 'NEW') {
          this.router.navigate(['/staff/covid-case-new', { province: this.province, caseStatus: this.caseType, peopleType: this.peopleType, cid: this.cid, passport: this.passpost, typeRegister: this.typeRegister }]);
        } else if (rs.case === 'REFER') {
          this.typeRegister = 'REFER';
          const confirm = await this.alertService.confirm(`คุณรับผู้ป่วย Refer มาจาก ${rs.rows.hospname} ใช่หรือไม่ ?`);
          if (confirm) {
            this.router.navigate(['/staff/covid-case-new', { province: this.province, caseStatus: this.caseType, peopleType: this.peopleType, cid: this.cid, passport: this.passpost, typeRegister: this.typeRegister, covidCaseId: rs.rows.covid_case_id }]);
          }
        }
      } else {
        this.alertService.error(rs.error);
      }
      this.isModelSearch = false;
    } catch (error) {
      this.isModelSearch = false;
    }
  }

}
