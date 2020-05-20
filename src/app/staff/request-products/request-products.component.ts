import { RequestProductsService } from './../services/request-products.service';
import { BasicService } from './../services/basic.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from '../../help/alert.service';
import { IMyOptions } from 'mydatepicker-th';
import * as findIndex from 'lodash/findIndex';
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
  constructor(
    private requestProductsService: RequestProductsService,
    private alertService: AlertService,
    private basicService: BasicService
  ) { }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    this.loading = true;
    try {
      const rs: any = await this.requestProductsService.getList();
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
      this.loading = true;
      this.listId = id;
      const idx = findIndex(this.list, { id: this.listId });
      this.date = this.list[idx].created_at;
      const rs: any = await this.requestProductsService.getSupplieDetails(id);
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

}
