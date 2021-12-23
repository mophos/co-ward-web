import { BasicService } from './../../staff/services/basic.service';
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
  rights: any;
  collapsible = true;
  collapse = false;
  reportResource: any;
  reportPatient: any;
  reportBed: any;
  reportLabPositive: any;
  modalClose = false;
  modalAlert = false;
  topic: any;
  message: any;
  private subscription1: Subscription;
  private subscription2: Subscription;
  private subscription3: Subscription;
  public jwtHelper = new JwtHelperService();
  constructor(
    private route: Router,
    private basicService: BasicService,
    private mqttService: MqttService
  ) {
    const decoded = this.jwtHelper.decodeToken(sessionStorage.getItem('token'));
    this.rights = decoded.rights;
    this.fullname = decoded.fullname;
    this.hospname = decoded.hospname;
    this.topic = decoded.mqttTopic;
    this.reportResource = findIndex(this.rights, { name: 'MANAGER_REPORT_RESOURCE' }) === -1 ? false : true;
    this.reportPatient = findIndex(this.rights, { name: 'MANAGER_REPORT_PATIENT' }) === -1 ? false : true;
    this.reportBed = findIndex(this.rights, { name: 'MANAGER_REPORT_BED' }) === -1 ? false : true;
    this.reportLabPositive = findIndex(this.rights, { name: 'MANAGER_REPORT_LAB_POSITIVE' }) === -1 ? false : true;
    this.subscribeMqtt();
  }

  ngOnDestroy(): void {
    try {
      this.subscription1.unsubscribe();
      this.subscription2.unsubscribe();
      this.subscription3.unsubscribe();
    } catch (error) {
      console.log(error);

    }
  }

  async ngOnInit() {
    await this.getSystems();
  }

  logout() {
    sessionStorage.removeItem('token');
    this.route.navigate(['/login']);
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

  subscribeMqtt() {
    try {

      const that = this;
      this.subscription1 = this.mqttService.observe(`${this.topic}co-ward-close`).subscribe((message: IMqttMessage) => {
        this.messageMqtt(message.topic, message.payload.toString());
      });
      this.subscription2 = this.mqttService.observe(`${this.topic}manager-co-ward-alert`).subscribe((message: IMqttMessage) => {
        this.messageMqtt(message.topic, message.payload.toString());
      });
      this.subscription3 = this.mqttService.observe(`${this.topic}manager-co-ward-restart`).subscribe((message: IMqttMessage) => {
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
    } else if (topic === `${this.topic}manager-co-ward-alert`) {
      this.message = payload.toString();
      this.modalAlert = true;
    } else if (topic === `${this.topic}manager-co-ward-restart`) {
      if (payload.toString() === 'RESTART') {
        window.location.reload();
      }
    }
  }
}
