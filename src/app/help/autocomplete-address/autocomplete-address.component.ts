import { Component, OnInit, ViewChild } from '@angular/core';
import { AutocompleteZipcodeComponent } from './autocomplete-zipcode/autocomplete-zipcode.component';
import { AutocompleteSubdistrictComponent } from './autocomplete-subdistrict/autocomplete-subdistrict.component';
import { AutocompleteDistrictComponent } from './autocomplete-district/autocomplete-district.component';
import { AutocompleteProvinceComponent } from './autocomplete-province/autocomplete-province.component';

@Component({
  selector: 'app-autocomplete-address',
  templateUrl: './autocomplete-address.component.html',
  styles: []
})
export class AutocompleteAddressComponent implements OnInit {

  provinceId: any;
  provinceName: any;
  ampurId: any;
  ampurName: any;
  tambonId: any;
  tambonName: any;
  zipcode: any;
  @ViewChild('province', { static: false }) province: AutocompleteProvinceComponent;
  @ViewChild('ampur', { static: false }) ampur: AutocompleteDistrictComponent;
  @ViewChild('tambon', { static: false }) tambon: AutocompleteSubdistrictComponent;
  @ViewChild('zipcode', { static: false }) zipc: AutocompleteZipcodeComponent;
  constructor() { }

  ngOnInit() {
  }

  onSelectProvince(e) {
    this.tambonId = e.tambon_id;
    this.tambonName = e.tambon_name;
    this.ampurId = e.ampur_id;
    this.ampurName = e.ampur_name;
    this.provinceId = e.province_id;
    this.provinceName = e.province_name;
    this.zipcode = e.zip_code;
    this.setValue();
  }

  onSelectAmpur(e) {
    this.tambonId = e.tambon_id;
    this.tambonName = e.tambon_name;
    this.ampurId = e.ampur_id;
    this.ampurName = e.ampur_name;
    this.provinceId = e.province_id;
    this.provinceName = e.province_name;
    this.zipcode = e.zip_code;
    this.setValue();
  }

  onSelectTambon(e) {
    this.tambonId = e.tambon_id;
    this.tambonName = e.tambon_name;
    this.ampurId = e.ampur_id;
    this.ampurName = e.ampur_name;
    this.provinceId = e.province_id;
    this.provinceName = e.province_name;
    this.zipcode = e.zip_code;
    this.setValue();
  }

  onSelectZipcode(e) {
    this.tambonId = e.tambon_id;
    this.tambonName = e.tambon_name;
    this.ampurId = e.ampur_id;
    this.ampurName = e.ampur_name;
    this.provinceId = e.province_id;
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
