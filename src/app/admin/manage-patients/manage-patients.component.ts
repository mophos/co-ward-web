import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/help/alert.service';
import { PatientsService } from '../services/patients.service';
import { UserService } from '../services/user.service';
import { find, findIndex, cloneDeep } from 'lodash';
import * as moment from 'moment';
import { IMyOptions } from 'mydatepicker-th';
import { AutocompleteProvinceComponent } from 'src/app/help/autocomplete-address/autocomplete-province/autocomplete-province.component';
import { AutocompleteDistrictComponent } from 'src/app/help/autocomplete-address/autocomplete-district/autocomplete-district.component';
import { AutocompleteSubdistrictComponent } from 'src/app/help/autocomplete-address/autocomplete-subdistrict/autocomplete-subdistrict.component';
import { AutocompleteZipcodeComponent } from 'src/app/help/autocomplete-address/autocomplete-zipcode/autocomplete-zipcode.component';

@Component({
  selector: 'app-manage-patients',
  templateUrl: './manage-patients.component.html',
  styleUrls: ['./manage-patients.component.css']
})
export class ManagePatientsComponent implements OnInit {
  @ViewChild('province', { static: true }) province: AutocompleteProvinceComponent;
  @ViewChild('ampur', { static: true }) ampur: AutocompleteDistrictComponent;
  @ViewChild('tambon', { static: true }) tambon: AutocompleteSubdistrictComponent;
  @ViewChild('zipcode', { static: true }) zipc: AutocompleteZipcodeComponent;
  @ViewChild('modalLoading', { static: true }) public modalLoading;

