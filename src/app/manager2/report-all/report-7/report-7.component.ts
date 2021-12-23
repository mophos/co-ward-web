import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportAllService } from '../report-all.service';
import { AlertService } from '../../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IMyOptions } from 'mydatepicker-th';
import * as moment from 'moment';
import { sumBy, filter } from 'lodash';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-7',
  templateUrl: './report-7.component.html',
  styles: []
})
export class Report7Component implements OnInit {
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

  nivQty: any;
  nivCovid: any;
  nivAll: any;

  ivQty: any;
  ivCovid: any;
  ivAll: any;

  hfQty: any;
  hfCovid: any;
  hfAll: any;

  paQty: any;
  paCovid: any;
  paAll: any;

  tab: any = 1;

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };

  @ViewChild('loading' ,{ static: true }) loading: any;

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
    await this.loading.show();
    await this.getProvince();
    this.date = moment();
    await this.getList1();
    await this.getList2();
    await this.getList3();
    await this.loading.hide();
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

  async getList1() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.getReport7(moment(this.date).format('YYYY-MM-DD'), this.sector);
      if (rs.ok) {
        this.listHospital = rs.rows;
        this.listHospitalFilter = rs.rows;
        this.nivCovid = sumBy(rs.rows, 'non_invasive_ventilator');
        this.nivQty = sumBy(rs.rows, 'non_invasive_qty') - sumBy(rs.rows, 'non_invasive_ventilator');
        this.nivAll = sumBy(rs.rows, 'non_invasive_qty');

        this.ivCovid = sumBy(rs.rows, 'invasive_ventilator');
        this.ivQty = sumBy(rs.rows, 'invasive_qty') - sumBy(rs.rows, 'invasive_ventilator');
        this.ivAll = sumBy(rs.rows, 'invasive_qty');

        this.hfCovid = sumBy(rs.rows, 'high_flow');
        this.hfQty = sumBy(rs.rows, 'high_flow_qty') - sumBy(rs.rows, 'high_flow');
        this.hfAll = sumBy(rs.rows, 'high_flow_qty');

        this.paCovid = sumBy(rs.rows, 'papr');
        this.paQty = sumBy(rs.rows, 'papr_qty') - sumBy(rs.rows, 'papr');
        this.paAll = sumBy(rs.rows, 'papr_qty');
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
      const rs: any = await this.reportService.getReport7Ministry(moment(this.date).format('YYYY-MM-DD'), this.sector);
      if (rs.ok) {
        this.listMinistry = rs.rows;
        this.listMinistryFilter = rs.rows;
        this.nivCovid = sumBy(rs.rows, 'non_invasive_ventilator');
        this.nivQty = sumBy(rs.rows, 'non_invasive_qty') - sumBy(rs.rows, 'non_invasive_ventilator');
        this.nivAll = sumBy(rs.rows, 'non_invasive_qty');

        this.ivCovid = sumBy(rs.rows, 'invasive_ventilator');
        this.ivQty = sumBy(rs.rows, 'invasive_qty') - sumBy(rs.rows, 'invasive_ventilator');
        this.ivAll = sumBy(rs.rows, 'invasive_qty');

        this.hfCovid = sumBy(rs.rows, 'high_flow');
        this.hfQty = sumBy(rs.rows, 'high_flow_qty') - sumBy(rs.rows, 'high_flow');
        this.hfAll = sumBy(rs.rows, 'high_flow_qty');

        this.paCovid = sumBy(rs.rows, 'papr');
        this.paQty = sumBy(rs.rows, 'papr_qty') - sumBy(rs.rows, 'papr');
        this.paAll = sumBy(rs.rows, 'papr_qty');
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
      const rs: any = await this.reportService.getReport7Sector(moment(this.date).format('YYYY-MM-DD'), this.sector);
      if (rs.ok) {
        this.listSector = rs.rows;
        this.listSectorFilter = rs.rows;
        this.nivCovid = sumBy(rs.rows, 'non_invasive_ventilator');
        this.nivQty = sumBy(rs.rows, 'non_invasive_qty') - sumBy(rs.rows, 'non_invasive_ventilator');
        this.nivAll = sumBy(rs.rows, 'non_invasive_qty');

        this.ivCovid = sumBy(rs.rows, 'invasive_ventilator');
        this.ivQty = sumBy(rs.rows, 'invasive_qty') - sumBy(rs.rows, 'invasive_ventilator');
        this.ivAll = sumBy(rs.rows, 'invasive_qty');

        this.hfCovid = sumBy(rs.rows, 'high_flow');
        this.hfQty = sumBy(rs.rows, 'high_flow_qty') - sumBy(rs.rows, 'high_flow');
        this.hfAll = sumBy(rs.rows, 'high_flow_qty');

        this.paCovid = sumBy(rs.rows, 'papr');
        this.paQty = sumBy(rs.rows, 'papr_qty') - sumBy(rs.rows, 'papr');
        this.paAll = sumBy(rs.rows, 'papr_qty');
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

  async sumByReport(rows) {
    this.nivCovid = sumBy(rows, 'non_invasive_ventilator');
    this.nivQty = sumBy(rows, 'non_invasive_qty') - sumBy(rows, 'non_invasive_ventilator');
    this.nivAll = sumBy(rows, 'non_invasive_qty');

    this.ivCovid = sumBy(rows, 'invasive_ventilator');
    this.ivQty = sumBy(rows, 'invasive_qty') - sumBy(rows, 'invasive_ventilator');
    this.ivAll = sumBy(rows, 'invasive_qty');

    this.hfCovid = sumBy(rows, 'high_flow');
    this.hfQty = sumBy(rows, 'high_flow_qty') - sumBy(rows, 'high_flow');
    this.hfAll = sumBy(rows, 'high_flow_qty');

    this.hfCovid = sumBy(rows, 'papr');
    this.hfQty = sumBy(rows, 'papr_qty') - sumBy(rows, 'papr');
    this.hfAll = sumBy(rows, 'papr_qty');
  }

  async onChangeTab(v) {
    await this.loading.show();
    this.selectedZone = 'all';
    this.selectedProvince = 'all';
    this.tab = v;
    await this.onClickSearch();
    await this.loading.hide();
  }

  async onClickSearch() {
    console.log(this.listHospital, this.listSector, this.listMinistry);

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
    console.log(this.selectedZone, this.selectedProvince);
  }

  async doEnter() {
    await this.getList1();
    await this.getList2();
    await this.getList3();
  }

  async doExportExcel1() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.getReport7SectorExcel(moment(this.date).format('YYYY-MM-DD'), this.sector);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('7.รายงานจำนวนประเภทเครื่องช่วยหายใจ(เขต)', 'xlsx', rs);
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
      const rs: any = await this.reportService.getReport7MinistryExcel(moment(this.date).format('YYYY-MM-DD'), this.sector);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('7.รายงานจำนวนประเภทเครื่องช่วยหายใจ(สังกัด)', 'xlsx', rs);
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
      const rs: any = await this.reportService.getReport7Excel(moment(this.date).format('YYYY-MM-DD'), this.sector);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('7.รายงานจำนวนประเภทเครื่องช่วยหายใจ(โรงพยาบาล)', 'xlsx', rs);
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
