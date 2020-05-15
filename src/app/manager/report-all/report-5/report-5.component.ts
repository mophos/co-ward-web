import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportAllService } from '../report-all.service';
import { AlertService } from '../../../help/alert.service';
import { sumBy } from 'lodash';
import * as moment from 'moment';
@Component({
  selector: 'app-report-5',
  templateUrl: './report-5.component.html',
  styles: []
})
export class Report5Component implements OnInit {

  list: any = [];
  admitQty: any;
  totalQty: any;
  spareQty: any;
  standbyQty: any;
  sector: any;
  date: any;
  @ViewChild('loading') loading: any;

  constructor(
    private reportService: ReportAllService,
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
      const date = this.date.date.year + '-' + this.date.date.month + '-' + this.date.date.day;
      const rs: any = await this.reportService.getReport5(date, this.sector);
      if (rs.ok) {
        this.totalQty = (sumBy(rs.rows, 'aiir_qty') || 0) + (sumBy(rs.rows, 'modified_aiir_qty') || 0) + (sumBy(rs.rows, 'isolate_qty') || 0) + (sumBy(rs.rows, 'cohort_qty') || 0);
        this.admitQty = (sumBy(rs.rows, 'sum') || 0);
        this.spareQty = (sumBy(rs.rows, 'aiir_spare_qty') || 0) + (sumBy(rs.rows, 'modified_aiir_spare_qty') || 0) + (sumBy(rs.rows, 'isolate_spare_qty') || 0) + (sumBy(rs.rows, 'cohort_spare_qty') || 0);
        this.standbyQty = ((sumBy(rs.rows, 'aiir_qty') || 0) + (sumBy(rs.rows, 'modified_aiir_qty') || 0) + (sumBy(rs.rows, 'isolate_qty') || 0) + (sumBy(rs.rows, 'cohort_qty') || 0)) - (sumBy(rs.rows, 'sum') || 0) - ((sumBy(rs.rows, 'aiir_spare_qty') || 0) + sumBy(rs.rows, 'modified_aiir_spare_qty') || 0 + sumBy(rs.rows, 'isolate_spare_qty') || 0 + (sumBy(rs.rows, 'cohort_spare_qty') || 0));
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
      const date = this.date.date.year + '-' + this.date.date.month + '-' + this.date.date.day;
      const rs: any = await this.reportService.getReport5Excel(date, this.sector);
      console.log(rs);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('5.รายงานการใช้เตียง', 'xlsx', rs);
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
