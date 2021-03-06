import { Component, OnInit } from '@angular/core';
import { FulfillService } from '../services/fulfill.service';
import { AlertService } from '../../help/alert.service';

@Component({
  selector: 'app-manage-min-max-supplies',
  templateUrl: './manage-min-max-supplies.component.html',
  styles: []
})
export class ManageMinMaxSuppliesComponent implements OnInit {

  listHospNode: any;
  listDrugEdit: any;
  hospId: any;
  loading = false;
  constructor(
    private fulfillService: FulfillService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getHospNode();
  }

  async getHospNode() {
    try {
      const rs: any = await this.fulfillService.getHopsNodeSupplies();
      if (rs.ok) {
        this.listHospNode = rs.rows;
      }
    } catch (error) {
      this.alertService.error();
    }
  }

  async getDrugEdit(e) {
    this.hospId = e.id;
    try {
      const rs: any = await this.fulfillService.getSuppliesMinMax(e.id);
      if (rs.ok) {
        this.listDrugEdit = rs.rows;
      }
    } catch (error) {
      this.alertService.error();
    }
  }

  async saveDrug() {
    let obj: any = {};
    const data: any = [];
    for (const i of this.listDrugEdit) {
      obj = {
        generic_id: i.generic_id,
        min: i.min,
        max: i.max,
        safety_stock: i.safety_stock,
        hospital_id: this.hospId,
      };
      data.push(obj);
    }
    try {
      const rs: any = await this.fulfillService.saveSuppliesMinMax(data);
      if (rs.ok) {
        this.alertService.success();
        this.hospId = '';
      }
    } catch (error) {
      this.alertService.error();
    }
  }

}
