import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../../help/alert.service';
import { RequisitionService } from '../../requisition.service';
import { IMyOptions } from 'mydatepicker-th';

@Component({
  selector: 'app-requisition-supplies',
  templateUrl: './requisition-supplies.component.html',
  styles: []
})
export class RequisitionSuppliesComponent implements OnInit {

  isLoadding = false;
  list: any;
  startDate: any;
  endDate: any;

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };

  constructor(
    private router: Router,
    private alertService: AlertService,
    private requisitionService: RequisitionService
  ) { }

  ngOnInit() {
    this.getList();
    let date = new Date();
    this.startDate = {
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    };
    this.endDate = {
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    };
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

  onClickEdit(l) {
    this.router.navigate(['/staff/requisition-supplies/new', { id: l.id }]);
  }
}
