import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../help/alert.service';
import { FulfillService } from '../services/fulfill.service';
import { Router } from '@angular/router';
import { findIndex } from 'lodash';
@Component({
  selector: 'app-fulfill-surgical-mask-list',
  templateUrl: './fulfill-surgical-mask-list.component.html',
  styles: []
})
export class FulfillSurgicalMaskListComponent implements OnInit {
  list: any;
  loading = false;
  selected = [];
  isSave = false;

  constructor(
    private fulfillService: FulfillService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getlist();
  }

  async getlist() {
    try {
      const rs: any = await this.fulfillService.getListSurgical();
      if (rs.ok) {
        this.list = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  cal() {
    this.router.navigate(['/admin/fulfill-surgical-masks-list/fulfill-surgical-masks']);
  }

  async approved() {
    const comfirm = await this.alertService.confirm();
    if (comfirm) {
      this.isSave = true;
      this.loading = true;
      try {
        const id: any = [];
        for (const v of this.selected) {
          id.push(v.id);
        }
        const rs: any = await this.fulfillService.approved(id);
        if (rs.ok) {
          this.getlist();
          this.isSave = false;
          this.selected = [];
          this.alertService.success();
          this.loading = false;
        } else {
          this.isSave = false;
          this.alertService.error();
          this.loading = false;
        }
      } catch (error) {
        this.isSave = false;
        this.selected = [];
        this.loading = false;
        this.alertService.error();
      }
    }
  }
}
