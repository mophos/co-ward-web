import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../help/alert.service';
import { NodeSurgicalService } from '../services/node-surgical.service';

@Component({
  selector: 'app-manage-node-surgical',
  templateUrl: './manage-node-surgical.component.html',
  styles: []
})
export class ManageNodeSurgicalComponent implements OnInit {

  list: any;
  listDetail: any;
  query: any;
  nodeId: any;
  hospId: any;
  hospname: any;
  hospcode: any;
  addHops: any;
  modal: any = false;
  loading: any = false;

  constructor(
    private alertService: AlertService,
    private nodeSurgicalService: NodeSurgicalService,
  ) { }

  ngOnInit() {
    this.getListNode();
  }

  async getListNode() {
    try {
      this.loading = true;
      const rs: any = await this.nodeSurgicalService.getList(this.query);
      if (rs.ok) {
        this.list = rs.rows;
        this.loading = false;
      } else {
        this.alertService.error(rs.error);
        this.loading = false;
      }
    } catch (error) {
      this.alertService.error(error);
      this.loading = false;
    }
  }

  async doEnter(e) {
    if (e.keyCode === 13) {
      await this.getListNode();
    }
  }

  async onClickEdit(l) {
    try {
      this.addHops = '';
      this.loading = true;
      this.nodeId = l.id;
      this.hospcode = l.hospcode;
      this.hospname = l.hospname;
      const rs: any = await this.nodeSurgicalService.getListDetail(this.nodeId);
      if (rs.ok) {
        this.listDetail = rs.rows;
        this.loading = false;
      } else {
        this.alertService.error(rs.error);
        this.loading = false;
      }
    } catch (error) {
      this.alertService.error(error);
      this.loading = false;
    }
    this.modal = true;
  }

  async onClickRemove(l) {

  }

  async onClickRemoveDetail(l) {

  }

  async onClickAdd() {
    try {
      this.loading = true;
      const rs: any = await this.nodeSurgicalService.saveDetail(this.addHops, this.nodeId);
      if (rs.ok) {
        const rs: any = await this.nodeSurgicalService.getListDetail(this.nodeId);
        if (rs.ok) {
          this.addHops = '';
          this.listDetail = rs.rows;
        }
        this.alertService.success();
        this.loading = false;
      } else {
        this.alertService.error(rs.error);
        this.loading = false;
      }
    } catch (error) {
      this.alertService.error(error);
      this.loading = false;
    }
  }

}
