import { Component, OnInit } from '@angular/core';
import { SuppliesService } from '../supplies.service';
import { AlertService } from '../../help/alert.service';
import * as findIndex from 'lodash/findIndex';

@Component({
  selector: 'app-manage-supplies',
  templateUrl: './manage-supplies.component.html',
  styles: []
})
export class ManageSuppliesComponent implements OnInit {

  list: any = [];

  code: any;
  name: any;
  unit: any;
  remark: any;
  id: any;

  total: any;
  query: any;
  offset = 0;
  limit = 20;

  loading: boolean = false;
  isUpdate = false;
  modal = false;
  isLoadding = false;
  isSave = false;
  constructor(
    private suppliesService: SuppliesService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.getList();
  }

  async getTotal() {
    try {
      this.loading = true;
      const rs: any = await this.suppliesService.getListTotal(this.query);
      if (rs.ok) {
        this.total = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.loading = false;
      this.alertService.error(error.message);
    }
  }

  async getList() {
    try {
      this.loading = true;
      const rs: any = await this.suppliesService.getList(this.query, this.limit, this.offset);
      if (rs.ok) {
        this.list = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.alertService.error(error.message);
    }
  }

  async doEnter(e) {
    if (e.keyCode === 13) {
      this.offset = 0;
      await this.getList();
    }
  }

  async onClickAdd() {
    this.modal = true;
    this.clearForm();
  }

  async clearForm() {
    this.code = null;
    this.name = null;
    this.unit = null;
    this.remark = null;
    this.id = null;
  }

  async save() {
    try {
      this.isSave = true;
      const data = {
        code: this.code,
        name: this.name,
        unit: this.unit,
        remark: this.remark
      };

      let rs: any;
      if (this.isUpdate) {
        rs = await this.suppliesService.update(data, this.id);
      } else {
        rs = await this.suppliesService.save(data);
      }

      if (rs.ok) {
        this.alertService.success();
        this.getList();
        this.modal = false;
      } else {
        this.alertService.error();
      }
      this.isSave = false;
    } catch (error) {
      this.isSave = false;
      this.alertService.error();
      this.modal = false;
    }
  }

  async onClickEdit(l) {
    this.modal = true;
    this.isUpdate = true;
    this.id = l.id;
    this.code = l.code;
    this.name = l.name;
    this.unit = l.unit;
    this.remark = l.remark;
  }

  async onClickRemove(l) {
    try {
      const confirm = await this.alertService.confirm();
      if (confirm) {
        const idx = findIndex(this.list, { id: +l.id });
        if (idx > -1) {
          const rs: any = await this.suppliesService.remove(l.id);
          if (rs.ok) {
            this.list.splice(idx, 1);
          } else {
            this.alertService.error();
          }
        }
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }
}
