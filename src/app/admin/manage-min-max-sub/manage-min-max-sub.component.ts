import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MinMaxService } from '../min-max.service';
import { AlertService } from '../../help/alert.service';

@Component({
  selector: 'app-manage-min-max-sub',
  templateUrl: './manage-min-max-sub.component.html',
  styles: []
})
export class ManageMinMaxSubComponent implements OnInit {

  chospitalTypesId: any;

  hospcode: any;

  modal: boolean = false;

  total: any;
  query: any;
  offset = 0;
  limit = 20;

  list: any = [];
  listDetail: any = [];
  loading = false;
  isSave = false;
  constructor(
    private route: ActivatedRoute,
    private minmaxTypeService: MinMaxService,
    private alertService: AlertService,
  ) {
    const params = this.route.snapshot.params;
    this.chospitalTypesId = params.chospitalTypesId;
  }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    try {
      this.loading = true;
      let rs: any = await this.minmaxTypeService.getListHosp(this.chospitalTypesId, this.query, this.limit, this.offset);
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

  async doEnter(e) {
    if (e.keyCode === 13) {
      this.offset = 0;
      await this.getList();
    }
  }

  async onClickEdit(hospcode) {
    this.hospcode = hospcode;
    try {
      this.loading = true;
      this.modal = true;
      let rs: any = await this.minmaxTypeService.getSupplies(hospcode);
      if (rs.ok) {
        this.listDetail = rs.rows;
        for (const i of this.listDetail) {
          i.toggle = i.is_active == 'N' ? false : true;
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

  async save() {
    const confirm = await this.alertService.confirm();
    if (confirm) {
      try {
        this.isSave = true;
        let data = [];
        for (const v of this.listDetail) {
          const obj: any = {};
          obj.supplies_id = v.supplies_id;
          obj.min = v.min === null ? 0 : v.min;
          obj.max = v.max === null ? 0 : v.max;
          obj.safety_stock = v.safety_stock === null ? 0 : v.safety_stock;
          obj.is_active = v.toggle === true ? 'Y' : 'N';
          data.push(obj);
        }

        let rs: any = await this.minmaxTypeService.save(data, this.hospcode);
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
}
