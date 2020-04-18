import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../help/alert.service';
import { IMyOptions } from 'mydatepicker-th';
import * as findIndex from 'lodash/findIndex';
import { SupplieService } from '../supplie.service';
@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styles: []
})
export class SuppliesComponent implements OnInit {

  listId: any;
  list: any = [];
  listDetail: any = [];
  date: any = null;
  dateset: any;

  loading = false;
  check = false;
  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };
  isSave = false;
  constructor(
    private supplieService: SupplieService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getList();
    const date = new Date();
    this.dateset = {
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    };
  }


  async onClickAdd() {
    try {
      const rs: any = await this.supplieService.getSupplies();
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

  async getList() {
    this.loading = true;
    try {
      const rs: any = await this.supplieService.getSupplieStock();
      if (rs.ok) {
        this.list = rs.rows;
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
    const idx = findIndex(this.list, { id: this.listId });
    this.date = this.list[idx].created_at;
    this.loading = true;
    try {
      const rs: any = await this.supplieService.getSupplieDetails(id);
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
    this.isSave = true;
    const confirm = await this.alertService.confirm();
    if (confirm) {
      try {
        const data = [];
        const objH: any = {};
        objH.date = this.dateset.date.year + '-' + this.dateset.date.month + '-' + this.dateset.date.day;

        for (const v of this.listDetail) {
          const obj: any = {};
          obj.generic_id = v.id;
          obj.qty = v.qty;
          data.push(obj);
        }
        objH.items = data;
        const rs: any = await this.supplieService.save(objH);
        if (rs.ok) {
          this.alertService.success();
          this.listDetail = [];
          this.getList();
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
