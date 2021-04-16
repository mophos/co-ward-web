import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/help/alert.service';
import { ReportAllService } from '../report-all.service';
import { IMyOptions } from 'mydatepicker-th';
import * as moment from 'moment';
import { sumBy, filter } from 'lodash';
@Component({
  selector: 'app-report-3',
  templateUrl: './report-3.component.html',
  styles: []
})
export class Report3Component implements OnInit {
  @ViewChild('loading', { static: false }) public loading;
  zone: any = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'];
  selectedZone: any = 'all';
  selectedProvince: any = 'all';
  province: any;
  listProvince: any;

  list: any = [];
  listFilter: any = [];
  date: any;
  arDates: any = [];
  sum = {
    ip_pui: 0,
    asymptomatic: 0,
    mild: 0,
    moderate: 0,
    severe: 0
  };
  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };
  sector: any;
  constructor(
    private alertService: AlertService,
    private reportService: ReportAllService,
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
    for (let v = 1; v < 10; v++) {
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
      const rs: any = await this.reportService.getReport3(moment(this.date, 'DD/MM/YYYY').format('YYYY-MM-DD'), this.sector);
      if (rs.ok) {
        this.list = rs.rows;
        this.listFilter = rs.rows;
        this.sum = {
          ip_pui: sumBy(this.list, 'ip_pui'),
          asymptomatic: sumBy(this.list, 'asymptomatic'),
          mild: sumBy(this.list, 'mild'),
          moderate: sumBy(this.list, 'moderate'),
          severe: sumBy(this.list, 'severe'),
        };
        this.loading.hide();
      } else {
        this.loading.hide();
        this.alertService.error(rs.error);
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

  async onClickExport() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.getReport3Excel(moment(this.date).format('YYYY-MM-DD'), this.sector);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('3.รายงานการแจ้งจำนวนผู้ป่วยเพื่อเบิกเวชภัณฑ์​สิ้นเปลืองประจำวัน', 'xlsx', rs);
        this.loading.hide();
      }
    } catch (error) {
      console.log(error);
      this.alertService.error(error);
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
      this.sum = {
        ip_pui: sumBy(this.listFilter, 'ip_pui'),
        asymptomatic: sumBy(this.listFilter, 'asymptomatic'),
        mild: sumBy(this.listFilter, 'mild'),
        moderate: sumBy(this.listFilter, 'moderate'),
        severe: sumBy(this.listFilter, 'severe'),
      };
    } else if (this.selectedZone !== 'all' && this.selectedProvince === 'all') {
      this.listFilter = filter(this.list, { zone_code: this.selectedZone });
      this.sum = {
        ip_pui: sumBy(this.listFilter, 'ip_pui'),
        asymptomatic: sumBy(this.listFilter, 'asymptomatic'),
        mild: sumBy(this.listFilter, 'mild'),
        moderate: sumBy(this.listFilter, 'moderate'),
        severe: sumBy(this.listFilter, 'severe'),
      };
    } else if (this.selectedZone !== 'all' && this.selectedProvince !== 'all') {
      this.listFilter = filter(this.list, { zone_code: this.selectedZone, province_code: this.selectedProvince });
      this.sum = {
        ip_pui: sumBy(this.listFilter, 'ip_pui'),
        asymptomatic: sumBy(this.listFilter, 'asymptomatic'),
        mild: sumBy(this.listFilter, 'mild'),
        moderate: sumBy(this.listFilter, 'moderate'),
        severe: sumBy(this.listFilter, 'severe'),
      };
    } else {
      this.listFilter = this.list;
      this.sum = {
        ip_pui: sumBy(this.listFilter, 'ip_pui'),
        asymptomatic: sumBy(this.listFilter, 'asymptomatic'),
        mild: sumBy(this.listFilter, 'mild'),
        moderate: sumBy(this.listFilter, 'moderate'),
        severe: sumBy(this.listFilter, 'severe'),
      };
    }
    console.log(this.selectedZone, this.selectedProvince);
  }

  doEnter() {
    this.getList();
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
      this.alertService.error(error);
    }
  }
}