  titleList: any;
  genderList: any;
  historys: any;
  details: any;
  tmpHis: any;
  editHisDetail: boolean;
  tmpHisDetail: any;
  bDate: any;

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };
  disDate: { date: { year: number; month: number; day: number; }; };
  constructor(
    private patientsService: PatientsService,
    private userService: UserService,
    private alertService: AlertService,

  ) { }
  // queryPerson: string = 'kaka';
  queryHc: string;
  queryHn: string;

  patient: any;
  tmpPatient: any;
  editInfo = false;
  editCase = false;
  editHis = false;
  modalDetails = false;
  async ngOnInit() {
    await this.getTitleName();
    await this.getGender();
    this.disDate = {
      date: {
        year: moment().get('year'),
        month: moment().get('month') + 1,
        day: moment().get('date')
      }
    };
  }
  onEditInfo(p: any) {
    this.editInfo = !this.editInfo;
    this.editCase = false;
    this.setTmpData(p);
    this.historys = null;
    this.details = null;
  }
  setTmpData(p) {
    this.tmpPatient = cloneDeep({
      person_id: p.person_id,
      patient_id: p.patient_id,
      gender_id: p.gender_id,
      title_id: p.title_id,
      first_name: p.first_name,
      last_name: p.last_name,
      birth_date: p.birth_date,
      cid: p.cid,
      hn: p.hn,
      house_no: p.house_no,
      room_no: p.room_no,
      road: p.road,
      village_name: p.village_name,
      tambon_name: p.tambon_name,
      tambon_code: p.tambon_code,
      ampur_name: p.ampur_name,
      ampur_code: p.ampur_code,
      province_name: p.province_name,
      province_code: p.province_code,
      zipcode: p.zipcode,
      telephone: p.telephone
    });

    this.bDate = {
      date: {
        year: moment(p.birth_date).get('year'),
        month: moment(p.birth_date).get('month') + 1,
        day: moment(p.birth_date).get('date')
      }
    };
  }

  closeEditInfo() {
    this.editInfo = !this.editInfo;
    this.editCase = false;
  }

  async onEditCase(p: any) {
    this.editCase = !this.editCase;
    this.editInfo = false;
    this.setTmpData(p);
    await this.getHistory(p.hospital_id, p.patient_id);
  }

  async doEnter(e) {
    if (e.keyCode === 13) {

      await this.onSearch();
    }
  }

  async saveEditInfo() {
    const confirm = await this.alertService.confirm('ต้องการแก้ไขข้อมูลผู้ป่วย ใช่หรือไม่');
    if (confirm) {
      this.modalLoading.show();

      const rs: any = await this.patientsService.editInfo(this.tmpPatient);
      if (rs.ok) {
        const idx = findIndex(this.patient, (v: any) => {
          return v.person_id === this.tmpPatient.person_id && v.patient_id === this.tmpPatient.patient_id;
        });
        if (idx > -1) {
          this.patient[idx].gender_id = this.tmpPatient.gender_id;
          this.patient[idx].title_id = this.tmpPatient.title_id;
          this.patient[idx].first_name = this.tmpPatient.first_name;
          this.patient[idx].last_name = this.tmpPatient.last_name;
          this.patient[idx].birth_date = this.tmpPatient.birth_date;
          this.patient[idx].cid = this.tmpPatient.cid;
          this.patient[idx].hn = this.tmpPatient.hn;
          this.patient[idx].house_no = this.tmpPatient.house_no;
          this.patient[idx].room_no = this.tmpPatient.room_no;
          this.patient[idx].village_name = this.tmpPatient.village_name;
          this.patient[idx].tambon_code = this.tmpPatient.tambon_code;
          this.patient[idx].tambon_name = this.tmpPatient.tambon_name;
          this.patient[idx].ampur_code = this.tmpPatient.ampur_code;
          this.patient[idx].ampur_name = this.tmpPatient.ampur_name;
          this.patient[idx].province_code = this.tmpPatient.province_code;
          this.patient[idx].province_name = this.tmpPatient.province_name;
          this.patient[idx].zipcode = this.tmpPatient.zipcode;
          this.patient[idx].road = this.tmpPatient.road;
          this.patient[idx].telephone = this.tmpPatient.telephone;
        }

        this.alertService.success();
      } else {
        this.alertService.error(rs.error);
      }
    }
    this.modalLoading.hide();
    this.editInfo = false;
  }

  async onSearch() {
    try {
      this.modalLoading.show();
      this.historys = null;
      this.details = null;
      const rs: any = await this.patientsService.getPatient(this.queryHc, this.queryHn);
      if (rs.ok) {
        if (rs.rows.patient) {
          this.patient = rs.rows.patient;
          for (const item of this.patient) {
            const title = find(this.titleList, v => v.id === item.title_id);
            item.titleName = title.name;
          }
          this.editInfo = false;
          this.editCase = false;
        } else {
          this.alertService.error('ไม่พบผู้ป่วย');
          this.patient = null;
        }

      } else {
        this.alertService.error(rs.error);
      }
      this.modalLoading.hide();
    } catch (error) {
      this.modalLoading.hide();
      this.alertService.error(error.message);
    }
  }

  async getTitleName() {
    try {
      const rs: any = await this.userService.getTitle();
      if (rs.ok) {
        this.titleList = rs.rows;
        // this.position = rs.rows[0].id;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error.message);
    }
  }

  async getGender() {
    try {
      const rs: any = await this.userService.getGender();
      if (rs.ok) {
        this.genderList = rs.rows;
        // this.position = rs.rows[0].id;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error.message);
    }
  }

  async getHistory(hospId, pateintId) {
    try {
      const rs: any = await this.patientsService.getCovidCaseHistory(hospId, pateintId);
      if (rs.ok) {
        this.historys = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async getDetails(l) {
    this.modalDetails = true;
    try {
      const rs: any = await this.patientsService.getCovidCaseDetails(l.covid_case_id);
      if (rs.ok) {
        this.details = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async deletedHistory(l) {
    const confirm = await this.alertService.confirm('ต้องการลบ case ผู้ป่วย ใช่หรือไม่');
    if (confirm) {
      this.modalLoading.show();
      const rs: any = await this.patientsService.deleteCovidCase(l.covid_case_id);
      if (rs.ok) {
        const idx = findIndex(this.historys, (v: any) => {
          return v.covid_case_id === l.covid_case_id;
        });
        if (idx > -1) {
          this.historys.splice(idx, 1);
        }

        this.alertService.success();
      } else {
        this.alertService.error(rs.error);
      }
    }
    this.modalLoading.hide();
  }

  async saveEditHistory() {
    try {
      const confirm = await this.alertService.confirm('ต้องการแก้ไข case ผู้ป่วย ใช่หรือไม่');
      if (confirm) {
        this.modalLoading.show();
        if (this.tmpHis.status !== 'ADMIT') {
          this.tmpHis.date_discharge = this.tmpHis.disDate.date.year + '-' + this.tmpHis.disDate.date.month + '-' + this.tmpHis.disDate.date.day + ' ' + this.tmpHis.timeDischarge.h + ':' + this.tmpHis.timeDischarge.m + ':00';
        } else {
          this.tmpHis.date_discharge = null;
        }
        const rs: any = await this.patientsService.saveEditCovidCase(this.tmpHis);
        if (rs.ok) {
          const idx = findIndex(this.historys, (v: any) => {
            return v.covid_case_id === this.tmpHis.covid_case_id;
          });
          if (idx > -1) {
            this.historys[idx].an = this.tmpHis.an;
            this.historys[idx].date_discharge = this.tmpHis.date_discharge;
            this.historys[idx].case_status = this.tmpHis.case_status;
            this.historys[idx].status = this.tmpHis.status;
          }

          this.alertService.success();
          // this.details = rs.rows;
        } else {
          this.alertService.error(rs.error);
        }
      }
    } catch (error) {
      this.alertService.error(error);
    }
    this.modalLoading.hide();
    this.editHis = false;
    this.tmpHis = null;
  }

  async closeEditHistory() {
    try {
      this.editHis = false;
      this.tmpHis = null;
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async editHistory(l) {
    try {
      this.editHis = true;
      this.tmpHis = cloneDeep(l);
      if (l.status !== 'ADMIT') {
        this.tmpHis.disDate = {
          date: {
            year: moment(this.tmpHis.date_discharge).get('year'),
            month: moment(this.tmpHis.date_discharge).get('month') + 1,
            day: moment(this.tmpHis.date_discharge).get('date')
          }
        };
        this.tmpHis.timeDischarge = { h: moment(this.tmpHis.date_discharge).format('HH'), m: moment(this.tmpHis.date_discharge).format('mm') };
      } else {
        this.tmpHis.disDate = this.disDate;
        this.tmpHis.timeDischarge = { h: '13', m: '00' };
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async editHistoryDetail(l) {
    try {
      this.editHisDetail = true;
      this.tmpHisDetail = cloneDeep(l);
    } catch (error) {
      this.alertService.error(error);
    }
  }


  async deletedHistoryDetail(l) {
    const confirm = await this.alertService.confirm('ต้องการลบ case ผู้ป่วย ใช่หรือไม่');
    if (confirm) {
      this.modalLoading.show();
      const rs: any = await this.patientsService.deleteCovidCaseDetail(l.id);
      if (rs.ok) {
        const idx = findIndex(this.details, (v: any) => {
          return v.id === l.id;
        });
        if (idx > -1) {
          this.details.splice(idx, 1);
        }

        this.alertService.success();
      } else {
        this.alertService.error(rs.error);
      }
    }
    this.modalLoading.hide();
  }

  async saveEditHistoryDetail() {
    try {
      const confirm = await this.alertService.confirm('ต้องการแก้ไข detail case ผู้ป่วย ใช่หรือไม่');
      if (confirm) {
        this.modalLoading.show();
        const rs: any = await this.patientsService.saveEditCovidCaseDtail(this.tmpHisDetail);
        if (rs.ok) {
          const idx = findIndex(this.details, (v: any) => {
            return v.id === this.tmpHisDetail.id;
          });
          if (idx > -1) {
            this.details[idx].status = this.tmpHisDetail.status;
          }

          this.alertService.success();
          // this.details = rs.rows;
        } else {
          this.alertService.error(rs.error);
        }
      }
    } catch (error) {
      this.alertService.error(error);
    }
    this.modalLoading.hide();
    this.editHisDetail = false;
    this.tmpHisDetail = null;
  }

  async closeEditHistoryDetail() {
    try {
      this.editHisDetail = false;
      this.tmpHisDetail = null;
    } catch (error) {
      this.alertService.error(error);
    }
  }

  onSelectProvince(e) {
    this.tmpPatient.tambon_code = e.tambon_code;
    this.tmpPatient.tambon_name = e.tambon_name;
    this.tmpPatient.ampur_code = e.ampur_code;
    this.tmpPatient.ampur_name = e.ampur_name;
    this.tmpPatient.province_code = e.province_code;
    this.tmpPatient.province_name = e.province_name;
    this.tmpPatient.zipcode = e.zip_code;
    this.setValue();
  }

  onSelectAmpur(e) {
    this.tmpPatient.tambon_code = e.tambon_code;
    this.tmpPatient.tambon_name = e.tambon_name;
    this.tmpPatient.ampur_code = e.ampur_code;
    this.tmpPatient.ampur_name = e.ampur_name;
    this.tmpPatient.province_code = e.province_code;
    this.tmpPatient.province_name = e.province_name;
    this.tmpPatient.zipcode = e.zip_code;
    this.setValue();
  }

  onSelectTambon(e) {
    this.tmpPatient.tambon_code = e.tambon_code;
    this.tmpPatient.tambon_name = e.tambon_name;
    this.tmpPatient.ampur_code = e.ampur_code;
    this.tmpPatient.ampur_name = e.ampur_name;
    this.tmpPatient.province_code = e.province_code;
    this.tmpPatient.province_name = e.province_name;
    this.tmpPatient.zipcode = e.zip_code;
    this.setValue();
  }

  onSelectZipcode(e) {
    this.tmpPatient.tambon_code = e.tambon_code;
    this.tmpPatient.tambon_name = e.tambon_name;
    this.tmpPatient.ampur_code = e.ampur_code;
    this.tmpPatient.ampur_name = e.ampur_name;
    this.tmpPatient.province_code = e.province_code;
    this.tmpPatient.province_name = e.province_name;
    this.tmpPatient.zipcode = e.zip_code;
    this.setValue();
  }

  setValue() {
    this.province.setQuery(this.tmpPatient.province_name);
    this.ampur.setQuery(this.tmpPatient.ampur_name);
    this.tambon.setQuery(this.tmpPatient.tambon_name);
    this.zipc.setQuery(this.tmpPatient.zipcode);
  }

  onChangebDateDischarge(e) {
    this.tmpPatient.birth_date = e.date.year + '-' + e.date.month + '-' + e.date.day;
  }

}
