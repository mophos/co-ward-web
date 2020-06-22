import { CovidCaseService } from './../../services/covid-case.service';
import { BasicAuthService } from './../../services/basic-auth.service';
import { BasicService } from './../../services/basic.service';
import { AlertService } from './../../../help/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AutocompleteHospitalComponent } from 'src/app/help/autocomplete-hospital/autocomplete-hospital.component';
import { IMyOptions } from 'mydatepicker-th';
import { findIndex } from 'lodash';
import { AutocompleteProvinceComponent } from '../../../help/autocomplete-address/autocomplete-province/autocomplete-province.component';
import { AutocompleteDistrictComponent } from '../../../help/autocomplete-address/autocomplete-district/autocomplete-district.component';
import { AutocompleteSubdistrictComponent } from '../../../help/autocomplete-address/autocomplete-subdistrict/autocomplete-subdistrict.component';
import { AutocompleteZipcodeComponent } from '../../../help/autocomplete-address/autocomplete-zipcode/autocomplete-zipcode.component';
import { AutocompleteCountriesComponent } from 'src/app/help/autocomplete-countries/autocomplete-countries.component';
import * as moment from 'moment';
import thaiIdCard from 'thai-id-card';

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
  isKey = false;
  @ViewChild('hospital') hospitals: AutocompleteHospitalComponent;
  @ViewChild('countries') countries: AutocompleteCountriesComponent;
  @ViewChild('province') province: AutocompleteProvinceComponent;
  @ViewChild('ampur') ampur: AutocompleteDistrictComponent;
  @ViewChild('tambon') tambon: AutocompleteSubdistrictComponent;
  @ViewChild('zipcode') zipc: AutocompleteZipcodeComponent;
  @ViewChild('loading') loading: any;

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
    console.log(this.data);

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
      this.countryId = this.data.country_code;


      if (this.data.country_name) {
        this.countries.setQuery(this.data.country_name);
        if (this.data.country_name === 'ไทย') {
          this.ampur.setQuery(this.data.ampur_name);
          this.tambon.setQuery(this.data.tambon_name);
          this.province.setQuery(this.data.province_name);
          this.zipc.setQuery(this.data.zipcode);
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
              cid: this.cid,
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
              zipcode: this.zipcode,
              countryId: this.countryId,
              detail: this.admitDetail
              // drugs
            };

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
              const confirm = await this.alertService.confirm(titleName + ' ' + this.fname + ' ' + this.lname + ' เป็นผู้ป่วยยืนยัน และมีผลแล็บ covid-19 positive แล้ว');
              if (confirm) {
                const rs: any = await this.covidCaseService.saveNewCase(obj);
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
              } else {
                this.isSave = false;
              }
            } else {
              const rs: any = await this.covidCaseService.saveNewCase(obj);
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
      this.countryId = 20;
      this.modalCIDCid = '';
      this.modalCIDPassport = '';
      this.modalCIDType = 'CID';
      this.tambon.setQuery('');
      this.ampur.setQuery('');
      this.province.setQuery('');
      this.zipc.setQuery('');
      this.countries.setQuery('ไทย');
      this.drugDay = null;
      this.personId = null;
      this.covidCaseId = null;
      this.typeRegister = null;
      this.admitDetail = [];
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
                await this.infoCid(this.modalCIDCid);
                this.cid = this.modalCIDCid;
              } else if (this.modalCIDType === 'PASSPORT') {
                this.typeRegister = 'PASSPORT';
                this.passport = this.modalCIDPassport;
              }
              this.isKey = true;
              this.modalCID = false;
            } else if (rs.case === 'REFER') {
              this.typeRegister = 'REFER';
              const confirm = await this.alertService.confirm(`คุณรับผู้ป่วย Refer มาจาก ${rs.rows.hospname} ใช่หรือไม่ ?`);
              if (confirm) {
                this.isKey = true;
                this.modalCID = false;
                this.data = rs.rows;
                this.setData();
              }
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

  async infoCid(cid) {
    this.loading.show();
    try {
      const rs: any = await this.covidCaseService.infoCid(cid);
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
            obj.gcs_id = null;
            obj.bed_id = null;
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
