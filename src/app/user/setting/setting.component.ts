import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingService } from '../setting.service';
import { RegisterService } from '../../register/register.service';
import { AlertService } from '../../help/alert.service';
import * as findIndex from 'lodash/findIndex';
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
  positionList: any;
  position: any;
  titleList: any;
  title: any;
  user: any;

  fname: any;
  lname: any;
  email: any;
  username: any;
  password: any;

  checkPassword: any;
  phoneNumber: any;
  checkPhone: any;
  checkEmail: any;
  checkPasswordConfirm: any;
  passwordConfirm: any = '';

  tambonId: any;
  tambonName: any;
  ampurName: any;
  provinceName: any;
  zipcode: any;
  lat: any;
  long: any;

  @ViewChild('province') province: AutocompleteProvinceComponent;
  @ViewChild('ampur') ampur: AutocompleteDistrictComponent;
  @ViewChild('tambon') tambon: AutocompleteSubdistrictComponent;
  @ViewChild('zipcode') zipc: AutocompleteZipcodeComponent;

  constructor(
    private settingService: SettingService,
    private alertService: AlertService,
    private registerService: RegisterService
  ) { }

  async ngOnInit() {
    await this.getPosition();
    await this.getTitle();
    await this.getInfo();
    await this.getUserInfo();
  }

  async getInfo() {
    try {
      const rs: any = await this.settingService.getInfo();
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
        this.lat = rs.rows[0].lat;
        this.long = rs.rows[0].long;

        this.tambonId = rs.rows[0].province_code + rs.rows[0].ampur_code + rs.rows[0].tambon_code;

        this.province.setQuery(rs.rows[0].province_name);
        this.ampur.setQuery(rs.rows[0].ampur_name);
        this.tambon.setQuery(rs.rows[0].tambon_name);
        this.zipc.setQuery(rs.rows[0].zipcode);
      } else {
        this.alertService.error();
      }
    } catch (error) {
      console.log(error);
      
      this.alertService.error(error);
    }
  }

  async getUserInfo() {
    try {
      const rs: any = await this.settingService.getUserInfo();
      if (rs.ok) {
        this.user = rs.rows;
        const idxPosition = findIndex(this.positionList, { id: this.user[0].position_id });
        const idxTitle = findIndex(this.titleList, { id: this.user[0].title_id });
        this.position = this.positionList[idxPosition].id;
        this.title = this.titleList[idxTitle].id;
        this.fname = this.user[0].fname;
        this.lname = this.user[0].lname;
        this.email = this.user[0].email;
        this.phoneNumber = this.user[0].telephone;
        this.checkEmail = true;
        this.checkPhone = true;
        this.checkPassword = true;
      } else {
        this.alertService.error();
      }
    } catch (error) {
      console.log(error);
      
      this.alertService.error(error);
    }
  }

  async getPosition() {
    try {
      const rs: any = await this.registerService.getPosition();
      if (rs.ok) {
        this.positionList = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error.message);
    }
  }

  async enterEmail() {
    this.checkEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(this.email)
  }

  async enterPhone() {
    this.checkPhone = /^([0-9]{10})$/.test(this.phoneNumber);
  }

  async enterPassword() {
    this.checkPassword = /^(?=.*[A-Za-z])(?=.*[0-9]).{8,}$/.test(this.password);
    if (this.password == this.passwordConfirm && this.checkPassword) {
      this.checkPasswordConfirm = true
    } else if (this.password != this.passwordConfirm) {
      this.checkPasswordConfirm = false
    }
  }

  async enterPasswordConfirm() {
    if (this.password == this.passwordConfirm && this.checkPassword) {
      this.checkPasswordConfirm = true
    } else if (this.password != this.passwordConfirm) {
      this.checkPasswordConfirm = false
    }
  }

  async getTitle() {
    try {
      const rs: any = await this.registerService.getTitle();
      if (rs.ok) {
        this.titleList = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error.message);
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
        obj.lat = this.lat;
        obj.long = this.long;
        obj.tambon_name = this.tambonName;
        obj.province_code = this.tambonId.substring(0, 2);
        obj.ampur_code = this.tambonId.substring(2, 4);
        obj.tambon_code = this.tambonId.substring(4, 6);
        obj.zipcode = this.zipcode;
        data.push(obj);

        let dataUser: any = [];
        const objUser: any = {};
        objUser.position_id = this.position;
        objUser.title_id = this.title;
        objUser.fname = this.fname;
        objUser.lname = this.lname;
        if (this.password != '') {
          objUser.password = this.password;
        }
        objUser.email = this.email;
        objUser.telephone = this.phoneNumber;
        dataUser.push(objUser);

        let rs: any = await this.settingService.save(data);
        let rsUser: any = await this.settingService.updateUser(dataUser);

        if (rs.ok && rsUser.ok) {
          this.alertService.success();
          this.getInfo();
          this.getUserInfo();
          this.password = '';
          this.passwordConfirm = '';
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
