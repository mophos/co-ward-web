import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportAllService } from '../report-all.service';
import { AlertService } from '../../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { sumBy, filter } from 'lodash';
import { IMyOptions } from 'mydatepicker-th';

@Component({
  selector: 'app-report-6',
  templateUrl: './report-6.component.html',
  styles: []
})
export class Report6Component implements OnInit {
  zone: any = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'];
  selectedZone: any = 'all';
  selectedProvince: any = 'all';
  province: any;
  listProvince: any;

  listHospital: any = [];
  listMinistry: any = [];
  listSector: any = [];
  listHospitalFilter: any = [];
  listMinistryFilter: any = [];
  listSectorFilter: any = [];
  date: any;
  tab: any = 1;

  aiir1: any;
  aiir2: any;
  aiir3: any;
  modi1: any;
  modi2: any;
  modi3: any;
  iso1: any;
  iso2: any;
  iso3: any;
  coh1: any;
  coh2: any;
  coh3: any;
  host1: any;
  host2: any;
  host3: any;
  cohortIcu1: any;
  cohortIcu2: any;
  cohortIcu3: any;
  sector: any;
  @ViewChild('loading', { static: true }) loading: any;

  public jwtHelper = new JwtHelperService();
  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };
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
    this.date = moment().format('YYYY-MM-DD');
    await this.getList3();
    await this.getList2();
    await this.getList1();
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

  async onChangeTab(v) {
    await this.loading.show();
    this.selectedZone = 'all';
    this.selectedProvince = 'all';
    this.tab = v;
    await this.onClickSearch();
    await this.loading.hide();
  }

  async sumByReport(rows) {
    this.aiir1 = sumBy(rows, 'aiir_covid_qty');
    this.aiir2 = sumBy(rows, 'aiir_usage_qty');
    this.aiir3 = sumBy(rows, 'aiir_covid_qty') - sumBy(rows, 'aiir_usage_qty');
    this.modi1 = sumBy(rows, 'modified_aiir_covid_qty');
    this.modi2 = sumBy(rows, 'modified_aiir_usage_qty');
    this.modi3 = sumBy(rows, 'modified_aiir_covid_qty') - sumBy(rows, 'modified_aiir_usage_qty');
    this.iso1 = sumBy(rows, 'isolate_covid_qty');
    this.iso2 = sumBy(rows, 'isolate_usage_qty');
    this.iso3 = sumBy(rows, 'isolate_covid_qty') - sumBy(rows, 'isolate_usage_qty');
    this.coh1 = sumBy(rows, 'cohort_covid_qty');
    this.coh2 = sumBy(rows, 'cohort_usage_qty');
    this.coh3 = sumBy(rows, 'cohort_covid_qty') - sumBy(rows, 'cohort_usage_qty');
    this.host1 = sumBy(rows, 'hospitel_covid_qty');
    this.host2 = sumBy(rows, 'hospitel_usage_qty');
    this.host3 = sumBy(rows, 'hospitel_covid_qty') - sumBy(rows, 'hospitel_usage_qty');
    this.cohortIcu1 = sumBy(rows, 'cohort_icu_covid_qty');
    this.cohortIcu2 = sumBy(rows, 'cohort_icu_usage_qty');
    this.cohortIcu3 = sumBy(rows, 'cohort_icu_covid_qty') - sumBy(rows, 'cohort_icu_usage_qty');
  }

  async onClickSearch() {
    if (this.selectedZone === 'all' && this.selectedProvince === 'all') {
      this.listHospitalFilter = this.listHospital;
      this.listSectorFilter = this.listSector;
      this.listMinistryFilter = this.listMinistry;
      if (this.tab === 1) {
        await this.sumByReport(this.listSectorFilter);
      } else if (this.tab === 2) {
        await this.sumByReport(this.listMinistryFilter);
      } else if (this.tab === 3) {
        await this.sumByReport(this.listHospitalFilter);
      }
    } else if (this.selectedZone !== 'all' && this.selectedProvince === 'all') {
      this.listHospitalFilter = filter(this.listHospital, { zone_code: this.selectedZone });
      this.listSectorFilter = filter(this.listSector, { zone_code: this.selectedZone });
      this.listMinistryFilter = filter(this.listMinistry, { zone_code: this.selectedZone });
      if (this.tab === 1) {
        await this.sumByReport(this.listSectorFilter);
      } else if (this.tab === 2) {
        await this.sumByReport(this.listMinistryFilter);
      } else if (this.tab === 3) {
        await this.sumByReport(this.listHospitalFilter);
      }
    } else if (this.selectedZone !== 'all' && this.selectedProvince !== 'all') {
      this.listHospitalFilter = filter(this.listHospital, { zone_code: this.selectedZone, province_code: this.selectedProvince });
      this.listSectorFilter = filter(this.listSector, { zone_code: this.selectedZone, province_code: this.selectedProvince });
      this.listMinistryFilter = filter(this.listMinistry, { zone_code: this.selectedZone, province_code: this.selectedProvince });
      if (this.tab === 1) {
        await this.sumByReport(this.listSectorFilter);
      } else if (this.tab === 2) {
        await this.sumByReport(this.listMinistryFilter);
      } else if (this.tab === 3) {
        await this.sumByReport(this.listHospitalFilter);
      }
    } else {
      this.listHospitalFilter = this.listHospital;
      this.listSectorFilter = this.listSector;
      this.listMinistryFilter = this.listMinistry;
      if (this.tab === 1) {
        await this.sumByReport(this.listSectorFilter);
      } else if (this.tab === 2) {
        await this.sumByReport(this.listMinistryFilter);
      } else if (this.tab === 3) {
        await this.sumByReport(this.listHospitalFilter);
      }
    }
  }

  async getList1() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.getReport6(this.date, this.sector);
      if (rs.ok) {
        this.aiir1 = sumBy(rs.rows, 'aiir_covid_qty');
        this.aiir2 = sumBy(rs.rows, 'aiir_usage_qty');
        this.aiir3 = sumBy(rs.rows, 'aiir_covid_qty') - sumBy(rs.rows, 'aiir_usage_qty');
        this.modi1 = sumBy(rs.rows, 'modified_aiir_covid_qty');
        this.modi2 = sumBy(rs.rows, 'modified_aiir_usage_qty');
        this.modi3 = sumBy(rs.rows, 'modified_aiir_covid_qty') - sumBy(rs.rows, 'modified_aiir_usage_qty');
        this.iso1 = sumBy(rs.rows, 'isolate_covid_qty');
        this.iso2 = sumBy(rs.rows, 'isolate_usage_qty');
        this.iso3 = sumBy(rs.rows, 'isolate_covid_qty') - sumBy(rs.rows, 'isolate_usage_qty');
        this.coh1 = sumBy(rs.rows, 'cohort_covid_qty');
        this.coh2 = sumBy(rs.rows, 'cohort_usage_qty');
        this.coh3 = sumBy(rs.rows, 'cohort_covid_qty') - sumBy(rs.rows, 'cohort_usage_qty');
        this.host1 = sumBy(rs.rows, 'hospitel_covid_qty');
        this.host2 = sumBy(rs.rows, 'hospitel_usage_qty');
        this.host3 = sumBy(rs.rows, 'hospitel_covid_qty') - sumBy(rs.rows, 'hospitel_usage_qty');
        this.cohortIcu1 = sumBy(rs.rows, 'cohort_icu_covid_qty');
        this.cohortIcu2 = sumBy(rs.rows, 'cohort_icu_usage_qty');
        this.cohortIcu3 = sumBy(rs.rows, 'cohort_icu_covid_qty') - sumBy(rs.rows, 'cohort_icu_usage_qty');

        this.listHospital = rs.rows;
        this.listHospitalFilter = rs.rows;

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

  async getList2() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.getReport6Ministry(this.date, this.sector);
      if (rs.ok) {
        this.aiir1 = sumBy(rs.rows, 'aiir_covid_qty');
        this.aiir2 = sumBy(rs.rows, 'aiir_usage_qty');
        this.aiir3 = sumBy(rs.rows, 'aiir_covid_qty') - sumBy(rs.rows, 'aiir_usage_qty');
        this.modi1 = sumBy(rs.rows, 'modified_aiir_covid_qty');
        this.modi2 = sumBy(rs.rows, 'modified_aiir_usage_qty');
        this.modi3 = sumBy(rs.rows, 'modified_aiir_covid_qty') - sumBy(rs.rows, 'modified_aiir_usage_qty');
        this.iso1 = sumBy(rs.rows, 'isolate_covid_qty');
        this.iso2 = sumBy(rs.rows, 'isolate_usage_qty');
        this.iso3 = sumBy(rs.rows, 'isolate_covid_qty') - sumBy(rs.rows, 'isolate_usage_qty');
        this.coh1 = sumBy(rs.rows, 'cohort_covid_qty');
        this.coh2 = sumBy(rs.rows, 'cohort_usage_qty');
        this.coh3 = sumBy(rs.rows, 'cohort_covid_qty') - sumBy(rs.rows, 'cohort_usage_qty');
        this.host1 = sumBy(rs.rows, 'hospitel_covid_qty');
        this.host2 = sumBy(rs.rows, 'hospitel_usage_qty');
        this.host3 = sumBy(rs.rows, 'hospitel_covid_qty') - sumBy(rs.rows, 'hospitel_usage_qty');
        this.cohortIcu1 = sumBy(rs.rows, 'cohort_icu_covid_qty');
        this.cohortIcu2 = sumBy(rs.rows, 'cohort_icu_usage_qty');
        this.cohortIcu3 = sumBy(rs.rows, 'cohort_icu_covid_qty') - sumBy(rs.rows, 'cohort_icu_usage_qty');

        this.listMinistry = rs.rows;
        this.listMinistryFilter = rs.rows;

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

  async getList3() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.getReport6Sector(this.date, this.sector);
      if (rs.ok) {
        this.aiir1 = sumBy(rs.rows, 'aiir_covid_qty');
        this.aiir2 = sumBy(rs.rows, 'aiir_usage_qty');
        this.aiir3 = sumBy(rs.rows, 'aiir_covid_qty') - sumBy(rs.rows, 'aiir_usage_qty');
        this.modi1 = sumBy(rs.rows, 'modified_aiir_covid_qty');
        this.modi2 = sumBy(rs.rows, 'modified_aiir_usage_qty');
        this.modi3 = sumBy(rs.rows, 'modified_aiir_covid_qty') - sumBy(rs.rows, 'modified_aiir_usage_qty');
        this.iso1 = sumBy(rs.rows, 'isolate_covid_qty');
        this.iso2 = sumBy(rs.rows, 'isolate_usage_qty');
        this.iso3 = sumBy(rs.rows, 'isolate_covid_qty') - sumBy(rs.rows, 'isolate_usage_qty');
        this.coh1 = sumBy(rs.rows, 'cohort_covid_qty');
        this.coh2 = sumBy(rs.rows, 'cohort_usage_qty');
        this.coh3 = sumBy(rs.rows, 'cohort_covid_qty') - sumBy(rs.rows, 'cohort_usage_qty');
        this.host1 = sumBy(rs.rows, 'hospitel_covid_qty');
        this.host2 = sumBy(rs.rows, 'hospitel_usage_qty');
        this.host3 = sumBy(rs.rows, 'hospitel_covid_qty') - sumBy(rs.rows, 'hospitel_usage_qty');
        this.cohortIcu1 = sumBy(rs.rows, 'cohort_icu_covid_qty');
        this.cohortIcu2 = sumBy(rs.rows, 'cohort_icu_usage_qty');
        this.cohortIcu3 = sumBy(rs.rows, 'cohort_icu_covid_qty') - sumBy(rs.rows, 'cohort_icu_usage_qty');

        this.listSector = rs.rows;
        this.listSectorFilter = rs.rows;
        console.log(rs.rows);


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

  async click(z) {
    this.zone = z;
    this.getList1();
  }

  doEnter() {
    this.getList1();
  }

  async doExportExcel1() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.getReport6SectorExcel(this.date, this.sector);
      console.log(rs);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('6.รายงานเตียงว่างแยกประเภท(เขต)', 'xlsx', rs);
        // this.downloadFile('รายงานการจ่ายยา(แยกตามสถานที่จ่าย)', 'xlsx', url);
        this.loading.hide();
      }
    } catch (error) {
      console.log(error);
      this.alertService.error();
      this.loading.hide();
    }
  }

  async doExportExcel2() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.getReport6MinistryExcel(this.date, this.sector);
      console.log(rs);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('6.รายงานเตียงว่างแยกประเภท(สังกัด)', 'xlsx', rs);
        // this.downloadFile('รายงานการจ่ายยา(แยกตามสถานที่จ่าย)', 'xlsx', url);
        this.loading.hide();
      }
    } catch (error) {
      console.log(error);
      this.alertService.error();
      this.loading.hide();
    }
  }

  async doExportExcel3() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.getReport6Excel(this.date, this.sector);
      console.log(rs);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('6.รายงานเตียงว่างแยกประเภท(โรงพยาบาล)', 'xlsx', rs);
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
