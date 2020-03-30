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
  check = false;

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
    this.check = false;
    try {
      let data = [];
      for (const v of this.list) {
        if ((v.total - v.usage_bed) < 0) {
          this.check = true;
        }
        const obj: any = {};
        obj.bed_id = v.id;
        obj.usage_bed = v.usage_bed;
        obj.total = v.total;
        data.push(obj);
      }
      if (this.check) {
        this.alertService.error('จำนวนเตียงติดลบ');
      } else {
        let rs: any = await this.bedService.save(data);
        if (rs.ok) {
          this.alertService.success();
          this.getList();
        } else {
          this.alertService.error();
        }
      }
    } catch (error) {
      this.alertService.error();
    }
  }
}
