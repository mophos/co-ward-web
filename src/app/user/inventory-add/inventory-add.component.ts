import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../help/alert.service';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-inventory-add',
  templateUrl: './inventory-add.component.html',
  styles: []
})
export class InventoryAddComponent implements OnInit {

  suppiles: any;

  constructor(
    private alertService: AlertService,
    private inventoryService: InventoryService,
  ) { }

  ngOnInit() {
    this.getList();
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

}
