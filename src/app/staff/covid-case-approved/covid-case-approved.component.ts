import { CovidCaseService } from './../services/covid-case.service';
import { AlertService } from './../../help/alert.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-covid-case-approved',
  templateUrl: './covid-case-approved.component.html',
  styles: []
})
export class CovidCaseApprovedComponent implements OnInit {

  isLoading = false;
  list = [];
  details = [];
  drugs = [];
  selected: any = [];
  drugStock: any;

  reqCode: any;
  hospIdClient: any;
  reqId: any;
  constructor(
    private alertService: AlertService,
    private covidCaseService: CovidCaseService
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
    try {
      const confirm = await this.alertService.confirm();
      if (confirm) {
        const data: any = [];
        for (const v of this.drugStock) {
          if (v.stock_qty - v.requisition_qty < 0) {
            this.alertService.error('ไม่พอจ่าย');
          } else {
            const obj: any = {};
            obj.id = v.wm_id;
            obj.qty = v.stock_qty - v.requisition_qty;
            data.push(obj);
          }
        }

        const dataReqId: any = [];
        for (const v of this.selected) {
          dataReqId.push(v.id);
        }
        const rs: any = await this.covidCaseService.approved(data, dataReqId);
        if (rs.ok) {
          this.clear();
          this.getDetails();
          this.getList();
          this.alertService.success();
        } else {
          this.alertService.error();
        }
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  clear() {
    this.drugs = [];
    this.reqCode = null;
    this.drugStock = [];
  }
}
