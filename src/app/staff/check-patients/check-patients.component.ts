import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { AlertService } from '../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as findIndex from 'lodash/findIndex';

@Component({
  selector: 'app-check-patients',
  templateUrl: './check-patients.component.html',
  styles: []
})
export class CheckPatientsComponent implements OnInit {

  list: any;
  query: any = '';

  public jwtHelper = new JwtHelperService();
  @ViewChild('loading') loading: any;

  constructor(
    private service: ReportService,
    private alertService: AlertService
  ) {
    const token = sessionStorage.getItem('token');
    const decoded = this.jwtHelper.decodeToken(token);
    console.log(decoded);

  }

  async ngOnInit() {
    // await this.getList();
    // await this.getCase();
    // await this.merge();
    await this.getGcs();
  }

  async getGcs() {
    this.loading.show();
    try {
      const rs: any = await this.service.getPatients(null, null);
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
    console.log(e);

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
