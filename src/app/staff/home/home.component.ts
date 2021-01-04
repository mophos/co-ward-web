import { ActivatedRoute, Router } from '@angular/router';
import { BedService } from './../bed.service';
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
  alertBed = false;
  // url: any = 'https://ops.moph.go.th/public/index.php/Portal_covid19_link_staff#';
  url: any = 'https://www.youtube.com/';

  constructor(
    private alertService: AlertService,
    private covidCaseService: CovidCaseService,
    private bedService: BedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getList();
    this.getBed();
  }
  goToBed() {
    this.router.navigate(['/staff/setting/beds']);
  }

  async getBed() {
    try {
      const rs: any = await this.bedService.getBeds();
      if (rs.ok) {
        if (!rs.rows.length) {
          this.alertBed = true;
        }
      }
    } catch (error) {
      this.alertService.error(error);
    }
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
