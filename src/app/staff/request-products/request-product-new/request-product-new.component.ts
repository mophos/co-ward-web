import { RequestProductsService } from './../../services/request-products.service';
import { AlertService } from 'src/app/help/alert.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { findIndex } from 'lodash';
import { Router } from '@angular/router';
@Component({
  selector: 'app-request-product-new',
  templateUrl: './request-product-new.component.html',
  styleUrls: ['./request-product-new.component.css']
})
export class RequestProductNewComponent implements OnInit {

  productTypes = [];
  products = [];
  typeId = null;
  total = 0;
  requests = [];
  loading = false;

  @ViewChild('loading') loadingPage: any;
  constructor(
    private alertService: AlertService,
    private requestProductsService: RequestProductsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getProductType();
    // this.getProducts(null);
  }

  async getProductType() {
    try {
      this.loadingPage.show();
      const rs: any = await this.requestProductsService.getProductType();
      if (rs.ok) {
        this.productTypes = rs.rows;
        this.getProducts(null);
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.loadingPage.hide();
      this.alertService.error(error);
    }
  }

  async getProducts(typeId) {
    try {
      this.loadingPage.show();
      const rs: any = await this.requestProductsService.getProducts(typeId);
      if (rs.ok) {
        this.products = rs.rows;
        for (const i of this.requests) {
          const idx = findIndex(this.products, { product_id: i.product_id });
          if (idx > -1) {
            this.products[idx].qty = i.qty;
          }
        }
      } else {
        this.alertService.error(rs.error);
      }
      this.loadingPage.hide();
    } catch (error) {
      this.loadingPage.hide();
      this.alertService.error(error);
    }
  }

  onKeyQty(i, qty) {
    const idx = findIndex(this.requests, { product_id: i.product_id });
    if (idx > -1) {
      if (+qty === 0) {
        this.requests.splice(idx, 1);
      } else {
        this.requests[idx].qty = qty;
      }
    } else {
      this.requests.push({
        product_id: i.product_id,
        product_name: i.product_name,
        unit: i.unit,
        qty
      });
    }
  }


  async onClickSave() {
    try {
      if (this.requests.length > 0) {
        const confirm = await this.alertService.confirm();
        if (confirm) {
          const rs: any = await this.requestProductsService.save(this.requests);
          if (rs.ok) {
            this.alertService.success();
            this.router.navigate(['/staff/request-products']);
          } else {
            this.alertService.error();
          }
        }
      } else {
        this.alertService.error('กรุณาระบุจำนวน');
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }
}
