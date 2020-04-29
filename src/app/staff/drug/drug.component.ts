import { Component, OnInit } from '@angular/core';
import { DrugService } from '../drug.service';
import { AlertService } from '../../help/alert.service';
import * as findIndex from 'lodash/findIndex';
import { IMyOptions } from 'mydatepicker-th';
import * as moment from 'moment';
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
  dateset: any;

  loading = false;
  check = false;
  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };

  constructor(
    private drugService: DrugService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getList();
    this.dateset = {
      date: {
        year: moment().get('year'),
        month: moment().get('month') + 1,
        day: moment().get('date')
      }
    };
  }


  async onClickAdd() {
    try {
      const rs: any = await this.drugService.getDrugs();
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
      const rs: any = await this.drugService.getDrugStock();
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
      const rs: any = await this.drugService.getDrugDetails(id);
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
    const confirm = await this.alertService.confirm();
    if (confirm) {
      try {
        const data = [];
        const objH: any = {};
        objH.date = this.dateset.date.year + '-' + this.dateset.date.month + '-' + this.dateset.date.day;;

        for (const v of this.listDetail) {
          const obj: any = {};
          obj.generic_id = v.id;
          obj.qty = v.qty;
          data.push(obj);
        }
        objH.items = data;
        const rs: any = await this.drugService.save(objH);
        if (rs.ok) {
          this.alertService.success();
          this.listDetail = [];
          this.getList();
        } else {
          this.alertService.error();
        }

      } catch (error) {
        this.alertService.error();
      }
    }
  }
}
