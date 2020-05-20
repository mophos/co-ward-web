import { Component, OnInit } from '@angular/core';
import { CovidCaseService } from './../services/covid-case.service';
import { AlertService } from './../../help/alert.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  list: any = [];

  // url: any = 'https://ops.moph.go.th/public/index.php/Portal_covid19_link_staff#';
  url: any = 'https://www.youtube.com/';

  constructor(
    private alertService: AlertService,
    private covidCaseService: CovidCaseService
  ) { }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    try {
      const rs: any = await this.covidCaseService.getListOldPatients();
      if (rs.ok) {
        this.list = rs.rows;
      } else {
        this.alertService.error();
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

}
