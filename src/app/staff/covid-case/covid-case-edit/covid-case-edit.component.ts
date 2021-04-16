import { AutocompleteZipcodeComponent } from './../../../help/autocomplete-address/autocomplete-zipcode/autocomplete-zipcode.component';
import { AutocompleteSubdistrictComponent } from './../../../help/autocomplete-address/autocomplete-subdistrict/autocomplete-subdistrict.component';
import { AutocompleteDistrictComponent } from './../../../help/autocomplete-address/autocomplete-district/autocomplete-district.component';
import { AutocompleteProvinceComponent } from './../../../help/autocomplete-address/autocomplete-province/autocomplete-province.component';
import { AutocompleteCountriesComponent } from './../../../help/autocomplete-countries/autocomplete-countries.component';
import { CovidCaseService } from './../../services/covid-case.service';
import { BasicService } from './../../services/basic.service';
import { AlertService } from './../../../help/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-covid-case-edit',
  templateUrl: './covid-case-edit.component.html',
  styles: []
})
export class CovidCaseEditComponent implements OnInit {

  data: any;
  hn: any;
  personId: any;
  patientId: any;
  cid: any;
  passport: any;
  an: any;
  titleId: any;
  fname: any;
  mname: any;
  lname: any;
  genderId: any;
  birthDate: any;
  tel: any;
  peopleType: any;
  admitDate: any;
  confirmDate: any;
  covidCaseId: any;

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

  titles = [];
  isSave = false;

  errorHN = false;
  errorTitleName = false;
  errorFname = false;
  errorLname = false;
  errorTel = false;
  errorAdmit = false;
  errorGender = false;
  @ViewChild('countries', { static: false }) countries: AutocompleteCountriesComponent;
  @ViewChild('province', { static: false }) province: AutocompleteProvinceComponent;
  @ViewChild('ampur', { static: false }) ampur: AutocompleteDistrictComponent;
  @ViewChild('tambon', { static: false }) tambon: AutocompleteSubdistrictComponent;
  @ViewChild('zipcode', { static: false }) zipc: AutocompleteZipcodeComponent;
  @ViewChild('loading', { static: false }) loading: any;
  myDatePickerOptions: any = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };
  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private basicService: BasicService,
    private covidCaseService: CovidCaseService,
    private router: Router
  ) {
    const params = this.route.snapshot.params;
    this.data = params.data ? JSON.parse(params.data) : null;
    this.covidCaseId = this.data.covid_case_id;
  }

  async ngOnInit() {
    await this.getTitle();
    await this.getInfo();
  }

  async getInfo() {
    try {

      const rs: any = await this.covidCaseService.getCovidCaseInfo(this.data.covid_case_id);
      if (rs.ok) {
        this.hn = rs.rows.hn;
        this.personId = rs.rows.person_id;
        this.patientId = rs.rows.patient_id;
        this.an = rs.rows.an;
        this.cid = rs.rows.cid;
        this.passport = rs.rows.passport;
        this.tel = rs.rows.telephone;
        this.titleId = rs.rows.title_id;
        this.fname = rs.rows.first_name;
        this.mname = rs.rows.middle_name;
        this.lname = rs.rows.last_name;
        this.genderId = rs.rows.gender_id ? rs.rows.gender_id.toString() : null;
        this.peopleType = rs.rows.people_type;
        if (rs.rows.birth_date) {
          this.birthDate = {
            date: {
              year: +moment(rs.rows.birth_date).format('YYYY'),
              month: +moment(rs.rows.birth_date).format('M'),
              day: +moment(rs.rows.birth_date).format('D'),
            }
          };
        }
        if (rs.rows.date_admit) {
          this.admitDate = {
            date: {
              year: +moment(rs.rows.date_admit).format('YYYY'),
              month: +moment(rs.rows.date_admit).format('M'),
              day: +moment(rs.rows.date_admit).format('D'),
            }
          };
        }
        if (rs.rows.confirm_date) {
          this.confirmDate = {
            date: {
              year: +moment(rs.rows.confirm_date).format('YYYY'),
              month: +moment(rs.rows.confirm_date).format('M'),
              day: +moment(rs.rows.confirm_date).format('D'),
            }
          };
        }
        this.province.setQuery(rs.rows.province_name);
        this.ampur.setQuery(rs.rows.ampur_name);
        this.tambon.setQuery(rs.rows.tambon_name);
        this.zipc.setQuery(rs.rows.zipcode);
        this.countries.setQuery(rs.rows.country_name);
        this.provinceId = rs.rows.province_code;
        this.ampurId = rs.rows.ampur_code;
        this.tambonId = rs.rows.tambon_code;
        this.zipcode = rs.rows.zipcode;
        this.countryId = rs.rows.country_code;
        this.houseNo = rs.rows.house_no;
        this.roomNo = rs.rows.room_no;
        this.village = rs.rows.village;
        this.villageName = rs.rows.village_name;
        this.road = rs.rows.road;
      } else {
        this.alertService.error(rs.error);
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

  async onClickSave() {
    this.isSave = true;
    try {
      if (await this.verifyInput()) {
        const obj: any = {
          covidCaseId: this.covidCaseId,
          cid: this.cid,
          passport: this.passport,
          hn: this.hn,
          an: this.an,
          titleId: this.titleId,
          genderId: this.genderId,
          fname: this.fname,
          lname: this.lname,
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
          zipcode: this.zipcode,
          countryCode: this.countryId,
          personId: this.personId,
          patientId: this.patientId
        };

        if (this.confirmDate) {
          obj.confirmDate = `${this.confirmDate.date.year}-${this.confirmDate.date.month}-${this.confirmDate.date.day}`;
        }
        if (this.birthDate) {
          obj.birthDate = `${this.birthDate.date.year}-${this.birthDate.date.month}-${this.birthDate.date.day}`;
        }

        const rs: any = await this.covidCaseService.updateCase(this.covidCaseId, obj);
        if (rs.ok) {
          this.isSave = false;
          this.router.navigate(['/staff/covid-case']);
        } else {
          this.isSave = false;
          this.alertService.error(rs.error);
        }
      } else {
        this.isSave = false;
        this.alertService.error('กรอกข้อมูลไม่ครบ\nกรุณาตรวจสอบข้อมูล');
      }
    } catch (error) {
      this.isSave = false;
      this.alertService.error(error);
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

  async onSelectCountry(e) {
    this.countryId = e.id;
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
