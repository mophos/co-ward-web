import { ReportReviewHomeworkComponent } from './report-review-homework/report-review-homework.component';
import { ReportAdmitConfirmCaseComponent } from './report-admit-confirm-case/report-admit-confirm-case.component';
import { ReportPatientsProvincesComponent } from './report-patients-provinces/report-patients-provinces.component';
import { ReportDms8Component } from './report-dms/report-dms8/report-dms8.component';
import { ReportDms5Component } from './report-dms/report-dms5/report-dms5.component';
import { HomeComponent } from './home/home.component';
import { ReportReviewHomeworkDmsComponent } from './report-dms/report-review-homework-dms/report-review-homework-dms.component';
import { ReportSuppliesSummaryComponent } from './report-supplies-summary/report-supplies-summary.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ReportPatientsComponent } from './report-patients/report-patients.component';
import { ReportSuppliesComponent } from './report-supplies/report-supplies.component';
import { ReportBedsComponent } from './report-beds/report-beds.component';
import { ReportProfessionalsComponent } from './report-professionals/report-professionals.component';
import { ReportMedicalsComponent } from './report-medicals/report-medicals.component';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { ManagerGuard } from '../manager-guard.service';
import { AuthSearchPatient } from './auth-search-patient.service';
import { ReportDms1Component } from './report-dms/report-dms1/report-dms1.component';
import { ReportDms2Component } from './report-dms/report-dms2/report-dms2.component';
import { ReportDms3Component } from './report-dms/report-dms3/report-dms3.component';
import { ReportDms4Component } from './report-dms/report-dms4/report-dms4.component';
import { ReportDms6Component } from './report-dms/report-dms6/report-dms6.component';
import { ReportDms7Component } from './report-dms/report-dms7/report-dms7.component';
import { ReportDms9Component } from './report-dms/report-dms9/report-dms9.component';
import { ReportDms10Component } from './report-dms/report-dms10/report-dms10.component';
import { ReportRecordsComponent } from './report-records/report-records.component';

const routes: Routes = [
  {
    path: 'manager',
    component: LayoutComponent,
    canActivate: [ManagerGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'report-supplies-summary', component: ReportSuppliesSummaryComponent },
      { path: 'report-supplies', component: ReportSuppliesComponent },
      { path: 'report-patients', component: ReportPatientsComponent },
      { path: 'report-patients-provinces', component: ReportPatientsProvincesComponent },
      { path: 'report-beds', component: ReportBedsComponent },
      { path: 'report-professionals', component: ReportProfessionalsComponent },
      { path: 'report-medicals', component: ReportMedicalsComponent },
      { path: 'patient-info', canActivate: [AuthSearchPatient], component: PatientInfoComponent },
      { path: 'report-review-homework', component: ReportReviewHomeworkComponent },
      { path: 'report-review-homework-goverment', component: ReportReviewHomeworkDmsComponent },
      { path: 'report-dms1-goverment', component: ReportDms1Component },
      { path: 'report-dms2-goverment', component: ReportDms2Component },
      { path: 'report-dms3-goverment', component: ReportDms3Component },
      { path: 'report-dms4-goverment', component: ReportDms4Component },
      { path: 'report-dms5-goverment', component: ReportDms5Component },
      { path: 'report-dms6-goverment', component: ReportDms6Component },
      { path: 'report-dms7-goverment', component: ReportDms7Component },
      { path: 'report-dms8-goverment', component: ReportDms8Component },
      { path: 'report-dms9-goverment', component: ReportDms9Component },
      { path: 'report-dms10-goverment', component: ReportDms10Component },
      { path: 'report-dms1-private', component: ReportDms1Component },
      { path: 'report-dms2-private', component: ReportDms2Component },
      { path: 'report-dms3-private', component: ReportDms3Component },
      { path: 'report-dms4-private', component: ReportDms4Component },
      { path: 'report-dms5-private', component: ReportDms5Component },
      { path: 'report-dms6-private', component: ReportDms6Component },
      { path: 'report-dms7-private', component: ReportDms7Component },
      { path: 'report-dms8-private', component: ReportDms8Component },
      { path: 'report-dms9-private', component: ReportDms9Component },
      { path: 'report-dms10-private', component: ReportDms10Component },
      { path: 'report-review-homework-private', component: ReportReviewHomeworkDmsComponent },
      { path: 'report-admit-confirm-case', component: ReportAdmitConfirmCaseComponent },
      { path: 'report-records', component: ReportRecordsComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
