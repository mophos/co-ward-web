import { AutocompleteHospitalComponent } from 'src/app/help/autocomplete-hospital/autocomplete-hospital.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from '../../help/alert.service';
import { RestockService } from '../restock.service';
import { Router } from '@angular/router';

import * as findIndex from 'lodash/findIndex';
import * as XLSX from 'ts-xlsx';
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
  file: any;
  arrayBuffer: any;

  modal = false;
  modalImport = false;
  modalExport = false;
  loading = false;

  @ViewChild('loadding') loadding: any;
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

  incomingfile(e) {
    this.file = e.target.files[0];
  }

  async import() {
    this.loadding.show();
    await this.getList();
    const fileReader = new FileReader();
    fileReader.onload = async (e) => {
      this.arrayBuffer = fileReader.result;
      const buffer = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i != buffer.length; ++i) {
        arr[i] = String.fromCharCode(buffer[i]);
      }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      const json: any = XLSX.utils.sheet_to_json(worksheet);

      const data = [];
      for (const v of json) {
        const obj: any = {};
        obj.hospcode = v.HOSPCODE;
        obj.items = [{
          id: 1,
          qty: v.QTY
        }];
        data.push(obj);
      }


      try {
        const rs: any = await this.restockService.importTemplete(data);
        if (rs.ok) {
          this.alertService.success();
          this.modalImport = false;
        } else {
          console.log(rs.error);
          this.modalImport = false;
          this.alertService.error();
        }
        this.loadding.hide();
      } catch (error) {
        this.modalImport = false;
        console.log(error);
        this.alertService.error(error);
        this.loadding.hide();
      }
    };
    fileReader.readAsArrayBuffer(this.file);
  }

  openModal() {
    this.modalImport = true;
  }

  export() {
    this.modalExport = true;
  }

  async exportTemplete() {
    this.loadding.show();
    const rs: any = await this.restockService.exportTemplete();
    if (!rs) {
      this.loadding.hide();
    } else {

      this.loadding.hide();
      this.downloadFile('Templete_จ่ายด่วน', 'xlsx', rs);
    }
  }

  downloadFile(name, type, data: any) {
    try {
      const url = window.URL.createObjectURL(new Blob([data]));
      const fileName = `${name}.${type}`;
      // Debe haber una manera mejor de hacer esto...
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove(); // remove the element
    } catch (error) {
      this.alertService.error();
    }
  }

}
