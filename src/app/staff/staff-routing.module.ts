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
import { AuthBalancebed } from '../auth-balancebed.service';
import { AuthBalancesuppile } from '../auth-balancesuppile.service';
import { AuthStatustracking } from '../auth-statustracking.service';
import { AuthSetting } from '../auth-setting.service';
import { AuthCheckbed } from '../auth-checkbed.service';
import { AuthChecksupplie } from '../auth-checksupplie.service';
import { AuthRequisition } from '../auth-requisition.service';
import { DrugComponent } from './drug/drug.component';

const routes: Routes = [
  {
    path: 'staff',
    component: LayoutComponent,
    canActivate: [StaffGuard],
    children: [
      { path: '', redirectTo: 'covid-case', pathMatch: 'full' },
      {
        path: 'covid-case',
        children: [
          { path: '', component: CovidCaseComponent },
          { path: 'new', component: CovidCaseNewComponent },
        ]
      },
      { path: 'covid-case-status', component: CovidCaseStatusComponent },
      { path: 'supplies', component: SuppliesComponent },
      { path: 'covid-case-approved', component: CovidCaseApprovedComponent },
      // {
      //   path: 'inventory',
      //   canActivate: [AuthBalancesuppile],
      //   children: [
      //     { path: '', component: InventoryComponent },
      //     { path: 'add', component: InventoryAddComponent },
      //     { path: 'edit', component: InventoryEditComponent },
      //   ]
      // },
      {
        path: 'tracking',
        canActivate: [AuthStatustracking],
        children: [
          { path: '', component: TrackingComponent },
          { path: 'details', component: TrackingDetailComponent },
        ]
      },
      {
        path: 'setting',
        children: [
          { path: 'basic', component: SettingComponent },
          { path: 'beds', component: SettingBedsComponent },
        ]
      },
      { path: 'beds', canActivate: [AuthBalancebed], component: BedComponent },
      { path: 'setting', canActivate: [AuthSetting], component: SettingComponent },
      { path: 'check-bed', canActivate: [AuthCheckbed], component: CheckBedComponent },
      { path: 'check-supplie', canActivate: [AuthChecksupplie], component: CheckSuppliesComponent },
      { path: 'drug', component: DrugComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
