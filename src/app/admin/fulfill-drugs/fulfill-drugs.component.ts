import { AlertService } from '../../help/alert.service';
import { FulfillService } from '../services/fulfill.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fulfill-drugs',
  templateUrl: './fulfill-drugs.component.html',
  styles: []
})
export class FulfillDrugsComponent implements OnInit {

  selected = [];
  selectedFulfills = [];
  products = [];
  fulfills = [];
  countExport = 0;
  countApprove = 0;
  constructor(
    private fulfillService: FulfillService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getProducts();
    this.getFulfills();
  }

  async getProducts() {
    try {
      const rs: any = await this.fulfillService.getList('DRUG');
      if (rs.ok) {
        this.products = rs.rows;
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
      const confirm = await this.alertService.confirm(`คุณต้องการเติมยา ${this.selected.length} รายการ ใช่หรือไม่?`);
      if (confirm) {
        const rs: any = await this.fulfillService.saveFulFillDrug(this.selected);
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

  onClickExport() {

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
}
