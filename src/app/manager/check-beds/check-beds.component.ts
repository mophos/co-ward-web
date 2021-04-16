import { AlertService } from './../../help/alert.service';
import { ApiService } from './../api.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-check-beds',
  templateUrl: './check-beds.component.html',
  styles: []
})
export class CheckBedsComponent implements OnInit {

  data: any = [];
  @ViewChild('loadding', { static: false }) loadding: any;
  constructor(
    private apiService: ApiService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.checkBed();
  }

  async checkBed() {
    try {
      this.loadding.show();
      const rs: any = await this.apiService.checkBed();
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
