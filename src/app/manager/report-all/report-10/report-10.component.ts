import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportAllService } from '../report-all.service';
import { AlertService } from '../../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { sumBy } from 'lodash';

@Component({
  selector: 'app-report-10',
  templateUrl: './report-10.component.html',
  styles: []
})
export class Report10Component implements OnInit {
  list: any = [];
  zone: any = '';
  date: any;
  anesthetistNurseQty1: any;
  anesthetistNurseQty2: any;
  anesthetistNurseQty3: any;
  infectiousDiseaseNurseQty1: any;
  infectiousDiseaseNurseQty2: any;
  infectiousDiseaseNurseQty3: any;
  intensiveCareUnitQty1: any;
  intensiveCareUnitQty2: any;
  intensiveCareUnitQty3: any;
  criticalCareMedicineQty1: any;
  criticalCareMedicineQty2: any;
  criticalCareMedicineQty3: any;
  nurseQty1: any;
  nurseQty2: any;
  nurseQty3: any;
  sector: any;
  @ViewChild('loading') loading: any;

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
    this.date = moment().format('DD/MM/YYYY');
    await this.getList();
  }

  async getList() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.getReport10(moment(this.date).format('YYYY-MM-DD'), this.sector);
      if (rs.ok) {
        this.anesthetistNurseQty1 = sumBy(rs.rows, 'anesthetist_nurse_qty') + sumBy(rs.rows, 'anesthetist_nurse_support_qty');
        this.anesthetistNurseQty2 = sumBy(rs.rows, 'anesthetist_nurse_qty');
        this.anesthetistNurseQty3 = sumBy(rs.rows, 'anesthetist_nurse_support_qty');
        this.infectiousDiseaseNurseQty1 = sumBy(rs.rows, 'infectious_disease_nurse_qty') + sumBy(rs.rows, 'infectious_disease_nurse_support_qty');
        this.infectiousDiseaseNurseQty2 = sumBy(rs.rows, 'infectious_disease_nurse_qty');
        this.infectiousDiseaseNurseQty3 = sumBy(rs.rows, 'infectious_disease_nurse_support_qty');
        this.intensiveCareUnitQty1 = sumBy(rs.rows, 'intensive_care_unit_qty') + sumBy(rs.rows, 'intensive_care_unit_support_qty');
        this.intensiveCareUnitQty2 = sumBy(rs.rows, 'intensive_care_unit_qty');
        this.intensiveCareUnitQty3 = sumBy(rs.rows, 'intensive_care_unit_support_qty');
        this.criticalCareMedicineQty1 = sumBy(rs.rows, 'critical_care_medicine_qty') + sumBy(rs.rows, 'critical_care_medicine_support_qty');
        this.criticalCareMedicineQty2 = sumBy(rs.rows, 'critical_care_medicine_qty');
        this.criticalCareMedicineQty3 = sumBy(rs.rows, 'critical_care_medicine_support_qty');
        this.nurseQty1 = sumBy(rs.rows, 'nurse_qty_qty') + sumBy(rs.rows, 'nurse_qty_support_qty');
        this.nurseQty2 = sumBy(rs.rows, 'nurse_qty_qty');
        this.nurseQty3 = sumBy(rs.rows, 'nurse_qty_support_qty');

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
      const rs: any = await this.reportService.getReport10Excel(moment(this.date).format('YYYY-MM-DD'), this.sector);
      console.log(rs);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('10.รายงานจำนวนบุคลากร (พยาบาล) นับจำนวนทั้งหมดไม่นับเป็นเวร', 'xlsx', rs);
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
