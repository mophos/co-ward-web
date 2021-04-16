import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from '../../help/alert.service';
import { TrackingService } from '../tracking.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TrackingDetailComponent } from '../tracking-detail/tracking-detail.component';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styles: []
})
export class TrackingComponent implements OnInit {

  list: any;
  @ViewChild('modalsDetail', { static: false }) modalsDetail: TrackingDetailComponent;

  constructor(
    private alertService: AlertService,
    private trackingService: TrackingService,
    private router: Router,
  ) {
  }

  async ngOnInit() {
    await this.getlist();
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
    this.modalsDetail.open(l.id, l.con_no)
  }

}
