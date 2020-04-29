import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { AlertService } from '../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { IMyOptions } from 'mydatepicker-th';
@Component({
  selector: 'app-report-patients',
  templateUrl: './report-patients.component.html',
  styles: []
})
export class ReportPatientsComponent implements OnInit {

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
        day: moment().get('day')
      }
    };
    const date = this.date.date.year + '-' + this.date.date.month + '-' + this.date.date.day;
    await this.getGcs(date);
  }

  async getGcs(date) {
    this.loading.show();
    try {
      const rs: any = await this.service.getPatients(date, null);
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

  async onChangeDate(e) {
    const date = e.date.year + '-' + e.date.month + '-' + e.date.day;
    await this.getGcs(date);
    // console.log(e);

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
