import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../help/alert.service';
import { TrackingService } from '../tracking.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styles: []
})
export class TrackingComponent implements OnInit {

  list: any

  constructor(
    private alertService: AlertService,
    private trackingService: TrackingService,
    private router: Router,
  ) {
  }

  async ngOnInit() {
    await this.getlist();
    console.log(this.list);
  }

  async getlist() {
    try {
      const rs: any = await this.trackingService.getPayList();
      if (rs.ok) {
        this.list = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  onOpenDetails(l) {
    this.router.navigate(['staff/tracking/details', { id: l.id }]);
  }

}
