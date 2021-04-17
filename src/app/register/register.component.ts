import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterService } from '../register/register.service';
import { AlertService } from '../help/alert.service';
import thaiIdCard from 'thai-id-card';
import { AutocompleteHospitalComponent } from '../help/autocomplete-hospital/autocomplete-hospital.component';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {

  isSave = false;
  hospcodeConfirm: any = '';
  onSelectHospcode: any = null;
  cid: any = '';
  vendor: any;
  position: any = null;
  title: any = null;
  firstName: any = '';
  lastName: any = '';
  username: any = '';
  password: any = '';
  passwordConfirm: any = '';
  email: any = '';
  phoneNumber: any = '';
  province: any;

  checkCid: any;
  checkDupCid: any;
  checkPassword: any;
  checkUsername: any;
  checkPasswordConfirm: any;
  checkEmail: any;
  checkPhone: any;
  checkImage: any;

  titleList: any;
  positionList: any;

  isUploading: any = false;
  isNodeDrugs: any;
  isNodeSupplies: any;
  isDRUGS: any = false;
  isSupplies: any = false;
  hospName: any = '';

  fileName: any;
  filesToUpload: File = null;
  isVerify = false;
  modalOTP = false;

  refCode = false;
  transactionID: any;
  dateOtp: any = 0;
  telOtp: any;
  otp = '';
  isBora = false;
  errorBora: '';
  birthDay: any;
  laser: any;
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
    if (this.cid.length === 13) {
      try {
        this.checkCid = thaiIdCard.verify(this.cid);
        // const rs: any = await this.registerService.getCid(this.cid);
        // this.checkDupCid = rs.ok;
        // if (!this.checkDupCid) {
        //   this.checkCid = null;
        // }
      } catch (error) {
        console.log(error);
      }
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

  async enterUsername() {
    try {
      if (this.username.length > 1) {
        const rs: any = await this.registerService.getUsername(this.username);
        this.checkUsername = rs.ok;
      } else {
        this.checkUsername = null;
      }
    } catch (error) {
      console.log(error);
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

  async fileChangeEvent(fileInput: any) {
    this.filesToUpload = null;
    this.filesToUpload = fileInput.target.files[0] as File;
    if (this.filesToUpload) {
      this.fileName = fileInput.target.files[0].name;
    }
    try {
      const rs: any = await this.registerService.uploadUserSupplie(
        this.filesToUpload,
        this.cid,
      );
      if (rs.ok) {
        this.checkImage = true;
      }
    } catch (error) {
      this.alertService.error(error);
    }

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
            isSupplies: this.isSupplies
          };

          const rs: any = await this.registerService.register(obj);
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
    if (Object.values(e).length) {
      this.onSelectHospcode = e.hospcode;
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
        this.title = rs.rows[0].id;
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
        this.position = rs.rows[0].id;
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

  onClickRequestOTP() {
    this.modalOTP = true;
    this.sendRequestOTP();
  }

  async sendRequestOTP() {
    try {
      this.isSave = true;
      const date = (+moment().format('h') * 60) + +moment().format('m');
      if (this.dateOtp < date) {
        this.dateOtp = date + 5;
        this.telOtp = this.phoneNumber;
        const rs: any = await this.registerService.requestOTP(this.phoneNumber);
        if (rs.ok) {
          this.transactionID = rs.transaction_id;
          this.refCode = rs.ref_code;
          this.vendor = rs.vendor;
        }
      } else {
        if (this.telOtp !== this.phoneNumber) {
          this.dateOtp = date + 5;
          this.telOtp = this.phoneNumber;
          const rs: any = await this.registerService.requestOTP(this.phoneNumber);
          if (rs.ok) {
            this.transactionID = rs.transaction_id;
            this.refCode = rs.ref_code;
            this.vendor = rs.vendor;
          }
        } else {
          this.alertService.error('กรุณารอ 5 นาที');
        }
      }
      this.isSave = false;
    } catch (error) {
      this.isSave = false;
      console.log(error);
    }
  }

  async verifyOTP() {
    try {
      this.isSave = true;
      const rs: any = await this.registerService.verifyOTP(this.phoneNumber, this.otp, this.transactionID, this.vendor);
      if (rs.ok) {
        this.modalOTP = false;
        this.isVerify = true;
      } else {
        this.alertService.error('OTP ไม่ถูกต้อง');
      }
      this.isSave = false;
    } catch (error) {
      this.isSave = false;
      console.log(error);
    }
  }

  async onClickBORA() {
    try {
      const rs: any = await this.registerService.checkLaser(this.cid, this.firstName, this.lastName, this.birthDay, this.laser);
      if (rs.isError) {
        // this.errorBora = rs.desc;
        this.alertService.error(rs.desc);
      } else {
        // this.errorBora = ''
        this.isBora = true;
      }
    } catch (error) {

    }
  }
}
