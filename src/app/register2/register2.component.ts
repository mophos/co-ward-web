import { Component, OnInit, ViewChild } from '@angular/core';
import { Register2Service } from './register2.service';
import { AlertService } from '../help/alert.service';
import thaiIdCard from 'thai-id-card';
import { AutocompleteHospitalComponent } from '../help/autocomplete-hospital/autocomplete-hospital.component';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-register2',
  templateUrl: './register2.component.html',
  styles: []
})
export class Register2Component implements OnInit {

  hospcodeConfirm: any = '';
  onSelectHospcode: any = null;
  cid: any = '';
  position: any = 8;
  title: any = 145;
  firstName: any = '';
  lastName: any = '';
  username: any = '';
  password: any = '';
  passwordConfirm: any = '';
  email: any = '';
  phoneNumber: any = '';
  province: any;

  checkCid: any;
  checkPassword: any;
  checkPasswordConfirm: any;
  checkEmail: any;
  checkPhone: any;

  titleList: any;
  positionList: any;

  isUploading: any = false;
  isNodeDrugs: any;
  isNodeSupplies: any;
  isDRUGS: any = false;
  isSupplies: any = false;
  hospName: any = '';
  redirect: any;
  @ViewChild('hospital') hosp: AutocompleteHospitalComponent;
  constructor(
    private alertService: AlertService,
    private registerService: Register2Service,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.redirect = params.redirect ? params.redirect : null;
    });
    console.log(this.redirect);

  }

  ngOnInit() {
    this.getTitle();
    this.getPosition();
  }

  async enterCid() {
    if (this.cid.length === 13) {
      this.checkCid = thaiIdCard.verify(this.cid);
    } else {
      this.checkCid = false;
    }
  }

  async enterPassword() {
    this.checkPassword = /^(?=.*[A-Za-z])(?=.*[0-9]).{8,}$/.test(this.password);
    if (this.password === this.passwordConfirm && this.checkPassword) {
      this.checkPasswordConfirm = true;
    } else if (this.password !== this.passwordConfirm) {
      this.checkPasswordConfirm = false;
    }
  }

  async enterPasswordConfirm() {
    if (this.password === this.passwordConfirm && this.checkPassword) {
      this.checkPasswordConfirm = true;
    } else if (this.password !== this.passwordConfirm) {
      this.checkPasswordConfirm = false;
    }
  }

  async enterPhone() {
    this.checkPhone = /^([0-9]{10})$/.test(this.phoneNumber);
  }

  async enterEmail() {
    this.checkEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(this.email);
  }



  async save() {
    const confirm = await this.alertService.confirm();
    if (confirm) {
      try {
        if (this.onSelectHospcode === this.hospcodeConfirm && this.checkCid && this.position && this.title && this.firstName !== '' && this.lastName !== '' && this.username !== '' && this.checkPasswordConfirm && this.checkEmail && this.checkPhone) {
          const obj: any = {
            username: this.username,
            password: this.password,
            hospcode: this.onSelectHospcode,
            cid: this.cid,
            titleId: this.title,
            fname: this.firstName,
            lname: this.lastName,
            positionId: this.position,
            email: this.email,
            type: 'STAFF',
            telephone: this.phoneNumber,
            isProvince: this.province,
            isNodeDrugs: this.isNodeDrugs,
            isNodeSupplies: this.isNodeSupplies,
            isDRUGS: this.isDRUGS,
            isSupplies: this.isSupplies,
            hospname: this.hospName
          };

          const rs: any = await this.registerService.register2(obj);
          if (rs.ok) {
            this.alertService.success();
            if (this.redirect) {
              window.location.href = this.redirect;
            } else {
              window.location.reload();
            }
            // this.router.navigate(['/login']);
          } else {
            this.alertService.error(rs.error);
          }
        }
      } catch (error) {
        this.alertService.error(error);
      }
    }
  }

  async onSelectHosp(e) {
    if (Object.values(e).length) {
      this.onSelectHospcode = e.hospcode;
      this.hospName = e.hospname;
      this.province = e.hosptype_id === '1' ? 'Y' : 'N';
      const id = e.id;
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
  }

  async getTitle() {
    try {
      const rs: any = await this.registerService.getTitle();
      if (rs.ok) {
        this.titleList = rs.rows;
        // this.title = rs.rows[0].id;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error.message);
    }
  }

  async getPosition() {
    try {
      const rs: any = await this.registerService.getPosition();
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

  cancel() {
    this.router.navigate(['/login']);
  }


}
