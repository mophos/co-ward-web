import { BasicAuthService } from './../services/basic-auth.service';
import { BasicService } from './../services/basic.service';
import { AlertService } from './../../help/alert.service';
import { CovidCaseService } from './../services/covid-case.service';
import { Component, OnInit } from '@angular/core';
import { findIndex } from 'lodash';
import * as moment from 'moment';
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

  modalDischarge = false;
  modalDischargeType = 'HOME';
  s1 = [{ generic: 1, name: 'Hydroxychloroquine 200 mg.' }, { generic: 2, name: 'Chloroquine 250 mg.' }];
  s2 = [{ generic: 3, name: 'Darunavir 600mg+Ritonavir100 mg' }, { generic: 5, name: 'Lopinavir 200 mg+Ritonavir 50 mg.' }];
  s3 = [{ generic: 7, name: 'Azithromycin 250 mg.' }];
  s4 = [{ generic: 8, name: 'Favipiravir (เบิกจาก AntiDost) คลิก' }];

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
  }

  async getList() {
    try {
      const rs: any = await this.covidCaseService.getCovidCasePresent();
      if (rs.ok) {
        this.list = rs.rows;
        console.log(this.list);
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

  onClickOpenModalDischarge() {
    this.modalDischarge = true;
  }

  async onClickSave(id) {
    try {
      const confirm = await this.alertService.confirm();
      if (confirm) {
        const idx = findIndex(this.list, { id });
        if (idx > -1) {
          // this.list[idx].create_date = this.date;
          console.log(this.list[idx]);
          // const rs: any = await this.covidCaseService.updateStatus(this.list[idx]);
          // if (rs.ok) {
          //   this.alertService.success();
          // } else {
          //   this.alertService.error(rs.error);
          // }
        }
      }
    } catch (error) {
      this.alertService.error(error);
    }

  }

  counter(i: number) {
    return new Array(i);
  }

  async onClickRadioDrge(e, idx) {
    console.log(e, idx);
    if (e === 1) {
      this.list[idx].set1 = this.date;
    }
  }

}
