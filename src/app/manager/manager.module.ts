import { ReportDms8Component } from './report-dms/report-dms8/report-dms8.component';
import { ReportDms5Component } from './report-dms/report-dms5/report-dms5.component';
import { HelpModule } from 'src/app/help/help.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { CheckBedsComponent } from './check-beds/check-beds.component';
import { CheckSuppliesComponent } from './check-supplies/check-supplies.component';
import { CheckBedEocComponent } from './check-bed-eoc/check-bed-eoc.component';
import { CheckBedEoc2Component } from './check-bed-eoc2/check-bed-eoc2.component';
import { CheckHospitalSuppliesComponent } from './check-hospital-supplies/check-hospital-supplies.component';
import { ReportPatientsComponent } from './report-patients/report-patients.component';
import { ReportSuppliesComponent } from './report-supplies/report-supplies.component';
import { MyDatePickerTHModule } from 'mydatepicker-th';
import { ReportBedsComponent } from './report-beds/report-beds.component';
import { ReportProfessionalsComponent } from './report-professionals/report-professionals.component';
import { ReportSuppliesSummaryComponent } from './report-supplies-summary/report-supplies-summary.component';
import { ReportMedicalsComponent } from './report-medicals/report-medicals.component';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { ReportDms2Component } from './report-dms/report-dms2/report-dms2.component';
import { ReportDms3Component } from './report-dms/report-dms3/report-dms3.component';
import { ReportDms4Component } from './report-dms/report-dms4/report-dms4.component';
import { ReportDms1Component } from './report-dms/report-dms1/report-dms1.component';
import { ReportDms6Component } from './report-dms/report-dms6/report-dms6.component';
import { ReportDms7Component } from './report-dms/report-dms7/report-dms7.component';
import { ReportReviewHomeworkDmsComponent } from './report-dms/report-review-homework-dms/report-review-homework-dms.component';
import { HomeComponent } from './home/home.component';
import { ReportDms9Component } from './report-dms/report-dms9/report-dms9.component';
import { ReportDms10Component } from './report-dms/report-dms10/report-dms10.component';
import { ReportPatientsProvincesComponent } from './report-patients-provinces/report-patients-provinces.component';
import { ReportAdmitConfirmCaseComponent } from './report-admit-confirm-case/report-admit-confirm-case.component';
import { ReportReviewHomeworkComponent } from './report-review-homework/report-review-homework.component';

@NgModule({
  declarations: [
    LayoutComponent,
    CheckBedsComponent,
    CheckSuppliesComponent,
    CheckBedEocComponent,
    CheckBedEoc2Component,
    CheckHospitalSuppliesComponent,
    ReportPatientsComponent,
    ReportSuppliesComponent,
    ReportBedsComponent,
    ReportProfessionalsComponent,
    ReportSuppliesSummaryComponent,
    ReportMedicalsComponent,
    PatientInfoComponent,
    ReportDms1Component,
    ReportDms2Component,
    ReportDms3Component,
    ReportDms4Component,
    ReportDms5Component,
    ReportDms6Component,
    ReportDms7Component,
    ReportDms8Component,
    ReportReviewHomeworkDmsComponent,
    HomeComponent,
    ReportDms9Component,
    ReportDms10Component,
    ReportPatientsProvincesComponent,
    ReportAdmitConfirmCaseComponent,
    ReportReviewHomeworkComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    HelpModule,
    MyDatePickerTHModule
  ]
})
export class ManagerModule { }
