import { CovidCaseService } from '../services/covid-case.service';
import { AlertService } from '../../help/alert.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApproveDrugsService } from '../services/approve-drugs.service';
@Component({
  selector: 'app-approve-drugs',
  templateUrl: './approve-drugs.component.html',
  styles: []
})
export class ApproveDrugsComponent implements OnInit {


  isLoading = false;
  modal = false;
  list = [];
  details = [];
  drugs = [];
  selected: any = [];
  drugStock: any;

  reqCode: any;
  hospIdClient: any;
  hospName: any;
  reqId: any;
  isSave: any = false;

  constructor(
    private alertService: AlertService,
    private covidCaseService: CovidCaseService,
    private approveDrugsService: ApproveDrugsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    try {
      const rs: any = await this.covidCaseService.getListHosp();
      if (rs.ok) {
        this.list = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  onClickRow(e) {
    this.hospIdClient = e.hospital_id_client;
    this.hospName = e.hospname;
    this.getDetails();
  }

  async getDetails() {
    try {
      const rs: any = await this.covidCaseService.getListHospDetail(this.hospIdClient);
      if (rs.ok) {
        this.details = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async onClickRowDetail(e) {
    if (e.length) {
      const idx = e[e.length - 1];
      this.reqCode = idx.code;
      this.reqId = idx.id;
      this.getDrugs();

      const data: any = [];
      for (const v of e) {
        data.push(v.id);
      }
      const rs: any = await this.covidCaseService.getReqStock(data);
      this.drugStock = rs.rows;
    } else {
      this.clear();
    }
  }

  onClickDetail(e) {
    this.reqCode = e.code;
    this.reqId = e.id;
    this.getDrugs();
  }

  async getDrugs() {
    try {
      const rs: any = await this.covidCaseService.getListReqDrug(this.reqId);
      if (rs.ok) {
        this.drugs = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async approved() {
    this.isSave = true;
    try {
      const confirm = await this.alertService.confirm();
      if (confirm) {

        const dataReqId: any = [];
        for (const v of this.selected) {
          dataReqId.push(v.id);
        }
        const rs: any = await this.covidCaseService.approved(this.drugStock, dataReqId);
        if (rs.ok) {
          this.isSave = false;
          this.clear();
          this.getDetails();
          this.getList();
          this.alertService.success(rs.message);
        } else {
          this.isSave = false;
          this.alertService.error();
        }
      }
    } catch (error) {
      this.isSave = false;
      this.alertService.error(error);
    }
  }

  clear() {
    this.modal = false;
    this.drugs = [];
    this.reqCode = null;
    this.drugStock = [];
  }

  checkApproved() {
    this.modal = true;
  }
}
