import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportAllService } from '../report-all.service';
import { AlertService } from '../../../help/alert.service';
import { sumBy, filter } from 'lodash';
import * as moment from 'moment';
@Component({
  selector: 'app-report-1',
  templateUrl: './report-1.component.html',
  styles: []
})
export class Report1Component implements OnInit {

  zone: any = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'];
  selectedZone: any = 'all';
  selectedProvince: any = 'all';
  province: any;
  listProvince: any;

  list: any = [];
  listFilter: any = [];
  qtyHosp: any;
  qtyBed: any;
  qty1: any;
  qty2: any;
  qty3: any;
  qty4: any;
  qty5: any;
  sector: any;
  date: any;
  dateShow: any;
  @ViewChild('loading', { static: false }) loading: any;

  constructor(
    private reportService: ReportAllService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {
    const params = this.route.snapshot.params;
    this.sector = params.sector;
  }

  ngOnInit() {
    this.getProvince();
    this.date = {
      date: {
        year: moment().get('year'),
        month: moment().get('month') + 1,
        day: moment().get('date')
      }
    };
    this.getList();
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
      const rs: any = await this.reportService.getReport1(this.dateShow, this.sector);
      console.log(rs.rows);
      if (rs.ok) {
        this.qtyHosp = sumBy(rs.rows, 'hospital_qty');
        this.qtyBed = sumBy(rs.rows, 'bed_qty');
        this.qty1 = sumBy(rs.rows, 'aiir_qty');
        this.qty2 = sumBy(rs.rows, 'modified_aiir_qty');
        this.qty3 = sumBy(rs.rows, 'isolate_qty');
        this.qty4 = sumBy(rs.rows, 'cohort_qty');
        this.qty5 = sumBy(rs.rows, 'hospitel_qty');
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
    if (this.selectedZone === 'all' && this.selectedProvince === 'all') {
      this.listFilter = this.list;
      this.qtyHosp = sumBy(this.listFilter, 'hospital_qty');
      this.qtyBed = sumBy(this.listFilter, 'bed_qty');
      this.qty1 = sumBy(this.listFilter, 'aiir_qty');
      this.qty2 = sumBy(this.listFilter, 'modified_aiir_qty');
      this.qty3 = sumBy(this.listFilter, 'isolate_qty');
      this.qty4 = sumBy(this.listFilter, 'cohort_qty');
      this.qty5 = sumBy(this.listFilter, 'hospitel_qty');
    } else if (this.selectedZone !== 'all' && this.selectedProvince === 'all') {
      this.listFilter = filter(this.list, { zone_code: this.selectedZone });
      this.qtyHosp = sumBy(this.listFilter, 'hospital_qty');
      this.qtyBed = sumBy(this.listFilter, 'bed_qty');
      this.qty1 = sumBy(this.listFilter, 'aiir_qty');
      this.qty2 = sumBy(this.listFilter, 'modified_aiir_qty');
      this.qty3 = sumBy(this.listFilter, 'isolate_qty');
      this.qty4 = sumBy(this.listFilter, 'cohort_qty');
      this.qty5 = sumBy(this.listFilter, 'hospitel_qty');
    } else if (this.selectedZone !== 'all' && this.selectedProvince !== 'all') {
      this.listFilter = filter(this.list, { zone_code: this.selectedZone, province_code: this.selectedProvince });
      this.qtyHosp = sumBy(this.listFilter, 'hospital_qty');
      this.qtyBed = sumBy(this.listFilter, 'bed_qty');
      this.qty1 = sumBy(this.listFilter, 'aiir_qty');
      this.qty2 = sumBy(this.listFilter, 'modified_aiir_qty');
      this.qty3 = sumBy(this.listFilter, 'isolate_qty');
      this.qty4 = sumBy(this.listFilter, 'cohort_qty');
      this.qty5 = sumBy(this.listFilter, 'hospitel_qty');
    } else {
      this.listFilter = this.list;
      this.qtyHosp = sumBy(this.listFilter, 'hospital_qty');
      this.qtyBed = sumBy(this.listFilter, 'bed_qty');
      this.qty1 = sumBy(this.listFilter, 'aiir_qty');
      this.qty2 = sumBy(this.listFilter, 'modified_aiir_qty');
      this.qty3 = sumBy(this.listFilter, 'isolate_qty');
      this.qty4 = sumBy(this.listFilter, 'cohort_qty');
      this.qty5 = sumBy(this.listFilter, 'hospitel_qty');
    }
    console.log(this.selectedZone, this.selectedProvince);
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
