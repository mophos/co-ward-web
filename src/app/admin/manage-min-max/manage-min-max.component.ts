import { Component, OnInit } from '@angular/core';
import { MinMaxService } from '../services/min-max.service';
import { AlertService } from '../../help/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-min-max',
  templateUrl: './manage-min-max.component.html',
  styles: []
})
export class ManageMinMaxComponent implements OnInit {

  list: any = [];
  loading = false;
  constructor(
    private minmaxTypeService: MinMaxService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    try {
      this.loading = true;
      const rs: any = await this.minmaxTypeService.getList();
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

  async onClickEdit(l) {
    this.router.navigate(['/admin/manage-min-max/sub', { chospitalTypesId: l.id }]);
  }

}
