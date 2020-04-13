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
  listId: any;
  constructor(
    private alertService: AlertService,
    private covidCaseService: CovidCaseService
  ) { }

  ngOnInit() {
    this.getList();
  }


  async getList() {
    try {
      const rs: any = await this.covidCaseService.getListApproved();
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
    this.listId = e.id;
    this.getDetails();
  }

  async getDetails() {
    try {
      const rs: any = await this.covidCaseService.getListApprovedDetauls(this.listId);
      if (rs.ok) {
        this.details = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  onClickApproved(e) {

  }

}
