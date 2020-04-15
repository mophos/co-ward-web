import { AlertService } from '../../help/alert.service';
import { Component, OnInit } from '@angular/core';
import { PayService } from '../pay.service';
import { IMyOptions } from 'mydatepicker-th';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styles: []
})
export class PayComponent implements OnInit {
  list: any;
  modal: any;
  hospitalId: any;
  date: any;
  qty: any;

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false,
    height: '25px',
    width: '200px'
  };

  constructor(
    private payService: PayService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.getList();
    const date = new Date();
    this.date = {
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    };
  }

  async getList() {
    try {
      const rs: any = await this.payService.getList();
      if (rs.ok) {
        this.list = rs.rows;
        console.log(this.list);
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  onClickAdd() {
    this.modal = true;
  }

  onSelectHosp(e) {
    this.hospitalId = e.id;
  }

  async save() {
    const confirm = await this.alertService.confirm();
    if (confirm) {
      try {
        const obj: any = {};
        obj.qty = this.qty;
        obj.hospitalId = this.hospitalId;
        // obj.date = this.date.date.year + '-' + this.date.date.month + '-' + this.date.date.day;
        const rs: any = await this.payService.save(obj);
        if (rs.ok) {
          this.alertService.success();
          this.modal = false;
          this.getList();
        } else {
          this.alertService.error();
        }
      } catch (error) {
        this.alertService.error();
      }
    }
  }

}
