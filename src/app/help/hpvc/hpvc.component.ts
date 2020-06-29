import { AlertService } from 'src/app/help/alert.service';
import { HelpService } from './../help.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hpvc',
  templateUrl: './hpvc.component.html',
  styles: []
})
export class HpvcComponent implements OnInit {

  isModal = false;
  list: any = [];
  choice: any = [];
  constructor(
    private helpService: HelpService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  openModal() {
    this.isModal = true;
  }

  async getChoice() {
    try {
      const rs: any = await this.helpService.getHPVC();
      if (rs.ok) {
        this.choice = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }
}
