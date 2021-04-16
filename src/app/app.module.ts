import { Register2Component } from './register2/register2.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth-guard.service';
import { environment } from './../environments/environment';
import { AdminModule } from './admin/admin.module';
import { ManagerModule } from './manager/manager.module';
import { StaffModule } from './staff/staff.module';
import { AlertService } from './help/alert.service';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HelpModule } from './help/help.module';
import { RegisterDrugComponent } from './register-drug/register-drug.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule, IConfig } from 'ngx-mask'
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
import { MqttModule, IMqttServiceOptions } from 'ngx-mqtt';
export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'api-covid19.moph.go.th',
  port: 8080,
  path: '/mqtt',
  username: 'q4u',
  password: 'q4u'
};

export function tokenGetter() {
  return sessionStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    RegisterComponent,
    RegisterDrugComponent,
    Register2Component,
    ResetPasswordComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    AuthModule,
    LoginModule,
    AdminModule,
    ManagerModule,
    StaffModule,
    FormsModule,
    HelpModule,
    NgSelectModule,
    NgxMaskModule.forRoot(),
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
  ],
  providers: [
    { provide: 'API_URL', useValue: environment.apiUrl },
    AuthGuard,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AlertService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
