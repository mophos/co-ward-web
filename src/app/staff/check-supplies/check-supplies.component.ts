
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { AlertService } from '../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-check-supplies',
  templateUrl: './check-supplies.component.html',
  styles: []
})
export class CheckSuppliesComponent implements OnInit {
  list: any;
  detail: any;
  query: any = '';

  public jwtHelper = new JwtHelperService();
  @ViewChild('loading') loading: any;

  constructor(
    private service: ReportService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    this.loading.show();
    try {
      const rs: any = await this.service.getSupplies(this.query);
      if (rs.ok) {
        this.list = rs.rows;
        console.log(this.list);
        
        this.loading.hide();
      } else {
        this.loading.hide();
        this.alertService.error();
      }
    } catch (error) {
      this.loading.hide();
      this.alertService.error(error);
    }
  }
}
