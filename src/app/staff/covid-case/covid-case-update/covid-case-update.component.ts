import { Component, OnInit } from '@angular/core';
import { AlertService } from './../../../help/alert.service';
import { CovidCaseService } from './../../services/covid-case.service';
import { BasicAuthService } from './../../services/basic-auth.service';
import * as moment from 'moment';
import { findIndex } from 'lodash';
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

  modal = false;

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
      this.patientId = l.id;
      const rs: any = await this.covidCaseService.getListOldPatientDetails(l.covid_case_id);
      if (rs.ok) {
        const detail = rs.rows[0];
        if (detail.date_admit != null) {
          let startDate = moment(detail.date_admit, 'YYYY-MM-DD').add(1, 'days');
          const endDate = moment(detail.date_discharge, 'YYYY-MM-DD').add(1, 'days');
          let id = 1;
          console.log(startDate, endDate);
          while (!startDate.isSame(endDate)) {
            const obj: any = {};
            obj.date = startDate.format('YYYY-MM-DD');
            obj.id = id;
            obj.covid_case_id = l.covid_case_id;
            obj.gcs_id = null;
            obj.bed_id = null;
            obj.medical_supplie_id = null;
            startDate = startDate.add(1, 'days');
            this.data.push(obj);
            id++;
          }
          this.modal = true;
        } else {
          this.alertService.error();
        }
      } else {
        this.alertService.error();
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
      const rs: any = await this.covidCaseService.updateOldPatient(this.data);
      if (rs.ok) {
        this.alertService.success();
        this.modal = false;
        this.getList();
      } else {
        this.modal = false;
        this.alertService.error(rs.message);
      }
    } catch (error) {
      this.modal = false;
      this.alertService.error(error);
    }
  }

}
