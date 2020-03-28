import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ManageSuppilesComponent } from './manage-suppiles/manage-suppiles.component';
import { ManageMinMaxComponent } from './manage-min-max/manage-min-max.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageRequestComponent } from './manage-request/manage-request.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    // canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'manage-suppiles', component: ManageSuppilesComponent },
      { path: 'manage-min-max', component: ManageMinMaxComponent },
      { path: 'manage-user', component: ManageUserComponent },
      { path: 'manage-request', component: ManageRequestComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
