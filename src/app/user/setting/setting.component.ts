import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingService } from '../setting.service';
import { AlertService } from '../../help/alert.service';
import { AutocompleteProvinceComponent } from '../../help/autocomplete-address/autocomplete-province/autocomplete-province.component';
import { AutocompleteDistrictComponent } from '../../help/autocomplete-address/autocomplete-district/autocomplete-district.component';
import { AutocompleteSubdistrictComponent } from '../../help/autocomplete-address/autocomplete-subdistrict/autocomplete-subdistrict.component';
import { AutocompleteZipcodeComponent } from '../../help/autocomplete-address/autocomplete-zipcode/autocomplete-zipcode.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styles: []
})
export class SettingComponent implements OnInit {
  hospCode: any;
  hospName: any;
  address: any;
  tel: any;
  telephone: any;
  telephoneManager: any;

  tambonId: any;
  tambonName: any;
  ampurName: any;
  provinceName: any;
  zipcode: any;

  @ViewChild('province') province: AutocompleteProvinceComponent;
  @ViewChild('ampur') ampur: AutocompleteDistrictComponent;
  @ViewChild('tambon') tambon: AutocompleteSubdistrictComponent;
  @ViewChild('zipcode') zipc: AutocompleteZipcodeComponent;

  constructor(
    private settingService: SettingService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getInfo();
  }

  async getInfo() {
    try {
      let rs: any = await this.settingService.getInfo();
      console.log(rs);

      if (rs.ok) {
        this.hospCode = rs.rows[0].hospcode;
        this.hospName = rs.rows[0].hospname;
        this.address = rs.rows[0].address;
        this.tel = rs.rows[0].tel;
        this.telephone = rs.rows[0].telephone;
        this.telephoneManager = rs.rows[0].telephone_manager;

        this.tambonName = rs.rows[0].tambon_name;
        this.ampurName = rs.rows[0].ampur_name;
        this.provinceName = rs.rows[0].province_name;
        this.zipcode = rs.rows[0].zipcode;

        this.tambonId = rs.rows[0].province_code + rs.rows[0].ampur_code + rs.rows[0].tambon_code;

        this.province.setQuery(rs.rows[0].province_name);
        this.ampur.setQuery(rs.rows[0].ampur_name);
        this.tambon.setQuery(rs.rows[0].tambon_name);
        this.zipc.setQuery(rs.rows[0].zipcode);
      } else {
        this.alertService.error();
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async save() {
    let confirm = await this.alertService.confirm();
    if (confirm) {
      try {
        let data: any = [];
        const obj: any = {};
        obj.tel = this.tel;
        obj.telephone = this.telephone;
        obj.telephone_manager = this.telephoneManager;
        obj.address = this.address;
        obj.province_name = this.provinceName;
        obj.ampur_name = this.ampurName;
        obj.tambon_name = this.tambonName;
        obj.province_code = this.tambonId.substring(0, 2);
        obj.ampur_code = this.tambonId.substring(2, 4);
        obj.tambon_code = this.tambonId.substring(4, 6);
        obj.zipcode = this.zipcode;
        data.push(obj);

        let rs: any = await this.settingService.save(data);
        if (rs.ok) {
          this.alertService.success();
          this.getInfo();
        } else {
          this.alertService.error();
        }
      } catch (error) {
        this.alertService.error();
      }
    }
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
}
