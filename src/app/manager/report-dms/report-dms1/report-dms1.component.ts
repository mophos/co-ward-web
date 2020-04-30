import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportDmsService } from '../report-dms.service';
import { AlertService } from '../../../help/alert.service';
import { sumBy } from 'lodash';

@Component({
  selector: 'app-report-dms1',
  templateUrl: './report-dms1.component.html',
  styles: []
})
export class ReportDms1Component implements OnInit {

  list: any;
  qtyHosp: any;
  qtyBed: any;
  qty1: any;
  qty2: any;
  qty3: any;
  qty4: any;
  qty5: any;

  @ViewChild('loading') loading: any;

  constructor(
    private reportService: ReportDmsService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.getReport1();
      if (rs.ok) {
        this.qtyHosp = sumBy(rs.rows, 'hospital_qty');
        this.qtyBed = sumBy(rs.rows, 'bed_qty');
        this.qty1 = sumBy(rs.rows, 'aiir_qty');
        this.qty2 = sumBy(rs.rows, 'modified_aiir_qty');
        this.qty3 = sumBy(rs.rows, 'isolate_qty');
        this.qty4 = sumBy(rs.rows, 'cohort_qty');
        this.qty5 = sumBy(rs.rows, 'hospitel_qty');
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
      const rs: any = await this.reportService.getReport1Excel();
      console.log(rs);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('report-dms1', 'xlsx', rs);
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
