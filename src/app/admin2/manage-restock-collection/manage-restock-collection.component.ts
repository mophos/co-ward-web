import { Component, OnInit } from '@angular/core';
import { RestockCollectionService } from '../services/restock-collection.service';
import { AlertService } from 'src/app/help/alert.service';

@Component({
  selector: 'app-manage-restock-collection',
  templateUrl: './manage-restock-collection.component.html',
  styles: []
})
export class ManageRestockCollectionComponent implements OnInit {
  loading = false;
  list: any;
  total = 0;
  limit = 20;
  offset = 0;

  constructor(
    private restockCollectionService: RestockCollectionService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getRestockCollection();
  }

  async getRestockCollection() {
    try {
      this.loading = true;
      const rs: any = await this.restockCollectionService.getRestockCollection(this.limit, this.offset);
      if (rs.ok) {
        this.list = rs.rows;
        this.total = rs.total;
      } else {
        this.alertService.error();
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.alertService.error(error);
    }
  }

}
