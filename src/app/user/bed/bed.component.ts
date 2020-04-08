import { Component, OnInit } from '@angular/core';
import { BedService } from '../bed.service';
import { AlertService } from '../../help/alert.service';
import * as findIndex from 'lodash/findIndex';
@Component({
  selector: 'app-bed',
  templateUrl: './bed.component.html',
  styles: []
})
export class BedComponent implements OnInit {

  listId: any;
  list: any = [];
  listDetail: any = [];
  date: any = null;

  loading = false;
  check = false;

  constructor(
    private bedService: BedService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getList();
  }

  async onClickAdd() {
    let confirm = await this.alertService.confirm();
    if (confirm) {
      try {
        let rs: any = await this.bedService.saveBed();
        if (rs.ok) {
          this.getList();
          this.alertService.success();
        }
      } catch (error) {
        this.alertService.error();
      }
    }
  }

  async getList() {
    this.loading = true;
    try {
      let rs: any = await this.bedService.getBeds();
      if (rs.ok) {
        this.list = rs.rows;
        if (this.list.length) {
          this.getListDetail(this.list[0].id);
        }
      } else {
        this.alertService.error();
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.alertService.error(error);
    }
  }

  async getListDetail(id) {
    this.listId = id;
    let idx = findIndex(this.list, { id: this.listId });
    this.date = this.list[idx].created_at;
    this.loading = true;
    try {
      let rs: any = await this.bedService.getBedDetails(id);
      if (rs.ok) {
        this.listDetail = rs.rows;
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
    this.check = false;
    try {
      let data = [];
      for (const v of this.listDetail) {
        if ((v.qty - v.usage) < 0) {
          this.check = true;
        }
        const obj: any = {};
        obj.id = v.id;
        obj.usage = v.usage;
        obj.qty = v.qty;
        data.push(obj);
      }
      if (this.check) {
        this.alertService.error('จำนวนเตียงติดลบ');
      } else {
        let rs: any = await this.bedService.saveDetail(this.listId, data);
        if (rs.ok) {
          this.alertService.success();
          this.getListDetail(this.listId);
        } else {
          this.alertService.error();
        }
      }
    } catch (error) {
      this.alertService.error();
    }
  }
}
