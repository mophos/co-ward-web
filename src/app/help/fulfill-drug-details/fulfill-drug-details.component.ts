import { Component, OnInit, Input } from '@angular/core';
import { FulfillService } from '../../admin/services/fulfill.service';

@Component({
  selector: 'app-fulfill-drug-details',
  templateUrl: './fulfill-drug-details.component.html',
  styles: []
})
export class FulfillDrugDetailsComponent implements OnInit {

  @Input() id: any;

  constructor() { }

  ngOnInit() {
    this.getDrugSumDetails();
  }

  async getDrugSumDetails() {
    try {

    } catch (error) {

    }
  }

}
