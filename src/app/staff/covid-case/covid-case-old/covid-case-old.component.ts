import { CovidCaseService } from './../../services/covid-case.service';
import { BasicAuthService } from './../../services/basic-auth.service';
import { BasicService } from './../../services/basic.service';
import { AlertService } from './../../../help/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AutocompleteHospitalComponent } from 'src/app/help/autocomplete-hospital/autocomplete-hospital.component';
import { IMyOptions } from 'mydatepicker-th';
import { AutocompleteProvinceComponent } from '../../../help/autocomplete-address/autocomplete-province/autocomplete-province.component';
import { AutocompleteDistrictComponent } from '../../../help/autocomplete-address/autocomplete-district/autocomplete-district.component';
import { AutocompleteSubdistrictComponent } from '../../../help/autocomplete-address/autocomplete-subdistrict/autocomplete-subdistrict.component';
import { AutocompleteZipcodeComponent } from '../../../help/autocomplete-address/autocomplete-zipcode/autocomplete-zipcode.component';
import { AutocompleteCountriesComponent } from 'src/app/help/autocomplete-countries/autocomplete-countries.component';
import * as moment from 'moment';
import thaiIdCard from 'thai-id-card';
import { start } from 'repl';
import { cloneDeep } from 'lodash';
@Component({
  selector: 'app-covid-case-old',
  templateUrl: './covid-case-old.component.html',
  styles: []
})
export class CovidCaseOldComponent implements OnInit {

  isRefer: any;
  typeRegister: any;
  // profile ------
  satCode: any;
  covidCaseId: any;
  personId: any;
  passport = '';
  cid = '';
  hn = '';
  an = '';
  titleId = null;
  fname = '';
  mname = '';
  lname = '';
  genderId: any;
  birthDate: any;
  tel = '';
  peopleType: any = null;

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
  countryId: any = 20;
  zipcode: any;
  countryName: any;

  houseNoCurr: any;
  roomNoCurr: any;
  villageCurr: any;
  villageNameCurr: any;
  roadCurr: any;
  tambonIdCurr: any;
  tambonNameCurr: any;
  ampurIdCurr: any;
  ampurNameCurr: any;
  provinceIdCurr: any;
  provinceNameCurr: any;
  zipcodeCurr: any;

  addNow = false;
  // -------------------

  titles: any = [];

  gcs: any = [];
  gcsId: any;

  beds: any = [];
  bedId: any;

  medicalSupplies: any = [];
  medicalSupplieId: any;

  drugs: any = [];
  drugId: any;

  errorHN = false;
  errorTitleName = false;
  errorFname = false;
  errorLname = false;
  errorTel = false;
  errorAdmit = false;
  errorGender = false;
  isSave = false;
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

  modalCID = false;
  modalCIDType = 'CID';
  modalCidLoading = false;
  isModelSearch = false;

  modalCIDCid: any;
  modalCIDCidError = false;

  modalCIDPassport: any;
  modalDischargeType: any;
  isKey = false;
  hospitalId: any;
  dateDischarge: any;
  minute: any;
  hour: any;
  reason: any;

  hours: any = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  minutes: any = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
    '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
    '30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
    '40', '41', '42', '43', '44', '45', '46', '47', '48', '49',
    '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];
  @ViewChild('hospital', { static: true }) hospitals: AutocompleteHospitalComponent;
  @ViewChild('countries', { static: true }) countries: AutocompleteCountriesComponent;
  @ViewChild('province', { static: true }) province: AutocompleteProvinceComponent;
  @ViewChild('ampur', { static: true }) ampur: AutocompleteDistrictComponent;
  @ViewChild('tambon', { static: true }) tambon: AutocompleteSubdistrictComponent;
  @ViewChild('zipcode', { static: true }) zipc: AutocompleteZipcodeComponent;
  @ViewChild('provinceCurr', { static: true }) provinceCurr: AutocompleteProvinceComponent;
  @ViewChild('ampurCurr', { static: true }) ampurCurr: AutocompleteDistrictComponent;
  @ViewChild('tambonCurr', { static: true }) tambonCurr: AutocompleteSubdistrictComponent;
  @ViewChild('zipcodeCurr', { static: true }) zipcCurr: AutocompleteZipcodeComponent;
  @ViewChild('loading', { static: true }) loading: any;

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
    // this.countries.setQuery('ไทย');
    this.loading.show();
    await this.getTitle();
    await this.getGCS();
    await this.getBeds();
    await this.getMedicalSupplies();
    // console.log(this.data);

