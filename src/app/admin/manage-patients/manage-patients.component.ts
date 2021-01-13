import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/help/alert.service';
import { PatientsService } from '../services/patients.service';
import { UserService } from '../services/user.service';
import { find, findIndex, cloneDeep } from 'lodash';
import * as moment from 'moment';
import { IMyOptions } from 'mydatepicker-th';

@Component({
  selector: 'app-manage-patients',
  templateUrl: './manage-patients.component.html',
  styleUrls: ['./manage-patients.component.css']
})
export class ManagePatientsComponent implements OnInit {
  @ViewChild('modalLoading') public modalLoading;
  titleList: any;
  genderList: any;
  historys: any;
  details: any;
  tmpHis: any;
  editHisDetail: boolean;
  tmpHisDetail: any;

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
  queryHc: string = '10670';
  queryHn: string = '1234';

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
        year: moment().startOf('month').get('year'),
        month: moment().startOf('month').get('month') + 1,
        day: moment().startOf('month').get('date')
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
      cid: p.cid,
      hn: p.hn
    });
  }

  closeEditInfo(p: any) {
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
          this.patient[idx].cid = this.tmpPatient.cid;
          this.patient[idx].hn = this.tmpPatient.hn;
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
          console.log(this.patient);
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
      console.log(rs);
      if (rs.ok) {
        this.details = rs.rows;
        console.log(this.details);
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
        if (this.tmpHis.date_discharge) {
          this.tmpHis.date_discharge = this.tmpHis.disDate.date.year + '-' + this.tmpHis.disDate.date.month + '-' + this.tmpHis.disDate.date.day + ' ' + this.tmpHis.timeDischarge.h + ':' + this.tmpHis.timeDischarge.m + ':00';
        }
        const rs: any = await this.patientsService.saveEditCovidCase(this.tmpHis);
        console.log(rs);
        if (rs.ok) {
          const idx = findIndex(this.historys, (v: any) => {
            return v.covid_case_id === this.tmpHis.covid_case_id;
          });
          if (idx > -1) {
            this.historys[idx].an = this.tmpHis.an;
            this.historys[idx].date_discharge = this.tmpHis.date_discharge;
            this.historys[idx].case_status = this.tmpHis.case_status;
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
      this.tmpHis.disDate = {
        date: {
          year: moment(this.tmpHis.date_discharge).get('year'),
          month: moment(this.tmpHis.date_discharge).get('month') + 1,
          day: moment(this.tmpHis.date_discharge).get('date')
        }
      };
      this.tmpHis.timeDischarge = { h: moment(this.tmpHis.date_discharge).format('HH'), m: moment(this.tmpHis.date_discharge).format('mm') };
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
        console.log(rs);
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

}
