import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../help/alert.service';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styles: []
})
export class InventoryComponent implements OnInit {

  history: any;
  isLoadding = false;
  constructor(
    private router: Router,
    private alertService: AlertService,
    private inventoryService: InventoryService
  ) { }

  async ngOnInit() {
    await this.getlist();
  }

  async getlist() {
    try {
      this.isLoadding = true;
      const rs: any = await this.inventoryService.getBalanceList();
      if (rs.ok) {
        this.history = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
      this.isLoadding = false;
    } catch (error) {
      this.isLoadding = false;
      this.alertService.error(error);
    }
  }

  onClickAdd() {
    this.router.navigate(['staff/inventory/add']);
  }

  onClickEdit(l) {
    this.router.navigate(['staff/inventory/edit', { id: l.id }]);
  }

}