    if (this.data) {
      await this.setData();
    }
    this.loading.hide();
    this.modalCID = true;

    // await this.getGenericSet();
    // await this.setDrugs();
  }

  async setData() {

    try {
      this.satCode = this.data.sat_id;
      this.covidCaseId = this.data.covid_case_id;
      this.personId = this.data.id;
      this.hn = this.data.hn;
      this.an = this.data.an;
      this.cid = this.data.cid;
      this.titleId = this.data.title_id;
      this.fname = this.data.first_name;
      this.mname = this.data.middle_name;
      this.lname = this.data.last_name;
      this.genderId = this.data.gender_id.toString();

      if (this.data.birth_date) {
        this.birthDate = {
          date: {
            year: +moment(this.data.birth_date).format('YYYY'),
            month: +moment(this.data.birth_date).format('M'),
            day: +moment(this.data.birth_date).format('D'),
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
      this.tambonId = this.data.tambon_code;
      this.provinceId = this.data.province_code;
      this.tambonName = this.data.tambon_name;
      this.ampurName = this.data.ampur_name;
      this.provinceName = this.data.province_name;
      this.zipcode = this.data.zipcode;
      this.houseNoCurr = this.data.current_house_no || null;
      this.roomNoCurr = this.data.current_room_no || null;
      this.villageCurr = this.data.current_village || null;
      this.villageNameCurr = this.data.current_village_name || null;
      this.roadCurr = this.data.current_road || null;
      this.ampurIdCurr = this.data.current_ampur_code || null;
      this.tambonIdCurr = this.data.current_tambon_code || null;
      this.provinceIdCurr = this.data.current_province_code || null;
      this.zipcodeCurr = this.data.current_zipcode || null;
      this.countryId = this.data.country_code;

      if (this.data.country_name) {
        this.countries.setQuery(this.data.country_name);
        if (this.data.country_name === 'ไทย') {
          this.ampur.setQuery(this.data.ampur_name);
          this.tambon.setQuery(this.data.tambon_name);
          this.province.setQuery(this.data.province_name);
          this.zipc.setQuery(this.data.zipcode);
          const address: any = await this.basicService.getAddCode(this.data.tambon_name, this.data.ampur_name, this.data.province_name, this.data.zipcode);
          this.ampurName = this.data.ampur_name;
          this.tambonName = this.data.tambon_name;
          this.provinceName = this.data.province_name;
          this.ampurId = address.rows[0].ampur_code;
          this.tambonId = address.rows[0].tambon_code;
          this.provinceId = address.rows[0].province_code;
          this.ampurCurr.setQuery(this.data.current_ampur_name || null);
          this.tambonCurr.setQuery(this.data.current_tambon_name || null);
          this.provinceCurr.setQuery(this.data.current_province_name || null);
          this.zipcCurr.setQuery(this.data.current_zipcode || null);
        }
      }
    } catch (error) {
      console.log(error);

    }
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

  async onSelectCountry(e) {
    this.countryId = e.id;
    if (this.countryId === 20) {
      this.setValue();
      this.setValueCurr();
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
    this.isSave = true;
    try {
      let startDate = moment(this.admitDate.date.year + '-' + this.admitDate.date.month + '-' + this.admitDate.date.day, 'YYYY-MM-DD');
      const endDate = moment(this.dateDischarge.date.year + '-' + this.dateDischarge.date.month + '-' + this.dateDischarge.date.day, 'YYYY-MM-DD');
      const rs: any = await this.basicService.getDate();
      console.log(moment(endDate).format('YYYY-MM-DD'), moment(rs.rows).format('YYYY-MM-DD'));
      console.log(moment(endDate).format('YYYY-MM-DD') > moment(rs.rows).format('YYYY-MM-DD'));
      if (moment(endDate).format('YYYY-MM-DD') > moment(rs.rows).format('YYYY-MM-DD')) {
        this.isSave = false;
        this.alertService.error('ไม่อนุญาตให้เลือกวันที่เกินปัจจุบัน');
      } else {
        if (await this.verifyInput()) {
          if (startDate > endDate) {
            this.isSave = false;
            this.alertService.error('ไม่อนุญาตให้วันที่ Admit มากกว่าวันที่ Discharge');
          } else {
            this.isSave = false;
            const dates = [];
            dates.push(moment(startDate).format('YYYY-MM-DD'));
            while (!startDate.isSame(endDate)) {
              startDate = startDate.add(1, 'days');
              dates.push(moment(startDate).format('YYYY-MM-DD'));
            }

            const obj: any = {
              date: dates,
              personId: this.personId,
              type: this.typeRegister,
              cid: this.cid,
              passport: this.passport,
              hn: this.hn,
              an: this.an,
              titleId: this.titleId,
              genderId: this.genderId,
              fname: this.fname,
              mname: this.mname,
              lname: this.lname,
              peopleType: this.peopleType,
              tel: this.tel,
              admitDate: `${this.admitDate.date.year}-${this.admitDate.date.month}-${this.admitDate.date.day}`,
              houseNo: this.houseNo,
              roomNo: this.roomNo,
              village: this.village,
              villageName: this.villageName,
              road: this.road,
              tambonCode: this.tambonId,
              ampurCode: this.ampurId,
              provinceCode: this.provinceId,
              tambon_name: this.tambonName,
              ampur_name: this.ampurName,
              province_name: this.provinceName,
              zipcode: this.zipcode,
              houseNoCurr: this.houseNoCurr,
              roomNoCurr: this.roomNoCurr,
              villageCurr: this.villageCurr,
              villageNameCurr: this.villageNameCurr,
              roadCurr: this.roadCurr,
              tambonCodeCurr: this.tambonIdCurr,
              ampurCodeCurr: this.ampurIdCurr,
              provinceCodeCurr: this.provinceIdCurr,
              zipcodeCurr: this.zipcodeCurr,
              tambonNameCurr: this.tambonNameCurr,
              ampurNameCurr: this.ampurNameCurr,
              provinceNameCurr: this.provinceNameCurr,
              countryId: this.countryId,
            };
            console.log(obj);

            if (this.confirmDate) {
              obj.confirmDate = `${this.confirmDate.date.year}-${this.confirmDate.date.month}-${this.confirmDate.date.day}`;
            }
            if (this.birthDate) {
              obj.birthDate = `${this.birthDate.date.year}-${this.birthDate.date.month}-${this.birthDate.date.day}`;
            }

            let status = null;
            if (this.modalDischargeType === 'HOME') {
              status = 'DISCHARGE';
            } else if (this.modalDischargeType === 'DEATH') {
              status = 'DEATH';
            } else if (this.modalDischargeType === 'REFER') {
              status = 'REFER';
              obj.hospitalId = this.hospitalId;
              obj.reason = this.reason;
            } else if (this.modalDischargeType === 'NEGATIVE') {
              status = 'NEGATIVE';
            }
            if (this.modalDischargeType !== 'REFER') {
              obj.dateDischarge = this.dateDischarge.date.year + '-' + this.dateDischarge.date.month + '-' + this.dateDischarge.date.day + ' ' + this.hour + ':' + this.minute + ':00';
            }
            obj.status = status;

            const rs: any = await this.covidCaseService.saveOldCase(obj);
            if (rs.ok) {
              this.clear();
              this.isKey = false;
              this.isSave = false;
              this.alertService.success();
              this.onClickOpenModalCid();
            } else {
              this.isSave = false;
              this.alertService.error(rs.error);
            }
          }
        } else {
          this.isSave = false;
          this.alertService.error('กรอกข้อมูลไม่ครบ\nกรุณาตรวจสอบข้อมูล');
        }
      }
    } catch (error) {
      this.isSave = false;
      this.alertService.error(error);
    }
  }

  clear() {
    try {
      this.cid = null;
      this.passport = null;
      this.an = '';
      this.hn = '';
      this.fname = '';
      this.mname = '';
      this.lname = '';
      this.tel = '';
      this.peopleType = null;
      this.genderId = null;
      this.titleId = null;
      this.admitDate = null;
      this.confirmDate = null;
      this.birthDate = null;
      this.gcsId = null;
      this.bedId = null;
      this.medicalSupplieId = null;
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
      this.houseNoCurr = '';
      this.roomNoCurr = '';
      this.villageCurr = '';
      this.villageNameCurr = '';
      this.roadCurr = '';
      this.tambonIdCurr = null;
      this.ampurIdCurr = null;
      this.provinceIdCurr = null;
      this.tambonName = '';
      this.ampurName = '';
      this.provinceName = '';
      this.tambonNameCurr = '';
      this.ampurNameCurr = '';
      this.provinceNameCurr = '';
      this.countryId = 20;
      this.modalCIDCid = '';
      this.modalCIDPassport = '';
      this.modalCIDType = 'CID';
      this.tambon.setQuery('');
      this.ampur.setQuery('');
      this.province.setQuery('');
      this.zipc.setQuery('');
      this.tambonCurr.setQuery('');
      this.ampurCurr.setQuery('');
      this.provinceCurr.setQuery('');
      this.zipcCurr.setQuery('');
      this.countries.setQuery('ไทย');
      this.drugDay = null;
    } catch (error) {
      console.log(error);
    }
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

  onSelectProvinceCurr(e) {
    this.tambonIdCurr = e.tambon_code;
    this.tambonNameCurr = e.tambon_name;
    this.ampurIdCurr = e.ampur_code;
    this.ampurNameCurr = e.ampur_name;
    this.provinceIdCurr = e.province_code;
    this.provinceNameCurr = e.province_name;
    this.zipcodeCurr = e.zip_code;
    this.setValueCurr();
  }

  onSelectAmpurCurr(e) {
    this.tambonIdCurr = e.tambon_code;
    this.tambonNameCurr = e.tambon_name;
    this.ampurIdCurr = e.ampur_code;
    this.ampurNameCurr = e.ampur_name;
    this.provinceIdCurr = e.province_code;
    this.provinceNameCurr = e.province_name;
    this.zipcodeCurr = e.zip_code;
    this.setValueCurr();
  }

  onSelectTambonCurr(e) {
    this.tambonIdCurr = e.tambon_code;
    this.tambonNameCurr = e.tambon_name;
    this.ampurIdCurr = e.ampur_code;
    this.ampurNameCurr = e.ampur_name;
    this.provinceIdCurr = e.province_code;
    this.provinceNameCurr = e.province_name;
    this.zipcodeCurr = e.zip_code;
    this.setValueCurr();
  }

  onSelectZipcodeCurr(e) {
    this.tambonIdCurr = e.tambon_code;
    this.tambonNameCurr = e.tambon_name;
    this.ampurIdCurr = e.ampur_code;
    this.ampurNameCurr = e.ampur_name;
    this.provinceIdCurr = e.province_code;
    this.provinceNameCurr = e.province_name;
    this.zipcodeCurr = e.zip_code;
    this.setValueCurr();
  }

  setValueCurr() {
    this.provinceCurr.setQuery(this.provinceNameCurr);
    this.ampurCurr.setQuery(this.ampurNameCurr);
    this.tambonCurr.setQuery(this.tambonNameCurr);
    this.zipcCurr.setQuery(this.zipcodeCurr);
  }

  checkAddNow() {
    if (this.addNow) {
      this.houseNoCurr = cloneDeep(this.houseNo);
      this.roomNoCurr = cloneDeep(this.roomNo);
      this.villageCurr = cloneDeep(this.village);
      this.villageNameCurr = cloneDeep(this.villageName);
      this.roadCurr = cloneDeep(this.road);
      this.tambonIdCurr = cloneDeep(this.tambonId);
      this.tambonNameCurr = cloneDeep(this.tambonName);
      this.ampurIdCurr = cloneDeep(this.ampurId);
      this.ampurNameCurr = cloneDeep(this.ampurName);
      this.provinceIdCurr = cloneDeep(this.provinceId);
      this.provinceNameCurr = cloneDeep(this.provinceName);
      this.zipcodeCurr = cloneDeep(this.zipcode);
      this.setValueCurr();
    } else {
      this.houseNoCurr = '';
      this.roomNoCurr = '';
      this.villageCurr = '';
      this.villageNameCurr = '';
      this.roadCurr = '';
      this.tambonIdCurr = null;
      this.ampurIdCurr = null;
      this.provinceIdCurr = null;
      this.tambonCurr.setQuery('');
      this.ampurCurr.setQuery('');
      this.provinceCurr.setQuery('');
      this.zipcCurr.setQuery('');
    }
  }

  uncheckRadio(type, id) {
    if ('GCS' === type && this.gcsId === id) {
      this.gcsId = null;
    } else if ('BED' === type && this.bedId === id) {
      this.bedId = null;
    } else if ('MEDSUP' === type && this.medicalSupplieId === id) {
      this.medicalSupplieId = null;

    } else if ('S1' === type && this.s1 === id) {
      this.s1 = null;
    } else if ('S2' === type && this.s2 === id) {
      this.s2 = null;
    } else if ('S3' === type && this.s3 === id) {
      this.s3 = null;
    } else if ('S4' === type && this.s4 === id) {
      this.s4 = null;
    }


  }

  async onSearchModal() {
    try {
      this.isModelSearch = true;
      this.modalCIDCidError = !thaiIdCard.verify(this.modalCIDCid);
      if (this.modalCIDType !== 'NO') {
        if ((!this.modalCIDCidError && this.modalCIDType === 'CID') || this.modalCIDType === 'PASSPORT') {
          const rs: any = await this.covidCaseService.checkNo(this.modalCIDType, this.modalCIDCid, this.modalCIDPassport);
          if (rs.ok) {
            if (rs.case === 'NEW') {
              if (this.modalCIDType === 'CID') {
                this.typeRegister = 'CID';
                await this.getInfo(this.modalCIDCid);
                this.cid = this.modalCIDCid;
              } else if (this.modalCIDType === 'PASSPORT') {
                this.typeRegister = 'PASSPORT';
                this.passport = this.modalCIDPassport;
              }
              this.isKey = true;
              this.modalCID = false;
            } else if (rs.case === 'REFER') {
              this.typeRegister = 'REFER';
              // const confirm = await this.alertService.confirm(`คุณรับผู้ป่วย Refer มาจาก ${rs.rows.hospname} ใช่หรือไม่ ?`);
              // if (confirm) {
              // }
              this.isKey = true;
              this.modalCID = false;
              this.data = rs.rows;
              this.setData();
            }
          } else {
            this.alertService.error(rs.error);
          }
        }
      } else {
        this.isKey = true;
        this.modalCID = false;
      }
      this.isModelSearch = false;
    } catch (error) {
      this.isModelSearch = false;
      this.alertService.error(error);
    }
  }

  onClickOpenModalCid() {
    this.modalCID = true;
  }

  async getInfo(key) {
    this.loading.show();
    try {
      const rs: any = await this.covidCaseService.infoCidByKey(key, this.peopleType);
      if (rs.ok) {
        this.data = rs.rows;
        await this.setData();
        this.loading.hide();
      }
      this.loading.hide();
    } catch (error) {
      this.loading.hide();
      this.alertService.error(error);
    }
  }


  onSelectHosp(e) {
    this.hospitalId = e.id;
  }
}
