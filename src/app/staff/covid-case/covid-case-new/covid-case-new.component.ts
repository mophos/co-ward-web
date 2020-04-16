import { CovidCaseService } from './../../services/covid-case.service';
import { BasicAuthService } from './../../services/basic-auth.service';
import { BasicService } from './../../services/basic.service';
import { AlertService } from './../../../help/alert.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AutocompleteHospitalComponent } from 'src/app/help/autocomplete-hospital/autocomplete-hospital.component';
import { IMyOptions } from 'mydatepicker-th';
import { AutocompleteProvinceComponent } from '../../../help/autocomplete-address/autocomplete-province/autocomplete-province.component';
import { AutocompleteDistrictComponent } from '../../../help/autocomplete-address/autocomplete-district/autocomplete-district.component';
import { AutocompleteSubdistrictComponent } from '../../../help/autocomplete-address/autocomplete-subdistrict/autocomplete-subdistrict.component';
import { AutocompleteZipcodeComponent } from '../../../help/autocomplete-address/autocomplete-zipcode/autocomplete-zipcode.component';
import * as moment from 'moment';

@Component({
  selector: 'app-covid-case-new',
  templateUrl: './covid-case-new.component.html',
  styles: []
})
export class CovidCaseNewComponent implements OnInit {

  isRefer: any;
  typeRegister: any;
  // profile ----------------
  passport = '';
  cid = '';
  hn = '';
  an = '';
  titleId = null;
  fname = '';
  lname = '';
  genderId: any;
  birthDate: any;
  tel = '';
  peopleType: any;

  admitDate: any;
  confirmDate: any;
  // address ----------------
  houseNo: any;
  roomNo: any;
  village: any;
  villageName: any;
  road: any;
  tambonId: any;
  tambonName: any;
  ampurId: any;
  ampurName: any;
  provinceId: any;
  provinceName: any;
  zipcode: any;
  countryId: any;
  countryName: any;
  // -------------------

  titles: any = [];


  gcs: any = [];
  gcsId: any;

  beds: any = [];
  bedId: any;

  medicalSupplies: any = [];
  respiratorId: any;

  drugs: any = [];
  drugId: any;

