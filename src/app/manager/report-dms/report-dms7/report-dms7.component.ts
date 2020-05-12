import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportDmsService } from '../report-dms.service';
import { AlertService } from '../../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IMyOptions } from 'mydatepicker-th';
import * as moment from 'moment';
import { sumBy } from 'lodash';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-dms7',
  templateUrl: './report-dms7.component.html',
  styles: []
})
export class ReportDms7Component implements OnInit {

  list: any = [];
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
    private reportService: ReportDmsService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {
    const params = this.route.snapshot.params;
    this.sector = params.sector;
  }

  async ngOnInit() {
    this.date = moment().format('DD/MM/YYYY');
    await this.getList();
  }

  async getList() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.getReport7(moment(this.date).format('YYYY-MM-DD'), this.sector);
      if (rs.ok) {
        this.list = rs.rows;
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
    await this.getList();
  }

  async doExportExcel() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.getReport7Excel(moment(this.date).format('YYYY-MM-DD'), this.sector);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('7.รายงานจำนวนประเภทเครื่องช่วยหายใจ', 'xlsx', rs);
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
