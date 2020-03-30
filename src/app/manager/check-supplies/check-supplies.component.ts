import { AlertService } from './../../help/alert.service';
import { ApiService } from './../api.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-check-supplies',
  templateUrl: './check-supplies.component.html',
  styles: []
})
export class CheckSuppliesComponent implements OnInit {

  data: any = [];
  @ViewChild('loadding') loadding: any;
  constructor(
    private apiService: ApiService,
    private alertService: AlertService
  ) {
  }


  async ngOnInit() {
    await this.checkBed();
  }

  async checkBed() {
    try {
      this.loadding.show();
      const rs: any = await this.apiService.checkSupplies();
      if (rs.ok) {
        this.data = rs.rows;
      }
      this.loadding.hide();
    } catch (error) {
      this.loadding.hide();
      this.alertService.error(error);
    }
  }
}
