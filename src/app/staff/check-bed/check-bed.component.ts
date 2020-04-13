import { Component, OnInit } from '@angular/core';
import { BedService } from '../bed.service';
import { AlertService } from '../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-check-bed',
  templateUrl: './check-bed.component.html',
  styleUrls: []
})
export class CheckBedComponent implements OnInit {
  list: any;

  fullname: any;
  hospname: any;
  public jwtHelper = new JwtHelperService();

  constructor(
    private bedService: BedService,
    private alertService: AlertService
  ) {
    const decoded = this.jwtHelper.decodeToken(sessionStorage.getItem('token'));
    this.fullname = decoded.fullname;
    this.hospname = decoded.hospname;
  }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    try {
      let rs: any = await this.bedService.getBedHospital();
      if (rs.ok) {
        this.list = rs.rows;
        for (const v of this.list) {
          if (v.created_at === null) {
            v.created_at = '-';
          }
        }
      } else {
        this.alertService.error();
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }
}
