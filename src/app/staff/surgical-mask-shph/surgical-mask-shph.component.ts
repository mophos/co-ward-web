import { AutocompleteHospitalComponent } from 'src/app/help/autocomplete-hospital/autocomplete-hospital.component';
import { AlertService } from '../../help/alert.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PayService } from '../pay.service';
import { IMyOptions } from 'mydatepicker-th';
import { SelectedHospitalChildNodeComponent } from 'src/app/help/selected-hospital-child-node/selected-hospital-child-node.component';

@Component({
  selector: 'app-pay',
  templateUrl: './surgical-mask-shph.component.html',
  styles: []
})
export class SurgicalMaskShphComponent implements OnInit {
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
  @ViewChild('hospital') hospital: SelectedHospitalChildNodeComponent;
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
          this.clear();
          this.getList();
        } else {
          this.alertService.error();
        }
      } catch (error) {
        this.alertService.error();
      }
    }
  }

  clear() {
    this.qty = null;
    this.hospitalId = null;
    this.hospital.clear();
  }

  close() {
    this.modal = false;
    this.qty = null;
    this.hospitalId = null;
    this.hospital.clear();
  }

}
