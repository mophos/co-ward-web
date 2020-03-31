import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterService } from '../register/register.service';
import { AlertService } from '../help/alert.service';
import thaiIdCard from 'thai-id-card';
import { AutocompleteHospitalComponent } from '../help/autocomplete-hospital/autocomplete-hospital.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  hospcodeConfirm: any = '';
  onSelectHospcode: any = null;
  hospCode: any = ''
  cid: any = ''
  position: any
  prename: any
  firstName: any
  lastName: any
  username: any
  password: any = ''
  passwordConfirm: any = ''
  email: any = ''
  phoneNumber: any

  checkHospCode: any
  checkCid: any
  checkPassword: any
  checkPasswordConfirm: any
  checkEmail: any
  checkPhone: any

  hospName: any = ''

  @ViewChild('hospital') hosp: AutocompleteHospitalComponent;

  constructor(
    private alertService: AlertService,
    private registerService: RegisterService,
  ) { }

  ngOnInit() {
  }

  async enterHopsCord() {
    if (this.hospCode.length == 5) {
      try {
        const rs: any = await this.registerService.getHospCode(this.hospCode);
        if (rs.ok) {
          if (rs.rows.length) {
            this.checkHospCode = true
            this.hospName = rs.rows[0].hospname
          } else {
            this.hospName = ''
            this.checkHospCode = false
          }
        } else {
          this.alertService.error();
        }
      } catch (error) {
        this.alertService.error(error);
      }
    }
    else {
      this.checkHospCode = false
    }
  }

  async enterCid() {
    if (this.cid.length == 13) {
      this.checkCid = thaiIdCard.verify(this.cid);
    } else {
      this.checkCid = false
    }
  }

  async enterPassword() {
    this.checkPassword = /^(?=.*[A-Za-z])(?=.*[0-9]).{8,}$/.test(this.password)
  }

  async enterPhone() {
    this.checkPhone = /^([0-9]{10})$/.test(this.phoneNumber)
  }

  async enterEmail() {
    this.checkEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(this.email)
  }

  async enterPasswordConfirm() {
    if (this.password == this.passwordConfirm && this.checkPassword) {
      this.checkPasswordConfirm = true
    } else if (this.password != this.passwordConfirm) {
      this.checkPasswordConfirm = false
    }
  }

  async save() {
    try {
      if (this.checkHospCode && this.checkCid && this.position != '' && this.prename != '' && this.firstName != '' && this.lastName != '' && this.username != '' && this.checkPasswordConfirm && this.checkEmail && this.checkPhone) {
        let obj: any = {
          username: this.username,
          password: this.password,
          hospcode: this.hospCode,
          prename: this.prename,
          fname: this.prename,
          lname: this.prename,
          position: this.position,
          email: this.email,
          type: 'STAFF',
          telephone: this.phoneNumber,
        }
        console.log(obj);
      }
    } catch (error) {

    }
  }

  async onSelectHosp(e) {
    this.onSelectHospcode = e.hospcode;
  }

}
