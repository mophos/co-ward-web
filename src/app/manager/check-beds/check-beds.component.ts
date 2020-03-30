import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-beds',
  templateUrl: './check-beds.component.html',
  styles: []
})
export class CheckBedsComponent implements OnInit {

  data: any = [];
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.checkBed();
  }

  async checkBed() {
    try {
      const rs: any = await this.apiService.checkBed();
      if (rs.ok) {
        this.data = rs.rows;
      }
      console.log(rs);

    } catch (error) {

    }
  }
}
