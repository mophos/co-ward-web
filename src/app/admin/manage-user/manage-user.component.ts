import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AlertService } from '../../help/alert.service';
import { findIndex } from 'lodash';
import { ClrDatagridStateInterface } from '@clr/angular';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styles: []
})
export class ManageUserComponent implements OnInit {

  list: any = [];

  username: any;
  password: any;
  hospcode: any;
  prename: any;
  fname: any;
  lname: any;
  position: any;
  email: any;
  type: any;
  id: any;
  telephone: any;

  total: any;
  query: any;
  offset = 0;
  limit = 20;

  loading = false;
  isUpdate = false;
  modal = false;
  titleList: any = [];
  titleId: any;
  positionList: any;
  positionId: any;
  hospname: any;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
  ) { }


  async ngOnInit() {
    await this.getTitleName();
    await this.getPosition();
    await this.getTotal();
    await this.getList();
  }

  async getTotal() {
    try {
      this.loading = true;
      const rs: any = await this.userService.getListTotal(this.query);
      if (rs.ok) {
        this.total = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.alertService.error(error.message);
    }
  }

  refresh(state: ClrDatagridStateInterface) {
    this.limit = +state.page.size;
    this.offset = +state.page.from;
    // this.loading = true;
    // // We convert the filters from an array to a map,
    // // because that's what our backend-calling service is expecting
    // let filters:{[prop:string]: any[]} = {};
    // if (state.filters) {
    //     for (let filter of state.filters) {
    //         let {property, value} = <{property: string, value: string}>filter;
    //         filters[property] = [value];
    //     }
    // }
    // this.inventory.filter(filters)
    //     .sort(<{by: string, reverse: boolean}>state.sort)
    //     .fetch(state.page.from, state.page.size)
    //     .then((result: FetchResult) => {
    //         this.users = result.users;
    //         this.total = result.length;
    //         this.loading = false;
    //     });

    this.getList();
  }

  async getList() {
    try {
      this.loading = true;
      const rs: any = await this.userService.getList(this.query, this.limit, this.offset);
      if (rs.ok) {
        this.list = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.alertService.error(error.message);
    }
  }

  async doEnter(e) {
    if (e.keyCode === 13) {
      this.offset = 0;
      await this.getTotal();
      await this.getList();
    }
  }

  async onClickAdd() {
    this.modal = true;
    this.clearForm();
  }

  async clearForm() {
    this.username = null;
    this.password = null;
    this.hospcode = null;
    this.hospname = null;
    this.prename = null;
    this.fname = null;
    this.lname = null;
    this.position = null;
    this.email = null;
    this.type = null;
    this.id = null;
    this.telephone = null;
  }

  async save() {
    try {
      const data = {
        username: this.username,
        // password: this.password,
        hospcode: this.hospcode,
        // prename: this.prename,
        fname: this.fname,
        lname: this.lname,
        // position: this.position,
        email: this.email,
        // type: this.type
        telephone: this.telephone
      };
      let rs: any;
      if (this.isUpdate) {
          rs = await this.userService.update(data, this.id);
      } else {
        rs = { ok: false }; // await this.userService.save(data);
      }

      if (rs.ok) {
        this.alertService.success();
        this.getList();
        this.modal = false;
      } else {
        this.alertService.error();
      }
    } catch (error) {
      this.alertService.error();
      this.modal = false;
    }
  }

  async onClickEdit(l) {
    console.log(l);
    this.modal = true;
    this.isUpdate = true;
    this.id = l.id;
    this.username = l.username;
    // this.password = null;
    this.hospcode = l.hospcode;
    this.hospname = l.hospname;
    this.prename = l.prename;
    this.fname = l.fname;
    this.lname = l.lname;
    this.telephone = l.telephone;
    // this.position = l.position;
    this.email = l.email;
    this.type = l.type;
    this.titleId = l.title_id;
    this.positionId = l.position_id;
  }

  async onClickRemove(l) {
    try {
      const confirm = await this.alertService.confirm();
      if (confirm) {
        const idx = findIndex(this.list, { id: +l.id });
        if (idx > -1) {
          const rs: any = await this.userService.remove(l.id);
          if (rs.ok) {
            this.list.splice(idx, 1);
          } else {
            this.alertService.error();
          }
        }
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async getTitleName() {

    try {
      const rs: any = await this.userService.getTitle();
      if (rs.ok) {
        this.titleList = rs.rows;
        // this.position = rs.rows[0].id;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error.message);
    }
  }

  async getPosition() {
    try {
      const rs: any = await this.userService.getPosition();
      if (rs.ok) {
        this.positionList = rs.rows;

        // this.position = rs.rows[0].id;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error.message);
    }
  }
}
