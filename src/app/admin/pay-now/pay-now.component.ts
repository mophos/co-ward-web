import { Component, OnInit } from '@angular/core';
import { RestockService } from '../restock.service';
import { AlertService } from '../../help/alert.service';

@Component({
  selector: 'app-pay-now',
  templateUrl: './pay-now.component.html',
  styles: []
})
export class PayNowComponent implements OnInit {

  list: any = [];
  hospList: any = [];

  constructor(
    private restockService: RestockService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getList();
  }

  onSelectHosp(e) {
    this.hospList = e;
  }

  async getList() {
    try {
      let rs: any = await this.restockService.getSupplies();
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
