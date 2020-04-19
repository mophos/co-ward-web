import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HelpService } from '../help.service';
import { AlertService } from '../alert.service';
import { findIndex } from 'lodash';

@Component({
  selector: 'app-selected-hospital-child-node',
  templateUrl: './selected-hospital-child-node.component.html',
  styles: []
})
export class SelectedHospitalChildNodeComponent implements OnInit {

  list: any;
  hosp = null;
  @Output() onselect: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private helpService: HelpService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    try {
      const rs: any = await this.helpService.getListChildNode();
      if (rs.ok) {
        this.list = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  onSelected() {
    if (typeof this.hosp === 'object') {
      this.onselect.emit(this.hosp);
    } else {
      this.onselect.emit(null);
    }
}

clear() {
  this.hosp = null;
}
}
