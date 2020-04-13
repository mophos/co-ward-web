import { CovidCaseService } from './../../services/covid-case.service';
import { BasicAuthService } from './../../services/basic-auth.service';
import { BasicService } from './../../services/basic.service';
import { AlertService } from './../../../help/alert.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AutocompleteHospitalComponent } from 'src/app/help/autocomplete-hospital/autocomplete-hospital.component';
import { IMyOptions } from 'mydatepicker-th';

@Component({
  selector: 'app-covid-case-new',
  templateUrl: './covid-case-new.component.html',
  styles: []
})
export class CovidCaseNewComponent implements OnInit {

  isRefer: any;
  typeRegister: any;
  hn = '';
  genderId: any;
  passport = '';
  cid = '';
  fname = '';
  lname = '';
  tel = '';
  admitDate: any;

  titles: any = [];
  titleId = null;

  gcs: any = [];
  gcsId: any;

  beds: any = [];
  bedId: any;

  respirators: any = [];
  respiratorId: any;

  drugs: any = [];
  drugId: any;

  errorHN = false;
  errorTitleName = false;
  errorFname = false;
  errorLname = false;
  errorTel = false;
  errorAdmit = false;
  errorGender = false;
  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false,
    height: '25px'
  };


  s1_1 = '';
  s1_2 = '';
  s2_1 = '';
  s2_2 = '';
  s3 = '';

  drugDay = '5';
  @ViewChild('hospital') hospitals: AutocompleteHospitalComponent;

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
  }

  async ngOnInit() {
    await this.getTitle();
    await this.getGCS();
    await this.getBeds();
    await this.getRespirators();
    await this.getGenericSet();
    // await this.setDrugs();
  }

  setDrugs() {
    this.drugs = [
      {
        set: 1,
        id1: 1,
        name1: 'Hydroxychloroquine 200 mg.',
        id2: 2,
        name2: 'Chloroquine 250 mg.'
      },
      {
        set: 2,
        id1: 3,
        id2: 5,
        name1: 'Darunavir 600 mg. + Ritonavir 100 mg.',
        id3: 4,
        id4: 6,
        name2: 'Lopinavir 200 mg. + Ritonavir 50 mg.'
      },
      {
        set: 3,
        id1: 7,
        name1: 'Azithromycin 250 mg.',
      },
    ];
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
    try {

      if (await this.verifyInput()) {
        const drugs = [];
        if (this.s1_1) {
          drugs.push({ genericIid: 1, qty: this.s1_1 });
        } else if (this.s1_2) {
          drugs.push({ genericIid: 2, qty: this.s1_2 });
        }

        if (this.s2_1) {
          drugs.push({ genericIid: 3, qty: this.s2_1 });
          drugs.push({ genericIid: 5, qty: this.s2_1 });
        } else if (this.s2_2) {
          drugs.push({ genericIid: 4, qty: this.s2_2 });
          drugs.push({ genericIid: 6, qty: this.s2_2 });
        }

        if (this.s3) {
          drugs.push({ genericIid: 7, qty: this.s3 });
        }

        const obj = {
          type: this.typeRegister,
          cid: this.cid,
          passport: this.passport,
          titleId: this.titleId,
          hn: this.hn,
          fname: this.fname,
          lname: this.lname,
          tel: this.tel,
          admitDate: `${this.admitDate.date.year}-${this.admitDate.date.month}-${this.admitDate.date.day}`,
          gcsId: this.gcsId,
          bedId: this.bedId,
          respiratorId: this.respiratorId,
          drugs
        };

        const rs: any = await this.covidCaseService.saveNewCase(obj);
        if (rs.ok) {
          this.alertService.success();
          this.clear();
        } else {
          this.alertService.error(rs.error);
        }
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  clear() {
    this.hn = '';
    this.fname = '';
    this.lname = '';
    this.tel = '';
    this.admitDate = null;
    this.gcsId = null;
    this.bedId = null;
    this.respiratorId = null;
    this.s1_1 = null;
    this.s1_2 = null;
    this.s2_1 = null;
    this.s2_2 = null;
    this.s3 = null;
    this.drugDay = null;
  }

}
