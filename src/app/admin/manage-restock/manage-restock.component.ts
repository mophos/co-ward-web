import { Component, OnInit } from '@angular/core';
import { RestockService } from '../restock.service';
import { AlertService } from '../../help/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-restock',
  templateUrl: './manage-restock.component.html',
  styles: []
})
export class ManageRestockComponent implements OnInit {
  total: any;
  offset = 0;
  limit = 20;
  list: any = [];
  listApproved: any = [];
  totalApproved: any;
  loading = false;

  constructor(
    private restockService: RestockService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getRestock();
  }

  async getRestock() {
    try {
      this.loading = true;
      const rs: any = await this.restockService.getRestock(this.limit, this.offset);
      if (rs.ok) {
        this.list = rs.rows;
        this.total = rs.total;
      } else {
        this.alertService.error();
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.alertService.error(error);
    }
  }

  async clickCreate() {
    const confirm = await this.alertService.confirm();
    if (confirm) {
      this.loading = true;

      const rs: any = await this.restockService.createRestock();

      if (rs.ok) {
        this.loading = false;
        this.getRestock();
        this.alertService.success();
      } else {
        this.loading = false;
        this.alertService.error();
      }
    } else {

    }
    this.loading = false;
  }


  async onClickEdit(l) {
    this.router.navigate(['/admin/manage-restock/edit', { restockId: l.id }]);
  }

  async onClickDeleted(l) {
    const deleted = await this.alertService.deleted();
    if (deleted) {
      try {
        this.loading = true;
        const rs: any = await this.restockService.removeRestock(l.id);
        if (rs.ok) {
          this.getRestock();
          this.loading = false;
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
  }

  async getRestockApproved() {
    try {
      this.loading = true;
      const rs: any = await this.restockService.getRestockApproved(this.limit, this.offset);
      if (rs.ok) {
        this.listApproved = rs.rows;
        this.totalApproved = rs.total;
      } else {
        this.alertService.error();
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.alertService.error(error);
    }
  }

  async payNow() {
    this.router.navigate(['/admin/manage-restock/pay-now']);
  }
}
