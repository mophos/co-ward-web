import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../help/alert.service';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-inventory-add',
  templateUrl: './inventory-add.component.html',
  styles: []
})
export class InventoryAddComponent implements OnInit {

<<<<<<< HEAD
  suppiles: any
  hospcode: any = '11283'
=======
  suppiles: any;
>>>>>>> 7d4a3c041c6f037a05dd0a163ee91333cd4d3af5

  constructor(
    private alertService: AlertService,
    private inventoryService: InventoryService,
  ) { }

  async ngOnInit() {
    await this.getList();
    console.log(this.suppiles);
  }

  async getList() {
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

    let objBalancedetails: any = [];
    for (const i of this.suppiles) {
      if (i.check) {
        objBalancedetails.push({
          supplies_id: i.id,
          qty: i.qty,
        })
      }
    }

    console.log(this.hospcode, objBalancedetails);
  }

}
