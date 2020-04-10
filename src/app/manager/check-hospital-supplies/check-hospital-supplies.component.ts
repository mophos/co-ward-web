import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-hospital-supplies',
  templateUrl: './check-hospital-supplies.component.html',
  styles: []
})
export class CheckHospitalSuppliesComponent implements OnInit {
  list: any;
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    try {
      const rs: any = await this.apiService.checkRemainHosp();
      if (rs.ok) {
        this.list = rs.rows;
        console.log(this.list);
        
      }
    } catch (error) {

    }
  }

}
