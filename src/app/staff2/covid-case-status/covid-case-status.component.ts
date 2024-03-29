import { BasicAuthService } from './../services/basic-auth.service';
import { CovidCaseService } from './../services/covid-case.service';
import { BasicService } from './../services/basic.service';
import { AlertService } from './../../help/alert.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyOptions } from 'mydatepicker-th';
import { findIndex } from 'lodash';
import * as moment from 'moment';
import { AutocompleteHospitalComponent } from '../../help/autocomplete-hospital/autocomplete-hospital.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ReportService } from '../report.service';
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
  BedsSum = [];
  gcs: any = [];
  gcsId: any = null;
  reason: any;

  query: any = '';

  saveId: any;

  beds: any = [];
  bedId: any = null;

  medicalSupplieSum: any = [];
  medicalSupplies: any = [];
  medicalSuppliesSum: any = [];
  medicalSupplieId: any = null;
  hospitalId: any = null;

  hour: any;
  minute: any;

  confirmDetail: any = false;
  showDetail: any;

  bed1: any = 0;
  bed2: any = 0;
  bed3: any = 0;
  bed4: any = 0;

  hours: any = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  minutes: any = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
    '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
    '30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
    '40', '41', '42', '43', '44', '45', '46', '47', '48', '49',
    '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];

  selected: any = {};

  modalDischarge = false;
  modalDeath = false;
  modalDischargeType = 'HOME';
  dischargeReason = 'COVID';
  drugs: any = [];
  s1 = [{ generic: 1, name: 'Hydroxychloroquine 200 mg.' }, { generic: 2, name: 'Chloroquine 250 mg.' }];
  s2 = [{ generic: 3, name: 'Darunavir 600mg+Ritonavir100 mg.' }, { generic: 4, name: 'Lopinavir 200 mg/Ritonavir 50 mg.' }];
  s3 = [{ generic: 7, name: 'Azithromycin 250 mg.' }];
  s4 = [{ generic: 8, name: 'Favipiravir (เบิกจาก AntiDote) <a target="_BLANK" href="http://drug.nhso.go.th/Antidotes/index.jsp">คลิก</a>' }];

  dateDischarge: any;
  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false,
    height: '25px',
    width: '200px'
  };
  @ViewChild('loading', { static: true }) loading: any;

  @ViewChild('hospital', { static: true }) hosp: AutocompleteHospitalComponent;
  dateCut: string;
  public jwtHelper = new JwtHelperService();
  hospitalType: any;
  time: string;
  bedSearchId: any = null;
  gcsSearchId: any = null;

  constructor(
    private covidCaseService: CovidCaseService,
    private alertService: AlertService,
    private basicService: BasicService,
    private basicAuthService: BasicAuthService,
    private service: ReportService,

  ) {
    const token = sessionStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token);
    this.hospitalType = decodedToken.hospitalType;
  }

  async ngOnInit() {
    await this.getDate();
    await this.getDateCut();
    await this.getGCS();
    await this.getDrugs();
    await this.getBeds();
    await this.getMedicalSupplies();
    await this.getList();
    // await this.getGCSSum();
    // await this.getBedSum();
    // await this.getMedicalSuppliesSum();

    this.dateDischarge = {
      date: {
        year: moment().get('year'),
        month: moment().get('month') + 1,
        day: moment().get('date')
      }
    };

    this.hour = moment().get('hour');
    this.minute = moment().get('minute');
  }

  async getList() {
    try {
      this.loading.show();
      const rs: any = await this.covidCaseService.getCovidCasePresent(this.query, this.gcsSearchId, this.bedSearchId);
      if (rs.ok) {
        for (const i of rs.rows) {
          i.old_gcs_id = i.gcs_id;
        }
        this.list = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
      this.loading.hide();
    } catch (error) {
      this.loading.hide();
      this.alertService.error(error);
    }
  }

  async getDate() {
    try {
      const rs: any = await this.basicService.getDate();
      if (rs.ok) {
        this.time = moment(rs.rows).format('HH:mm:ss');
        this.date = moment(rs.rows).format('YYYY-MM-DD');
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async getDateCut() {
    try {
      const rs: any = await this.basicService.getDateCut();
      if (rs.ok) {
        this.dateCut = moment(rs.rows).format('YYYY-MM-DD');
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

  async getDrugs() {
    try {
      const rs: any = await this.basicAuthService.getGenerics('DRUG');
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
  // async getGCSSum() {
  //   try {
  //     const rs: any = await this.covidCaseService.getGCS();
  //     if (rs.ok) {
  //       this.gcsSum = rs.rows;
  //     } else {
  //       this.alertService.serverError();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     this.alertService.serverError();
  //   }
  // }

  // async getBedSum() {
  //   try {
  //     const rs: any = await this.covidCaseService.getBeds();
  //     if (rs.ok) {
  //       this.BedsSum = rs.rows;
  //     } else {
  //       this.alertService.serverError();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     this.alertService.serverError();
  //   }
  // }

  // async getMedicalSuppliesSum() {
  //   try {
  //     const rs: any = await this.covidCaseService.getVentilators();
  //     if (rs.ok) {
  //       this.medicalSuppliesSum = rs.rows;
  //     } else {
  //       this.alertService.serverError();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     this.alertService.serverError();
  //   }
  // }
  async getMedicalSupplies() {
    try {
      const rs: any = await this.basicAuthService.getMedicalSupplies();
      if (rs.ok) {
        this.medicalSupplies = rs.rows;
        this.medicalSupplies.push({ id: null, name: 'ไม่ใช้เครื่องช่วยหายใจ (low flow,room air)' });
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
    if (l.gcs_id === 5) {
      this.modalDischargeType = 'NEGATIVE';
    } else {
      this.modalDischargeType = 'HOME';
    }
    this.modalDischarge = true;
  }

  async confirm(id) {
    this.showDetail = {};

    const idx = findIndex(this.list, { id });
    let gcsId: any;
    let bedId: any;
    let msId: any;
    let set1: any;
    let set2: any;
    let set3: any;
    let set4: any;
    this.saveId = idx;
    if (idx > -1) {
      gcsId = this.list[idx].gcs_id;
      bedId = this.list[idx].bed_id;
      msId = this.list[idx].medical_supplie_id;
      set1 = this.list[idx].set1;
      set2 = this.list[idx].set2;
      set3 = this.list[idx].set3;
      set4 = this.list[idx].set4;
    }

    const idxGcs = findIndex(this.gcs, { id: gcsId });
    if (idxGcs > -1) {
      this.showDetail.gcsId = this.gcs[idxGcs].id;
      this.showDetail.gcsName = this.gcs[idxGcs].name;
    }
    const idxBed = findIndex(this.beds, { id: bedId });
    if (idxGcs > -1) {
      this.showDetail.bedId = this.beds[idxBed].id;
      this.showDetail.bedName = this.beds[idxBed].name;
    }

    const idxMs = findIndex(this.medicalSupplies, { id: msId });
    if (idxMs > -1) {
      this.showDetail.medicalSupplieId = this.medicalSupplies[idxMs].id;
      this.showDetail.medicalSupplieName = this.medicalSupplies[idxMs].name;
    }
    if (this.list[idx].set1 === 1) {
      this.showDetail.set1Name = 'Hydroxychloroquine 200 mg.';
    } else if (this.list[idx].set1 === 1) {
      this.showDetail.set1Name = 'Chloroquine 250 mg.';
    }

    if (this.list[idx].set2 === 3) {
      this.showDetail.set2Name = 'Darunavir 600mg+Ritonavir100 mg.';
    } else if (this.list[idx].set2 === 4) {
      this.showDetail.set2Name = 'Lopinavir 200 mg+Ritonavir 50 mg.';
    }

    if (this.list[idx].set3 === 7) {
      this.showDetail.set3Name = 'Azithromycin 250 mg.';
    }

    if (this.list[idx].set4 === 8) {
      this.showDetail.set4Name = 'Favipiravir (เบิกจาก AntiDote) คลิก';
    }

    this.confirmDetail = true;
  }

  async onClickSave(id) {
    try {
      const confirm = await this.alertService.confirm();
      if (confirm) {
        const idx = findIndex(this.list, { 'covid_case_id': id });
        if (idx > -1) {
          // this.list[idx].create_date = this.dateCut;
          // this.list[idx].entry_date = this.dateCut;
          // this.list[idx].drugs = await this.setGenericSave(this.list[idx]);
          const rs: any = await this.covidCaseService.updateStatus(this.list[idx]);
          if (rs.ok) {
            this.getList();
            // this.getGCSSum();
            // this.getBedSum();
            // this.getMedicalSuppliesSum();
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

  async onClickEdit(id) {
    const idx = findIndex(this.list, { 'covid_case_id': id });
    if (idx > -1) {
      if ('is_edit' in this.list[idx]) {
        if (this.list[idx].is_edit) {
          this.onClickSave(id);
          this.list[idx].is_edit = false;
        } else {
          this.list[idx].is_edit = true;
        }
      } else {
        this.list[idx].is_edit = true;
      }
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
    let textConfirm = 'คุณต้องการดำเนินการนี้ ใช่หรือไม่?';
    if (this.modalDischargeType === 'DEATH') {
      textConfirm = 'ผู้ป่วยเสียชีวิตจาก Covid ใช่หรือไม่ ถ้าไม่ใช่และผลเป็น Negative แล้วเสียชีวิตด้วยอาการอื่นให้กดยกเลิกและเลือกจำหน่าย "ตรวจไม่พบเชื้อ"';
    }
    const confirm = await this.alertService.confirm(textConfirm);
    if (confirm) {
      if (this.dateDischarge != null) {
        try {
          const obj: any = {};
          let status = null;
          if (this.modalDischargeType === 'HOME') {
            status = 'DISCHARGE';
          } else if (this.modalDischargeType === 'DEATH') {
            status = 'DEATH';
          } else if (this.modalDischargeType === 'REFER') {
            status = 'REFER';
            obj.hospitalId = this.hospitalId;
            obj.reason = this.reason;
          } else if (this.modalDischargeType === 'NEGATIVE') {
            status = 'NEGATIVE';
          }
          obj.dateDischarge = this.dateDischarge.date.year + '-' + this.dateDischarge.date.month + '-' + this.dateDischarge.date.day + ' ' + this.hour + ':' + this.minute + ':00';
          obj.covidCaseId = this.selected.covid_case_id;
          obj.status = status;
          obj.dischargeReason = this.dischargeReason;

          const rs: any = await this.covidCaseService.updateDischarge(obj, this.selected);
          if (rs.ok) {
            this.modalDischarge = false;
            this.getList();
            // this.getGCSSum();
            // this.getBedSum();
            // this.getMedicalSuppliesSum();
            this.alertService.success();
          } else {
            console.log(rs.error);
            this.alertService.serverError();
          }
        } catch (error) {
          console.log(error);
          this.alertService.serverError();
        }
      } else {
        this.alertService.error('กรุณาระบุวันที่');
      }
    }
  }

  uncheckRadio(listId, generic, type = '') {
    const idx = findIndex(this.list, { covid_case_id: listId });
    if (idx > -1 && type) {
      this.list[idx][type] = this.list[idx][type] === generic ? null : generic;
    }
  }

  checkDrug(id, i) {
    console.log(id, i.id);
    console.log(this.list);

    const idx = findIndex(this.list, { covid_case_id: id });
    if (idx > -1) {
      console.log(this.list[idx].drugs);

      const idxD = findIndex(this.list[idx].drugs, { id: +i.id });
      if (idxD > -1) {
        console.log('this.list[idx].drugs[idxD].is_check', this.list[idx].drugs[idxD].is_check);
        if (this.list[idx].drugs[idxD].is_check) {
          this.list[idx].drugs[idxD].is_check = 0;
        } else {
          this.list[idx].drugs[idxD].is_check = 1;
        }
      } else {
        // this.list[idx].drugs.push({ generic_id: i.id });
      }
    }
  }

  async doEnter(e) {
    if (e.keyCode === 13) {
      await this.getList();
    }
  }

  onClickSearch() {
    this.getList();
  }

  uncheckRadioMedicalSupplies(listId, ms) {
    // console.log(listId,ms);

    const idx = findIndex(this.list, { covid_case_id: listId });
    if (idx > -1) {
      this.list[idx].medical_supplie_id = this.list[idx].medical_supplie_id === ms ? null : ms;
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


  async onClickSaveAll() {
    const confirm = await this.alertService.confirm('ระบบจะทำการบันทึกอาการคนไข้ทั้งหมด ที่ยังไม่ได้บันทึกอาการ โดยตั้งเป็นอาการเดิมทั้งหมด');
    if (confirm) {
      this.loading.show();
      const rs: any = await this.covidCaseService.updateAllCase(this.gcsSearchId, this.bedSearchId);
      if (rs.ok) {
        console.log(rs.rows);
        this.getList();
        // this.getGCSSum();
        // this.getBedSum();
        // this.getMedicalSuppliesSum();
        this.alertService.success();
      } else {
        this.alertService.error(rs.error);
      }
    }
    this.loading.hide();
  }

  async doExportExcel() {
    this.loading.show();
    try {
      const rs: any = await this.service.getPatientCaseAdminExcel();
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('สถานะผู้ป่วยรายวัน ' + moment(this.date).format('DDMMYYYY') + this.time, 'xlsx', rs);
        this.loading.hide();
      }
    } catch (error) {
      console.log(error);
      this.alertService.error();
      this.loading.hide();
    }
  }

  downloadFile(name, type, data: any) {
    try {
      const url = window.URL.createObjectURL(new Blob([data]));
      console.log(url);
      const fileName = `${name}.${type}`;
      // Debe haber una manera mejor de hacer esto...
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove(); // remove the element
    } catch (error) {
      console.log(error);
      this.alertService.error();
    }
  }

}
