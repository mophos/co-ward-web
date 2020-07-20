import { CovidCaseService } from './../../services/covid-case.service';
import { BasicAuthService } from './../../services/basic-auth.service';
import { BasicService } from './../../services/basic.service';
import { AlertService } from './../../../help/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AutocompleteHospitalComponent } from 'src/app/help/autocomplete-hospital/autocomplete-hospital.component';
import { IMyOptions } from 'mydatepicker-th';
import { findIndex, cloneDeep, filter } from 'lodash';
import { AutocompleteProvinceComponent } from '../../../help/autocomplete-address/autocomplete-province/autocomplete-province.component';
import { AutocompleteDistrictComponent } from '../../../help/autocomplete-address/autocomplete-district/autocomplete-district.component';
import { AutocompleteSubdistrictComponent } from '../../../help/autocomplete-address/autocomplete-subdistrict/autocomplete-subdistrict.component';
import { AutocompleteZipcodeComponent } from '../../../help/autocomplete-address/autocomplete-zipcode/autocomplete-zipcode.component';
import { AutocompleteCountriesComponent } from 'src/app/help/autocomplete-countries/autocomplete-countries.component';
import * as moment from 'moment';
import thaiIdCard from 'thai-id-card';
import { AutocompleteIcd10Component } from 'src/app/help/autocomplete-icd10/autocomplete-icd10.component';
@Component({
  selector: 'app-covid-case-new',
  templateUrl: './covid-case-new.component.html',
  styles: []
})
export class CovidCaseNewComponent implements OnInit {

  isRefer: any;
  typeRegister: any;
  // profile ----------------
  personId: any;
  covidCaseId: any;
  satCode: any;
  passport = '';
  cid = '';
  cidTemp = '';
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
  peopleCaseType: any = null;
  provinceType: any;
  caseStatus: any;
  icdCodes: any = [];

  admitDate: any;
  diffDate: any;
  admitDetail: any = [];
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
  errorBirthDate = false;
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
  returnFromAbroad: any;
  s1 = [{ generic: 1, name: 'Hydroxychloroquine 200 mg.' }, { generic: 2, name: 'Chloroquine 250 mg.' }];
  s2 = [{ generic: 3, name: 'Darunavir 600mg+Ritonavir100 mg.' }, { generic: 4, name: 'Lopinavir 200 mg/Ritonavir 50 mg.' }];
  s3 = [{ generic: 7, name: 'Azithromycin 250 mg.' }];
  s4 = [{ generic: 8, name: 'Favipiravir (เบิกจาก AntiDote) <a target="_BLANK" href="http://drug.nhso.go.th/Antidotes/index.jsp">คลิก</a>' }];
  data: any;
  drugDay = '5';

  modalCID = false;
  modalCIDType = 'CID';
  modalCidLoading = false;
  isModelSearch = false;

  modalCIDCid: any;
  modalCIDCidError = false;

