
import { Component, OnInit } from '@angular/core';
import { SupplieService } from '../supplie.service';
import { AlertService } from '../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-check-supplies',
  templateUrl: './check-supplies.component.html',
  styles: []
})
export class CheckSuppliesComponent implements OnInit {
  list: any;

  fullname: any;
  hospname: any;
  public jwtHelper = new JwtHelperService();

  constructor(
    private supplieService: SupplieService,
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
      let rs: any = await this.supplieService.getSupplieHospital();
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
