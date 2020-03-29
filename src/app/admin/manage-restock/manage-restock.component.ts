import { Component, OnInit } from '@angular/core';
import { RestockService } from '../restock.service';
import { AlertService } from '../../help/alert.service';
import { Router } from '@angular/router';

import * as XLSX from 'ts-xlsx';

@Component({
  selector: 'app-manage-restock',
  templateUrl: './manage-restock.component.html',
  styles: []
})
export class ManageRestockComponent implements OnInit {

  file: any;
  arrayBuffer: any;
  modal: boolean = false;
  total: any;
  offset = 0;
  limit = 20;
  list: any = [];
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

  incomingfile(e) {
    this.file = e.target.files[0];
  }

  openModal() {
    this.modal = true;
  }

  import() {
    let fileReader = new FileReader();
    fileReader.onload = async (e) => {
      this.arrayBuffer = fileReader.result;
      let buffer = new Uint8Array(this.arrayBuffer);
      let arr = new Array();
      for (let i = 0; i != buffer.length; ++i) arr[i] = String.fromCharCode(buffer[i]);
      let bstr = arr.join("");
      let workbook = XLSX.read(bstr, { type: "binary" });
      let first_sheet_name = workbook.SheetNames[0];
      let worksheet = workbook.Sheets[first_sheet_name];

      let json: any = XLSX.utils.sheet_to_json(worksheet);
      console.log(json[0]);


      let data = [];
      let idx = 0;
      for (const v of json) {
        if (idx > 0) {
          for (let i = 0; i < Object.values(v).length; i++) {
            if (Object.keys(v)[i] != 'id' && Object.keys(v)[i] != 'โรงพยาบาล') {
              const obj = {
                restock_detail_id: v.id,
                supplies_code: Object.keys(v)[i],
                qty: Object.values(v)[i]
              }
              data.push(obj)
            }
          }
        }
        idx++;
      }
      // console.log(data);

      try {
        let rs: any = await this.restockService.import(data);
        if (rs.ok) {
          this.alertService.success();
        } else {
          this.alertService.error();
        }
      } catch (error) {
        this.alertService.error(error);
      }
    }
    fileReader.readAsArrayBuffer(this.file);
  }
}
