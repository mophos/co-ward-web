import { AlertService } from './../../help/alert.service';
import { BasicService } from './../../staff/services/basic.service';
import { BasicAuthService } from './../../staff/services/basic-auth.service';
import { Component, OnInit } from '@angular/core';
import * as mqttClient from '../../../vendor/mqtt.min.js';
import { MqttClient } from 'mqtt';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-manage-systems',
  templateUrl: './manage-systems.component.html',
  styles: []
})
export class ManageSystemsComponent implements OnInit {

  status: any;
  mqttClient: MqttClient;
  modalBroadcast = false;
  message: any;
  topic: any;
  public jwtHelper = new JwtHelperService();
  constructor(
    private basicAuthService: BasicAuthService,
    private basicService: BasicService,
    private alertService: AlertService
  ) {
    const decoded = this.jwtHelper.decodeToken(sessionStorage.getItem('token'));
    this.topic = decoded.mqttTopic;
  }

  ngOnInit() {
    this.initialSocket();
    this.getSystems();
  }

  async getSystems() {
    try {
      const rs: any = await this.basicService.getSystems();
      if (rs.ok) {
        this.status = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }
  async initialSocket() {
    // connect mqtt
    await this.connectMqtt();
    // await this.subscribeMqtt();
    // await this.messageMqtt();
  }

  connectMqtt() {
    try {
      this.mqttClient = mqttClient.connect('203.157.104.220:8080', {
        clienId: Math.floor(Math.random() * 10000),
        username: 'mqtt',
        password: '##Mqtt'
      });
      console.log('success');

    } catch (error) {
      console.log(error);
    }
  }



  async closeSystems() {
    try {
      const confirm = await this.alertService.confirm();
      if (confirm) {
        const rs: any = await this.basicAuthService.closeSystems();
        if (rs.ok) {
          this.closeSystemsMQTT();
          this.getSystems();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  closeSystemsMQTT() {
    this.mqttClient.publish(`${this.topic}co-ward-close`, 'CLOSE', { qos: 0 }, (err) => {
      if (err) {
        console.log('publish Error!!');
      }
    });
  }

  async openSystems() {
    try {
      const confirm = await this.alertService.confirm();
      if (confirm) {
        const rs: any = await this.basicAuthService.openSystems();
        if (rs.ok) {
          this.openSystemsMQTT();
          this.getSystems();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  openSystemsMQTT() {
    try {
      this.mqttClient.publish(`${this.topic}co-ward-close`, 'OPEN', { qos: 0 }, (err) => {
        if (err) {
          console.log('publish Error!!');
        }
      });

    } catch (error) {
      console.log(error);

    }
  }
  alertMQTT(message) {
    this.mqttClient.publish(`${this.topic}co-ward-alert`, message.toString(), (err) => {
      if (err) {
        console.log('publish Error!!');
      }
    });
  }
  openBroadcast() {
    this.modalBroadcast = true;
  }

  async onClickRefresh() {
    const confirm = await this.alertService.confirm();
    if (confirm) {
      this.mqttClient.publish(`${this.topic}co-ward-restart`, 'RESTART', (err) => {
        if (err) {
          console.log('publish Error!!');
        }
      });
    }
  }

  async sendBroadcase() {
    try {
      const confirm = await this.alertService.confirm();
      if (confirm) {
        this.modalBroadcast = false;
        const rs: any = await this.basicAuthService.broadcast(this.message);
        if (rs.ok) {
          this.alertMQTT(this.message);
          this.message = '';
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
