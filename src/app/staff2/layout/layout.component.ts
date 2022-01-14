import { BasicService } from '../services/basic.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { findIndex } from 'lodash';

import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {

  fullname: any;
  hospname: any;
  hospTypeCode: any;
  collapsible = true;
  collapse = false;
  rights: any;

  covidCaseMenu: any;
  covidCaseStatusMenu: any;
  covidApproveDrugsMenu: any;
  covidApproveSuppliesMenu: any;
  covidCaseOldMenu: any;
  importHIS: any;
  // ---------------------------------
  covidCaseRequisitionMenu: any;
  covidProductStock: any;
  surgicalSPHP: any;
  stockSuppliesMenu: any;
  trackingMenu: any;
  // ---------------------------------
  checkSuppliesMenu: any;
  // ---------------------------------
  settingBasicMenu: any;
  settingBedsMenu: any;
  settingMedicalSuppliesMenu: any;
  settingProfessionalMenu: any;
  settingUserMenu: any;
  settingProvinceSubUserMenu: any;
  // ---------------------------------
  reportMenu: any;
  reportAll: any;
  modalClose = false;
  modalAlert = false;
  message: any;
  topic: any;
  cioMenu = false;
  isHospital = true;
  public jwtHelper = new JwtHelperService();
  private subscription1: Subscription;
  private subscription2: Subscription;
  private subscription3: Subscription;
  checkManageBedHosp: boolean;
  providerType: any;
  constructor(
    private route: Router,
    private basicService: BasicService,
    private mqttService: MqttService
  ) {
    const decoded = this.jwtHelper.decodeToken(sessionStorage.getItem('token'));
    this.fullname = decoded.fullname;
    this.hospname = decoded.hospname;
    this.rights = decoded.rights;
    this.topic = decoded.mqttTopic;
    this.providerType = decoded.providerType;

    this.importHIS = findIndex(this.rights, { name: 'STAFF_IMPORT_HIS' }) === -1 ? false : true;
    this.covidCaseMenu = findIndex(this.rights, { name: 'STAFF_COVID_CASE' }) === -1 ? false : true;
    this.covidCaseOldMenu = findIndex(this.rights, { name: 'STAFF_COVID_CASE_OLD' }) === -1 ? false : true;
    this.covidCaseStatusMenu = findIndex(this.rights, { name: 'STAFF_COVID_CASE_STATUS' }) === -1 ? false : true;
    this.covidApproveDrugsMenu = findIndex(this.rights, { name: 'STAFF_APPROVED_DRUGS' }) === -1 ? false : true;
    this.covidApproveSuppliesMenu = findIndex(this.rights, { name: 'STAFF_APPROVED_SUPPLIES' }) === -1 ? false : true;
    this.settingProvinceSubUserMenu = findIndex(this.rights, { name: 'STAFF_PROVINCE_SET_SUPER_USER' }) === -1 ? false : true;
    this.cioMenu = findIndex(this.rights, { name: 'CIO_CHECK_PATIENT' }) === -1 ? false : true;
    // ---------------------------------------------------------------------------------------------------
    this.covidCaseRequisitionMenu = findIndex(this.rights, { name: 'STAFF_COVID_CASE_REQUISITION' }) === -1 ? false : true;
    this.covidProductStock = findIndex(this.rights, { name: 'STAFF_STOCK_PRODUCTS' }) === -1 ? false : true;
    this.surgicalSPHP = findIndex(this.rights, { name: 'STAFF_SURGICAL_SPHP' }) === -1 ? false : true;
    this.stockSuppliesMenu = findIndex(this.rights, { name: 'STAFF_STOCK_SUPPLIES' }) === -1 ? false : true;
    this.trackingMenu = findIndex(this.rights, { name: 'STAFF_TRACKING' }) === -1 ? false : true;
    // ---------------------------------------------------------------------------------------------------
    this.checkSuppliesMenu = findIndex(this.rights, { name: 'STAFF_CHECK_SUPPLIES' }) === -1 ? false : true;
    this.checkManageBedHosp = findIndex(this.rights, { name: 'STAFF_MANAGE_BED_HOSPITAL' }) === -1 ? false : true;
    if (decoded.providerType === 'ZONE' || decoded.providerType === 'SSJ') {
      this.reportMenu = true;
      this.isHospital = false;
    } else {
      this.reportMenu = false;
    }

    if (decoded.providerType === 'ZONE') {
      this.reportAll = true;
    } else {
      this.reportAll = false;
    }
    // ---------------------------------------------------------------------------------------------------
    this.settingBasicMenu = findIndex(this.rights, { name: 'STAFF_SETTING_BASIC' }) === -1 ? false : true;
    this.settingBedsMenu = findIndex(this.rights, { name: 'STAFF_SETTING_BEDS' }) === -1 ? false : true;
    this.settingMedicalSuppliesMenu = findIndex(this.rights, { name: 'STAFF_SETTING_MEDICAL_SUPPLIE' }) === -1 ? false : true;
    this.settingProfessionalMenu = findIndex(this.rights, { name: 'STAFF_SETTING_PROFESSIONAL' }) === -1 ? false : true;
    this.settingUserMenu = findIndex(this.rights, { name: 'STAFF_SETTING_USERS' }) === -1 ? false : true;
    this.subscribeMqtt();
  }
  ngOnDestroy(): void {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
  }


  async ngOnInit() {
    // await this.getSystems();
    // await this.initialSocket();
  }

  async getSystems() {
    try {
      const rs: any = await this.basicService.getSystems();
      if (rs.ok) {
        if (rs.rows === 'CLOSE') {
          this.modalClose = true;

        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  // async initialSocket() {
  //   // connect mqtt
  //   await this.connectMqtt();
  //   await this.subscribeMqtt();
  // }

  logout() {
    sessionStorage.removeItem('token');
    this.route.navigate(['/login']);
  }



  subscribeMqtt() {
    try {

      const that = this;
      this.subscription1 = this.mqttService.observe(`${this.topic}co-ward-close`).subscribe((message: IMqttMessage) => {
        this.messageMqtt(message.topic, message.payload.toString());
      });
      this.subscription2 = this.mqttService.observe(`${this.topic}co-ward-alert`).subscribe((message: IMqttMessage) => {
        this.messageMqtt(message.topic, message.payload.toString());
      });
      this.subscription3 = this.mqttService.observe(`${this.topic}co-ward-restart`).subscribe((message: IMqttMessage) => {
        this.messageMqtt(message.topic, message.payload.toString());
      });
    } catch (error) {
      console.log(error);

    }
  }


  messageMqtt(topic, payload) {
    console.log(topic, payload);
    if (topic === `${this.topic}co-ward-close`) {
      if (payload.toString() === 'CLOSE') {
        this.modalClose = true;
      } else if (payload.toString() === 'OPEN') {
        this.modalClose = false;
      }
    } else if (topic === `${this.topic}co-ward-alert`) {
      this.message = payload.toString();
      this.modalAlert = true;
    } else if (topic === `${this.topic}co-ward-restart`) {
      if (payload.toString() === 'RESTART') {
        console.log('asd');

        window.location.reload();
      }
    }
  }
}
