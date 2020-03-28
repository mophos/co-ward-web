import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';
import { AlertService } from '../../help/alert.service';

@Component({
  selector: 'app-manage-request',
  templateUrl: './manage-request.component.html',
  styles: []
})
export class ManageRequestComponent implements OnInit {
  list: any = [];
  loading = false;
  constructor(
    private requestService: RequestService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    try {
      this.loading = true;
      const rs: any = await this.requestService.getList();
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
    this.router.navigate(['/admin/manage-request/sub', { hosptypeCode: l.hosptype_code, ministryCode: l.ministry_code, subMinistryCode: l.sub_ministry_code }]);
  }

}
