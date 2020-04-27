import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../help/alert.service';
import { FulfillService } from '../services/fulfill.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fulfill-surgical-mask-list',
  templateUrl: './fulfill-surgical-mask-list.component.html',
  styles: []
})
export class FulfillSurgicalMaskListComponent implements OnInit {
  list: any;
  loading = false;
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

}
