import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { AlertService } from 'src/app/help/alert.service';

@Component({
  selector: 'app-inventory-status',
  templateUrl: './inventory-status.component.html',
  styles: []
})
export class InventoryStatusComponent implements OnInit {
  loading = false;
  list: any;
  total = 0;
  limit = 20;
  offset = 0;

  constructor(
    private inventoryService: InventoryService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getInventoryStatus();
  }

  async getInventoryStatus() {
    try {
      this.loading = true;
      const rs: any = await this.inventoryService.getInventoryStatus(this.limit, this.offset);
      if (rs.ok) {
        this.list = rs.rows;
        this.total = rs.total;
      } else {
        this.alertService.error();
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.alertService.error(error);
    }
  }

}
