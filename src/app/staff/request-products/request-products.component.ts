import { BasicService } from './../services/basic.service';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../help/alert.service';
import { IMyOptions } from 'mydatepicker-th';
import * as findIndex from 'lodash/findIndex';
import { SupplieService } from '../supplie.service';
@Component({
  selector: 'app-request-products',
  templateUrl: './request-products.component.html',
  styleUrls: ['./request-products.component.css']
})
export class RequestProductsComponent implements OnInit {
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
  isUpdate = false;
  constructor(
    private supplieService: SupplieService,
    private alertService: AlertService,
    private basicService: BasicService
  ) { }

  ngOnInit() {
    this.getList();
    this.checkTimeCut();
  }


  async checkTimeCut() {
    try {
      const rs: any = await this.basicService.checkTimeCut();
      this.isSave = !rs;
    } catch (error) {

    }
  }
  async onClickAdd() {
    try {
      this.isUpdate = false;
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
    try {
      this.isUpdate = true;
      this.listId = id;
      const idx = findIndex(this.list, { id: this.listId });
      this.date = this.list[idx].created_at;
      this.loading = true;
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
        for (const v of this.listDetail) {
          const obj: any = {};
          obj.generic_id = v.id;
          obj.qty = v.qty || null;
          obj.month_usage_qty = v.month_usage_qty || null;
          data.push(obj);
        }
        const rs: any = await this.supplieService.save(data);
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
