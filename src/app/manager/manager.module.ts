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
    ReportMedicalsComponent
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
