import { Component, OnInit } from '@angular/core';
import { MinMaxService } from '../min-max.service';
import { AlertService } from '../../help/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-min-max',
  templateUrl: './manage-min-max.component.html',
  styles: []
})
export class ManageMinMaxComponent implements OnInit {

  list: any = [];

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
      let rs: any = await this.minmaxTypeService.getList();
      if (rs.ok) {
        this.list = rs.rows;
      } else {
        this.alertService.error();
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async onClickEdit(l) {
    this.router.navigate(['/admin/manage-min-max/sub', { hosptypeCode: l.hosptype_code, ministryCode: l.ministry_code, subMinistryCode: l.sub_ministry_code }]);
  }

}
