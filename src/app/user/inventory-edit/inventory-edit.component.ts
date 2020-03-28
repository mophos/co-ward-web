import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../help/alert.service';
import { InventoryService } from '../inventory.service';


@Component({
  selector: 'app-inventory-edit',
  templateUrl: './inventory-edit.component.html',
  styles: []
})
export class InventoryEditComponent implements OnInit {

  id: any
  suppiles: any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private inventoryService: InventoryService,
  ) {
    const params = this.route.snapshot.params;
    this.id = params.id;
  }

  async ngOnInit() {
    await this.getSuppiles();
  }

  async getSuppiles() {
    try {
      const rs: any = await this.inventoryService.getBalanceEdit(this.id);
      if (rs.ok) {
        this.suppiles = rs.rows;
        for (const i of this.suppiles) {
          i.qtyOld = i.qty
        }
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
        if (i.qty != i.qtyOld) {
          objBalancedetails.push({
            id: i.id,
            qty: i.qty,
            qty_old: i.qtyOld,
          })
        }
      }

      let rs: any = await this.inventoryService.updateBalance(objBalancedetails)
      if (rs.ok) {
        this.alertService.success();
        this.router.navigate(['staff/inventory']);
      }

    } catch (error) {
      this.alertService.error();
    }
  }

}
