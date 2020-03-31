import { AlertService } from './../../help/alert.service';
import { ApiService } from './../api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-check-bed-eoc',
  templateUrl: './check-bed-eoc.component.html',
  styles: []
})
export class CheckBedEocComponent implements OnInit {

  data: any = [];
  @ViewChild('loadding') loadding: any;
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
      const rs: any = await this.apiService.checkBedEOC('2020-03-31');
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
