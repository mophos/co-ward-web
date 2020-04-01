import { Component, OnInit, ViewChild } from '@angular/core';
import { RestockService } from '../restock.service';
import { AlertService } from '../../help/alert.service';
import * as findIndex from 'lodash/findIndex';
import { AutocompleteHospitalComponent } from 'src/app/help/autocomplete-hospital/autocomplete-hospital.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pay-now',
  templateUrl: './pay-now.component.html',
  styles: []
})
export class PayNowComponent implements OnInit {

  list: any = [];
  hospList: any = [];
  hosp: any;
  forwardHosp: any;
  data: any = [];
  hospName: any;

  modal = false;
  loading = false;

  @ViewChild('hospital') hospitals: AutocompleteHospitalComponent;
  constructor(
    private restockService: RestockService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSelectHosp(e) {
    this.hosp = e;
  }

  add() {
    let idx = findIndex(this.hospList, { hospcode: this.hosp.hospcode });
    if (idx > -1) {
      this.alertService.error('โรงพยาบาลซ้ำ');
      this.list = [];
      this.hospName = null;
      this.hospitals.setQuery('');
    } else {
      this.hospitals.setQuery('');
      this.hospList.push(this.hosp);

      this.hospName = this.hosp.hospname;
      this.forwardHosp = this.hosp;
      this.getList();
    }
    this.hosp = null;
  }

  async getList() {
    try {
      let rs: any = await this.restockService.getSupplies();
      if (rs.ok) {
        this.list = rs.rows;
      } else {
        this.alertService.error();
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  remove(v) {
    this.hospList.splice(v, 1);
  }

  next(v) {
    this.hospName = this.hospList[v].hospname;
    this.forwardHosp = this.hospList[v];

    let idx = findIndex(this.data, { hospcode: this.hospList[v].hospcode });
    if (idx > -1) {
      this.list = this.data[idx].items;
    } else {
      this.getList();
    }
  }

  save() {
    let confirm = this.alertService.confirm();

    if (confirm) {
      const obj: any = {};
      obj.hospcode = this.forwardHosp.hospcode;
      obj.items = this.list;
      this.data.push(obj);

      let idx = findIndex(this.hospList, { hospcode: this.forwardHosp.hospcode });
      this.hospList[idx].check = 'Y';

      this.alertService.success();
    }
  }

  async copy(v) {
    this.hospitals.setQuery('');
    this.forwardHosp = this.hospList[v];
    this.modal = true;
  }

  copyHos() {
    let idxf = findIndex(this.data, { hospcode: this.hosp.hospcode });
    if (idxf === -1) {
      let idxd = findIndex(this.data, { hospcode: this.forwardHosp.hospcode });
      const obj: any = {};
      obj.hospcode = this.hosp.hospcode;
      obj.items = this.data[idxd].items;

      this.list = this.data[idxd].items;
      this.hospName = this.hosp.hospname;

      this.data.push(obj);

      this.hospList.push(this.hosp);
      let idxh = findIndex(this.hospList, { hospcode: this.hosp.hospcode });
      this.hospList[idxh].check = 'Y';

      this.modal = false;
      this.alertService.success();
    } else {
      this.alertService.error('โรงพยาบาลซ้ำ');
    }
  }

  async saveAll() {
    try {
      let rs: any = await this.restockService.save(this.data);
      if (rs.ok) {
        this.alertService.success();
        this.router.navigate(['/admin/manage-restock']);
      } else {
        this.alertService.error();
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

}
