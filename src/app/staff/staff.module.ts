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

import { AuthCovidCaseService } from '../auth-staff/auth-covid-case.service';
import { AuthCovidCaseStatusService } from '../auth-staff/auth-covid-case-status.service';
import { AuthCovidCaseApprovedService } from '../auth-staff/auth-covid-case-approved.service';
import { AuthStockDrugsService } from '../auth-staff/auth-stock-drugs.service';
import { AuthStockBedsService } from '../auth-staff/auth-stock-beds.service';
import { AuthStockSuppliesService } from '../auth-staff/auth-stock-supplies.service';
import { AuthTrackingService } from '../auth-staff/auth-tracking.service';
import { AuthCheckDrugsService } from '../auth-staff/auth-check-drugs.service';
import { AuthCheckSuppliesService } from '../auth-staff/auth-check-supplies.service';
import { AuthCheckBedsService } from '../auth-staff/auth-check-beds.service';
import { AuthSettingBasicService } from '../auth-staff/auth-setting-basic.service';
import { AuthSettingBedsService } from '../auth-staff/auth-setting-beds.service';

import { DrugComponent } from './drug/drug.component';
import { MyDatePickerTHModule } from 'mydatepicker-th';
import { CovidCaseComponent } from './covid-case/covid-case.component';
import { CovidCaseNewComponent } from './covid-case/covid-case-new/covid-case-new.component';
import { CovidCaseStatusComponent } from './covid-case-status/covid-case-status.component';
import { SettingBedsComponent } from './setting/setting-beds/setting-beds.component';
import { SuppliesComponent } from './supplies/supplies.component';
import { CovidCaseApprovedComponent } from './covid-case-approved/covid-case-approved.component';
import { HomeComponent } from './home/home.component';
import { CovidCaseRequisitionComponent } from './covid-case-requisition/covid-case-requisition.component';
import { PayComponent } from './pay/pay.component';
import { SettingMedicalSuppliesComponent } from './setting/setting-medical-supplies/setting-medical-supplies.component';
import { InventoryStatusComponent } from './inventory-status/inventory-status.component';
import { ProfessionalComponent } from './setting/professional/professional.component';
import { AuthProvinceSetSupUserService } from '../auth-staff/auth-province-set-sup-user.service';
import { ManageProvinceSetSupUserComponent } from './manage-province-set-sup-user/manage-province-set-sup-user.component';
import { SettingUsersComponent } from './setting/setting-users/setting-users.component';
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
    CovidCaseApprovedComponent,
    HomeComponent,
    CovidCaseRequisitionComponent,
    PayComponent,
    SettingMedicalSuppliesComponent,
    InventoryStatusComponent,
    ProfessionalComponent,
    ManageProvinceSetSupUserComponent,
    SettingUsersComponent
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
    AuthCovidCaseService,
    AuthCovidCaseStatusService,
    AuthCovidCaseApprovedService,
    AuthStockDrugsService,
    AuthStockBedsService,
    AuthStockSuppliesService,
    AuthTrackingService,
    AuthCheckDrugsService,
    AuthCheckSuppliesService,
    AuthCheckBedsService,
    AuthSettingBasicService,
    AuthSettingBedsService,
    AuthProvinceSetSupUserService
  ]
})
export class StaffModule { }
