import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportAllService } from '../report-all.service';
import { AlertService } from '../../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IMyOptions } from 'mydatepicker-th';
import * as moment from 'moment';
import { sumBy } from 'lodash';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-7',
  templateUrl: './report-7.component.html',
  styles: []
})
export class Report7Component implements OnInit {

  listHospital: any = [];
  listMinistry: any = [];
  listSector: any = [];
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

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };

  @ViewChild('loading') loading: any;

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
    this.date = moment();
    await this.getList1();
    await this.getList2();
    await this.getList3();
  }

  async getList1() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.getReport7(moment(this.date).format('YYYY-MM-DD'), this.sector);
      if (rs.ok) {
        this.listHospital = rs.rows;
        this.nivCovid = sumBy(rs.rows, 'non_invasive_ventilator');
        this.nivQty = sumBy(rs.rows, 'non_invasive_qty') - sumBy(rs.rows, 'non_invasive_ventilator');
        this.nivAll = sumBy(rs.rows, 'non_invasive_qty');

        this.ivCovid = sumBy(rs.rows, 'invasive_ventilator');
        this.ivQty = sumBy(rs.rows, 'invasive_qty') - sumBy(rs.rows, 'invasive_ventilator');
        this.ivAll = sumBy(rs.rows, 'invasive_qty');

        this.hfCovid = sumBy(rs.rows, 'high_flow');
        this.hfQty = sumBy(rs.rows, 'high_flow_qty') - sumBy(rs.rows, 'high_flow');
        this.hfAll = sumBy(rs.rows, 'high_flow_qty');
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
        this.nivCovid = sumBy(rs.rows, 'non_invasive_ventilator');
        this.nivQty = sumBy(rs.rows, 'non_invasive_qty') - sumBy(rs.rows, 'non_invasive_ventilator');
        this.nivAll = sumBy(rs.rows, 'non_invasive_qty');

        this.ivCovid = sumBy(rs.rows, 'invasive_ventilator');
        this.ivQty = sumBy(rs.rows, 'invasive_qty') - sumBy(rs.rows, 'invasive_ventilator');
        this.ivAll = sumBy(rs.rows, 'invasive_qty');

        this.hfCovid = sumBy(rs.rows, 'high_flow');
        this.hfQty = sumBy(rs.rows, 'high_flow_qty') - sumBy(rs.rows, 'high_flow');
        this.hfAll = sumBy(rs.rows, 'high_flow_qty');
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
        this.nivCovid = sumBy(rs.rows, 'non_invasive_ventilator');
        this.nivQty = sumBy(rs.rows, 'non_invasive_qty') - sumBy(rs.rows, 'non_invasive_ventilator');
        this.nivAll = sumBy(rs.rows, 'non_invasive_qty');

        this.ivCovid = sumBy(rs.rows, 'invasive_ventilator');
        this.ivQty = sumBy(rs.rows, 'invasive_qty') - sumBy(rs.rows, 'invasive_ventilator');
        this.ivAll = sumBy(rs.rows, 'invasive_qty');

        this.hfCovid = sumBy(rs.rows, 'high_flow');
        this.hfQty = sumBy(rs.rows, 'high_flow_qty') - sumBy(rs.rows, 'high_flow');
        this.hfAll = sumBy(rs.rows, 'high_flow_qty');
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
