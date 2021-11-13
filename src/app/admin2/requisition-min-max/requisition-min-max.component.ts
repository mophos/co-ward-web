import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../help/alert.service';
import { RequisitionMinMaxService } from '../services/requisition-min-max.service';

@Component({
  selector: 'app-requisition-min-max',
  templateUrl: './requisition-min-max.component.html',
  styles: []
})
export class RequisitionMinMaxComponent implements OnInit {
  list: any = [];
  listSupplies: any = [];
  loading: any = false;
  modal: any = false;
  onSelectHosp: any;

  check: any = false;

  constructor(
    private alertService: AlertService,
    private requisitionMinMaxService: RequisitionMinMaxService
  ) { }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    this.loading = true;
    const rs: any = await this.requisitionMinMaxService.getList();
    if (rs.ok) {
      this.list = rs.rows;
    } else {
      this.alertService.error(rs.error);
    }
    this.loading = false;
  }

  async onClickEdit(l) {
    this.onSelectHosp = l;
    this.modal = true;
    try {
      let rsc: any = await this.requisitionMinMaxService.getGenericSupplieHosp(l.hospcode);
      if (rsc.ok) {
        if (rsc.rows.length) {
          this.listSupplies = rsc.rows;
        } else {
          let rs: any;
          rs = await this.requisitionMinMaxService.getGenericSupplies();
          if (rs.ok) {
            this.listSupplies = rs.rows;
          }
        }
      } else {
        this.alertService.error(rsc.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async save() {
    this.check = false;
    for (const v of this.listSupplies) {
      if (v.min > v.max) {
        this.check = true;
      }
    }
    try {
      if (this.check) {
        this.alertService.error('MIN มากกว่า MAX');
      } else {
        this.onSelectHosp.items = this.listSupplies;
        let rs: any = await this.requisitionMinMaxService.save(this.onSelectHosp);
        if (rs.ok) {
          this.alertService.success();
        } else {
          this.alertService.error();
        }
        this.modal = false;
      }
    } catch (error) {
      this.alertService.error(error);
      this.modal = false;
    }
  }
}
