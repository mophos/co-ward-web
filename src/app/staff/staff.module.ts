import { CovidCaseOldComponent } from './covid-case/covid-case-old/covid-case-old.component';
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
import { AuthApprovedDrugsService } from '../auth-staff/auth-approved-drugs.service';
import { AuthApprovedSuppliesService } from '../auth-staff/auth-approved-supplies.service';
// -----------------------------------------------------------------------------------
import { AuthStockProductsService } from '../auth-staff/auth-stock-products.service';

import { AuthStockDrugsService } from '../auth-staff/auth-stock-drugs.service';
import { AuthStockBedsService } from '../auth-staff/auth-stock-beds.service';
import { AuthStockSuppliesService } from '../auth-staff/auth-stock-supplies.service';
import { AuthTrackingService } from '../auth-staff/auth-tracking.service';
import { AuthCheckDrugsService } from '../auth-staff/auth-check-drugs.service';
import { AuthCheckSuppliesService } from '../auth-staff/auth-check-supplies.service';
import { AuthCheckBedsService } from '../auth-staff/auth-check-beds.service';
import { AuthSettingBasicService } from '../auth-staff/auth-setting-basic.service';
import { AuthSettingBedsService } from '../auth-staff/auth-setting-beds.service';

import { AuthReportPatientsService } from '../auth-staff/auth-report-patients.service';

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
import { SurgicalMaskShphComponent } from './surgical-mask-shph/surgical-mask-shph.component';
import { SettingMedicalSuppliesComponent } from './setting/setting-medical-supplies/setting-medical-supplies.component';
import { InventoryStatusComponent } from './inventory-status/inventory-status.component';
import { ProfessionalComponent } from './setting/professional/professional.component';
import { AuthProvinceSetSupUserService } from '../auth-staff/auth-province-set-sup-user.service';
import { ManageProvinceSetSupUserComponent } from './manage-province-set-sup-user/manage-province-set-sup-user.component';
import { SettingUsersComponent } from './setting/setting-users/setting-users.component';
import { SettingProfilesComponent } from './setting/setting-profiles/setting-profiles.component';
import { CovidCaseEditComponent } from './covid-case/covid-case-edit/covid-case-edit.component';
import { ApproveDrugsComponent } from './approve-drugs/approve-drugs.component';
import { ReportPatientsComponent } from './report-patients/report-patients.component';
import { ReportBedComponent } from './report-bed/report-bed.component';
import { ReportSuppliesComponent } from './report-supplies/report-supplies.component';
import { ReportPatientAdmitComponent } from './report-patient-admit/report-patient-admit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReceivesComponent } from './receives/receives.component';
import { RequestProductsComponent } from './request-products/request-products.component';
import { ReportAdmitConfirmCaseComponent } from './report-admit-confirm-case/report-admit-confirm-case.component';
import { RequestProductNewComponent } from './request-products/request-product-new/request-product-new.component';
import { CovidCaseUpdateComponent } from './covid-case/covid-case-update/covid-case-update.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { CovidCaseNewV2Component } from './covid-case/covid-case-new-v2/covid-case-new-v2.component';
import { CioCheckPatientComponent } from './cio-check-patient/cio-check-patient.component';
import { ReportMedicalSuppliesComponent } from './report-medical-supplies/report-medical-supplies.component';
import { ReportAdmitPuiComponent } from './report-admit-pui/report-admit-pui.component';
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
    CovidCaseOldComponent,
    CovidCaseStatusComponent,
    SettingBedsComponent,
    SuppliesComponent,
    CovidCaseApprovedComponent,
    HomeComponent,
    CovidCaseRequisitionComponent,
    SurgicalMaskShphComponent,
    SettingMedicalSuppliesComponent,
    InventoryStatusComponent,
    ProfessionalComponent,
    ManageProvinceSetSupUserComponent,
    SettingUsersComponent,
    SettingProfilesComponent,
    CovidCaseEditComponent,
    ApproveDrugsComponent,
    ReportPatientsComponent,
    ReportBedComponent,
    ReportSuppliesComponent,
    ReportPatientAdmitComponent,
    ReportAdmitPuiComponent,
    ReportAdmitConfirmCaseComponent,
    DashboardComponent,
    ReceivesComponent,
    RequestProductsComponent,
    RequestProductNewComponent,
    CovidCaseUpdateComponent,
    CovidCaseNewV2Component,
    CioCheckPatientComponent,
    ReportMedicalSuppliesComponent
  ],
  imports: [
    HelpModule,
    CommonModule,
    StaffRoutingModule,
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    MyDatePickerTHModule,
    NgSelectModule
  ],
  exports: [
    TrackingDetailComponent
  ],
  providers: [
    AuthCovidCaseService,
    AuthCovidCaseStatusService,
    AuthApprovedDrugsService,
    AuthApprovedSuppliesService,
    AuthStockProductsService,
    AuthStockDrugsService,
    AuthStockBedsService,
    AuthStockSuppliesService,
    AuthTrackingService,
    AuthCheckDrugsService,
    AuthCheckSuppliesService,
    AuthCheckBedsService,
    AuthSettingBasicService,
    AuthSettingBedsService,
    AuthProvinceSetSupUserService,
    AuthReportPatientsService
  ]
})
export class StaffModule { }
