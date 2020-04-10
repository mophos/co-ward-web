import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../../help/alert.service';
import { RequisitionService } from '../../requisition.service';


@Component({
  selector: 'app-requisition-supplies',
  templateUrl: './requisition-supplies.component.html',
  styles: []
})
export class RequisitionSuppliesComponent implements OnInit {

  isLoadding = false;
  list: any;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private requisitionService: RequisitionService
  ) { }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    try {
      this.isLoadding = true;
      const rs: any = await this.requisitionService.getList();
      if (rs.ok) {
        this.list = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
      this.isLoadding = false;
    } catch (error) {
      this.isLoadding = false;
      this.alertService.error(error);
    }
  }

  onClickAdd() {
    this.router.navigate(['/staff/requisition-supplies/new']);
  }
}
