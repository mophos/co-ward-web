import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ManageSuppliesComponent } from './manage-supplies/manage-supplies.component';
import { ManageMinMaxComponent } from './manage-min-max/manage-min-max.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageRequestComponent } from './manage-request/manage-request.component';
import { AuthGuard } from '../auth-guard.service';
import { ManageMinMaxSubComponent } from './manage-min-max-sub/manage-min-max-sub.component';
import { ManageRequestSubComponent } from './manage-request-sub/manage-request-sub.component';
import { ManageRestockComponent } from './manage-restock/manage-restock.component';
import { ManageRestockEditComponent } from './manage-restock-edit/manage-restock-edit.component';
import { PayNowComponent } from './pay-now/pay-now.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'manage-restock', pathMatch: 'full' },
      {
        path: 'manage-restock',
        children: [
          { path: '', component: ManageRestockComponent },
          { path: 'edit', component: ManageRestockEditComponent, },
          { path: 'pay-now', component: PayNowComponent, }]
      },
      // { path: 'manage-request', component: ManageRequestComponent },
      { path: 'manage-request/sub', component: ManageRequestSubComponent },
      { path: 'manage-min-max', component: ManageMinMaxComponent },
      { path: 'manage-min-max/sub', component: ManageMinMaxSubComponent },
      { path: 'manage-user', component: ManageUserComponent },
      { path: 'manage-supplies', component: ManageSuppliesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
