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
  token: any;
  public jwtHelper = new JwtHelperService();
  isHospital = true;
  constructor(
    private alertService: AlertService,
    private basicService: BasicService,
    private covidCaseService: CovidCaseService,
    private bedService: BedService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const params = this.route.snapshot.params;
    this.token = params.token;
    console.log(this.token);
    // const decoded = this.jwtHelper.decodeToken(sessionStorage.getItem('token'));
    // if (decoded.providerType === 'ZONE' || decoded.providerType === 'SSJ') {
    //   this.isHospital = false;
    // }

  }

  ngOnInit() {
    this.getDate();
    this.getList();
    this.getBed();
    this.getGCSSum();
    this.getBedSum();
    this.getMedicalSuppliesSum();
  }
  goToBed() {
    this.router.navigate(['/staff/setting/beds']);
  }

  async getDate() {
    try {
      const rs: any = await this.basicService.getDate(this.token);
      if (rs.ok) {
        this.date = rs.rows;
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }
  async getBed() {
    try {
      const rs: any = await this.bedService.getBeds(this.token);
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
      const rs: any = await this.covidCaseService.getListOldPatients(this.token);
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
      const rs: any = await this.covidCaseService.getGCS(this.token);
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
      const rs: any = await this.covidCaseService.getBeds(this.token);
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
      const rs: any = await this.covidCaseService.getVentilators(this.token);
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

}
