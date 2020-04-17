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
import { HomeComponent } from '../staff/home/home.component';
import { CovidCaseRequisitionComponent } from './covid-case-requisition/covid-case-requisition.component';
import { PayComponent } from './pay/pay.component';
import { AuthCovidCaseRequisitionService } from '../auth-staff/auth-covid-case-requisition.service';
import { AuthPayService } from '../auth-staff/auth-pay.service';
import { SettingMedicalSuppliesComponent } from './setting/setting-medical-supplies/setting-medical-supplies.component';
import { ProfessionalComponent } from './setting/professional/professional.component';
import { AuthProvinceSetSupUserService } from '../auth-staff/auth-province-set-sup-user.service';
import { ManageProvinceSetSupUserComponent } from './manage-province-set-sup-user/manage-province-set-sup-user.component';

const routes: Routes = [
  {
    path: 'staff',
    component: LayoutComponent,
    canActivate: [StaffGuard],
    children: [
      { path: '', redirectTo: 'covid-case', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {
        path: 'covid-case',
        canActivate: [AuthCovidCaseService],
        children: [
          { path: '', component: CovidCaseComponent },
          // { path: 'new', component: CovidCaseNewComponent },
        ]
      },
      { path: 'covid-case-new', canActivate: [AuthCovidCaseService], component: CovidCaseNewComponent },
      { path: 'covid-case-status', canActivate: [AuthCovidCaseStatusService], component: CovidCaseStatusComponent },
      { path: 'covid-case-approved', canActivate: [AuthCovidCaseApprovedService], component: CovidCaseApprovedComponent },
      { path: 'covid-case-requisition', canActivate: [AuthCovidCaseRequisitionService], component: CovidCaseRequisitionComponent },

      { path: 'inventory-status', component: InventoryStatusComponent },
      { path: 'drugs', canActivate: [AuthStockDrugsService], component: DrugComponent },
      { path: 'beds', canActivate: [AuthStockBedsService], component: BedComponent },
      { path: 'supplies', canActivate: [AuthStockSuppliesService], component: SuppliesComponent },
      { path: 'pay', canActivate: [AuthPayService], component: PayComponent },

      {
        path: 'tracking',
        canActivate: [AuthTrackingService],
        children: [
          { path: '', component: TrackingComponent },
          { path: 'details', component: TrackingDetailComponent },
        ]
      },

      { path: 'check-bed', canActivate: [AuthCheckBedsService], component: CheckBedComponent },
      { path: 'check-supplie', canActivate: [AuthCheckSuppliesService], component: CheckSuppliesComponent },

      {
        path: 'setting',
        children: [
          { path: 'basic', canActivate: [AuthSettingBasicService], component: SettingComponent },
          { path: 'beds', canActivate: [AuthSettingBedsService], component: SettingBedsComponent },
          { path: 'medical-supplies', canActivate: [AuthSettingBedsService], component: SettingMedicalSuppliesComponent },
          { path: 'professional', canActivate: [AuthSettingBedsService], component: ProfessionalComponent },
          { path: 'province-set-sup-user', canActivate: [AuthProvinceSetSupUserService], component: ManageProvinceSetSupUserComponent },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
