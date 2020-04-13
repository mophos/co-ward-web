import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../help/alert.service';
import { TrackingService } from '../tracking.service';

@Component({
  selector: 'app-tracking-detail',
  templateUrl: './tracking-detail.component.html',
  styles: []
})
export class TrackingDetailComponent implements OnInit {

  suppiles: any
  modalsDetail: any

  constructor(
    private alertService: AlertService,
    private trackingService: TrackingService,
  ) { }

  async ngOnInit() {
  }

  async getSuppiles(id, con_no) {
    try {
      const rs: any = await this.trackingService.getPayDetails(id, con_no);
      if (rs.ok) {
        this.suppiles = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  open(id, con_no) {
    this.getSuppiles(id, con_no);
    this.modalsDetail = true
  }

}
