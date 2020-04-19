import { AlertService } from '../../help/alert.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PayService } from '../pay.service';
import { IMyOptions } from 'mydatepicker-th';
import { SelectedHospitalChildNodeComponent } from 'src/app/help/selected-hospital-child-node/selected-hospital-child-node.component';
import * as findIndex from 'lodash/findIndex';
import { BasicService } from '../services/basic.service';
import * as moment from 'moment';

@Component({
  selector: 'app-pay',
  templateUrl: './surgical-mask-shph.component.html',
  styles: []
})
export class SurgicalMaskShphComponent implements OnInit {
  list: any;
  modal: any;
  modalEdit: any;
  hospitalId: any;
  hospitalName: any;
  qty: any;
  isUpdate: any;
  id: any;
  checkDate: any;

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
    private basicService: BasicService,
  ) { }

  async ngOnInit() {
    await this.getCutTime();
    await this.getList();
  }

  async getCutTime() {
    const rs: any = await this.basicService.getDateCut();
    if (rs.ok) {
      this.checkDate = moment(rs.rows).format('YYYY-MM-DD');
    }
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
        let rs: any;
        obj.qty = this.qty;
        obj.hospitalId = this.hospitalId;

        if (this.isUpdate) {
          rs = await this.payService.update(obj, this.id);
        } else {
          rs = await this.payService.save(obj);
        }
        if (rs.ok) {
          this.alertService.success();
          this.modal = false;
          this.modalEdit = false;
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
    this.id = null;
    this.hospitalId = null;
    this.hospital.clear();
  }

  close() {
    this.modal = false;
    this.qty = null;
    this.hospitalId = null;
    this.hospitalName = null;
    this.hospital.clear();
  }

  async onClickEdit(l) {
    this.isUpdate = true;
    this.id = l.id;
    this.hospitalName = l.hospname;
    this.qty = l.qty;
    this.modalEdit = true;
  }

  async onClickRemove(l) {
    try {
      const confirm = await this.alertService.confirm();
      if (confirm) {
        const idx = findIndex(this.list, { id: +l.id });
        if (idx > -1) {
          const rs: any = await this.payService.remove(l.id);
          if (rs.ok) {
            this.list.splice(idx, 1);
          } else {
            this.alertService.error();
          }
        }
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

}
