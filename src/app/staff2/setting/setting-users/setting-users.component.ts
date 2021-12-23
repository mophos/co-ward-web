import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../user.service';
import { RegisterService } from '../../../register/register.service';
import { AlertService } from '../../../help/alert.service';
import { findIndex } from 'lodash';

@Component({
  selector: 'app-setting-users',
  templateUrl: './setting-users.component.html',
  styles: []
})
export class SettingUsersComponent implements OnInit {

  query: any = '';
  list: any;
  userId: any;
  province: any;
  isNodeDrugs: any;
  isNodeSupplies: any;
  groupName: any;
  rights: any;
  all: any;
  modal: any = false;
  loading: any = false;
  isSave: any = false;

  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private registerService: RegisterService,
  ) { }

  ngOnInit() {
    this.getListUser();
  }

  async getListUser() {
    try {
      const rs: any = await this.userService.getUser(this.query);
      if (rs.ok) {
        this.list = rs.rows;
      }
    } catch (error) {
      this.alertService.error();
    }
  }

  doEnter(e) {
    if (e.keyCode === 13) {
      this.getListUser();
    }
  }

  async removeUser(e) {
    try {
      const confirm = await this.alertService.confirm();
      if (confirm) {
        const rs: any = await this.userService.removeUser(e.id);
        if (rs.ok) {
          this.getListUser();
          this.alertService.success();
        }
      }
    } catch (error) {
      this.alertService.error();
    }
  }

  async editRights(e) {
    this.rights = [];
    this.isSave = true;
    if (Object.values(e).length) {
      this.userId = e.id;
      const id = e.hospital_id;
      try {
        const rs: any = await this.registerService.getNodeDrugs(id);
        if (rs.ok) {
          if (rs.rows.length) {
            this.isNodeDrugs = true;
          } else {
            this.isNodeDrugs = false;
          }
        } else {
          this.alertService.error(rs.error);
        }

        const rs2: any = await this.registerService.getNodeSupplies(id);
        if (rs2.ok) {
          if (rs2.rows.length) {
            this.isNodeSupplies = true;
          } else {
            this.isNodeSupplies = false;
          }
        } else {
          this.alertService.error(rs.error);
        }
      } catch (error) {
        this.alertService.error(error.message);
      }
    }

    if (this.isNodeDrugs) {
      this.groupName = 'n';
    } else if (this.isNodeSupplies) {
      this.groupName = 's';
    } else {
      this.groupName = 'c';
    }

    try {
      const rs: any = await this.userService.getUserRight(e.id, this.groupName);
      if (rs.ok) {
        this.rights = rs.rows;
        this.modal = true;
        await this.setRights();
      }
    } catch (error) {
      this.alertService.error(error.message);
    }
  }

  setRights() {
    for (const i of this.rights) {
      // - have_right
      if (i.user_id != null) {
        i.check = true;
      } else {
        i.check = false;
      }
    }
  }

  checkAll(e) {
    for (const r of this.rights) {
      r.check = e.target.checked;
    }
  }

  onChange(e, i) {
    const idx = findIndex(this.rights, { id: +i.id });
    if (idx > -1) {
      if (e.target.checked) {
        this.rights[idx].check = true;
      } else {
        this.rights[idx].check = false;
      }
    }
  }

  async saveRights() {
    try {
      const confirm = await this.alertService.confirm();
      if (confirm) {
        const data: any = [];
        let obj: any;
        for (const i of this.rights) {
          console.log(i.check);
          if (i.check) {
            obj = {
              user_id: this.userId,
              right_id: i.id,
            };
            data.push(obj);
          }
        }
        const rs: any = await this.userService.updateUserRight(data, this.userId);
        if (rs.ok) {
          this.alertService.success();
          this.modal = false;
          this.loading = false;
          this.isSave = false;
        } else {
          this.alertService.error();
        }
        this.loading = false;
        this.isSave = false;
      }
    } catch (error) {
      this.alertService.error(error.message);
    }
  }
}
