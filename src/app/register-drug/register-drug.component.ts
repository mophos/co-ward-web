import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterService } from '../register/register.service';
import { AlertService } from '../help/alert.service';
import thaiIdCard from 'thai-id-card';
import { AutocompleteHospitalComponent } from '../help/autocomplete-hospital/autocomplete-hospital.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-drug',
  templateUrl: './register-drug.component.html',
  styles: []
})
export class RegisterDrugComponent implements OnInit {

  hospcodeConfirm: any = '';
  onSelectHospcode: any = null;
  cid: any = ''
  position: any = null;
  title: any = null;
  firstName: any = ''
  lastName: any = ''
  username: any = ''
  password: any = ''
  passwordConfirm: any = ''
  email: any = ''
  phoneNumber: any = ''
  province: any

  checkCid: any
  checkPassword: any
  checkPasswordConfirm: any
  checkEmail: any
  checkPhone: any
  checkImage: any

  titleList: any
  positionList: any

  isUploading: any = false;
  hospName: any = ''

  fileName: any;
  filesToUpload: File = null;
  @ViewChild('hospital', { static: true }) hosp: AutocompleteHospitalComponent;

  constructor(
    private alertService: AlertService,
    private registerService: RegisterService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getTitle();
    this.getPosition();
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
    if (this.password == this.passwordConfirm && this.checkPassword) {
      this.checkPasswordConfirm = true
    } else if (this.password != this.passwordConfirm) {
      this.checkPasswordConfirm = false
    }
  }

  async enterPasswordConfirm() {
    if (this.password == this.passwordConfirm && this.checkPassword) {
      this.checkPasswordConfirm = true
    } else if (this.password != this.passwordConfirm) {
      this.checkPasswordConfirm = false
    }
  }

  async enterPhone() {
    this.checkPhone = /^([0-9]{10})$/.test(this.phoneNumber)
  }

  async enterEmail() {
    this.checkEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(this.email)
  }

  async fileChangeEvent(fileInput: any) {
    this.filesToUpload = null;
    this.filesToUpload = <File>fileInput.target.files[0];
    if (this.filesToUpload) {
      this.fileName = fileInput.target.files[0].name;
    }
    try {
      let rs: any = await this.registerService.uploadUserSupplie(
        this.filesToUpload,
        this.cid,
      );
      if (rs.ok) {
        this.checkImage = true
      }
    } catch (error) {
      this.alertService.error(error);
    }

  }

  async save() {
    const confirm = await this.alertService.confirm();
    if (confirm) {
      try {
        if (this.onSelectHospcode == this.hospcodeConfirm && this.checkCid && this.position && this.title && this.firstName != '' && this.lastName != '' && this.username != '' && this.checkPasswordConfirm && this.checkEmail && this.checkPhone && this.checkImage) {
          let obj: any = {
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
            right: ['STAFF_REQUISITION','STAFF_RECEIVE_DRUG']
          }

          let rs: any = await this.registerService.register(obj);
          if (rs.ok) {
            this.alertService.success();
            this.router.navigate(['/login']);
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
    this.onSelectHospcode = e.hospcode;
    this.province = e.hosptype_id == '1' ? 'Y' : 'N'
  }

  async getTitle() {
    try {
      const rs: any = await this.registerService.getTitle();
      if (rs.ok) {
        this.titleList = rs.rows;
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
