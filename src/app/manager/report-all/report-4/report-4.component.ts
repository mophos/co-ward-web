import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportAllService } from '../report-all.service';
import { AlertService } from '../../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IMyOptions } from 'mydatepicker-th';
import * as moment from 'moment';
import { sumBy, filter } from 'lodash';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-4',
  templateUrl: './report-4.component.html',
  styles: []
})
export class Report4Component implements OnInit {
  zone: any = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'];
  selectedZone: any = 'all';
  selectedProvince: any = 'all';
  province: any;
  listProvince: any;

  list: any = [];
  listFilter: any = [];
  date: any;
  arDates: any = [];
  admit: any;
  discharge: any;
  dischargeHospitel: any;
  dischargeDeath: any;
  puiAdmit: any;
  puiDischarge: any;
  puiDischargeHospitel: any;
  puiDischargeDeath: any;
  observe: any;

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };
  @ViewChild('loading', { static: false }) loading: any;
  sector: any;
  public jwtHelper = new JwtHelperService();

  constructor(
    private reportService: ReportAllService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {
    const params = this.route.snapshot.params;
    this.sector = params.sector;
  }

  async ngOnInit() {
    await this.getProvince();
    this.date = moment().format('DD/MM/YYYY');
    await this.dates();
    await this.getList();
  }

  dates() {
    for (let v = 0; v < 10; v++) {
      this.arDates.push(moment().subtract(v, 'days').format('DD/MM/YYYY'));
    }
  }

  selectDate(date) {
    this.date = date;
    this.getList();
  }

  async getList() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.getReport4(moment(this.date, 'DD/MM/YYYY').format('YYYY-MM-DD'), this.sector);
      if (rs.ok) {
        this.admit = sumBy(rs.rows, 'admit');
        this.discharge = sumBy(rs.rows, 'discharge');
        this.dischargeHospitel = sumBy(rs.rows, 'discharge_hospitel');
        this.dischargeDeath = sumBy(rs.rows, 'discharge_death');
        this.puiAdmit = sumBy(rs.rows, 'pui_admit');
        this.puiDischarge = sumBy(rs.rows, 'pui_discharge');
        this.puiDischargeHospitel = sumBy(rs.rows, 'pui_discharge_hospitel');
        this.puiDischargeDeath = sumBy(rs.rows, 'pui_discharge_death');
        this.observe = sumBy(rs.rows, 'observe');

        this.list = rs.rows;
        this.listFilter = rs.rows;
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
  async getProvince() {
    try {
      const rs: any = await this.reportService.getProvince();
      if (rs.ok) {
        this.province = rs.rows;
        this.listProvince = rs.rows;
      }
    } catch (error) {
      console.log(error);
    }
  }
  doEnter() {
    this.getList();
  }

  async onClickExport() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.getReport4Excel(moment(this.date).format('YYYY-MM-DD'), this.sector);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('4.ยอดผู้ป่วยสะสมรวมที่รับไว้รักษาในโรงพยาบาล', 'xlsx', rs);
        // this.downloadFile('รายงานการจ่ายยา(แยกตามสถานที่จ่าย)', 'xlsx', url);
        this.loading.hide();
      }
    } catch (error) {
      console.log(error);
      this.alertService.error();
      this.loading.hide();
    }
  }

  onChangeZone() {
    this.selectedProvince = 'all';
    this.listProvince = filter(this.province, { zone_code: this.selectedZone });
  }

  async onClickSearch() {
    if (this.selectedZone === 'all' && this.selectedProvince === 'all') {
      this.listFilter = this.list;
      this.admit = sumBy(this.listFilter, 'admit');
      this.discharge = sumBy(this.listFilter, 'discharge');
      this.dischargeHospitel = sumBy(this.listFilter, 'discharge_hospitel');
      this.dischargeDeath = sumBy(this.listFilter, 'discharge_death');
      this.puiAdmit = sumBy(this.listFilter, 'pui_admit');
      this.puiDischarge = sumBy(this.listFilter, 'pui_discharge');
      this.puiDischargeHospitel = sumBy(this.listFilter, 'pui_discharge_hospitel');
      this.puiDischargeDeath = sumBy(this.listFilter, 'pui_discharge_death');
      this.observe = sumBy(this.listFilter, 'observe');
    } else if (this.selectedZone !== 'all' && this.selectedProvince === 'all') {
      this.listFilter = filter(this.list, { zone_code: this.selectedZone });
      this.admit = sumBy(this.listFilter, 'admit');
      this.discharge = sumBy(this.listFilter, 'discharge');
      this.dischargeHospitel = sumBy(this.listFilter, 'discharge_hospitel');
      this.dischargeDeath = sumBy(this.listFilter, 'discharge_death');
      this.puiAdmit = sumBy(this.listFilter, 'pui_admit');
      this.puiDischarge = sumBy(this.listFilter, 'pui_discharge');
      this.puiDischargeHospitel = sumBy(this.listFilter, 'pui_discharge_hospitel');
      this.puiDischargeDeath = sumBy(this.listFilter, 'pui_discharge_death');
      this.observe = sumBy(this.listFilter, 'observe');
    } else if (this.selectedZone !== 'all' && this.selectedProvince !== 'all') {
      this.listFilter = filter(this.list, { zone_code: this.selectedZone, province_code: this.selectedProvince });
      this.admit = sumBy(this.listFilter, 'admit');
      this.discharge = sumBy(this.listFilter, 'discharge');
      this.dischargeHospitel = sumBy(this.listFilter, 'discharge_hospitel');
      this.dischargeDeath = sumBy(this.listFilter, 'discharge_death');
      this.puiAdmit = sumBy(this.listFilter, 'pui_admit');
      this.puiDischarge = sumBy(this.listFilter, 'pui_discharge');
      this.puiDischargeHospitel = sumBy(this.listFilter, 'pui_discharge_hospitel');
      this.puiDischargeDeath = sumBy(this.listFilter, 'pui_discharge_death');
      this.observe = sumBy(this.listFilter, 'observe');
    } else {
      this.listFilter = this.list;
      this.admit = sumBy(this.listFilter, 'admit');
      this.discharge = sumBy(this.listFilter, 'discharge');
      this.dischargeHospitel = sumBy(this.listFilter, 'discharge_hospitel');
      this.dischargeDeath = sumBy(this.listFilter, 'discharge_death');
      this.puiAdmit = sumBy(this.listFilter, 'pui_admit');
      this.puiDischarge = sumBy(this.listFilter, 'pui_discharge');
      this.puiDischargeHospitel = sumBy(this.listFilter, 'pui_discharge_hospitel');
      this.puiDischargeDeath = sumBy(this.listFilter, 'pui_discharge_death');
      this.observe = sumBy(this.listFilter, 'observe');
    }
    console.log(this.selectedZone, this.selectedProvince);
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

