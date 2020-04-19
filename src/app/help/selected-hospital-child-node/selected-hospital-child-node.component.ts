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
  hospId = null;
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

  onSelected(l) {
    console.log(l);
    
    if (l) {
      const idx: any = findIndex(this.list, { id: +l });
      if (idx > -1) {
        this.onselect.emit(this.list[idx]);
      } else {
        this.alertService.error();
      }
    }
  }

  clear() {
    this.hospId = null;
  }
}