  modalCIDPassport: any;
  isKey = true;
  hide = true;
  @ViewChild('hospital') hospitals: AutocompleteHospitalComponent;
  @ViewChild('icd') icd: AutocompleteIcd10Component;
  @ViewChild('countries') countries: AutocompleteCountriesComponent;
  @ViewChild('province') province: AutocompleteProvinceComponent;
  @ViewChild('ampur') ampur: AutocompleteDistrictComponent;
  @ViewChild('tambon') tambon: AutocompleteSubdistrictComponent;
  @ViewChild('zipcode') zipc: AutocompleteZipcodeComponent;
  @ViewChild('provinceCurr') provinceCurr: AutocompleteProvinceComponent;
  @ViewChild('ampurCurr') ampurCurr: AutocompleteDistrictComponent;
  @ViewChild('tambonCurr') tambonCurr: AutocompleteSubdistrictComponent;
  @ViewChild('zipcodeCurr') zipcCurr: AutocompleteZipcodeComponent;
  @ViewChild('loading') loading: any;
  icdName: any;
  icdCode: any = null;
  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private basicService: BasicService,
    private basicAuthService: BasicAuthService,
    private covidCaseService: CovidCaseService,
    private router: Router
  ) {
    const params = this.route.snapshot.params;
    this.isRefer = params.isRefer;
    this.provinceType = params.province;
    this.caseStatus = params.caseStatus;
    this.peopleCaseType = params.peopleType;
    this.typeRegister = params.typeRegister;
    this.cid = params.cid;
    this.cidTemp = params.cid;
    this.passport = params.passport;
    this.data = params.data ? JSON.parse(params.data) : null;
  }

  async ngOnInit() {
    // this.loading.show();

    if (this.provinceType === 'IN') {
      this.hide = false;
    }
    await this.getTitle();
    await this.getGCS();
    await this.getBeds();
    await this.getMedicalSupplies();

    if (this.peopleCaseType === 'THAI') {
      this.infoCid(this.cid);
    }
    // if (this.data.cid) {
    //   await this.setData();
    // }
    this.loading.hide();
    // this.modalCID = true;
  }

  onSelectIcdCode(e) {
    this.icdCode = e.code;
  }

  async setData() {

    try {
      this.satCode = this.data.sat_id;
      this.covidCaseId = this.data.covid_case_id;
      this.personId = this.data.id;
      this.cid = this.data.cid;
      this.hn = this.data.hn;
      this.an = this.data.an;
      this.titleId = this.data.title_id;
      this.fname = this.data.first_name;
      this.mname = this.data.middle_name;
      this.lname = this.data.last_name;
      if (this.data.gender_id != null) {
        this.genderId = this.data.gender_id.toString();
      }

      if (this.data.birth_date === 'empty') {
        this.data.birth_date = null;
      } else {
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
        if (this.caseStatus === 'OBSERVE') {
          this.gcs = filter(rs.rows, { name: 'Observe (Hospital Q)' });
        } else if (this.caseStatus === 'IPPUI') {
          this.gcs = filter(rs.rows, { name: 'IP PUI' });
        } else {
          this.gcs = rs.rows;
        }
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
        // if (this.caseStatus === 'OBSERVE') {
        //   this.beds = filter(rs.rows, { name: 'Hospital Q' });
        // } else {
        // }
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
        this.medicalSupplies.push({ id: null, name: 'ไม่ใช้งาน' });
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
    this.errorBirthDate = false;
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
      // console.log(this.birthDate);
      // if (this.birthDate == undefined || this.birthDate == null) {
      //   this.errorBirthDate = true;
      // }
      // if (!moment(this.birthDate.date).isValid()) {
      //   this.errorBirthDate = true;
      // }

      if (
        this.errorGender ||
        this.errorHN ||
        this.errorTitleName ||
        this.errorFname ||
        this.errorLname ||
        this.errorTel ||
        this.errorAdmit ||
        this.errorBirthDate) {
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
    let positive = false;
    let checkNull = false;
    for (const v of this.admitDetail) {
      if (v.gcs_id === null || v.bed_id === null) {
        checkNull = true;
      }
      if (v.gcs_id !== 5) {
        positive = true;
      }
    }
    if (!checkNull) {
      if (this.diffDate < 0) {
        this.alertService.error('ไม่อนุญาตให้คีย์ Admit ล่วงหน้า');
      } else {
        this.isSave = true;
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
            }

            if (+this.s3 === 1) {
              drugs.push({ genericId: 7 });
            }

            if (+this.s4 === 1) {
              drugs.push({ genericId: 7 });
            }

            const obj: any = {
              covidCaseId: this.covidCaseId,
              type: this.typeRegister,
              cid: this.cid || this.cidTemp,
              personId: this.personId,
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
              // gcsId: this.gcsId,
              // bedId: this.bedId,
              // medicalSupplieId: this.medicalSupplieId,
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
              tambonNameCurr: this.tambonNameCurr,
              ampurNameCurr: this.ampurNameCurr,
              provinceNameCurr: this.provinceNameCurr,
              zipcodeCurr: this.zipcodeCurr,
              countryId: this.countryId,
              detail: this.admitDetail,
              returnFromAbroad: this.returnFromAbroad,
              icdCode: this.icdCode,
              icdName: this.icdName,
              caseStatus: this.caseStatus,
              icdCodes: this.icdCodes
              // drugs
            };
            console.log(obj);
            

            if (this.confirmDate) {
              obj.confirmDate = `${this.confirmDate.date.year}-${this.confirmDate.date.month}-${this.confirmDate.date.day}`;
            }
            if (this.birthDate) {
              obj.birthDate = `${this.birthDate.date.year}-${this.birthDate.date.month}-${this.birthDate.date.day}`;
            }

            if (positive) {
              let titleName: any;
              const idx = findIndex(this.titles, { id: +this.titleId });
              if (idx > -1) {
                titleName = await this.titles[idx].name;
              }
              const alert = this.caseStatus === 'OBSERVE' ? titleName + ' ' + this.fname + ' ' + this.lname + ' เป็นผู้ป่วยกลับจากต่างประเภท กักตัว 14 วัน' : titleName + ' ' + this.fname + ' ' + this.lname + ' เป็นผู้ป่วยยืนยัน และมีผลแล็บ covid-19 positive แล้ว';
              const confirm = await this.alertService.confirm(alert);
            //   if (confirm) {
            //     const rs: any = await this.covidCaseService.saveNewCase(obj);
            //     if (rs.ok) {
            //       this.clear();
            //       this.isKey = false;
            //       this.isSave = false;
            //       this.alertService.success();
            //       this.router.navigate(['/staff/covid-case-new-v2']);
            //     } else {
            //       this.isSave = false;
            //       this.alertService.error(rs.error);
            //     }
            //   } else {
            //     this.isSave = false;
            //   }
            // } else {
            //   const rs: any = await this.covidCaseService.saveNewCase(obj);
            //   if (rs.ok) {
            //     this.clear();
            //     this.isKey = false;
            //     this.isSave = false;
            //     this.alertService.success();
            //     this.router.navigate(['/staff/covid-case-new-v2']);
            //   } else {
            //     this.isSave = false;
            //     this.alertService.error(rs.error);
            //   }
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
    } else {
      this.alertService.error('กรุณาเลือกระดับความรุนแรงและเตียงผู้ป่วย');
    }
  }

  clear() {
    try {
      this.modalCIDCidError = false;
      this.cid = null;
      this.passport = null;
      this.personId = null;
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
      this.countryId = 20;
      this.modalCIDCid = '';
      this.modalCIDPassport = '';
      this.modalCIDType = 'CID';
      this.tambonName = '';
      this.ampurName = '';
      this.provinceName = '';
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
      this.personId = null;
      this.covidCaseId = null;
      this.typeRegister = null;
      this.admitDetail = [];
      this.returnFromAbroad = null;
      this.icdCode = null;
      this.icdName = null;
    } catch (error) {
      console.log(error);
    }
  }

  onSelectProvince(e) {
    this.tambonId = e.tambon_code;
    this.tambonName = e.tambon_name;
    this.ampurId = e.ampur_code;
    this.ampurName = e.ampur_name;
    this.provinceId = e.province_code;
    this.provinceName = e.province_name;
    this.zipcode = e.zip_code;
    this.setValue();
  }

  onSelectAmpur(e) {
    this.tambonId = e.tambon_code;
    this.tambonName = e.tambon_name;
    this.ampurId = e.ampur_code;
    this.ampurName = e.ampur_name;
    this.provinceId = e.province_code;
    this.provinceName = e.province_name;
    this.zipcode = e.zip_code;
    this.setValue();
  }

  onSelectTambon(e) {
    this.tambonId = e.tambon_code;
    this.tambonName = e.tambon_name;
    this.ampurId = e.ampur_code;
    this.ampurName = e.ampur_name;
    this.provinceId = e.province_code;
    this.provinceName = e.province_name;
    this.zipcode = e.zip_code;
    this.setValue();
  }

  onSelectZipcode(e) {
    this.tambonId = e.tambon_code;
    this.tambonName = e.tambon_name;
    this.ampurId = e.ampur_code;
    this.ampurName = e.ampur_name;
    this.provinceId = e.province_code;
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

  uncheckRadioReturn() {
    if (this.returnFromAbroad === 'other' || this.returnFromAbroad === 'covid') {
      this.returnFromAbroad = null;
    }
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

  addIcd() {
    if (this.icdCode !== null) {
      this.icdCodes.push(this.icdCode);
      this.icd.setQuery('');
      this.icdCode = null;
    }
  }

  removeIcd(idx) {
    this.icdCodes.splice(idx, 1);
  }

  // uncheckRadio(type, id) {
  //   if ('GCS' === type && this.gcsId === id) {
  //     this.gcsId = null;
  //   } else if ('BED' === type && this.bedId === id) {
  //     this.bedId = null;
  //   } else if ('MEDSUP' === type && this.medicalSupplieId === id) {
  //     this.medicalSupplieId = null;

  //   } else if ('S1' === type && this.s1 === id) {
  //     this.s1 = null;
  //   } else if ('S2' === type && this.s2 === id) {
  //     this.s2 = null;
  //   } else if ('S3' === type && this.s3 === id) {
  //     this.s3 = null;
  //   } else if ('S4' === type && this.s4 === id) {
  //     this.s4 = null;
  //   }


  // }

  // async onSearchModal() {
  //   try {
  //     this.isModelSearch = true;
  //     this.modalCIDCidError = !thaiIdCard.verify(this.modalCIDCid);
  //     if (this.modalCIDType !== 'NO') {
  //       if ((!this.modalCIDCidError && this.modalCIDType === 'CID') || this.modalCIDType === 'PASSPORT') {
  //         const rs: any = await this.covidCaseService.checkNo(this.modalCIDType, this.modalCIDCid, this.modalCIDPassport);
  //         if (rs.ok) {
  //           if (rs.case === 'NEW') {
  //             if (this.modalCIDType === 'CID') {
  //               this.typeRegister = 'CID';
  //               await this.infoCid(this.modalCIDCid);
  //               this.cid = this.modalCIDCid;
  //             } else if (this.modalCIDType === 'PASSPORT') {
  //               this.typeRegister = 'PASSPORT';
  //               this.passport = this.modalCIDPassport;
  //             }
  //             this.isKey = true;
  //             this.modalCID = false;
  //           } else if (rs.case === 'REFER') {
  //             this.typeRegister = 'REFER';
  //             const confirm = await this.alertService.confirm(`คุณรับผู้ป่วย Refer มาจาก ${rs.rows.hospname} ใช่หรือไม่ ?`);
  //             if (confirm) {
  //               this.isKey = true;
  //               this.modalCID = false;
  //               this.data = rs.rows;
  //               this.setData();
  //             }
  //           }
  //         } else {
  //           this.alertService.error(rs.error);
  //         }
  //       }
  //     } else {
  //       this.isKey = true;
  //       this.modalCID = false;
  //     }
  //     this.isModelSearch = false;
  //   } catch (error) {
  //     this.isModelSearch = false;
  //     this.alertService.error(error);
  //   }
  // }

  onClickOpenModalCid() {
    this.modalCID = true;
  }

  async infoCid(cid) {
    this.loading.show();
    try {
      const rs: any = await this.covidCaseService.infoCid(cid);
      console.log(rs);
      
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

  async dateAdmit(e) {
    if (e) {
      this.admitDate = e;
      this.admitDetail = [];
      const rs: any = await this.basicService.getDate();
      const aDate: any = this.admitDate.date.year + '-' + this.admitDate.date.month + '-' + this.admitDate.date.day;
      if (moment(aDate, 'YYYY-M-D').isSameOrAfter(moment(rs.rows, 'YYYY-MM-DD HH:mm:ss'))) {
        this.admitDate = {
          date: {
            year: +moment().format('YYYY'),
            month: +moment().format('M'),
            day: +moment().format('D'),
          }
        };
        this.alertService.error('ไม่อนุญาตให้เลือกวันที่เกินปัจจุบัน');
      } else {
        try {
          this.diffDate = moment(moment(rs.rows).format('YYYY-MM-DD')).diff(moment(aDate), 'days');
          let startDate = moment(aDate, 'YYYY-MM-DD');
          let id = 1;
          while (!startDate.isSame(moment(rs.rows).add(1, 'days').format('YYYY-MM-DD'))) {
            const obj: any = {};
            obj.date = startDate.format('YYYY-MM-DD');
            obj.id = id;
            if (this.caseStatus === 'IPPUI') {
              obj.gcs_id = 5;
            } else if (this.caseStatus === 'OBSERVE') {
              obj.gcs_id = 6;
            } else {
              obj.gcs_id = null;
            }
            if (this.caseStatus === 'OBSERVE') {
              obj.bed_id = 6;
            } else {
              obj.bed_id = null;
            }
            obj.medical_supplie_id = null;

            obj.drugs = [];
            startDate = startDate.add(1, 'days');
            this.admitDetail.push(obj);
            id++;
          }
        } catch (error) {
          this.alertService.error(error);
        }
      }
    }
  }

  uncheckRadioMedicalSupplies(listId, ms) {
    const idx = findIndex(this.admitDetail, { id: listId });
    if (idx > -1) {
      this.admitDetail[idx].medical_supplie_id = this.admitDetail[idx].medical_supplie_id === ms ? null : ms;
    }
  }

  uncheckRadio(listId, generic, type = '') {
    const idx: any = findIndex(this.admitDetail[listId - 1].drugs, { set: type });
    if (idx > -1) {
      this.admitDetail[listId - 1].drugs.splice(idx, 1);
    }
    this.admitDetail[listId - 1].drugs.push({ set: type, generic_id: generic });
  }

  async checkGcs(i, l) {
    if (i.id === 5 && l.medical_supplie_id !== null) {
      const idx = findIndex(this.medicalSupplies, { id: l.medical_supplie_id });
      let name: any;
      if (idx > -1) {
        name = await this.medicalSupplies[idx].name;
      }
      const confirm = await this.alertService.confirm('ความรุนแรงของผู้ป่วยเป็น IP PUI และใช้เครื่องช่วยหายใจ แบบ ' + name + ' ใช่หรือไม่');
      if (confirm) {
      } else {
        l.gcs_id = null;
      }
    } else if (i.id === 1 && l.medical_supplie_id === null) {
      const confirm = await this.alertService.confirm('ความรุนแรงของผู้ป่วยเป็น Severe และไม่ใช้เครื่องช่วยหายใจ ใช่หรือไม่');
      if (confirm) {
      } else {
        l.gcs_id = 5;
      }
    }
  }

  async checkMedicalSupplies(i, l) {
    if (l.gcs_id === 5 && i.id !== null) {
      let name: any;
      const idx = await findIndex(this.medicalSupplies, { id: i.id });
      if (idx > -1) {
        name = this.medicalSupplies[idx].name;
      }
      const confirm = await this.alertService.confirm('ความรุนแรงของผู้ป่วยเป็น IP PUI และใช้เครื่องช่วยหายใจ แบบ ' + name + ' ใช่หรือไม่');
      if (confirm) {
      } else {
        l.gcs_id = null;
      }
    } else if (l.gcs_id === 1 && i.id === null) {
      const confirm = await this.alertService.confirm('ความรุนแรงของผู้ป่วยเป็น Severe และไม่ใช้เครื่องช่วยหายใจ ใช่หรือไม่');
      if (confirm) {
      } else {
        l.gcs_id = 5;
      }
    }
  }

}
