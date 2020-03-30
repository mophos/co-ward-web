import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryAddComponent } from './inventory-add/inventory-add.component';
import { InventoryEditComponent } from './inventory-edit/inventory-edit.component';
import { TrackingComponent } from './tracking/tracking.component';
import { TrackingDetailComponent } from './tracking-detail/tracking-detail.component';
import { AuthGuard } from '../auth-guard.service';
import { BedComponent } from './bed/bed.component';
import { SettingComponent } from './setting/setting.component';
import { CheckBedComponent } from './check-bed/check-bed.component';
import { CheckSuppliesComponent } from './check-supplies/check-supplies.component';

const routes: Routes = [
  {
    path: 'staff',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'inventory', pathMatch: 'full' },
      {
        path: 'inventory',
        children: [
          { path: '', component: InventoryComponent },
          { path: 'add', component: InventoryAddComponent },
          { path: 'edit', component: InventoryEditComponent },
        ]
      },
      {
        path: 'tracking',
        children: [
          { path: '', component: TrackingComponent },
          { path: 'details', component: TrackingDetailComponent },
        ]
      },
      { path: 'bed', component: BedComponent },
      { path: 'setting', component: SettingComponent },
      { path: 'check-bed', component: CheckBedComponent },
      { path: 'check-supplie', component: CheckSuppliesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