  errorHN = false;
  errorTitleName = false;
  errorFname = false;
  errorLname = false;
  errorTel = false;
  errorAdmit = false;
  errorGender = false;
  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false,
    height: '25px'
  };


  s1 = '';
  s2 = '';
  s3 = '';
  s4 = '';
  data: any;
  drugDay = '5';
  @ViewChild('hospital') hospitals: AutocompleteHospitalComponent;

  @ViewChild('province') province: AutocompleteProvinceComponent;
  @ViewChild('ampur') ampur: AutocompleteDistrictComponent;
  @ViewChild('tambon') tambon: AutocompleteSubdistrictComponent;
  @ViewChild('zipcode') zipc: AutocompleteZipcodeComponent;

  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private basicService: BasicService,
    private basicAuthService: BasicAuthService,
    private covidCaseService: CovidCaseService
  ) {
    const params = this.route.snapshot.params;
    this.isRefer = params.isRefer;
    this.typeRegister = params.type;
    this.cid = params.cid;
    this.passport = params.passport;
    this.data = params.data ? JSON.parse(params.data) : null;
  }

  async ngOnInit() {
    await this.getTitle();
    await this.getGCS();
    await this.getBeds();
    await this.getMedicalSupplies();
    await this.setData();

    // await this.getGenericSet();
    // await this.setDrugs();
  }

  setData() {
    this.hn = this.data.hn;
    this.an = this.data.an;
    this.titleId = this.data.title_id;
    this.fname = this.data.first_name;
    this.lname = this.data.last_name;
    this.genderId = this.data.gender_id;
    console.log(this.data.birth_date);

    if (this.data.birth_date) {
      this.birthDate = {
        date: {
          year: moment(this.data.birth_date).format('YYYY'),
          month: moment(this.data.birth_date).format('MM'),
          day: moment(this.data.birth_date).format('DD'),
        }
      };
    }
    this.tel = this.data.telephone;
    this.peopleType = this.data.people_type;

    this.houseNo = this.data.house_no;
    this.roomNo = this.data.room_no;
    this.village = this.data.village;
    this.villageName = this.data.village_name;
    this.road = this.data.road;
    this.ampurId = this.data.ampur_code;
    this.tambonId  = this.data.tambon_code;
    this.provinceId  = this.data.province_code;
    this.zipcode =   this.data.zipcode;
    this.ampur.setQuery(this.data.ampur_name);
    this.tambon.setQuery(this.data.tambon_name);
    this.province.setQuery(this.data.province_name);
    this.zipc.setQuery(this.data.zipcode);
  }

  async getTitle() {
    try {
      const rs: any = await this.basicService.getTitle();
      if (rs.ok) {
        this.titles = rs.rows;
      } else {
        this.alertService.serverError();
      }
    } catch (error) {
      console.log(error);
      this.alertService.serverError();
    }
  }
  async getGenericSet() {
    try {
      const rs: any = await this.basicAuthService.getGenericSet('DRUG');
      if (rs.ok) {
        this.drugs = rs.rows;
      } else {
        this.alertService.serverError();
      }
    } catch (error) {
      console.log(error);
      this.alertService.serverError();
    }
  }

  async getGCS() {
    try {
      const rs: any = await this.basicAuthService.getGCS();
      if (rs.ok) {
        this.gcs = rs.rows;
      } else {
        this.alertService.serverError();
      }
    } catch (error) {
      console.log(error);
      this.alertService.serverError();
    }
  }

  async getBeds() {
    try {
      const rs: any = await this.basicAuthService.getBeds();
      if (rs.ok) {
        this.beds = rs.rows;
      } else {
        this.alertService.serverError();
      }
    } catch (error) {
      console.log(error);
      this.alertService.serverError();
    }
  }

  async getMedicalSupplies() {
    try {
      const rs: any = await this.basicAuthService.getMedicalSupplies();
      if (rs.ok) {
        this.medicalSupplies = rs.rows;
      } else {
        this.alertService.serverError();
      }
    } catch (error) {
      console.log(error);
      this.alertService.serverError();
    }
  }


  clearError() {
    this.errorHN = false;
    this.errorTitleName = false;
    this.errorFname = false;
    this.errorLname = false;
    this.errorTel = false;
    this.errorAdmit = false;
    this.errorGender = false;
  }

  verifyInput() {
    try {
      this.clearError();

      if (!this.hn.length) {
        this.errorHN = true;
      }


      if (!this.titleId) {
        this.errorTitleName = true;
      }

      if (!this.fname.length) {
        this.errorFname = true;
      }

      if (!this.lname.length) {
        this.errorLname = true;
      }

      if (!this.genderId) {
        this.errorGender = true;
      }
      if (!this.admitDate) {
        this.errorAdmit = true;
      }

      if (
        this.errorGender ||
        this.errorHN ||
        this.errorTitleName ||
        this.errorFname ||
        this.errorLname ||
        this.errorTel ||
        this.errorAdmit) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async onClickSave() {
    try {

      if (await this.verifyInput()) {
        const drugs = [];
        if (+this.s1 === 1) {
          drugs.push({ genericId: 1 });
        } else if (+this.s1 === 2) {
          drugs.push({ genericId: 2 });
        }

        if (+this.s2 === 1) {
          drugs.push({ genericId: 3 });
          drugs.push({ genericId: 5 });
        } else if (+this.s2 === 2) {
          drugs.push({ genericId: 4 });
          drugs.push({ genericId: 6 });
        }

        if (+this.s3 === 1) {
          drugs.push({ genericId: 7 });
        }

        if (+this.s4 === 1) {
          drugs.push({ genericId: 7 });
        }

        const obj = {
          type: this.typeRegister,
          cid: this.cid,
          passport: this.passport,
          hn: this.hn,
          an: this.an,
          titleId: this.titleId,
          fname: this.fname,
          lname: this.lname,
          tel: this.tel,
          birthDate: `${this.birthDate.date.year}-${this.birthDate.date.month}-${this.birthDate.date.day}`,
          admitDate: `${this.admitDate.date.year}-${this.admitDate.date.month}-${this.admitDate.date.day}`,
          confirmDate: `${this.confirmDate.date.year}-${this.confirmDate.date.month}-${this.confirmDate.date.day}`,
          gcsId: this.gcsId,
          bedId: this.bedId,
          ventilatorId: this.ventilatorId,
          houseNo: this.houseNo,
          roomNo: this.roomNo,
          village: this.village,
          villageName: this.villageName,
          road: this.road,
          tambonCode: this.tambonId,
          ampurCode: this.ampurId,
          provinceCode: this.provinceId,
          zipcode: this.zipcode,
          countryId: this.countryId,
          drugs
        };

        const rs: any = await this.covidCaseService.saveNewCase(obj);
        if (rs.ok) {
          this.alertService.success();
          this.clear();
        } else {
          this.alertService.error(rs.error);
        }
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  clear() {
    this.hn = '';
    this.fname = '';
    this.lname = '';
    this.tel = '';
    this.admitDate = null;
    this.confirmDate = null;
    this.birthDate = null;
    this.gcsId = null;
    this.bedId = null;
    this.ventilatorId = null;
    this.s1 = null;
    this.s2 = null;
    this.s3 = null;
    this.s4 = null;
    this.houseNo = '';
    this.roomNo = '';
    this.village = '';
    this.villageName = '';
    this.road = '';
    this.tambonId = null;
    this.ampurId = null;
    this.provinceId = null;
    this.tambon.setQuery('');
    this.ampur.setQuery('');
    this.province.setQuery('');
    this.drugDay = null;
  }

  onSelectProvince(e) {
    this.tambonId = e.tambon_code;
    this.tambonName = e.tambon_name;
    this.ampurId = e.ampur_code;
    this.ampurName = e.ampur_name;
    this.provinceId = e.province_id;
    this.provinceName = e.province_name;
    this.zipcode = e.zip_code;
    this.setValue();
  }

  onSelectAmpur(e) {
    this.tambonId = e.tambon_code;
    this.tambonName = e.tambon_name;
    this.ampurId = e.ampur_code;
    this.ampurName = e.ampur_name;
    this.provinceId = e.province_id;
    this.provinceName = e.province_name;
    this.zipcode = e.zip_code;
    this.setValue();
  }

  onSelectTambon(e) {
    this.tambonId = e.tambon_code;
    this.tambonName = e.tambon_name;
    this.ampurId = e.ampur_code;
    this.ampurName = e.ampur_name;
    this.provinceId = e.province_id;
    this.provinceName = e.province_name;
    this.zipcode = e.zip_code;
    this.setValue();
  }

  onSelectZipcode(e) {
    this.tambonId = e.tambon_code;
    this.tambonName = e.tambon_name;
    this.ampurId = e.ampur_code;
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
