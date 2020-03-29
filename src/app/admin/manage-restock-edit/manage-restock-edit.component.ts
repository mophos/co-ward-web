import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../help/alert.service';
import { MinMaxService } from '../min-max.service';
import { RestockService } from '../restock.service';

@Component({
  selector: 'app-manage-restock-edit',
  templateUrl: './manage-restock-edit.component.html',
  styles: []
})
export class ManageRestockEditComponent implements OnInit {

  restockId: any
  restockDetailId: any
  listTypes: any
  listHosp: any
  typeName: any = ''
  hospName: any = ''
  listSupplies: any
  loading = false
  modal = false

  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private minmaxTypeService: MinMaxService,
    private restockService: RestockService,
  ) {
    const params = this.route.snapshot.params;
    this.restockId = params.restockId;
  }

  ngOnInit() {
    this.getListTypes();
  }

  async getListTypes() {
    try {
      this.loading = true;
      const rs: any = await this.minmaxTypeService.getList();
      if (rs.ok) {
        this.listTypes = rs.rows;
      } else {
        this.alertService.error();
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.alertService.error(error);
    }
  }

  async getListHospital(l) {
    this.typeName = l.name
    try {
      this.loading = true;
      const rs: any = await this.restockService.getListHospital(this.restockId, l.id)
      if (rs.ok) {
        this.listHosp = rs.rows;
      } else {
        this.alertService.error();
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.alertService.error(error);
    }
  }

  async onClickEdit(l) {
    this.hospName = l.hospname
    this.restockDetailId = l.id
    try {
      this.loading = true;
      const rs: any = await this.restockService.getListSupplies(this.restockDetailId)
      if (rs.ok) {
        this.listSupplies = rs.rows;
        this.modal = true
      } else {
        this.alertService.error();
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.alertService.error(error);
    }
  }

  async save() {
    const confirm = await this.alertService.confirm();
    if (confirm) {
      try {
        let data: any = [];
        let obj: any
        for (const i of this.listSupplies) {
          obj = {
            supplies_id: i.supplies_id,
            qty: i.qty,
            restock_detail_id: i.restock_detail_id
          }
          data.push(obj)
        }

        const rs: any = await this.restockService.updateSupplies(data, this.restockDetailId)
        if (rs.ok) {
          this.alertService.success();
          this.modal = false
        } else {
          this.alertService.error();
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.alertService.error(error);
      }
    }
  }

}
