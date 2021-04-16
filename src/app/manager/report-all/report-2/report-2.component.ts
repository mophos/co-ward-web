import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportAllService } from '../report-all.service';
import { AlertService } from '../../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IMyOptions } from 'mydatepicker-th';
import * as moment from 'moment';
import { sumBy, filter } from 'lodash';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-report-2',
  templateUrl: './report-2.component.html',
  styles: []
})
export class Report2Component implements OnInit {
  zone: any = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'];
  selectedZone: any = 'all';
  selectedProvince: any = 'all';
  province: any;
  listProvince: any;

  list: any = [];
  listFilter: any = [];
  date: any;
  dateShow: any;
  sCase: any;
  mCase: any;
  mdCase: any;
  aCase: any;
  pCase: any;
  oCase: any;
  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };
  @ViewChild('loading', { static: false }) loading: any;

  public jwtHelper = new JwtHelperService();
  sector: any;
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
    this.date = {
      date: {
        year: moment().get('year'),
        month: moment().get('month') + 1,
        day: moment().get('date')
      }
    };
    await this.getList();
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
  onChangeZone() {
    this.selectedProvince = 'all';
    this.listProvince = filter(this.province, { zone_code: this.selectedZone });
  }

  async getList() {
    this.loading.show();
    try {
      this.dateShow = this.date.date.year + '-' + this.date.date.month + '-' + this.date.date.day;
      const rs: any = await this.reportService.getReport2(this.dateShow, this.sector);
      if (rs.ok) {
        this.sCase = sumBy(rs.rows, 'severe');
        this.mCase = sumBy(rs.rows, 'moderate');
        this.mdCase = sumBy(rs.rows, 'mild');
        this.aCase = sumBy(rs.rows, 'asymptomatic');
        this.pCase = sumBy(rs.rows, 'ip_pui');
        this.oCase = sumBy(rs.rows, 'observe');
        this.list = rs.rows;
        this.listFilter = rs.rows;

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

  async onClickSearch() {
    console.log(this.list);

    if (this.selectedZone === 'all' && this.selectedProvince === 'all') {
      this.listFilter = this.list;
      this.sCase = sumBy(this.listFilter, 'severe');
      this.mCase = sumBy(this.listFilter, 'moderate');
      this.mdCase = sumBy(this.listFilter, 'mild');
      this.aCase = sumBy(this.listFilter, 'asymptomatic');
      this.pCase = sumBy(this.listFilter, 'ip_pui');
      this.oCase = sumBy(this.listFilter, 'observe');
    } else if (this.selectedZone !== 'all' && this.selectedProvince === 'all') {
      this.listFilter = filter(this.list, { zone_code: this.selectedZone });
      this.sCase = sumBy(this.listFilter, 'severe');
      this.mCase = sumBy(this.listFilter, 'moderate');
      this.mdCase = sumBy(this.listFilter, 'mild');
      this.aCase = sumBy(this.listFilter, 'asymptomatic');
      this.pCase = sumBy(this.listFilter, 'ip_pui');
      this.oCase = sumBy(this.listFilter, 'observe');
    } else if (this.selectedZone !== 'all' && this.selectedProvince !== 'all') {
      this.listFilter = filter(this.list, { zone_code: this.selectedZone, province_code: this.selectedProvince });
      this.sCase = sumBy(this.listFilter, 'severe');
      this.mCase = sumBy(this.listFilter, 'moderate');
      this.mdCase = sumBy(this.listFilter, 'mild');
      this.aCase = sumBy(this.listFilter, 'asymptomatic');
      this.pCase = sumBy(this.listFilter, 'ip_pui');
      this.oCase = sumBy(this.listFilter, 'observe');
    } else {
      this.listFilter = this.list;
      this.sCase = sumBy(this.listFilter, 'severe');
      this.mCase = sumBy(this.listFilter, 'moderate');
      this.mdCase = sumBy(this.listFilter, 'mild');
      this.aCase = sumBy(this.listFilter, 'asymptomatic');
      this.pCase = sumBy(this.listFilter, 'ip_pui');
      this.oCase = sumBy(this.listFilter, 'observe');
    }
    console.log(this.selectedZone, this.selectedProvince);
  }

  doEnter() {
    this.getList();
  }

  async doExportExcel() {
    this.loading.show();
    try {
      this.dateShow = this.date.date.year + '-' + this.date.date.month + '-' + this.date.date.day;
      const rs: any = await this.reportService.getReport2Excel(this.dateShow, this.sector);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('2.ประเภทความรุนแรงของผู้ป่วยที่ยังรักษาตัวอยู่', 'xlsx', rs);
        // this.downloadFile('รายงานการจ่ายยา(แยกตามสถานที่จ่าย)', 'xlsx', url);
        this.loading.hide();
      }
    } catch (error) {
      console.log(error);
      this.alertService.error();
      this.loading.hide();
    }
  }

  // async doExportCsv() {
  //   this.loading.show();
  //   try {
  //     const rs: any = await this.reportService.getReportBedCsv();
  //     console.log(rs);
  //     if (!rs) {
  //       this.loading.hide();
  //     } else {
  //       this.downloadFile('report-dms2', 'csv', rs);
  //       // this.downloadFile('รายงานการจ่ายยา(แยกตามสถานที่จ่าย)', 'xlsx', url);
  //       this.loading.hide();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     this.alertService.error();
  //     this.loading.hide();
  //   }
  // }

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
