import { Component, OnInit } from '@angular/core';
import { DrugService } from '../drug.service';
import { AlertService } from '../../help/alert.service';
import * as findIndex from 'lodash/findIndex';

@Component({
  selector: 'app-drug',
  templateUrl: './drug.component.html',
  styles: []
})
export class DrugComponent implements OnInit {

  listId: any;
  list: any = [];
  listDetail: any = [];
  date: any = null;

  loading = false;
  check = false;

  constructor(
    private drugService: DrugService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getList();
  }

  async onClickAdd() {
    try {
      let rs: any = await this.drugService.getDrugs();
      if (rs.ok) {
        this.listDetail = rs.rows;
        console.log(this.listDetail);
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
      let rs: any = await this.drugService.getDrugStock();
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
      let rs: any = await this.drugService.getDrugDetails(id);
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
