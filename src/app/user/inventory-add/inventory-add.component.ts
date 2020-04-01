import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AlertService } from '../../help/alert.service';
import { InventoryService } from '../inventory.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inventory-add',
  templateUrl: './inventory-add.component.html',
  styles: []
})
export class InventoryAddComponent implements OnInit {

  suppiles: any;
  isLoadding = false;
  isSave = false;
  modalsAdd = false;

  @Output() onclose: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private alertService: AlertService,
    private inventoryService: InventoryService,
    private router: Router,
  ) { }

  async ngOnInit() {
    // await this.getSuppiles();
  }

  async getSuppiles() {
    try {
      this.isLoadding = true;
      const rs: any = await this.inventoryService.getSuppiles();
      if (rs.ok) {
        this.suppiles = rs.rows;
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
        const objBalancedetails: any = [];
        for (const i of this.suppiles) {
          objBalancedetails.push({
            supplies_id: i.id,
            qty: i.qty === undefined ? 0 : i.qty,
            usage_rate_day: i.usage_rate_day,
          });
        }
        const rs: any = await this.inventoryService.saveBalance(objBalancedetails);
        if (rs.ok) {
          this.onclose.emit(true);
          this.alertService.success();
        }
        this.modalsAdd = false;
        this.isLoadding = false;
      }
      this.isSave = false;
    } catch (error) {
      this.isSave = false;
      this.isLoadding = false;
      this.alertService.error();
    }
  }

  open() {
    this.modalsAdd = true
  }
}
