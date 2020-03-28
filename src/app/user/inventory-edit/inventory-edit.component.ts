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

  id: any;
  suppiles: any;
  isLoadding = false;
  isSave = false;
  modalsEdit: any = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private inventoryService: InventoryService,
  ) {

  }

  async ngOnInit() {
    
  }

  async getSuppiles() {
    try {
      this.isLoadding = true;
      const rs: any = await this.inventoryService.getBalanceEdit(this.id);
      if (rs.ok) {
        this.suppiles = rs.rows;
        for (const i of this.suppiles) {
          i.qtyOld = i.qty;
        }
      } else {
        this.alertService.error(rs.error);
      }
      this.isLoadding = false;
    } catch (error) {
      this.isLoadding = false;
      this.alertService.error(error);
    }
  }

  async save() {
    try {
      this.isSave = true;
      const confirm: any = await this.alertService.confirm();
      if (confirm) {
        this.isLoadding = true;
        const objBalanceDetails: any = [];
        for (const i of this.suppiles) {
          if (+i.qty !== +i.qtyOld) {
            objBalanceDetails.push({
              id: i.id,
              qty: i.qty,
              qty_old: i.qtyOld,
            });
          }
        }

        const rs: any = await this.inventoryService.updateBalance(this.id, objBalanceDetails);
        if (rs.ok) {
          this.alertService.success();
          this.router.navigate(['staff/inventory']);
        }
        this.modalsEdit = false;
        this.isLoadding = false;
      }
      this.isSave = false;
    } catch (error) {
      this.isLoadding = false;
      this.isSave = false;
      this.alertService.error();
    }
  }

  async open(id) {
    console.log(id);
    this.id = id
    await this.getSuppiles();
    this.modalsEdit = true
  }

}
