import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../help/alert.service';
import { MinMaxService } from '../min-max.service';
import { RestockService } from '../restock.service';
import * as XLSX from 'ts-xlsx';

@Component({
  selector: 'app-manage-restock-edit',
  templateUrl: './manage-restock-edit.component.html',
  styles: []
})
export class ManageRestockEditComponent implements OnInit {


  file: any;
  arrayBuffer: any;
  modalImport = false;


  restockId: any
  restockDetailId: any
  listTypes: any
  listHosp: any
  typeName: any = ''
  hospName: any = ''
  listSupplies: any
  loading = false
  modal = false
  modalExport = false
  isSave = false

  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private minmaxTypeService: MinMaxService,
    private restockService: RestockService,
  ) {
    const params = this.route.snapshot.params;
    this.restockId = params.restockId;
  }

  ngOnInit() {
    this.getListTypes();
  }

  async getListTypes() {
    try {
      this.loading = true;
      const rs: any = await this.minmaxTypeService.getList();
      if (rs.ok) {
        this.listTypes = rs.rows;
      } else {
        this.alertService.error();
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.alertService.error(error);
    }
  }

  async getListHospital(l) {
    this.typeName = l.name
    try {
      this.loading = true;
      const rs: any = await this.restockService.getListHospital(this.restockId, l.id)
      if (rs.ok) {
        this.listHosp = rs.rows;
      } else {
        this.alertService.error();
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.alertService.error(error);
    }
  }

  async onClickEdit(l) {
    this.hospName = l.hospname
    this.restockDetailId = l.id
    try {
      this.loading = true;
      const rs: any = await this.restockService.getListSupplies(this.restockDetailId)
      if (rs.ok) {
        this.listSupplies = rs.rows;
        this.modal = true
      } else {
        this.alertService.error();
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.alertService.error(error);
    }
  }

  async save() {
    this.isSave = true
    const confirm = await this.alertService.confirm();
    if (confirm) {
      try {
        let data: any = [];
        let obj: any
        for (const i of this.listSupplies) {
          obj = {
            supplies_id: i.supplies_id,
            qty: i.qty,
            restock_detail_id: i.restock_detail_id
          }
          data.push(obj)
        }

        const rs: any = await this.restockService.updateSupplies(data, this.restockDetailId)
        if (rs.ok) {
          this.alertService.success();
          this.modal = false
        } else {
          this.alertService.error();
        }
        this.loading = false;
        this.isSave = false;
      } catch (error) {
        this.loading = false;
        this.isSave = false;
        this.alertService.error(error);
      }
    }
  }

  incomingfile(e) {
    this.file = e.target.files[0];
  }

  openModal() {
    this.modalImport = true;
  }

  openModalExport() {
    this.modalExport = true;
  }

  async import() {
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
