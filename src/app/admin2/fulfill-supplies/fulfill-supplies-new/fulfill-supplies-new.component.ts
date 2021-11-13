import { Component, OnInit, ViewChild } from '@angular/core';
import { FulfillService } from '../../services/fulfill.service';
import { AlertService } from 'src/app/help/alert.service';
import { orderBy, sumBy } from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fulfill-supplies-new',
  templateUrl: './fulfill-supplies-new.component.html',
  styles: []
})
export class FulfillSuppliesNewComponent implements OnInit {

  isModal = true;
  g9: any = false;
  g10: any = false;
  g11: any = false;
  g12: any = false;
  g13: any = false;
  g14: any = false;
  g15: any = false;
  g16: any = false;
  g17: any = false;
  gAll: any = false;
  products = [];

  sortFulfill = {
    type: 'zone_code',
    order: 'asc'
  };

  g9Fill = 0;
  g10Fill = 0;
  g11Fill = 0;
  g12Fill = 0;
  g13Fill = 0;
  g14Fill = 0;
  g15Fill = 0;
  g16Fill = 0;
  g17Fill = 0;
  @ViewChild('modalLoading', { static: true }) loading: any;
  constructor(
    private fulfillService: FulfillService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
  }


  onClickAll() {
    if (!this.gAll) {
      this.g9 = true;
      this.g10 = true;
      this.g11 = true;
      this.g12 = true;
      this.g13 = true;
      this.g14 = true;
      this.g15 = true;
      this.g16 = true;
      this.g17 = true;
    } else {
      this.g9 = false;
      this.g10 = false;
      this.g11 = false;
      this.g12 = false;
      this.g13 = false;
      this.g14 = false;
      this.g15 = false;
      this.g16 = false;
      this.g17 = false;
    }
  }
  onClickSelect() {
    this.isModal = false;
    this.getProducts();
  }

  async getProducts() {
    try {
      this.loading.show();
      const rs: any = await this.fulfillService.getListSupplies();
      if (rs.ok) {
        this.products = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
      this.loading.hide();
    } catch (error) {
      this.loading.hide();
      this.alertService.error(error);
    }
  }

  sort(type) {
    try {
      if (this.sortFulfill.type === type) {
        if (this.sortFulfill.order === 'desc') {
          this.sortFulfill.order = 'asc';
        } else {
          this.sortFulfill.order = 'desc';
        }
      } else {
        this.sortFulfill.type = type;
        this.sortFulfill.order = 'asc';
      }


      this.products = orderBy(this.products, [this.sortFulfill.type, this.sortFulfill.order]);
      // this.getProducts();
    } catch (error) {
      this.alertService.error(error);
    }
  }


  async onClickFulFill() {
    try {
      const confirm = await this.alertService.confirm(`คุณต้องการเติมเวชภัณฑ์ใช่หรือไม่?`);
      if (confirm) {
        const list = {
          g9: this.g9,
          g10: this.g10,
          g11: this.g11,
          g12: this.g12,
          g13: this.g13,
          g14: this.g14,
          g15: this.g15,
          g16: this.g16,
          g17: this.g17
        };
        this.loading.show();
        const rs: any = await this.fulfillService.saveFulFillSupplies(this.products, list);
        if (rs.ok) {
          this.alertService.success();
          this.router.navigate(['/admin/fulfill-supplies']);
          // await this.getProducts();
        } else {
          this.alertService.error(rs.error);
        }
      }
      this.loading.hide();
    } catch (error) {
      this.loading.hide();
      this.alertService.error(error);
    }
  }

  sumProduct() {
    this.g9Fill = sumBy(this.products, 'surgical_gown_recomment_qty');
    this.g10Fill = sumBy(this.products, 'cover_all1_recomment_qty');
    this.g11Fill = sumBy(this.products, 'cover_all2_recomment_qty');
    this.g12Fill = sumBy(this.products, 'n95_recomment_qty');
    this.g13Fill = sumBy(this.products, 'shoe_cover_recomment_qty');
    this.g14Fill = sumBy(this.products, 'surgical_hood_recomment_qty');
    this.g15Fill = sumBy(this.products, 'long_glove_recomment_qty');
    this.g16Fill = sumBy(this.products, 'face_shield_recomment_qty');
    this.g17Fill = sumBy(this.products, 'surgical_mask_recomment_qty');
  }
}
