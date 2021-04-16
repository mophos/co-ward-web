import { BasicService } from './../services/basic.service';
import { AlertService } from 'src/app/help/alert.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { findIndex } from 'lodash';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
@Component({
  selector: 'app-cio-check-patient',
  templateUrl: './cio-check-patient.component.html',
  styles: []
})
export class CioCheckPatientComponent implements OnInit {

  list: any = [];
  remark: any = '';
  showPersons: any;
  modalRemark = false;
  data: any;
  status: any;
  date: any;
  @ViewChild('loading' ,{static: false}) loading: any;
  rights: any;
  public jwtHelper = new JwtHelperService();
  constructor(
    private reportService: ReportService,
    private alertService: AlertService,
    private basicService: BasicService
  ) {
    const decoded = this.jwtHelper.decodeToken(sessionStorage.getItem('token'));
    this.rights = decoded.rights;
    this.showPersons = findIndex(this.rights, { name: 'MANAGER_REPORT_PERSON' }) === -1 ? false : true;
  }

  async ngOnInit() {
    await this.getList();
    await this.getDate();
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
  async getList() {
    try {
      this.loading.show();
      const rs: any = await this.reportService.admitConfirmCase();
      if (rs.ok) {
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

  async onClickCheck(l, status) {
    try {
      if (status === 'WRONG') {
        this.data = l;
        this.status = status;
        this.modalRemark = true;
      } else {
        this.onCheck(l, status);
      }
      this.remark = '';
    } catch (error) {
      this.alertService.error(error);
    }
  }
  onSaveRemark() {
    this.modalRemark = false;
    this.onCheck(this.data, this.status);
  }

  async onCheck(l, status) {
    try {
      let message = `HN ${l.hn}, ${l.first_name} ${l.last_name} `;
      if (status === 'CORRECT') {
        message += 'ข้อมูลถูกต้อง';
      } else if (status === 'WRONG') {
        message += 'ข้อมูล ไม่ ถูกต้อง';
      } else if (status === 'NOTUPDATE') {
        message += 'ข้อมูลไม่ได้อัพเดต';
      }

      const confirm = await this.alertService.confirm(message);
      if (confirm) {
        this.loading.show();
        const data = {
          status,
          covidCaseDetailId: l.covid_case_detail_id,
          remark: this.remark
        };
        const rs: any = await this.reportService.checkAdmitConfirmCase(data);
        if (rs.ok) {
          this.getList();
        } else {
          this.alertService.error(rs.error);
        }
      }
      this.loading.hide();
    } catch (error) {
      this.loading.hide();
      this.alertService.error(error);
    }
  }

  async onClickExport() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.exportCheckAdmitConfirmCase();
      console.log(rs);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('cio_check', 'xlsx', rs);
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
}
