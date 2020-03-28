import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../request.service';
import { AlertService } from '../../help/alert.service';

@Component({
  selector: 'app-manage-request-sub',
  templateUrl: './manage-request-sub.component.html',
  styles: []
})
export class ManageRequestSubComponent implements OnInit {

  hosptypeCode: any;
  ministryCode: any;
  subMinistryCode: any;

  hospcode: any;

  modal: boolean = false;

  total: any;
  query: any;
  offset = 0;
  limit = 20;

  list: any = [];
  listDetail: any = [];
  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService,
    private alertService: AlertService,
  ) {
    const params = this.route.snapshot.params;
    this.hosptypeCode = params.hosptypeCode;
    this.ministryCode = params.ministryCode;
    this.subMinistryCode = params.subMinistryCode;
  }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    try {
      let rs: any = await this.requestService.getListHosp(this.hosptypeCode, this.ministryCode, this.subMinistryCode, this.query, this.limit, this.offset);
      if (rs.ok) {
        this.list = rs.rows;
      } else {
        this.alertService.error();
      }
    } catch (error) {
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
      this.modal = true;
      let rs: any = await this.requestService.getSupplies(hospcode);
      if (rs.ok) {
        this.listDetail = rs.rows;
      } else {
        this.alertService.error();
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async fill() {
    try {
      let confirm = await this.alertService.confirm()
      if (confirm) {
        this.alertService.success();
      }
    } catch (error) {

    }
  }

  // async save() {
  //   try {
  //     let data = [];
  //     for (const v of this.listDetail) {
  //       const obj: any = {};
  //       obj.supplies_id = v.id;
  //       obj.min = v.min === null ? 0 : v.min;
  //       obj.max = v.max === null ? 0 : v.max;
  //       data.push(obj);
  //     }
  //     let rs: any = await this.requestService.save(data, this.hospcode);
  //     if (rs.ok) {
  //       this.alertService.success();
  //       this.getList();
  //       this.modal = false;
  //     } else {
  //       this.alertService.error();
  //     }
  //   } catch (error) {
  //     this.alertService.error();
  //     this.modal = false;
  //   }
  // }
}
