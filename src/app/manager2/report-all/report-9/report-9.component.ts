import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportAllService } from '../report-all.service';
import { AlertService } from '../../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { sumBy } from 'lodash';

@Component({
  selector: 'app-report-9',
  templateUrl: './report-9.component.html',
  styles: []
})
export class Report9Component implements OnInit {
  list: any = [];
  zone: any = '';
  date: any;
  infectiousDiseaseQty1: any;
  infectiousDiseaseQty2: any;
  infectiousDiseaseQty3: any;
  pulmonaryMedicineQty1: any;
  pulmonaryMedicineQty2: any;
  pulmonaryMedicineQty3: any;
  divisionOfCriticalCareQty1: any;
  divisionOfCriticalCareQty2: any;
  divisionOfCriticalCareQty3: any;
  all1: any;
  all2: any;
  all3: any;
  anesthesiologistQty1: any;
  anesthesiologistQty2: any;
  anesthesiologistQty3: any;
  sector: any;
  @ViewChild('loading' ,{ static: true }) loading: any;

  public jwtHelper = new JwtHelperService();

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
    await this.getList();
  }

  async getList() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.getReport9(moment(this.date).format('YYYY-MM-DD'), this.sector);
      if (rs.ok) {
        this.infectiousDiseaseQty1 = sumBy(rs.rows, 'infectious_disease_qty') + sumBy(rs.rows, 'infectious_disease_support_qty');
        this.infectiousDiseaseQty2 = sumBy(rs.rows, 'infectious_disease_qty');
        this.infectiousDiseaseQty3 = sumBy(rs.rows, 'infectious_disease_support_qty');
        this.pulmonaryMedicineQty1 = sumBy(rs.rows, 'pulmonary_medicine_qty') + sumBy(rs.rows, 'pulmonary_medicine_support_qty');
        this.pulmonaryMedicineQty2 = sumBy(rs.rows, 'pulmonary_medicine_qty');
        this.pulmonaryMedicineQty3 = sumBy(rs.rows, 'pulmonary_medicine_support_qty');
        this.divisionOfCriticalCareQty1 = sumBy(rs.rows, 'division_of_critical_care_qty') + sumBy(rs.rows, 'division_of_critical_care_support_qty');
        this.divisionOfCriticalCareQty2 = sumBy(rs.rows, 'division_of_critical_care_qty');
        this.divisionOfCriticalCareQty3 = sumBy(rs.rows, 'division_of_critical_care_support_qty');
        this.all1 = sumBy(rs.rows, 'internal_medicine_total_qty') + sumBy(rs.rows, 'internal_medicine_support_total_qty');
        this.all2 = sumBy(rs.rows, 'internal_medicine_total_qty');
        this.all3 = sumBy(rs.rows, 'internal_medicine_support_total_qty');
        this.anesthesiologistQty1 = sumBy(rs.rows, 'anesthesiologist_qty') + sumBy(rs.rows, 'anesthesiologist_support_qty');
        this.anesthesiologistQty2 = sumBy(rs.rows, 'anesthesiologist_qty');
        this.anesthesiologistQty3 = sumBy(rs.rows, 'anesthesiologist_support_qty');

        this.list = rs.rows;
        console.log(this.list);

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
    this.getList();
  }

  doEnter() {
    this.getList();
  }

  async doExportExcel() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.getReport9Excel(moment(this.date).format('YYYY-MM-DD'), this.sector);
      console.log(rs);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('9.รายงานจำนวนบุคลากร (แพทย์)', 'xlsx', rs);
        // this.downloadFile('รายงานการจ่ายยา(แยกตามสถานที่จ่าย)', 'xlsx', url);
        this.loading.hide();
      }
    } catch (error) {
      console.log(error);
      this.alertService.error();
      this.loading.hide();
    }
  }

  // async doExportCsv() {
  //   this.loading.show();
  //   try {
  //     const rs: any = await this.reportService.getReportBedCsv();
  //     console.log(rs);
  //     if (!rs) {
  //       this.loading.hide();
  //     } else {
  //       this.downloadFile('รายการเติมยา', 'csv', rs);
  //       // this.downloadFile('รายงานการจ่ายยา(แยกตามสถานที่จ่าย)', 'xlsx', url);
  //       this.loading.hide();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     this.alertService.error();
  //     this.loading.hide();
  //   }
  // }

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
