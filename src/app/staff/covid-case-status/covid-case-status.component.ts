import { BasicAuthService } from './../services/basic-auth.service';
import { CovidCaseService } from './../services/covid-case.service';
import { BasicService } from './../services/basic.service';
import { AlertService } from './../../help/alert.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyOptions } from 'mydatepicker-th';
import { findIndex } from 'lodash';
import * as moment from 'moment';
import { AutocompleteHospitalComponent } from '../../help/autocomplete-hospital/autocomplete-hospital.component';
@Component({
  selector: 'app-covid-case-status',
  templateUrl: './covid-case-status.component.html',
  styles: []
})
export class CovidCaseStatusComponent implements OnInit {

  isLoadding = false;
  list = [];
  date: any;

  gcsSum = [];
  gcs: any = [];
  gcsId: any;

  beds: any = [];
  bedId: any;

  respiratorSum: any = [];
  respirators: any = [];
  respiratorId: any;
  hospitalId: any;

  hour: any;
  minute: any;

  hours: any = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  minutes: any = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
    '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
    '30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
    '40', '41', '42', '43', '44', '45', '46', '47', '48', '49',
    '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];

  selected: any;

  modalDischarge = false;
  modalDischargeType = 'HOME';
  s1 = [{ generic: 1, name: 'Hydroxychloroquine 200 mg.' }, { generic: 2, name: 'Chloroquine 250 mg.' }];
  s2 = [{ generic: 3, name: 'Darunavir 600mg+Ritonavir100 mg' }, { generic: 4, name: 'Lopinavir 200 mg+Ritonavir 50 mg.' }];
  s3 = [{ generic: 7, name: 'Azithromycin 250 mg.' }];
  s4 = [{ generic: 8, name: 'Favipiravir (เบิกจาก AntiDost) คลิก' }];

  dateDischarge: any;
  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false,
    height: '25px',
    width: '200px'
  };

  @ViewChild('hospital') hosp: AutocompleteHospitalComponent;

  constructor(
    private covidCaseService: CovidCaseService,
    private alertService: AlertService,
    private basicService: BasicService,
    private basicAuthService: BasicAuthService
  ) { }

  async ngOnInit() {
    await this.getDate();
    await this.getList();
    await this.getGCS();
    await this.getGCSSum();
    await this.getBeds();
    await this.getRespiratorSum();
    await this.getRespirators();

    const date = new Date();
    this.dateDischarge = {
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    };

    this.hour = date.getHours();
    this.minute = date.getMinutes();
  }

  async getList() {
    try {
      const rs: any = await this.covidCaseService.getCovidCasePresent();
      if (rs.ok) {
        this.list = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async getDate() {
    try {
      const rs: any = await this.basicService.getDate();
      if (rs.ok) {
        this.date = moment(rs.rows).format('YYYY-MM-DD');
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
  async getGCSSum() {
    try {
      const rs: any = await this.covidCaseService.getGCS();
      if (rs.ok) {
        this.gcsSum = rs.rows;
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
      const rs: any = await this.covidCaseService.getBeds();
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

  async getRespirators() {
    try {
      const rs: any = await this.basicAuthService.getRespirators();
      if (rs.ok) {
        this.respirators = rs.rows;
      } else {
        this.alertService.serverError();
      }
    } catch (error) {
      console.log(error);
      this.alertService.serverError();
    }
  }
  async getRespiratorSum() {
    try {
      const rs: any = await this.covidCaseService.getRespirators();
      if (rs.ok) {
        this.respiratorSum = rs.rows;
      } else {
        this.alertService.serverError();
      }
    } catch (error) {
      console.log(error);
      this.alertService.serverError();
    }
  }

  onSelectGCS(e, id) {
    const idx = findIndex(this.list, { id });
    if (idx > -1) {
      this.list[idx].gcsId = e;
    }
  }

  onSelectBed(e, id) {
    const idx = findIndex(this.list, { id });
    if (idx > -1) {
      this.list[idx].bedId = e;
    }
  }

  onClickOpenModalDischarge(l) {
    this.selected = l;
    this.modalDischarge = true;
  }

  async onClickSave(id) {
    try {
      const confirm = await this.alertService.confirm();
      if (confirm) {
        const idx = findIndex(this.list, { id });
        if (idx > -1) {
          this.list[idx].create_date = this.date;
          this.list[idx].drugs = await this.setGenericSave(this.list[idx]);
          console.log(this.list[idx]);
          const rs: any = await this.covidCaseService.updateStatus(this.list[idx]);
          if (rs.ok) {
            this.alertService.success();
          } else {
            this.alertService.error(rs.error);
          }
        }
      }
    } catch (error) {
      this.alertService.error(error);
    }

  }

  counter(i: number) {
    return new Array(i);
  }

  async setGenericSave(e: any) {
    const drugs = [];

    // set1
    if (+e.set1 === 1) {
      drugs.push({ genericId: 1 });
    } else if (+e.set1 === 2) {
      drugs.push({ genericId: 2 });
    }

    // set2
    if (+e.set2 === 3) {
      drugs.push({ genericId: 3 });
      drugs.push({ genericId: 5 });
    } else if (+e.set2 === 4) {
      drugs.push({ genericId: 4 });
      drugs.push({ genericId: 6 });
    }

    // set3
    if (+e.set3 === 7) {
      drugs.push({ genericId: 7 });
    }

    // set4
    if (+e.set4 === 8) {
      drugs.push({ genericId: 8 });
    }
    return drugs;
  }

  onSelectHosp(e) {
    this.hospitalId = e.id;
  }

  async save() {
    const confirm = await this.alertService.confirm();
    if (confirm) {
      if (this.hour !== undefined && this.minute !== undefined) {
        try {
          const obj: any = {};
          let status = null;
          if (this.modalDischargeType === 'HOME') {
            status = 'RECOVERY';
          } else if (this.modalDischargeType === 'DEATH') {
            status = 'DISCHARGE';
          } else if (this.modalDischargeType === 'REFER') {
            status = 'REFER';
            obj.hospitalId = this.hospitalId;
          }
          obj.dateDischarge = this.dateDischarge.date.year + '-' + this.dateDischarge.date.month + '-' + this.dateDischarge.date.day + ' ' + this.hour + ':' + this.minute + ':00';
          obj.covidCaseId = this.selected.covid_case_id;
          obj.status = status;
          const rs: any = await this.covidCaseService.updateDischarge(obj);
          if (rs.ok) {
            this.modalDischarge = false;
            this.getList();
            this.alertService.success();
          }
        } catch (error) {

        }
      }
    }
  }
}
