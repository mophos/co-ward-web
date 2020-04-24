import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DrugService } from '../services/drug.service';
import { AlertService } from '../../help/alert.service';
import * as findIndex from 'lodash/findIndex';

@Component({
  selector: 'app-manage-drug',
  templateUrl: './manage-drug.component.html',
  styles: []
})
export class ManageDrugComponent implements OnInit {

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

  insertRight: any;
  updateRight: any;
  deleteRight: any;
  rights: any;

  loading = false;
  isUpdate = false;
  modal = false;
  isLoadding = false;
  isSave = false;
  public jwtHelper = new JwtHelperService();
  constructor(
    private drugService: DrugService,
    private alertService: AlertService,
  ) {
    const decoded = this.jwtHelper.decodeToken(sessionStorage.getItem('token'));
    this.rights = decoded.rights;
    this.insertRight = findIndex(this.rights, { name: 'ADMIN_ADD_DRUGS' }) === -1 ? false : true;
    this.updateRight = findIndex(this.rights, { name: 'ADMIN_EDIT_DRUGS' }) === -1 ? false : true;
    this.deleteRight = findIndex(this.rights, { name: 'ADMIN_DELETE_DRUGS' }) === -1 ? false : true;
  }

  ngOnInit() {
    this.getList();
    this.getTotal();
  }

  async getList() {
    try {
      this.loading = true;
      const rs: any = await this.drugService.getList(this.query, this.limit, this.offset);
      if (rs.ok) {
        this.list = rs.rows;
        for (const i of this.list) {
          i.toggle = i.is_actived === 'Y' ? true : false;
          i.toggle_pay = i.is_pay === 'Y' ? true : false;
        }
      } else {
        this.alertService.error(rs.error);
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.alertService.error(error.message);
    }
  }

  async getTotal() {
    try {
      this.loading = true;
      const rs: any = await this.drugService.getListTotal(this.query);
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

  async onClickEdit(l) {
    this.modal = true;
    this.isUpdate = true;
    this.id = l.id;
    this.code = l.code;
    this.name = l.name;
    this.unit = l.unit;
    this.remark = l.remark;
  }

  async onChangeActived(l) {
    this.id = l.id;
    this.loading = true;
    try {
      const data = {
        is_actived: l.toggle === true ? 'Y' : 'N',
      };

      const rs: any = await this.drugService.update(data, this.id);
      if (rs.ok) {
        this.alertService.success();
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
        rs = await this.drugService.update(data, this.id);
      } else {
        rs = await this.drugService.save(data);
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

}
