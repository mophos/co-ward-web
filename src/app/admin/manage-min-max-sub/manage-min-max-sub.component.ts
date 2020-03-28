import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MinMaxService } from '../min-max.service';
import { AlertService } from '../../help/alert.service';

@Component({
  selector: 'app-manage-min-max-sub',
  templateUrl: './manage-min-max-sub.component.html',
  styles: []
})
export class ManageMinMaxSubComponent implements OnInit {

  hosptypeCode: any;
  ministryCode: any;
  subMinistryCode: any;

  total: any;
  query: any;
  offset = 0;
  limit = 20;

  list: any = [];
  constructor(
    private route: ActivatedRoute,
    private minmaxTypeService: MinMaxService,
    private alertService: AlertService,
  ) {
    const params = this.route.snapshot.params;
    console.log(params);
    
    this.hosptypeCode = params.hosptypeCode;
    this.ministryCode = params.ministryCode;
    this.subMinistryCode = params.subMinistryCode;
  }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    try {
      let rs: any = await this.minmaxTypeService.getListHosp(this.hosptypeCode, this.ministryCode, this.subMinistryCode, this.query, this.limit, this.offset);
      console.log(rs);
      
      if (rs.ok) {
        this.list = rs.rows;
      } else {
        this.alertService.error();
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }


}
