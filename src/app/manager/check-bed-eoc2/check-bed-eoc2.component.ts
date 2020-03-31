import { AlertService } from './../../help/alert.service';
import { ApiService } from './../api.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-check-bed-eoc2',
  templateUrl: './check-bed-eoc2.component.html',
  styles: []
})
export class CheckBedEoc2Component implements OnInit {

  data: any = [];
  date: any;
  @ViewChild('loadding') loadding: any;
  constructor(
    private apiService: ApiService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    if(this.date){
      this.checkBed();
    }
  }

  onChangeDate() {
    this.checkBed();
  }

  async checkBed() {
    try {
      this.loadding.show();
      const rs: any = await this.apiService.checkBedEOC(this.data);
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
