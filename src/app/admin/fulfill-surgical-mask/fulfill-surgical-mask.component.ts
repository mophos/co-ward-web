import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../help/alert.service';
import { FulfillService } from '../services/fulfill.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-fulfill-surgical-mask',
  templateUrl: './fulfill-surgical-mask.component.html',
  styles: []
})
export class FulfillSurgicalMaskComponent implements OnInit {
  loading = false;
  mHospital: any;
  gHospital: any;
  cHospital: any;
  province: any;
  district: any;
  subdistrict: any;
  totalQty: any;

  hospitalTypeCode: any = [];
  week: any;

  list: any;
  constructor(
    private fulfillService: FulfillService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async enter() {
    this.hospitalTypeCode = [];

    if (this.mHospital) {
      this.hospitalTypeCode.push('05');
    }
    if (this.gHospital) {
      this.hospitalTypeCode.push('06');
    }
    if (this.cHospital) {
      this.hospitalTypeCode.push('07');
    }
    if (this.province) {
      this.hospitalTypeCode.push('01');
    }
    if (this.district) {
      this.hospitalTypeCode.push('02');
    }
    if (this.subdistrict) {
      this.hospitalTypeCode.push('18');
    }

    if (this.hospitalTypeCode.length > 0) {
      this.loading = true;
      try {
        const rs: any = await this.fulfillService.calSurgicalMask(this.hospitalTypeCode, this.totalQty);
        if (rs.ok) {
          this.list = rs.rows;
          this.loading = false;
          console.log(this.list);
        } else {
          this.loading = false;
          this.alertService.error(rs.error);
        }
      } catch (error) {
        this.loading = false;
        this.alertService.error(error);
      }
    } else {
      this.alertService.error('กรุณาเลือกประเภทสถานบริการ');
    }
  }

  async save() {
    if (this.week > 0) {
      const confirm = await this.alertService.confirm();
      if (confirm) {
        try {
          const rs: any = await this.fulfillService.saveSurgicalMask(this.list, this.week);
          if (rs.ok) {
            this.alertService.success();
            this.router.navigate(['/admin/fulfill-surgical-masks-list']);
          } else {
            this.alertService.error();
          }
        } catch (error) {
          this.alertService.error();
        }
      }
    } else {
      this.alertService.error('กรุณาเลือกระยะเวลา');
    }
  }
}
