import { CioCheckPatientComponent } from './cio-check-patient/cio-check-patient.component';
import { CovidCaseNewV2Component } from './covid-case/covid-case-new-v2/covid-case-new-v2.component';
import { RequestProductNewComponent } from './request-products/request-product-new/request-product-new.component';
import { ReportAdmitConfirmCaseComponent } from './report-admit-confirm-case/report-admit-confirm-case.component';
import { RequestProductsComponent } from './request-products/request-products.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportPatientAdmitComponent } from './report-patient-admit/report-patient-admit.component';
import { CovidCaseOldComponent } from './covid-case/covid-case-old/covid-case-old.component';
import { ReportSuppliesComponent } from './report-supplies/report-supplies.component';
import { ApproveDrugsComponent } from './approve-drugs/approve-drugs.component';
import { InventoryStatusComponent } from './inventory-status/inventory-status.component';
import { SuppliesComponent } from './supplies/supplies.component';
import { CovidCaseApprovedComponent } from './covid-case-approved/covid-case-approved.component';
import { SettingBedsComponent } from './setting/setting-beds/setting-beds.component';
import { CovidCaseStatusComponent } from './covid-case-status/covid-case-status.component';
import { CovidCaseNewComponent } from './covid-case/covid-case-new/covid-case-new.component';
import { CovidCaseComponent } from './covid-case/covid-case.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { TrackingComponent } from './tracking/tracking.component';
import { TrackingDetailComponent } from './tracking-detail/tracking-detail.component';
import { BedComponent } from './bed/bed.component';
import { SettingComponent } from './setting/setting.component';
import { CheckBedComponent } from './check-bed/check-bed.component';
import { CheckSuppliesComponent } from './check-supplies/check-supplies.component';
import { StaffGuard } from '../staff-guard.service';
import { DrugComponent } from './drug/drug.component';
import { AuthCovidCaseService } from '../auth-staff/auth-covid-case.service';
import { AuthCovidCaseStatusService } from '../auth-staff/auth-covid-case-status.service';
import { AuthApprovedDrugsService } from '../auth-staff/auth-approved-drugs.service';
import { AuthApprovedSuppliesService } from '../auth-staff/auth-approved-supplies.service';
import { AuthStockProductsService } from '../auth-staff/auth-stock-products.service';
import { AuthStockDrugsService } from '../auth-staff/auth-stock-drugs.service';
import { AuthStockBedsService } from '../auth-staff/auth-stock-beds.service';
import { AuthStockSuppliesService } from '../auth-staff/auth-stock-supplies.service';
import { AuthTrackingService } from '../auth-staff/auth-tracking.service';
import { AuthCheckSuppliesService } from '../auth-staff/auth-check-supplies.service';
import { AuthCheckBedsService } from '../auth-staff/auth-check-beds.service';
import { AuthSettingBasicService } from '../auth-staff/auth-setting-basic.service';
import { AuthSettingBedsService } from '../auth-staff/auth-setting-beds.service';
import { AuthSettingMedicalSuppliesService } from '../auth-staff/auth-setting-medical-supplies.service';
import { AuthCovidCaseRequisitionService } from '../auth-staff/auth-covid-case-requisition.service';
import { AuthSettingProfessionalService } from '../auth-staff/auth-setting-professional.service';
import { AuthPayService } from '../auth-staff/auth-pay.service';
import { AuthSettinUserService } from '../auth-staff/auth-setting-user.service';
import { HomeComponent } from '../staff/home/home.component';
import { CovidCaseRequisitionComponent } from './covid-case-requisition/covid-case-requisition.component';
import { SurgicalMaskShphComponent } from './surgical-mask-shph/surgical-mask-shph.component';
import { SettingMedicalSuppliesComponent } from './setting/setting-medical-supplies/setting-medical-supplies.component';
import { ProfessionalComponent } from './setting/professional/professional.component';
import { AuthProvinceSetSupUserService } from '../auth-staff/auth-province-set-sup-user.service';
import { ManageProvinceSetSupUserComponent } from './manage-province-set-sup-user/manage-province-set-sup-user.component';
import { SettingUsersComponent } from '../staff/setting/setting-users/setting-users.component';
import { CovidCaseEditComponent } from './covid-case/covid-case-edit/covid-case-edit.component';
import { ReportPatientsComponent } from './report-patients/report-patients.component';
import { ReportBedComponent } from './report-bed/report-bed.component';
import { AuthReportPatientsService } from '../auth-staff/auth-report-patients.service';
import { ReceivesComponent } from '../staff/receives/receives.component';
import { CovidCaseUpdateComponent } from './covid-case/covid-case-update/covid-case-update.component';
import { Report1Component } from '../manager/report-all/report-1/report-1.component';
import { Report2Component } from '../manager/report-all/report-2/report-2.component';
import { Report3Component } from '../manager/report-all/report-3/report-3.component';
import { Report4Component } from '../manager/report-all/report-4/report-4.component';
import { Report5Component } from '../manager/report-all/report-5/report-5.component';
import { Report6Component } from '../manager/report-all/report-6/report-6.component';
import { Report7Component } from '../manager/report-all/report-7/report-7.component';
import { Report8Component } from '../manager/report-all/report-8/report-8.component';
import { Report9Component } from '../manager/report-all/report-9/report-9.component';
import { Report10Component } from '../manager/report-all/report-10/report-10.component';
import { ReportMedicalSuppliesComponent } from './report-medical-supplies/report-medical-supplies.component';
import { ReportAdmitPuiComponent } from './report-admit-pui/report-admit-pui.component';
import { BedHospManageComponent } from './bed-hosp-manage/bed-hosp-manage.component';
import { AuthManageBedHospService } from '../auth-staff/auth-manage-bed-hosp.service';
import { ReportDcComponent } from './report-dc/report-dc.component';
import { ResultLabComponent } from './result-lab/result-lab.component';
import { ResultVaccineComponent } from './result-vaccine/result-vaccine.component';
import { BedEachTypeChartComponent } from './bed-each-type-chart/bed-each-type-chart.component';
import { CovidEachCaseChartComponent } from './covid-each-case-chart/covid-each-case-chart.component';
import { CovidEachStatusChartComponent } from './covid-each-status-chart/covid-each-status-chart.component';

