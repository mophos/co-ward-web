import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../help/alert.service';
import { InventoryService } from '../inventory.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inventory-add',
  templateUrl: './inventory-add.component.html',
  styles: []
})
export class InventoryAddComponent implements OnInit {

  suppiles: any
  hospcode: any = '11283'

  constructor(
    private alertService: AlertService,
    private inventoryService: InventoryService,
    private router: Router,
  ) { }

  async ngOnInit() {
    await this.getSuppiles();
  }

  async getSuppiles() {
    try {
      const rs: any = await this.inventoryService.getSuppiles();
      if (rs.ok) {
        this.suppiles = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async save() {

    try {
      let objBalancedetails: any = [];
      for (const i of this.suppiles) {
        objBalancedetails.push({
          supplies_id: i.id,
          qty: i.qty,
        })
      }
      let rs: any = await this.inventoryService.saveBalance(objBalancedetails)
      if (rs.ok) {
        this.alertService.success();
        this.router.navigate(['staff/inventory']);
      }
    } catch (error) {
      this.alertService.error();
    }
  }

}
