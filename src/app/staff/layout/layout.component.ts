import { BasicService } from './../services/basic.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { findIndex } from 'lodash';

import * as mqttClient from '../../../vendor/mqtt.min.js';
import { MqttClient } from 'mqtt';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

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
  mqttClient: MqttClient;
  modalClose = false;
  modalAlert = false;
  message: any;
  topic: any;
  cioMenu = false;
  isHospital = true;
  public jwtHelper = new JwtHelperService();
  constructor(
    private route: Router,
    private basicService: BasicService
  ) {
    const decoded = this.jwtHelper.decodeToken(sessionStorage.getItem('token'));
    this.fullname = decoded.fullname;
    this.hospname = decoded.hospname;
    this.rights = decoded.rights;
    this.topic = decoded.mqttTopic;

    this.covidCaseMenu = findIndex(this.rights, { name: 'STAFF_COVID_CASE' }) === -1 ? false : true;
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
  }


  async  ngOnInit() {
    await this.getSystems();
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

  async initialSocket() {
    // connect mqtt
    await this.connectMqtt();
    await this.subscribeMqtt();
    await this.messageMqtt();
  }

  logout() {
    sessionStorage.removeItem('token');
    this.route.navigate(['/login']);
  }

  connectMqtt() {
    try {
      // this.mqttClient = mqttClient.connect('mqtt://test.mosquitto.org', {
      this.mqttClient = mqttClient.connect('ws://api-covid19.moph.go.th:8080', {
        clienId: Math.floor(Math.random() * 10000),
        username: 'q4u',
        password: 'q4u'
      });
      console.log('connect');

    } catch (error) {
      console.log(error);
    }
  }

  checkMqtt() {
    console.log('check');

    this.mqttClient.on('connect', (error) => {
      if (error) {
        console.log('Subscribe Error!!');
      } else {
        console.log('Connect Mqtt success');
      }
    });
  }
  subscribeMqtt() {
    const that = this;
    this.mqttClient.on('connect', (error) => {
      if (error) {
        console.log('Subscribe Error!!');
      } else {
        console.log('Connect Mqtt success');

      }
      that.mqttClient.subscribe([`${this.topic}co-ward-close`, `${this.topic}co-ward-alert`, `${this.topic}co-ward-restart`], (err) => {
        if (err) {
          console.log('Subscribe Error!!');
        } else {
          console.log(`subscribe ${this.topic}`);

        }
      });
    });
  }

  messageMqtt() {
    this.mqttClient.on('message', (topic, payload) => {
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
    });
  }
}
