import { Component, OnInit, ViewChild } from '@angular/core';
import { HospitalService } from '../hospital.service';
import { AlertService } from '../../help/alert.service';
import * as findIndex from 'lodash/findIndex';
import { ClrDatagridStateInterface } from '@clr/angular';

import { AutocompleteProvinceComponent } from '../../help/autocomplete-address/autocomplete-province/autocomplete-province.component';
import { AutocompleteDistrictComponent } from '../../help/autocomplete-address/autocomplete-district/autocomplete-district.component';
import { AutocompleteSubdistrictComponent } from '../../help/autocomplete-address/autocomplete-subdistrict/autocomplete-subdistrict.component';
import { AutocompleteZipcodeComponent } from 'src/app/help/autocomplete-address/autocomplete-zipcode/autocomplete-zipcode.component';


@Component({
  selector: 'app-manage-hospital',
  templateUrl: './manage-hospital.component.html',
  styles: []
})
export class ManageHospitalComponent implements OnInit {
  @ViewChild('province') province: AutocompleteProvinceComponent;
  @ViewChild('ampur') ampur: AutocompleteDistrictComponent;
  @ViewChild('tambon') tambon: AutocompleteSubdistrictComponent;
  @ViewChild('zipcode') zipc: AutocompleteZipcodeComponent;

  id: any;

  list: any = [];
  total = 0;
  limit = 20;
  offset = 0;
  query: any;
  loading = false;
  modal = false;
  hospTypeId: any;
  hospCode: any = '';
  hospName: any;
  address: any;
  tel: any;
  telephone: any;
  telephoneManager: any;
  hospBed: any;
  listType: any;

  tambonId: any;
  tambonName: any;
  ampurName: any;
  provinceName: any;
  zipcode: any;
  isUpdate = false;
  tambonCode: any;
  constructor(
    private hospitalService: HospitalService,
    private alertService: AlertService,
  ) { }
  ngOnInit() {
    this.getTypeList();
    this.getList();
  }

  async getTypeList() {
    this.loading = true;

    const rs: any = await this.hospitalService.getTypeList();
    if (rs.ok) {
      this.listType = rs.rows;
    } else {
      this.alertService.error(rs.error);
    }
    this.loading = false;
  }

  async getList() {
    this.loading = true;

    const rs: any = await this.hospitalService.getList(this.query, this.limit, this.offset);
    const rsTotal: any = await this.hospitalService.getListTotal(this.query);
    if (rs.ok) {
      this.list = rs.rows;
      this.total = rsTotal.rows;
    } else {
      this.alertService.error(rs.error);
    }
    this.loading = false;
  }

  refresh(state: ClrDatagridStateInterface) {
    console.log(state);
    this.limit = +state.page.size;
    this.offset = +state.page.from;
    this.getList();
  }

  async doEnter(e) {
    if (e.keyCode === 13) {
      this.offset = 0;
      await this.getList();
    }
  }

  async onClickAdd() {
    this.modal = true;
    this.clearForm();
  }

  onSelectProvince(e) {
    this.tambonId = e.tambon_id;
    this.tambonName = e.tambon_name;
    this.ampurName = e.ampur_name;
    this.provinceName = e.province_name;
    this.zipcode = e.zip_code;
    this.setValue();
  }

  onSelectAmpur(e) {
    this.tambonId = e.tambon_id;
    this.tambonName = e.tambon_name;
    this.ampurName = e.ampur_name;
    this.provinceName = e.province_name;
    this.zipcode = e.zip_code;
    this.setValue();
  }

  onSelectTambon(e) {
    this.tambonId = e.tambon_id;
    this.tambonName = e.tambon_name;
    this.ampurName = e.ampur_name;
    this.provinceName = e.province_name;
    this.zipcode = e.zip_code;
    this.setValue();
  }

  onSelectZipcode(e) {
    this.tambonId = e.tambon_id;
    this.tambonName = e.tambon_name;
    this.ampurName = e.ampur_name;
    this.provinceName = e.province_name;
    this.zipcode = e.zip_code;
    this.setValue();
  }

  setValue() {
    this.province.setQuery(this.provinceName);
    this.ampur.setQuery(this.ampurName);
    this.tambon.setQuery(this.tambonName);
    this.zipc.setQuery(this.zipcode);
  }

  onClose() {
    this.modal = false;
    this.clearForm();

  }

  async clearForm() {
    this.id = null;
    this.tambonId = null;
    this.tambonName = null;
    this.ampurName = null;
    this.provinceName = null;
    this.zipcode = null;
    this.hospCode = '';
    this.hospName = null;
    this.address = null;
    this.tel = null;
    this.telephone = null;
    this.telephoneManager = null;
    this.hospBed = null;
    this.hospTypeId = null;
    this.setValue();
  }


  async save() {
    console.log(this.hospTypeId);
    try {
      const data = {
        hosptype_id: this.hospTypeId,
        tambon_code: this.tambonCode,
        tambon_name: this.tambonName,
        ampur_name: this.ampurName,
        province_name: this.provinceName,
        zipcode: this.zipcode,
        hospcode: this.hospCode,
        hospname: this.hospName,
        address: this.address,
        tel: this.tel,
        telephone: this.telephone,
        telephone_manager: this.telephoneManager,
        bed_spd: this.hospBed
      };
      let rs: any;
      if (this.isUpdate) {
        rs = await this.hospitalService.update(data, this.id);
      } else {
        rs = await this.hospitalService.save(data);
      }

      if (rs.ok) {
        this.alertService.success();
        this.clearForm();
        this.getList();
        this.modal = false;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error();
      this.modal = false;
    }
  }

  async onClickEdit(l) {
    this.modal = true;
    this.isUpdate = true;
    this.id = l.id;
    this.hospTypeId = l.hosptype_id;
    this.tambonCode = l.tambon_code;
    this.tambonName = l.tambon_name;
    this.ampurName = l.ampur_name;
    this.provinceName = l.province_name;
    this.zipcode = l.zipcode;
    this.hospCode = l.hospcode;
    this.hospName = l.hospname;
    this.address = l.address;
    this.tel = l.tel;
    this.telephone = l.telephone;
    this.telephoneManager = l.telephone_manager;
    this.hospBed = l.bed_spd;

    this.setValue();
  }

  async onClickRemove(l) {
    try {
      const confirm = await this.alertService.confirm();
      if (confirm) {
        const idx = findIndex(this.list, { id: +l.id });
        if (idx > -1) {
          const rs: any = await this.hospitalService.remove(l.id);
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
