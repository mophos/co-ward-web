
import { CovidCaseService } from '../services/covid-case.service';
import { AlertService } from '../../help/alert.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-covid-case-requisition',
  templateUrl: './covid-case-requisition.component.html',
  styles: []
})
export class CovidCaseRequisitionComponent implements OnInit {
  isLoading = false;
  details = [];
  drugs = [];
  reqId: any;

  constructor(
    private alertService: AlertService,
    private covidCaseService: CovidCaseService
  ) { }

  ngOnInit() {
    this.getDetails();
  }

  async getDetails() {
    try {
      const rs: any = await this.covidCaseService.getListHospDetailClient();
      if (rs.ok) {
        this.details = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  onClickDetail(e) {
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
}
