import { BasicService } from './../services/basic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BedService } from './../bed.service';
import { Component, OnInit } from '@angular/core';
import { CovidCaseService } from './../services/covid-case.service';
import { AlertService } from './../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
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

  gcsSum = [];
  BedsSum = [];
  medicalSuppliesSum = [];
  date: any;
  public jwtHelper = new JwtHelperService();
  isHospital = true;
  deathCovid: any;
  deathNonCovid: any;
  risk: any;
  constructor(
    private alertService: AlertService,
    private basicService: BasicService,
    private covidCaseService: CovidCaseService,
    private bedService: BedService,
    private router: Router
  ) {
    const decoded = this.jwtHelper.decodeToken(sessionStorage.getItem('token'));
    if (decoded.providerType === 'ZONE' || decoded.providerType === 'SSJ') {
      this.isHospital = false;
    }
  }

  ngOnInit() {
    this.getDate();
    // this.getList();
    this.getBed();
    this.getGCSSum();
    this.getBedSum();
    this.getMedicalSuppliesSum();
    this.getDeath();
    this.getRisk();
  }
  goToBed() {
    this.router.navigate(['/staff/setting/beds']);
  }

  async getDate() {
    try {
      const rs: any = await this.basicService.getDate();
      if (rs.ok) {
        this.date = rs.rows;
      }
    } catch (error) {
      this.alertService.error(error);
    }
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
  async getGCSSum() {
    try {
      const rs: any = await this.covidCaseService.getGCS();
      if (rs.ok) {
        this.gcsSum = rs.rows;
      } else {
        this.alertService.serverError();
      }
    } catch (error) {
      console.log(error);
      this.alertService.serverError();
    }
  }

  async getBedSum() {
    try {
      const rs: any = await this.covidCaseService.getBeds();
      if (rs.ok) {
        this.BedsSum = rs.rows;
      } else {
        this.alertService.serverError();
      }
    } catch (error) {
      console.log(error);
      this.alertService.serverError();
    }
  }

  async getMedicalSuppliesSum() {
    try {
      const rs: any = await this.covidCaseService.getVentilators();
      if (rs.ok) {
        this.medicalSuppliesSum = rs.rows;
      } else {
        this.alertService.serverError();
      }
    } catch (error) {
      console.log(error);
      this.alertService.serverError();
    }
  }

  async getDeath() {
    try {
      const rs: any = await this.covidCaseService.getDeath();
      if (rs.ok) {
        this.deathCovid = rs.rows.covid;
        this.deathNonCovid = rs.rows.nonCovid;
      } else {
        this.alertService.serverError();
      }
    } catch (error) {
      console.log(error);
      this.alertService.serverError();
    }
  }

  async getRisk() {
    try {
      const rs: any = await this.covidCaseService.getRisk();
      if (rs.ok) {
        this.risk = rs.rows.risk
      } else {
        this.alertService.serverError();
      }
    } catch (error) {
      console.log(error);
      this.alertService.serverError();
    }
  }

}
