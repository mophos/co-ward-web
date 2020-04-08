import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryAddComponent } from './inventory-add/inventory-add.component';
import { InventoryEditComponent } from './inventory-edit/inventory-edit.component';
import { TrackingComponent } from './tracking/tracking.component';
import { TrackingDetailComponent } from './tracking-detail/tracking-detail.component';
import { BedComponent } from './bed/bed.component';
import { SettingComponent } from './setting/setting.component';
import { CheckBedComponent } from './check-bed/check-bed.component';
import { CheckSuppliesComponent } from './check-supplies/check-supplies.component';
import { RequisitionComponent } from './requisition/requisition.component';
import { RequisitionNewComponent } from './requisition-new/requisition-new.component';
import { RequisitionEditComponent } from './requisition-edit/requisition-edit.component';
import { StaffGuard } from '../staff-guard.service';
import { AuthBalancebed } from '../auth-balancebed.service';
import { AuthBalancesuppile } from '../auth-balancesuppile.service';
import { AuthStatustracking } from '../auth-statustracking.service';
import { AuthSetting } from '../auth-setting.service';
import { AuthCheckbed } from '../auth-checkbed.service';
import { AuthChecksupplie } from '../auth-checksupplie.service';
import { AuthRequisition } from '../auth-requisition.service';
import { DrugComponent } from '../user/drug/drug.component';

const routes: Routes = [
  {
    path: 'staff',
    component: LayoutComponent,
    canActivate: [StaffGuard],
    children: [
      { path: '', redirectTo: 'inventory', pathMatch: 'full' },
      {
        path: 'inventory',
        canActivate: [AuthBalancesuppile],
        children: [
          { path: '', component: InventoryComponent },
          { path: 'add', component: InventoryAddComponent },
          { path: 'edit', component: InventoryEditComponent },
        ]
      },
      {
        path: 'tracking',
        canActivate: [AuthStatustracking],
        children: [
          { path: '', component: TrackingComponent },
          { path: 'details', component: TrackingDetailComponent },
        ]
      },
      { path: 'bed', canActivate: [AuthBalancebed], component: BedComponent },
      { path: 'setting', canActivate: [AuthSetting], component: SettingComponent },
      { path: 'check-bed', canActivate: [AuthCheckbed], component: CheckBedComponent },
      { path: 'check-supplie', canActivate: [AuthChecksupplie], component: CheckSuppliesComponent },
      { path: 'drug', component: DrugComponent },
      {
        path: 'requisition',
        canActivate: [AuthRequisition],
        children: [
          { path: '', component: RequisitionComponent },
          { path: 'new', component: RequisitionNewComponent },
          { path: 'edit', component: RequisitionEditComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
