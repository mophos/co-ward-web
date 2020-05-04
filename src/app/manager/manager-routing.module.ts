import { ReportDms8Component } from './report-dms/report-dms8/report-dms8.component';
import { ReportDms5Component } from './report-dms/report-dms5/report-dms5.component';
import { HomeComponent } from './home/home.component';
import { ReportReviewHomeworkComponent } from './report-dms/report-review-homework/report-review-homework.component';
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
      { path: 'report-beds', component: ReportBedsComponent },
      { path: 'report-professionals', component: ReportProfessionalsComponent },
      { path: 'report-medicals', component: ReportMedicalsComponent },
      { path: 'patient-info', canActivate: [AuthSearchPatient], component: PatientInfoComponent },
      { path: 'report-dms1', component: ReportDms1Component },
      { path: 'report-dms2', component: ReportDms2Component },
      { path: 'report-dms3', component: ReportDms3Component },
      { path: 'report-dms4', component: ReportDms4Component },
      { path: 'report-dms5', component: ReportDms5Component },
      { path: 'report-dms6', component: ReportDms6Component },
      { path: 'report-dms7', component: ReportDms7Component },
      { path: 'report-dms8', component: ReportDms8Component },
      { path: 'report-dms9', component: ReportDms9Component },
      { path: 'report-dms10', component: ReportDms10Component },
      { path: 'report-review-homework', component: ReportReviewHomeworkComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
