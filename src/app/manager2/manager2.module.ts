import { ReportDms8Component } from './report-dms/report-dms8/report-dms8.component';
import { ReportDms5Component } from './report-dms/report-dms5/report-dms5.component';
import { HelpModule } from 'src/app/help/help.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Manager2RoutingModule } from './manager2-routing.module';
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
import { ReportRecordsComponent } from './report-records/report-records.component';
import { ReportReviewHomeworkAllComponent } from './report-all/report-review-homework-all/report-review-homework-all.component';
import { Report1Component } from './report-all/report-1/report-1.component';
import { Report2Component } from './report-all/report-2/report-2.component';
import { Report3Component } from './report-all/report-3/report-3.component';
import { Report4Component } from './report-all/report-4/report-4.component';
import { Report5Component } from './report-all/report-5/report-5.component';
import { Report6Component } from './report-all/report-6/report-6.component';
import { Report7Component } from './report-all/report-7/report-7.component';
import { Report8Component } from './report-all/report-8/report-8.component';
import { Report9Component } from './report-all/report-9/report-9.component';
import { Report10Component } from './report-all/report-10/report-10.component';
import { ReportLocalQuarantineComponent } from './report-local-quarantine/report-local-quarantine.component';
import { PatientInfoDetailsComponent } from './patient-info-details/patient-info-details.component';
import { ReportAdmitPuiCaseComponent } from './report-admit-pui-case/report-admit-pui-case.component';
import { ReportDischargeDailyComponent } from './report-discharge-daily/report-discharge-daily.component';
import { ReportLabPositiveComponent } from './report-lab-positive/report-lab-positive.component';
import { ReportColabCheckComponent } from './report-colab-check/report-colab-check.component';
import { ReportBed2Component } from './report-bed2/report-bed2.component';
import { DashboardNationalComponent } from './dashboard-national/dashboard-national.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ReportBedsProvinceComponent } from './report-news/report-beds-province/report-beds-province.component';
import { ReportBedsHospitalComponent } from './report-news/report-beds-hospital/report-beds-hospital.component';
import { ReportPatientsSumDailyComponent } from './report-news/report-patients-sum-daily/report-patients-sum-daily.component';
import { ReportPatientsAdmitComponent } from './report-news/report-patients-admit/report-patients-admit.component';
import { ReportPatientsDischargeComponent } from './report-news/report-patients-discharge/report-patients-discharge.component';
import { ReportPatientsZoneComponent } from './report-news/report-patients-zone/report-patients-zone.component';
import { ReportPatientsProvinceComponent } from './report-news/report-patients-province/report-patients-province.component';
import { ReportBedsZoneComponent } from './report-news/report-beds-zone/report-beds-zone.component';
import { ReportPatientsHospitalComponent } from './report-news/report-patients-hospital/report-patients-hospital.component';
import { ReportRespiratorComponent } from './report-news/report-respirator/report-respirator.component';
import { BedsTypeComponent } from './dashboard-national/dashboards/beds-type/beds-type.component';
import { PatientsCaseComponent } from './dashboard-national/dashboards/patients-case/patients-case.component';
import { PatientsSumStatusComponent } from './dashboard-national/dashboards/patients-sum-status/patients-sum-status.component';
import { PatientsDailyStatusComponent } from './dashboard-national/dashboards/patients-daily-status/patients-daily-status.component';
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
    ReportReviewHomeworkDmsComponent,
    ReportDms1Component,
    ReportDms2Component,
    ReportDms3Component,
    ReportDms4Component,
    ReportDms5Component,
    ReportDms6Component,
    ReportDms7Component,
    ReportDms8Component,
    ReportDms9Component,
    ReportDms10Component,
    ReportReviewHomeworkAllComponent,
    Report1Component,
    Report2Component,
    Report3Component,
    Report4Component,
    Report5Component,
    Report6Component,
    Report7Component,
    Report8Component,
    Report9Component,
    Report10Component,
    HomeComponent,
    ReportPatientsProvincesComponent,
    ReportAdmitConfirmCaseComponent,
    ReportAdmitPuiCaseComponent,
    ReportReviewHomeworkComponent,
    ReportRecordsComponent,
    ReportLocalQuarantineComponent,
    PatientInfoDetailsComponent,
    ReportDischargeDailyComponent,
    ReportLabPositiveComponent,
    ReportColabCheckComponent,
    ReportBed2Component,
    /////// new ////////
    DashboardNationalComponent,
    ReportBedsProvinceComponent,
    ReportBedsHospitalComponent,
    ReportPatientsSumDailyComponent,
    ReportPatientsAdmitComponent,
    ReportPatientsDischargeComponent,

    ReportPatientsZoneComponent,

    ReportPatientsProvinceComponent,

    ReportBedsZoneComponent,

    ReportPatientsHospitalComponent,

    ReportRespiratorComponent,

    BedsTypeComponent,

    PatientsCaseComponent,

    PatientsSumStatusComponent,

    PatientsDailyStatusComponent,
  ],
  imports: [
    CommonModule,
    Manager2RoutingModule,
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    HelpModule,
    MyDatePickerTHModule,
    HighchartsChartModule
  ],
  exports: [
    PatientInfoDetailsComponent
  ]
})
export class Manager2Module { }
