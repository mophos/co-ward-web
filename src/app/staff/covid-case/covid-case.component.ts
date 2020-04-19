import { Router } from '@angular/router';
import { AlertService } from './../../help/alert.service';
import { CovidCaseService } from './../services/covid-case.service';
import { Component, OnInit } from '@angular/core';
import thaiIdCard from 'thai-id-card';

@Component({
  selector: 'app-covid-case',
  templateUrl: './covid-case.component.html',
  styles: []
})
export class CovidCaseComponent implements OnInit {

  modalCID = false;
  modalCIDType = 'CID';
  modalCidLoading = false;
  isModelSearch = false;

  modalCIDCid: any;
  modalCIDCidError = false;

  modalCIDPassport: any;
  list = [];
  historys = [];
  data: any = {};

  isLoadding = false;
  constructor(
    private covidCaseService: CovidCaseService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getList();
  }


  async getList() {
    try {
      this.isLoadding = true;
      const rs: any = await this.covidCaseService.getCovidCase();
      if (rs.ok) {
        this.list = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
      this.isLoadding = false;
    } catch (error) {
      this.isLoadding = false;
      this.alertService.error(error);
    }
  }

  async getData(data) {
    await this.getInfo(data.covid_case_id);
    await this.getHistory(data.person_id);
  }

  async getInfo(id) {
    try {
      const rs: any = await this.covidCaseService.getCovidCaseInfo(id);
      if (rs.ok) {
        this.data = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async getHistory(id) {
    try {
      const rs: any = await this.covidCaseService.getCovidCaseHistory(id);
      if (rs.ok) {
        this.historys = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  onClickOpenModalCid() {
    this.modalCID = true;
  }

  async onSearchModal() {
    try {
      this.isModelSearch = true;
      this.modalCIDCidError = !thaiIdCard.verify(this.modalCIDCid);

      if (this.modalCIDType !== 'NO') {
        if ((!this.modalCIDCidError && this.modalCIDType === 'CID') || this.modalCIDType === 'PASSPORT') {
          const rs: any = await this.covidCaseService.checkNo(this.modalCIDType, this.modalCIDCid, this.modalCIDPassport);
          if (rs.ok) {
            if (rs.case === 'NEW') {
              this.router.navigate(['/staff/covid-case-new', { type: this.modalCIDType, cid: this.modalCIDCid, passport: this.modalCIDPassport }]);
            } else if (rs.case === 'REFER') {
              const confirm = await this.alertService.confirm(`คุณรับผู้ป่วย Refer มาจาก ${rs.rows.hospname} ใช่หรือไม่ ?`);
              if (confirm) {
                this.router.navigate(['/staff/covid-case-new', { isRefer: 'Y', type: this.modalCIDType, cid: this.modalCIDCid, passport: this.modalCIDPassport, data: JSON.stringify(rs.rows) }]);
              }
            }
          } else {
            this.alertService.error(rs.error);
          }
        }
      } else {
        this.router.navigate(['/staff/covid-case-new', { type: this.modalCIDType }]);
      }
      this.isModelSearch = false;
    } catch (error) {
      this.isModelSearch = false;
      this.alertService.error(error);
    }
  }


  onEdit() {
    try {

    } catch (error) {

    }
  }

  async onDelete(l) {
    try {
      const confirm = await this.alertService.deleted();
      if (confirm) {
        const rs: any = await this.covidCaseService.removeCase(l.covid_case_id);
        if (rs.ok) {
          this.alertService.success();
        } else {
          this.alertService.error(rs.error);
        }
      }
    } catch (error) {
      this.alertService.error(error);

    }
  }
}
