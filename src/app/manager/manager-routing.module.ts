import { ReportColabCheckComponent } from './report-colab-check/report-colab-check.component';
import { ReportLabPositiveComponent } from './report-lab-positive/report-lab-positive.component';

import { ReportAdmitConfirmCaseComponent } from './report-admit-confirm-case/report-admit-confirm-case.component';
import { ReportAdmitPuiCaseComponent } from './report-admit-pui-case/report-admit-pui-case.component';
import { ReportDischargeDailyComponent } from './report-discharge-daily/report-discharge-daily.component';
import { ReportPatientsProvincesComponent } from './report-patients-provinces/report-patients-provinces.component';
import { HomeComponent } from './home/home.component';
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
import { ReportReviewHomeworkComponent } from './report-review-homework/report-review-homework.component';

import { ReportDms1Component } from './report-dms/report-dms1/report-dms1.component';
import { ReportDms2Component } from './report-dms/report-dms2/report-dms2.component';
import { ReportDms3Component } from './report-dms/report-dms3/report-dms3.component';
import { ReportDms4Component } from './report-dms/report-dms4/report-dms4.component';
import { ReportDms5Component } from './report-dms/report-dms5/report-dms5.component';
import { ReportDms6Component } from './report-dms/report-dms6/report-dms6.component';
import { ReportDms7Component } from './report-dms/report-dms7/report-dms7.component';
import { ReportDms8Component } from './report-dms/report-dms8/report-dms8.component';
import { ReportDms9Component } from './report-dms/report-dms9/report-dms9.component';
import { ReportDms10Component } from './report-dms/report-dms10/report-dms10.component';
import { ReportReviewHomeworkDmsComponent } from './report-dms/report-review-homework-dms/report-review-homework-dms.component';
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
import { ReportReviewHomeworkAllComponent } from './report-all/report-review-homework-all/report-review-homework-all.component';
import { ReportRecordsComponent } from './report-records/report-records.component';
import { ReportLocalQuarantineComponent } from './report-local-quarantine/report-local-quarantine.component';

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

      { path: 'report-review-homework-private', component: ReportReviewHomeworkDmsComponent },
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

      { path: 'report-dms1-smk', component: ReportDms1Component },
      { path: 'report-dms2-smk', component: ReportDms2Component },
      { path: 'report-dms3-smk', component: ReportDms3Component },
      { path: 'report-dms4-smk', component: ReportDms4Component },
      { path: 'report-dms5-smk', component: ReportDms5Component },
      { path: 'report-dms6-smk', component: ReportDms6Component },
      { path: 'report-dms7-smk', component: ReportDms7Component },

      { path: 'report-review-homework-all', component: ReportReviewHomeworkAllComponent },
      { path: 'report/1', component: Report1Component },
      { path: 'report/2', component: Report2Component },
      { path: 'report/3', component: Report3Component },
      { path: 'report/4', component: Report4Component },
      { path: 'report/5', component: Report5Component },
      { path: 'report/6', component: Report6Component },
      { path: 'report/7', component: Report7Component },
      { path: 'report/8', component: Report8Component },
      { path: 'report/9', component: Report9Component },
      { path: 'report/10', component: Report10Component },

      { path: 'report-admit-confirm-case', component: ReportAdmitConfirmCaseComponent },
      { path: 'report-admit-pui-case', component: ReportAdmitPuiCaseComponent },
      { path: 'report-records', component: ReportRecordsComponent },
      { path: 'report-local-quarantine', component: ReportLocalQuarantineComponent },
      { path: 'report-discharge-daily', component: ReportDischargeDailyComponent },
      { path: 'report-lab-positive', component: ReportLabPositiveComponent },
      { path: 'report-lab-positive-colab', component: ReportColabCheckComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
