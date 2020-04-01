import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../help/alert.service';
import { InventoryService } from '../inventory.service';
import { InventoryAddComponent } from '../inventory-add/inventory-add.component';
import { InventoryEditComponent } from '../inventory-edit/inventory-edit.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styles: []
})
export class InventoryComponent implements OnInit {

  history: any;
  @ViewChild('modalsAdd') modalsAdd: InventoryAddComponent
  @ViewChild('modalsEdit') modalsEdit: InventoryEditComponent
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
        await this.modalsAdd.getSuppiles()
      } else {
        this.alertService.error(rs.error);
      }
      this.isLoadding = false;
    } catch (error) {
      this.isLoadding = false;
      this.alertService.error(error);
    }
  }

  async onClickAdd() {
    this.modalsAdd.open()
  }

  onClickEdit(l) {
    this.modalsEdit.open(l.id)
  }

}
