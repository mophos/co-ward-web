import { AlertService } from '../../help/alert.service';
import { FulfillService } from '../services/fulfill.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { sumBy, orderBy } from 'lodash';
@Component({
  selector: 'app-fulfill-drugs',
  templateUrl: './fulfill-drugs.component.html',
  styles: []
})
export class FulfillDrugsComponent implements OnInit {
  @ViewChild('modalLoading') public modalLoading;

  nodes = [];
  generics = [];
  selected = [];
  selectedFulfills = [];
  products = [];
  fulfills = [];
  countExport = 0;
  countApprove = 0;
  hospitalId = null;

  hcqFill = 0;
  cqFill = 0;
  drvFill = 0;
  rtvFill = 0;
  lpvFill = 0;
  azitFill = 0;
  sortFulfill = {
    type: 'zone_code',
    order: 'asc'
  };

  constructor(
    private fulfillService: FulfillService,
    private alertService: AlertService,
    private reportService: ReportService,
  ) { }

  ngOnInit() {
    this.getProducts();
    this.getFulfills();
    this.getNode();
  }

  async getProducts() {
    try {
      const rs: any = await this.fulfillService.getList('DRUG', this.sortFulfill.type, this.sortFulfill.order);
      if (rs.ok) {
        this.products = rs.rows;
        this.hcqFill = sumBy(this.products, 'hydroxy_chloroquine_recomment_qty');
        this.cqFill = sumBy(this.products, 'chloroquine_recomment_qty');
        this.drvFill = sumBy(this.products, 'darunavir_recomment_qty');
        this.rtvFill = sumBy(this.products, 'ritonavir_recomment_qty');
        this.lpvFill = sumBy(this.products, 'lopinavir_recomment_qty');
        this.azitFill = sumBy(this.products, 'azithromycin_recomment_qty');
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  sumProduct(){
    this.hcqFill = sumBy(this.products, 'hydroxy_chloroquine_recomment_qty');
    this.cqFill = sumBy(this.products, 'chloroquine_recomment_qty');
    this.drvFill = sumBy(this.products, 'darunavir_recomment_qty');
    this.rtvFill = sumBy(this.products, 'ritonavir_recomment_qty');
    this.lpvFill = sumBy(this.products, 'lopinavir_recomment_qty');
    this.azitFill = sumBy(this.products, 'azithromycin_recomment_qty');
  }

  async getBalanceDrugs(hospitalId) {
    try {
      const rs: any = await this.fulfillService.getBalanceDrugs(hospitalId);
      if (rs.ok) {
        this.generics = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async getFulfills() {
    try {
      const rs: any = await this.fulfillService.getFulFillDrug();
      if (rs.ok) {
        this.fulfills = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async onClickFulFill() {
    try {
      const confirm = await this.alertService.confirm(`คุณต้องการเติมยาใช่หรือไม่?`);
      if (confirm) {
        const rs: any = await this.fulfillService.saveFulFillDrug(this.products);
        if (rs.ok) {
          this.alertService.success();
          await this.getProducts();
          await this.getFulfills();
        } else {
          this.alertService.error(rs.error);
        }
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async onClickExport() {
    this.modalLoading.show();
    try {
      const rs: any = await this.reportService.getFulFillDrugs(this.selectedFulfills);
      console.log(rs);
      if (!rs) {
        this.modalLoading.hide();
      } else {
        this.downloadFile('รายการเติมยา', 'xlsx', rs);
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
        const rs: any = await this.fulfillService.approvedDrugs(this.selectedFulfills);
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

  async getNode() {
    try {
      const rs: any = await this.fulfillService.getNodeDrugs();
      if (rs.ok) {
        this.nodes = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  sort(type) {
    try {
      if (this.sortFulfill.type === type) {
        if (this.sortFulfill.order === 'desc') {
          this.sortFulfill.order = 'asc';
        } else {
          this.sortFulfill.order = 'desc';
        }
      } else {
        this.sortFulfill.type = type;
        this.sortFulfill.order = 'asc';
      }

      console.log(this.sortFulfill);
      
      this.products = orderBy(this.products, [this.sortFulfill.type], [this.sortFulfill.order]);
      // this.getProducts();
    } catch (error) {
      this.alertService.error(error);
    }

  }

}
