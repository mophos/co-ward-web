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

  id: any
  suppiles: any
  modalsDetail: any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private trackingService: TrackingService,
  ) {
    const params = this.route.snapshot.params;
    this.id = params.id;
  }

  async ngOnInit() {
  }

  async getSuppiles() {
    try {
      const rs: any = await this.trackingService.getPayDetails(this.id);
      if (rs.ok) {
        this.suppiles = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  open(id){
    this.id = id
    this.getSuppiles();
    this.modalsDetail = true
  }

}
