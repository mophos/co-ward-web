import { Component, OnInit } from '@angular/core';
import { BedService } from '../bed.service';
import { AlertService } from '../../help/alert.service';

@Component({
  selector: 'app-bed',
  templateUrl: './bed.component.html',
  styles: []
})
export class BedComponent implements OnInit {

  loading = false;

  list: any = [];

  constructor(
    private bedService: BedService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    this.loading = true;
    try {
      let rs: any = await this.bedService.getBeds();
      if (rs.ok) {
        this.list = rs.rows;
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
    try {
      let data = [];
      for (const v of this.list) {
        const obj: any = {};
        obj.bed_id = v.id;
        obj.qty = v.qty;
        obj.usage = v.usage;
        data.push(obj);
      }
      let rs: any = await this.bedService.save(data);
      if (rs.ok) {
        this.alertService.success();
        this.getList();
      } else {
        this.alertService.error();
      }
    } catch (error) {
      this.alertService.error();
    }
  }
}
