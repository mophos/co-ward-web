
import { Component, OnInit, Input } from '@angular/core';
import { FulfillService } from '../../admin/services/fulfill.service';

@Component({
  selector: 'app-fulfill-surgical-mask-details',
  templateUrl: './fulfill-surgical-mask-details.component.html',
  styles: []
})
export class FulfillSurgicalMaskDetailsComponent implements OnInit {
  @Input() id: any;
  list: any;

  constructor(
    private fulfillService: FulfillService
  ) { }

  ngOnInit() {
    this.getSurgicalDetails();
  }

  async getSurgicalDetails() {
    try {
      const rs: any = await this.fulfillService.getSurgicalMaskDetails(this.id);
      if (rs.ok) {
        this.list = rs.rows;
        console.log(this.list);
        
      }
    } catch (error) {

    }
  }

}