const routes: Routes = [
  {
    path: 'staff2',
    component: LayoutComponent,
    canActivate: [StaffGuard],
    children: [
      { path: '', redirectTo: 'covid-case', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'covid-case', canActivate: [AuthCovidCaseService], component: CovidCaseComponent },
      { path: 'covid-case-new', canActivate: [AuthCovidCaseService], component: CovidCaseNewComponent },
      { path: 'covid-case-new-v2', canActivate: [AuthCovidCaseService], component: CovidCaseNewV2Component },
      { path: 'covid-case-edit', canActivate: [AuthCovidCaseService], component: CovidCaseEditComponent },
      { path: 'covid-case-old', canActivate: [AuthCovidCaseService], component: CovidCaseOldComponent },
      { path: 'covid-case-update', canActivate: [AuthCovidCaseService], component: CovidCaseUpdateComponent },
      { path: 'covid-case-status', canActivate: [AuthCovidCaseStatusService], component: CovidCaseStatusComponent },
      { path: 'covid-case-approved-drugs', canActivate: [AuthApprovedDrugsService], component: ApproveDrugsComponent },
      { path: 'covid-case-approved-supplies', canActivate: [AuthApprovedSuppliesService], component: CovidCaseApprovedComponent },
      { path: 'province-set-sup-user', canActivate: [AuthProvinceSetSupUserService], component: ManageProvinceSetSupUserComponent },
      // ----------------------------------------------------------------------------------------------------------
      { path: 'covid-case-requisition', canActivate: [AuthCovidCaseRequisitionService], component: CovidCaseRequisitionComponent },
      { path: 'stock-products', canActivate: [AuthStockProductsService], component: InventoryStatusComponent },
      { path: 'receive-products', canActivate: [AuthStockProductsService], component: ReceivesComponent },
      { path: 'surgical-sphp', canActivate: [AuthPayService], component: SurgicalMaskShphComponent },
      { path: 'supplies', canActivate: [AuthStockSuppliesService], component: SuppliesComponent },
      { path: 'bed-hosp-manage', canActivate: [AuthManageBedHospService], component: BedHospManageComponent },
      // { path: 'request-products',  component: RequestProductsComponent },
      {
        path: 'request-products',
        children: [
          { path: '', component: RequestProductsComponent },
          { path: 'new', component: RequestProductNewComponent },
        ]
      },
      {
        path: 'tracking',
        canActivate: [AuthTrackingService],
        children: [
          { path: '', component: TrackingComponent },
          { path: 'details', component: TrackingDetailComponent },
        ]
      },
      // ----------------------------------------------------------------------------------------------------------
      { path: 'check-supplie', canActivate: [AuthCheckSuppliesService], component: CheckSuppliesComponent },
      // ----------------------------------------------------------------------------------------------------------
      { path: 'report-patient-admit', component: ReportPatientAdmitComponent },
      { path: 'report-patient', component: ReportPatientsComponent },
      { path: 'report-bed', component: ReportBedComponent },
      { path: 'report-supplies', component: ReportSuppliesComponent },
      { path: 'report-medical', component: ReportMedicalSuppliesComponent },
      { path: 'report-admit-confirm-case', component: ReportAdmitConfirmCaseComponent },
      { path: 'report-admit-pui', component: ReportAdmitPuiComponent },
      { path: 'cio-check-patient', component: CioCheckPatientComponent },
      { path: 'report-dc', component: ReportDcComponent },
      // ----------------------------------------------------------------------------------------------------------
      {
        path: 'setting',
        children: [
          { path: 'basic', canActivate: [AuthSettingBasicService], component: SettingComponent },
          { path: 'beds', canActivate: [AuthSettingBedsService], component: SettingBedsComponent },
          { path: 'medical-supplies', canActivate: [AuthSettingMedicalSuppliesService], component: SettingMedicalSuppliesComponent },
          { path: 'professional', canActivate: [AuthSettingProfessionalService], component: ProfessionalComponent },
          { path: 'users', canActivate: [AuthSettinUserService], component: SettingUsersComponent },
        ]
      },
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

      //////////// new ////////////////
      { path: 'result-lab', component: ResultLabComponent },
      { path: 'result-vaccine', component: ResultVaccineComponent },
      { path: 'bed-each-type-chart', component: BedEachTypeChartComponent },
      { path: 'covid-each-case-chart', component: CovidEachCaseChartComponent },
      { path: 'covid-each-status-chart', component: CovidEachStatusChartComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
