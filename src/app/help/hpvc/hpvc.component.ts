import { AlertService } from 'src/app/help/alert.service';
import { HelpService } from './../help.service';
import { Component, OnInit, Input } from '@angular/core';
import { map, compact } from 'lodash';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-hpvc',
  templateUrl: './hpvc.component.html',
  styles: []
})
export class HpvcComponent implements OnInit {

  isModal = false;
  list: any = [];
  choice: any = [];
  products: any = [];
  personId: any;
  isAdd = false;
  symptom: any;
  constructor(
    private helpService: HelpService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getChoice();
    this.getProduct();
  }

  openModal(personId) {
    this.personId = personId;
    this.getList();
    this.isModal = true;
  }

  onClickAdd() {
    this.isAdd = true;
  }

  async getProduct() {
    try {
      const rs: any = await this.helpService.getHpvcProduct();
      if (rs.ok) {
        this.products = rs.rows;

      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async getChoice() {
    try {
      const rs: any = await this.helpService.getHPVC();
      if (rs.ok) {
        console.log(rs);
        this.choice = rs.rows;

      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async getList() {
    try {
      const rs: any = await this.helpService.getListHpvc(this.personId);
      if (rs.ok) {
        this.list = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async onClickSave() {
    const confirm = await this.alertService.confirm('ยืนยันการบันทึกอาการไม่พึงประสงค์ ใช่หรือไม่ ?');
    if (confirm) {
      const selectDrug = compact(map(this.products, (v: any) => {
        if (v.select) {
          return v.id;
        }
      }));
      const selectHpvc = compact(map(this.choice, (v: any) => {
        if (v.select) {
          return v.id;
        }
      }));
      const rs: any = await this.helpService.saveHpvc(this.personId, selectDrug, selectHpvc);
      if (rs.ok) {
        await this.getList();
        await this.getChoice();
        await this.getProduct();
        this.alertService.success();
      } else {
        this.alertService.error(rs.massage);
      }
    }

  }

  async delete(id) {
    const confirm = await this.alertService.confirm('ต้องการลบอาการไม่พึงประสงค์ ใช่หรือไม่ ?');
    if (confirm) {
      const rs: any = await this.helpService.deleteHpvc(id);
      if (rs.ok) {
        await this.getList();
        this.alertService.success();
      } else {
        this.alertService.error(rs.massage);
      }
    }

  }
}
