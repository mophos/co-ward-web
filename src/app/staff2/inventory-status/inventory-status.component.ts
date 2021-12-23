import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { AlertService } from 'src/app/help/alert.service';
import { IMyOptions } from 'mydatepicker-th';

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
  isSave = false;
  isUpdate = false;
  listReceives: any = [];
  listReceiveDetail: any = [];
  listFulFill = [];

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };

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

  async onClickAdd() {
    try {
      this.isUpdate = false;
      const rs: any = await this.inventoryService.getReceivesGenerics();
      if (rs.ok) {
        this.listReceiveDetail = rs.rows;
      } else {
        this.alertService.error();
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.alertService.error(error);
    }
  }

  async getListReceives() {
    this.isUpdate = true;
    try {
      const rs: any = await this.inventoryService.getReceives();
      if (rs.ok) {
        this.listReceives = rs.rows;
        console.log(this.listReceives);
        this.listReceiveDetail = [];
      } else {
        this.alertService.error();
      }
    } catch (error) {
      this.alertService.error();
    }
  }

  async getListReceivesDetail(e) {
    try {
      this.isUpdate = false;
      const rs: any = await this.inventoryService.getReceivesDetail(e);
      if (rs.ok) {
        this.listReceiveDetail = rs.rows;
      } else {
        this.alertService.error();
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.alertService.error(error);
    }
  }

  async save() {
    this.isSave = true;
    const confirm = await this.alertService.confirm();
    if (confirm) {
      try {
        const data = [];
        for (const v of this.listReceiveDetail) {
          const obj: any = {};
          if (v.qty !== undefined && v.id !== undefined) {
            obj.generic_id = v.id;
            obj.qty = v.qty;
            data.push(obj);
          }
        }
        const rs: any = await this.inventoryService.save(data);
        if (rs.ok) {
          this.alertService.success();
          this.listReceiveDetail = [];
          this.getListReceives();
        } else {
          this.alertService.error(rs.error);
        }
        this.isSave = false;
      } catch (error) {
        this.isSave = false;
        this.alertService.error(error);
      }
    }
  }

}
