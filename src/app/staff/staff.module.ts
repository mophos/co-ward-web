import { HelpModule } from '../help/help.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { TrackingComponent } from './tracking/tracking.component';
import { TrackingDetailComponent } from './tracking-detail/tracking-detail.component';
import { BedComponent } from './bed/bed.component';
import { SettingComponent } from './setting/setting.component';
import { CheckBedComponent } from './check-bed/check-bed.component';
import { CheckSuppliesComponent } from './check-supplies/check-supplies.component';
import { ReceiveDrugComponent } from './receive-drug/receive-drug.component';

import { AuthBalancesuppile } from '../auth-balancesuppile.service';
import { AuthStatustracking } from '../auth-statustracking.service';
import { AuthCheckbed } from '../auth-checkbed.service';
import { AuthChecksupplie } from '../auth-checksupplie.service';
import { AuthSetting } from '../auth-setting.service';
import { AuthRequisition } from '../auth-requisition.service';
import { DrugComponent } from './drug/drug.component';
import { MyDatePickerTHModule } from 'mydatepicker-th';
import { CovidCaseComponent } from './covid-case/covid-case.component';
import { CovidCaseNewComponent } from './covid-case/covid-case-new/covid-case-new.component';
import { CovidCaseStatusComponent } from './covid-case-status/covid-case-status.component';
import { SettingBedsComponent } from './setting/setting-beds/setting-beds.component';
import { SuppliesComponent } from './supplies/supplies.component';
import { CovidCaseApprovedComponent } from './covid-case-approved/covid-case-approved.component';

@NgModule({
  declarations: [
    LayoutComponent,
    TrackingComponent,
    TrackingDetailComponent,
    BedComponent,
    SettingComponent,
    CheckBedComponent,
    CheckSuppliesComponent,
    ReceiveDrugComponent,
    DrugComponent,
    CovidCaseComponent,
    CovidCaseNewComponent,
    CovidCaseStatusComponent,
    SettingBedsComponent,
    SuppliesComponent,
    CovidCaseApprovedComponent
  ],
  imports: [
    HelpModule,
    CommonModule,
    StaffRoutingModule,
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    MyDatePickerTHModule
  ],
  exports: [
    TrackingDetailComponent
  ],
  providers: [
    AuthBalancesuppile,
    AuthStatustracking,
    AuthCheckbed,
    AuthChecksupplie,
    AuthSetting,
    AuthRequisition,
  ]
})
export class StaffModule { }
