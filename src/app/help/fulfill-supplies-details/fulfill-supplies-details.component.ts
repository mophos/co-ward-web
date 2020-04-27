import { Component, OnInit, Input } from '@angular/core';
import { FulfillService } from '../../admin/services/fulfill.service';

@Component({
  selector: 'app-fulfill-supplies-details',
  templateUrl: './fulfill-supplies-details.component.html',
  styles: []
})
export class FulfillSuppliesDetailsComponent implements OnInit {

  @Input() id: any;
  list: any;
  loading = false;
  constructor(
    private fulfillService: FulfillService
  ) { }

  ngOnInit() {
    this.getSuppliesSumDetails();
  }

  async getSuppliesSumDetails() {
    try {
      const rs: any = await this.fulfillService.getSuppliesSumDetails(this.id);
      if (rs.ok) {
        this.list = rs.rows;
      }
    } catch (error) {

    }
  }

}
