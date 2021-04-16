import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportDmsService } from '../report-dms.service';
import { AlertService } from '../../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IMyOptions } from 'mydatepicker-th';
import * as moment from 'moment';
import { sumBy } from 'lodash';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-dms8',
  templateUrl: './report-dms8.component.html',
  styles: []
})
export class ReportDms8Component implements OnInit {

  list: any = [];
  date: any;
  n95: any;
  surgicalMask: any;
  coverAll: any;
  surgicalGown: any;

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };

  @ViewChild('loading' ,{static: false}) loading: any;

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
      const rs: any = await this.reportService.getReport8(moment(this.date).format('YYYY-MM-DD'), this.sector);
      if (rs.ok) {
        this.list = rs.rows;
        console.log(this.list);
        
        this.n95 = sumBy(rs.rows, 'n95_qty');
        this.surgicalMask = sumBy(rs.rows, 'surgical_mask_qty');
        this.coverAll = sumBy(rs.rows, 'cover_all2_qty');
        this.surgicalGown = sumBy(rs.rows, 'surgical_gown_qty');
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
      const rs: any = await this.reportService.getReport8Excel(moment(this.date).format('YYYY-MM-DD'), this.sector);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('8.รายงานจำนวนประเภทเครื่องช่วยหายใจ', 'xlsx', rs);
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
