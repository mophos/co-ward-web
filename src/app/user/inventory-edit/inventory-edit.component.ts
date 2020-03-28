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
    private router: ActivatedRoute,
    private alertService: AlertService,
    private inventoryService: InventoryService,
  ) {
    const params = this.router.snapshot.params;
    this.id = params.id;
  }

  async ngOnInit() {
    await this.getSuppiles();
    console.log(this.id);
    console.log(this.suppiles);
  }

  async getSuppiles() {
    try {
      const rs: any = await this.inventoryService.getBalanceEdit(this.id);
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
