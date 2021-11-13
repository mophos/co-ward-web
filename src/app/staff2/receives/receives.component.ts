import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { AlertService } from 'src/app/help/alert.service';

@Component({
  selector: 'app-receives',
  templateUrl: './receives.component.html',
  styles: []
})
export class ReceivesComponent implements OnInit {

  loading = false;
  isUpdate = false;
  listFulFill = [];

  constructor(
    private inventoryService: InventoryService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getListPay();
  }

  async getListPay() {
    this.isUpdate = true;
    try {
      const rs: any = await this.inventoryService.getListFulfull();
      if (rs.ok) {
        this.listFulFill = rs.rows;
      } else {
        this.alertService.error();
      }
    } catch (error) {
      this.alertService.error();
    }
  }

  async receive(l) {
    const confirm = await this.alertService.confirm();
    if (confirm) {
      try {
        const rs: any = await this.inventoryService.saveWmGenerics(l);
        if (rs.ok) {
          this.alertService.success();
          this.getListPay();
        } else {
          this.alertService.error();
        }
      } catch (error) {
        this.alertService.error();
      }
    }
  }

}
