import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportDmsService } from '../report-dms.service';
import { AlertService } from '../../../help/alert.service';
import { sumBy } from 'lodash';
import * as moment from 'moment';
@Component({
  selector: 'app-report-dms1',
  templateUrl: './report-dms1.component.html',
  styles: []
})
export class ReportDms1Component implements OnInit {

  list: any = [];
  qtyHosp: any;
  qtyBed: any;
  qty1: any;
  qty2: any;
  qty3: any;
  qty4: any;
  qty5: any;
  qty6: any;
  sector: any;
  date: any;
  dateShow: any;
  @ViewChild('loading' ,{ static: true }) loading: any;

  constructor(
    private reportService: ReportDmsService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {
    const params = this.route.snapshot.params;
    this.sector = params.sector;
  }

  ngOnInit() {
    this.date = {
      date: {
        year: moment().get('year'),
        month: moment().get('month') + 1,
        day: moment().get('date')
      }
    };
    this.getList();
  }

  async getList() {
    this.loading.show();
    try {
      this.dateShow = this.date.date.year + '-' + this.date.date.month + '-' + this.date.date.day;
      const rs: any = await this.reportService.getReport1(this.dateShow, this.sector);
      if (rs.ok) {
        this.qtyHosp = sumBy(rs.rows, 'hospital_qty');
        this.qtyBed = sumBy(rs.rows, 'bed_qty');
        this.qty1 = sumBy(rs.rows, 'aiir_qty');
        this.qty2 = sumBy(rs.rows, 'modified_aiir_qty');
        this.qty3 = sumBy(rs.rows, 'isolate_qty');
        this.qty4 = sumBy(rs.rows, 'cohort_qty');
        this.qty5 = sumBy(rs.rows, 'hospitel_qty');
        this.qty6 = sumBy(rs.rows, 'cohort_icu_qty') || 0;
        this.list = rs.rows;

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

  async doExportExcel() {
    this.loading.show();
    try {
      this.dateShow = this.date.date.year + '-' + this.date.date.month + '-' + this.date.date.day;
      const rs: any = await this.reportService.getReport1Excel(this.dateShow, this.sector);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('1.รายงานเตียงตามสังกัดหน่วยงาน', 'xlsx', rs);
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
