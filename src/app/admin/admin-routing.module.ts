import { FulfillSuppliesNewComponent } from './fulfill-supplies/fulfill-supplies-new/fulfill-supplies-new.component';
import { ManageMinMaxSuppliesComponent } from './manage-min-max-supplies/manage-min-max-supplies.component';
import { FulfillSuppliesComponent } from './fulfill-supplies/fulfill-supplies.component';
import { ManageSystemsComponent } from './manage-systems/manage-systems.component';
import { FulfillDrugsComponent } from './fulfill-drugs/fulfill-drugs.component';
import { HomeComponent } from './home/home.component';
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
import { RequisitionMinMaxComponent } from './requisition-min-max/requisition-min-max.component';
import { AuthRestockCollection } from '../auth-restock-collection.service';
import { ManageRestockCollectionComponent } from './manage-restock-collection/manage-restock-collection.component';
import { ManageMinMaxDrugsComponent } from './manage-min-max-drugs/manage-min-max-drugs.component';
import { FulfillSurgicalMaskComponent } from './fulfill-surgical-mask/fulfill-surgical-mask.component';
import { FulfillSurgicalMaskListComponent } from './fulfill-surgical-mask-list/fulfill-surgical-mask-list.component';
import { ManageNodeSurgicalComponent } from './manage-node-surgical/manage-node-surgical.component'

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'manage-restock-collection',
        canActivate: [AuthRestockCollection],
        // children: [
        // { path: '',
        component: ManageRestockCollectionComponent
        // },
        // { path: 'edit', component: ManageUserComponent, },
        // { path: 'pay-now', component: PayNowComponent, }
        // ]
      },
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
      { path: 'requisition-min-max', component: RequisitionMinMaxComponent },
      { path: 'home', component: HomeComponent },
      { path: 'fulfill-drugs', component: FulfillDrugsComponent },
      {
        path: 'fulfill-surgical-masks-list',
        children: [
          { path: '', component: FulfillSurgicalMaskListComponent },
          { path: 'fulfill-surgical-masks', component: FulfillSurgicalMaskComponent }
        ]
      },
      {
        path: 'fulfill-supplies',
        children: [
          { path: '', component: FulfillSuppliesComponent },
          { path: 'new', component: FulfillSuppliesNewComponent }
        ]
      },
      { path: 'min-max-drugs', component: ManageMinMaxDrugsComponent },
      { path: 'min-max-supplies', component: ManageMinMaxSuppliesComponent },
      { path: 'systems', component: ManageSystemsComponent },
      { path: 'manage-node-surgical', component: ManageNodeSurgicalComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
