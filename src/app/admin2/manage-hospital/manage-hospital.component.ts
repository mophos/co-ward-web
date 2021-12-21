import { Component, OnInit, ViewChild } from '@angular/core';
import { HospitalService } from '../services/hospital.service';
import { NodeSurgicalService } from '../services/node-surgical.service';
import { AlertService } from '../../help/alert.service';
import { findIndex, isEmpty } from 'lodash';
import { ClrDatagridStateInterface } from '@clr/angular';

import { AutocompleteProvinceComponent } from '../../help/autocomplete-address/autocomplete-province/autocomplete-province.component';
import { AutocompleteDistrictComponent } from '../../help/autocomplete-address/autocomplete-district/autocomplete-district.component';
import { AutocompleteSubdistrictComponent } from '../../help/autocomplete-address/autocomplete-subdistrict/autocomplete-subdistrict.component';
import { AutocompleteZipcodeComponent } from 'src/app/help/autocomplete-address/autocomplete-zipcode/autocomplete-zipcode.component';
import { AutocompleteHospitalComponent } from 'src/app/help/autocomplete-hospital/autocomplete-hospital.component';


@Component({
  selector: 'app-manage-hospital',
  templateUrl: './manage-hospital.component.html',
  styles: []
})
export class ManageHospitalComponent implements OnInit {
  @ViewChild('province', { static: false }) province: AutocompleteProvinceComponent;
  @ViewChild('ampur', { static: false }) ampur: AutocompleteDistrictComponent;
  @ViewChild('tambon', { static: false }) tambon: AutocompleteSubdistrictComponent;
  @ViewChild('zipcode', { static: false }) zipc: AutocompleteZipcodeComponent;
  @ViewChild('hospital', { static: false }) hospital: AutocompleteHospitalComponent;

  id: any;

  list: any = [];
  total = 0;
  limit = 20;
  offset = 0;
  query: any;
  loading = false;
  modal = false;
  hospTypeId: any;
  hospTypeCode: any;
  ministryCode: any;
  subMinistryCode: any;
  hospCode: any = '';
  hospName: any;
  address: any;
  tel: any;
  telephone: any;
  telephoneManager: any;
  hospBed: any;
  listType: any;
  listMinistryType: any;
  listMinistry: any;
  listSubMinistry: any;
  tambonId: any;
  tambonName: any;
  ampurName: any;
  provinceName: any;
  zipcode: any;
  isUpdate = false;
  tambonCode: any;
  ampurCode: any;
  provinceCode: any;

  // new
  hospType = ''
  hosTypeEnum = [
    {
      name: 'โรงพยาบาล',
      value: 'HOSPITAL'
    },
    {
      name: 'โรงพยาบาลสนาม',
      value: 'FIELD'
    },
    {
      name: 'Hospitel',
      value: 'HOSPITEL'
    },
    {
      name: 'Community Isolation',
      value: 'CI'
    }
  ]
  contact_name = ''
  headHospcode = ''
  headHospname = ''

  constructor(
    private hospitalService: HospitalService,
    private nodeSurgicalService:NodeSurgicalService,
    private alertService: AlertService,
  ) { }
  ngOnInit() {
    this.getTypeList();
    this.getMinistryList();
    this.getMinistryTypeList();
    this.getSubMinistryList();
    this.getList();
  }

  onSelectHosp (value) {
    this.headHospcode = value.hospcode
    this.headHospname = value.hospname
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

  async getMinistryTypeList() {
    this.loading = true;
    const rs: any = await this.hospitalService.getMinistryTypeList();
    if (rs.ok) {
      this.listMinistryType = rs.rows;
    } else {
      this.alertService.error(rs.error);
    }
    this.loading = false;
  }

  async getMinistryList() {
    this.loading = true;
    const rs: any = await this.hospitalService.getMinistryList();
    if (rs.ok) {
      this.listMinistry = rs.rows;
    } else {
      this.alertService.error(rs.error);
    }
    this.loading = false;
  }

  async getSubMinistryList() {
    this.loading = true;
    const rs: any = await this.hospitalService.getSubMinistryList();
    if (rs.ok) {
      this.listSubMinistry = rs.rows;
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
    if (!isEmpty(state)) {
      this.offset = +(state.page.current - 1) * +state.page.size;
      this.limit = +state.page.size;
    }
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
    this.tambonCode = e.tambon_code;
    this.ampurCode = e.ampur_code;
    this.provinceCode = e.province_code;
    this.zipcode = e.zip_code;
    this.setValue();
  }

  onSelectAmpur(e) {
    this.tambonId = e.tambon_id;
    this.tambonName = e.tambon_name;
    this.ampurName = e.ampur_name;
    this.provinceName = e.province_name;
    this.tambonCode = e.tambon_code;
    this.ampurCode = e.ampur_code;
    this.provinceCode = e.province_code;
    this.zipcode = e.zip_code;
    this.setValue();
  }

  onSelectTambon(e) {
    this.tambonId = e.tambon_id;
    this.tambonName = e.tambon_name;
    this.ampurName = e.ampur_name;
    this.provinceName = e.province_name;
    this.tambonCode = e.tambon_code;
    this.ampurCode = e.ampur_code;
    this.provinceCode = e.province_code;
    this.zipcode = e.zip_code;
    this.setValue();
  }

  onSelectZipcode(e) {
    this.tambonId = e.tambon_id;
    this.tambonName = e.tambon_name;
    this.ampurName = e.ampur_name;
    this.provinceName = e.province_name;
    this.tambonCode = e.tambon_code;
    this.ampurCode = e.ampur_code;
    this.provinceCode = e.province_code;
    this.zipcode = e.zip_code;
    this.setValue();
  }

  setValue() {
    this.province.setQuery(this.provinceName);
    this.ampur.setQuery(this.ampurName);
    this.tambon.setQuery(this.tambonName);
    this.zipc.setQuery(this.zipcode);
    this.hospital.setQuery(this.headHospname);
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
    try {
      const idx = findIndex(this.listType, { id: +this.hospTypeId });
      const data = {
        hosptype_id: this.hospTypeId,
        // hospital_type: this.hospTypeId === 19 ? 'HOSPITEL' : 'HOSPITAL',
        hosptype_code: this.listType[idx].code,
        tambon_code: this.tambonCode || null,
        ministry_code: this.ministryCode || null,
        sub_ministry_code: this.subMinistryCode || null,
        ampur_code: this.ampurCode || null,
        province_code: this.provinceCode,
        tambon_name: this.tambonName || null,
        ampur_name: this.ampurName || null,
        province_name: this.provinceName,
        zipcode: this.zipcode || null,
        hospcode: this.hospCode,
        hospname: this.hospName,
        address: this.address || null,
        tel: this.tel || null,
        telephone: this.telephone || null,
        telephone_manager: this.telephoneManager || null,
        // new
        hospital_type: this.hospType || null,
        head_hospcode: this.headHospcode || null,
        contact_name: this.contact_name || null
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
    this.hospTypeCode = l.hosptype_code;
    this.ministryCode = l.ministry_code;
    this.subMinistryCode = l.sub_ministry_code;
    this.tambonCode = l.tambon_code;
    this.ampurCode = l.ampur_code;
    this.provinceCode = l.province_code;
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

    //new
    try {
      const res:any = await this.hospitalService.getHeadHospital(l.head_hospcode)
      if (res.ok) {
        this.headHospname = res.rows[0].hospname
      }
    } catch (error) {
      console.error(error)
    }

    this.hospType = l.hospital_type
    this.contact_name = l.contact_name
    this.headHospcode = l.head_hospcode

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
