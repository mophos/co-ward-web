import { AlertService } from '../../help/alert.service';
import { FulfillService } from '../services/fulfill.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-fulfill-supplies',
  templateUrl: './fulfill-supplies.component.html',
  styles: []
})
export class FulfillSuppliesComponent implements OnInit {
  @ViewChild('modalLoading') public modalLoading;

  selected = [];
  selectedFulfills = [];
  fulfills = [];
  countExport = 0;
  countApprove = 0;
  isFulFull = false;
  constructor(
    private fulfillService: FulfillService,
    private alertService: AlertService,
    private reportService: ReportService
  ) { }

  ngOnInit() {
    // this.getProducts();
    this.getFulfills();
  }



  async getFulfills() {
    try {
      const rs: any = await this.fulfillService.getFulFillSupplies();
      if (rs.ok) {
        this.fulfills = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async onClickExport() {
    this.modalLoading.show();
    try {
      const rs: any = await this.reportService.getFulFillSuppiles(this.selectedFulfills);
      console.log(rs);
      if (!rs) {
        this.modalLoading.hide();
      } else {
        this.downloadFile('รายการเติมเวชภัณฑ์', 'xlsx', rs);
        // this.downloadFile('รายงานการจ่ายยา(แยกตามสถานที่จ่าย)', 'xlsx', url);
        this.modalLoading.hide();
      }
    } catch (error) {
      console.log(error);
      this.alertService.error();
      this.modalLoading.hide();
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

  async onClickApprove() {
    try {
      const confirm = await this.alertService.confirm();
      if (confirm) {
        const rs: any = await this.fulfillService.approvedSupplies(this.selectedFulfills);
        if (rs.ok) {
          await this.getFulfills();
          this.alertService.success();
        } else {
          this.alertService.error(rs.error);
        }
      }
    } catch (error) {
      this.alertService.error(error);
    }

  }

  selectionChanged(e) {
    let approveCount = 0;
    let exportCount = 0;
    for (const i of e) {
      if (i.is_approved === 'N') {
        approveCount++;
      }
      exportCount++;
    }
    this.countApprove = approveCount;
    this.countExport = exportCount;
  }
}
