import { Component, OnInit, Input } from '@angular/core';
import { FulfillService } from '../../admin/services/fulfill.service';

@Component({
  selector: 'app-fulfill-drug-details',
  templateUrl: './fulfill-drug-details.component.html',
  styles: []
})
export class FulfillDrugDetailsComponent implements OnInit {

  @Input() id: any;
  list: any;
  loading = false;
  constructor(
    private fulfillService: FulfillService
  ) { }

  ngOnInit() {
    this.getDrugSumDetails();
  }

  async getDrugSumDetails() {
    try {
      const rs: any = await this.fulfillService.getDrugSumDetails(this.id);
      if (rs.ok) {
        this.list = rs.rows;
      }
    } catch (error) {

    }
  }

}
