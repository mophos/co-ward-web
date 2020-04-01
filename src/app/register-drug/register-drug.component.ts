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
  @ViewChild('hospital') hosp: AutocompleteHospitalComponent;

  constructor(
    private alertService: AlertService,
    private registerService: RegisterService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

}
