import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ManageSuppliesComponent } from './manage-supplies/manage-supplies.component';
import { ManageMinMaxComponent } from './manage-min-max/manage-min-max.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageMinMaxSubComponent } from './manage-min-max-sub/manage-min-max-sub.component';
import { ManageRequestSubComponent } from './manage-request-sub/manage-request-sub.component';
import { ManageRestockComponent } from './manage-restock/manage-restock.component';
import { ManageRestockEditComponent } from './manage-restock-edit/manage-restock-edit.component';
import { PayNowComponent } from './pay-now/pay-now.component';
import { AdminGuard } from '../admin-guard.service';
import { AuthRestock } from '../auth-restock.service';
import { AuthMinmax } from '../auth-minmax.service';
import { AuthUsermanage } from '../auth-usermanage.service';
import { AuthSuppliemanage } from '../auth-suppliemanage.service';
import { AuthHospitalmanage } from '../auth-hospitalmanage.service';
import { ManageHospitalComponent } from './manage-hospital/manage-hospital.component';
import { ManageDrugComponent } from '../admin/manage-drug/manage-drug.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'manage-restock', pathMatch: 'full' },
      {
        path: 'manage-restock',
        canActivate: [AuthRestock],
        children: [
          { path: '', component: ManageRestockComponent },
          { path: 'edit', component: ManageRestockEditComponent, },
          { path: 'pay-now', component: PayNowComponent, }]
      },
      {
        path: 'manage-min-max',
        canActivate: [AuthMinmax],
        children: [
          { path: '', component: ManageMinMaxComponent },
          { path: 'sub', component: ManageMinMaxSubComponent }]
      },
      { path: 'manage-user', canActivate: [AuthUsermanage], component: ManageUserComponent },
      { path: 'manage-supplies', canActivate: [AuthSuppliemanage], component: ManageSuppliesComponent },
      { path: 'manage-hospital', canActivate: [AuthHospitalmanage], component: ManageHospitalComponent },
      { path: 'manage-drug', component: ManageDrugComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
