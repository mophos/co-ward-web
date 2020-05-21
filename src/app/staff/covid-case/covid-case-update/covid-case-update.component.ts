import { Component, OnInit } from '@angular/core';
import { AlertService } from './../../../help/alert.service';
import { CovidCaseService } from './../../services/covid-case.service';
import { BasicAuthService } from './../../services/basic-auth.service';
import { IMyOptions } from 'mydatepicker-th';
import { findIndex } from 'lodash';
import * as moment from 'moment';
@Component({
  selector: 'app-covid-case-update',
  templateUrl: './covid-case-update.component.html',
  styles: []
})
export class CovidCaseUpdateComponent implements OnInit {
  patientId: any;
  list: any = [];
  data: any = [];
  gcs: any = [];
  beds: any = [];
  medicalSupplies: any = [];
  isSave = false;
  modal = false;
  loading = false;

  dateAdmit: any;
  dateDischarge: any;
  covidCaseId: any;

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };

  modalDate: any = false;
  constructor(
    private alertService: AlertService,
    private covidCaseService: CovidCaseService,
    private basicAuthService: BasicAuthService
  ) { }

  async ngOnInit() {
    await this.getList();
    await this.getGCS();
    await this.getBeds();
    await this.getMedicalSupplies();
  }

  async getList() {
    try {
      const rs: any = await this.covidCaseService.getListOldPatients();
      if (rs.ok) {
        this.list = rs.rows;
      } else {
        this.alertService.error();
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async onClickEdit(l) {
    console.log(l);

    this.data = [];
    try {
      this.patientId = l.patient_id;
      const rs: any = await this.covidCaseService.getListOldPatientDetails(l.covid_case_id);
      if (rs.ok) {
        const detail = rs.rows[0];

        if (detail.date_admit === null || detail.date_discharge === null) {
          if (detail.date_admit !== null) {
            this.dateAdmit = {
              date: {
                year: moment(detail.date_admit).get('year'),
                month: moment(detail.date_admit).get('month') + 1,
                day: moment(detail.date_admit).get('date')
              }
            };
          }
          if (detail.date_discharge !== null) {
            this.dateDischarge = {
              date: {
                year: moment(detail.date_discharge).get('year'),
                month: moment(detail.date_discharge).get('month') + 1,
                day: moment(detail.date_discharge).get('date')
              }
            };
          }
          this.covidCaseId = l.covid_case_id;
          this.modalDate = true;
        } else {
          await this.getDates(detail.date_admit, detail.date_discharge, l.covid_case_id);
          this.modal = true;
        }
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
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

  uncheckRadioMedicalSupplies(listId, ms) {
    const idx = findIndex(this.list, { id: listId });
    if (idx > -1) {
      this.list[idx].medical_supplie_id = this.list[idx].medical_supplie_id === ms ? null : ms;
    }
  }

  async save() {
    try {
      this.isSave = true;
      const rs: any = await this.covidCaseService.updateOldPatient(this.data);
      if (rs.ok) {
        this.alertService.success();
        this.modal = false;
        this.getList();
      } else {
        this.modal = false;
        this.alertService.error(rs.message);
      }
      this.isSave = false;
    } catch (error) {
      this.isSave = false;
      this.modal = false;
      this.alertService.error(error);
    }
  }

  async getDates(dateAdmit, dateDischarge, covidCaseId) {
    console.log(dateAdmit, dateDischarge, covidCaseId);

    let startDate = moment(dateAdmit, 'YYYY-MM-DD').add(1, 'days');
    const endDate = moment(dateDischarge, 'YYYY-MM-DD').add(1, 'days');
    let id = 1;
    while (!startDate.isSame(moment(endDate).add(1, 'days'))) {
      const obj: any = {};
      obj.date = startDate.format('YYYY-MM-DD');
      obj.id = id;
      obj.covid_case_id = covidCaseId;
      obj.gcs_id = null;
      obj.bed_id = null;
      obj.medical_supplie_id = null;
      startDate = startDate.add(1, 'days');
      this.data.push(obj);
      id++;
    }
  }

  async saveDates() {

    const admit = this.dateAdmit.date.year + '-' + this.dateAdmit.date.month + '-' + this.dateAdmit.date.day;
    const disCharge = this.dateDischarge.date.year + '-' + this.dateDischarge.date.month + '-' + this.dateDischarge.date.day;
    if (moment(admit, 'YYYY-MM-DD').isSameOrAfter(moment(disCharge, 'YYYY-MM-DD'))) {
      this.alertService.error('ไม่อนุญาตให้เลือกวันที่ก่อนหน้า ADMIT');
    } else {
      this.modalDate = false;
      await this.getDates(admit, disCharge, this.covidCaseId);
      this.modal = true;
    }
  }

}
