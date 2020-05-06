import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { AlertService } from '../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { IMyOptions } from 'mydatepicker-th';
@Component({
  selector: 'app-report-patient-admit',
  templateUrl: './report-patient-admit.component.html',
  styles: []
})
export class ReportPatientAdmitComponent implements OnInit {


  list: any;
  query: any = '';
  date: any;
  public jwtHelper = new JwtHelperService();
  @ViewChild('loading') loading: any;

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };

  constructor(
    private service: ReportService,
    private alertService: AlertService
  ) {
    const token = sessionStorage.getItem('token');
    const decoded = this.jwtHelper.decodeToken(token);
  }

  async ngOnInit() {
    this.date = {
      date: {
        year: moment().get('year'),
        month: moment().get('month') + 1,
        day: moment().get('date')
      }
    };
    await this.getGcs();
  }

  async getGcs() {
    this.loading.show();
    try {
      const date = this.date.date.year + '-' + this.date.date.month + '-' + this.date.date.day;
      const rs: any = await this.service.getAdmitPatients(date, null);
      if (rs.ok) {
        this.list = rs.rows;
        console.log(this.list);
        this.loading.hide();
      } else {
        this.loading.hide();
        this.alertService.error();
      }
    } catch (error) {
      this.loading.hide();
      this.alertService.error(error);
    }
  }

  onChangeDate() {
    this.getGcs();
    // console.log(e);

  }

  async doExportExcel() {
    this.loading.show();
    try {
      const date = this.date.date.year + '-' + this.date.date.month + '-' + this.date.date.day;
      const rs: any = await this.service.getAdmitPatientExport(date);
      console.log(rs);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('report-patient-admit', 'xlsx', rs);
        // this.downloadFile('รายงานการจ่ายยา(แยกตามสถานที่จ่าย)', 'xlsx', url);
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

  // async getList() {
  //   this.loading.show();
  //   try {
  //     const rs: any = await this.service.getPatients(this.query);
  //     if (rs.ok) {
  //       this.list = rs.rows;
  //       this.loading.hide();
  //     } else {
  //       this.loading.hide();
  //       this.alertService.error();
  //     }
  //   } catch (error) {
  //     this.loading.hide();
  //     this.alertService.error(error);
  //   }
  // }

  // async getCase() {
  //   this.loading.show();
  //   try {
  //     const rs: any = await this.service.getCase();
  //     if (rs.ok) {
  //       this.case = rs.rows;
  //       this.loading.hide();
  //     } else {
  //       this.loading.hide();
  //       this.alertService.error();
  //     }
  //   } catch (error) {
  //     this.loading.hide();
  //     this.alertService.error(error);
  //   }
  // }

  // async merge() {
  //   try {
  //     for (const v of this.case) {
  //       for (const e of this.list) {
  //         const idx: any = findIndex(e.hospital, { hospital_id: v.hospital_id });
  //         if (idx > -1) {
  //           e.hospital[idx].ippui = e.hospital[idx].ippui === undefined ? 0 : e.hospital[idx].ippui;
  //           e.hospital[idx].severe = e.hospital[idx].severe === undefined ? 0 : e.hospital[idx].severe;
  //           e.hospital[idx].moderate = e.hospital[idx].moderate === undefined ? 0 : e.hospital[idx].moderate;
  //           e.hospital[idx].mild = e.hospital[idx].mild === undefined ? 0 : e.hospital[idx].mild;
  //           e.hospital[idx].asymptomatic = e.hospital[idx].asymptomatic === undefined ? 0 : e.hospital[idx].asymptomatic;
  //           if (v.name === 'IP PUI') {
  //             e.hospital[idx].ippui += 1;
  //           } else if (v.name === 'Severe') {
  //             e.hospital[idx].severe += 1;
  //           } else if (v.name === 'Moderate') {
  //             e.hospital[idx].moderate += 1;
  //           } else if (v.name === 'Mild') {
  //             e.hospital[idx].mild += 1;
  //           } else if (v.name === 'Asymptomatic') {
  //             e.hospital[idx].asymptomatic += 1;
  //           }
  //         }
  //       }
  //     }

  //     for (const v of this.list) {
  //       let count = 0;
  //       let ippui = 0;
  //       let severe = 0;
  //       let moderate = 0;
  //       let mild = 0;
  //       let asymptomatic = 0;
  //       for (const e of v.hospital) {
  //         count += e.count;
  //         ippui += e.ippui;
  //         severe += e.severe;
  //         moderate += e.moderate;
  //         mild += e.mild;
  //         asymptomatic += e.asymptomatic;
  //       }
  //       v.count = count;
  //       v.ippui = ippui;
  //       v.severe = severe;
  //       v.moderate = moderate;
  //       v.mild = mild;
  //       v.asymptomatic = asymptomatic;

  //       this.total += count;
  //       this.ippui += ippui;
  //       this.severe += severe;
  //       this.moderate += moderate;
  //       this.mild += mild;
  //       this.asymptomatic += asymptomatic;
  //     }
  //   } catch (error) {
  //     this.alertService.error(error);
  //   }
  // }

  // async doEnter(e) {
  //   if (e.keyCode === 13) {
  //     await this.getList();
  //   }
  // }

  // async onEnter(e) {
  //   await this.getList();
  // }
}
