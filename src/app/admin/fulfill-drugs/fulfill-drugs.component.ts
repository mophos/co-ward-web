import { AlertService } from '../../help/alert.service';
import { FulfillService } from '../services/fulfill.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fulfill-drugs',
  templateUrl: './fulfill-drugs.component.html',
  styles: []
})
export class FulfillDrugsComponent implements OnInit {

  products = [];
  constructor(
    private fulfillService: FulfillService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  async getProducts() {
    try {
      const rs: any = await this.fulfillService.getList('DRUG');
      if (rs.ok) {
        this.products = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }
}
