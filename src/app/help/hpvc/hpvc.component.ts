import { AlertService } from 'src/app/help/alert.service';
import { HelpService } from './../help.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hpvc',
  templateUrl: './hpvc.component.html',
  styles: []
})
export class HpvcComponent implements OnInit {

  isModal = false;
  list: any = [];
  choice: any = [];
  personId: any;
  isAdd = false;
  constructor(
    private helpService: HelpService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getChoice();
  }

  openModal(personId) {
    this.personId = personId;
    this.getList();
    this.isModal = true;
  }

  onClickAdd() {
    this.isAdd = true;
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
}
