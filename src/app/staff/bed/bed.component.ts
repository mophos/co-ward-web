import { Component, OnInit } from '@angular/core';
import { BedService } from '../bed.service';
import { AlertService } from '../../help/alert.service';
import { IMyOptions } from 'mydatepicker-th';
import * as findIndex from 'lodash/findIndex';
import * as moment from 'moment';
@Component({
  selector: 'app-bed',
  templateUrl: './bed.component.html',
  styles: []
})
export class BedComponent implements OnInit {

  listId: any = null;
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
    private bedService: BedService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.getList();
    this.dateset = {
      date: {
        year: moment().get('year'),
        month: moment().get('month') + 1,
        day: moment().get('day')
      }
    };
  }

  async onClickAdd() {
    this.getListBeds();
  }

  onDateChanged(e) {
    this.dateset = e.date;
  }

  async getListBeds() {
    this.date = this.dateset.date.year + '-' + this.dateset.date.month + '-' + this.dateset.date.day;
    this.loading = true;
    try {
      const rs: any = await this.bedService.getListBeds();
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
      const rs: any = await this.bedService.getBeds();
      if (rs.ok) {
        this.list = rs.rows;
        // if (this.listId > 0) {
        //   this.getListDetail(this.listId);
        // } else if (this.list.length) {
        //   this.getListDetail(this.list[0].id);
        // }
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
      const rs: any = await this.bedService.getBedDetails(id);
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
      this.check = false;
      try {
        const data = [];
        const objH: any = {};
        objH.created_at = this.date;

        for (const v of this.listDetail) {
          if ((v.qty_total - v.qty) < 0) {
            this.check = true;
          }
          const obj: any = {};
          obj.bed_id = v.bed_id;
          obj.qty = v.qty;
          data.push(obj);
        }
        objH.items = data;
        if (this.check) {
          this.alertService.error('จำนวนเตียงติดลบ');
        } else {
          const rs: any = await this.bedService.save(objH);
          if (rs.ok) {
            this.alertService.success();
            this.listDetail = [];
            this.getList();
          } else {
            this.alertService.error();
          }
        }
      } catch (error) {
        this.alertService.error();
      }
    }
  }
}
