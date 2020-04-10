import { CheckBedEoc2Component } from './check-bed-eoc2/check-bed-eoc2.component';
import { CheckBedEocComponent } from './check-bed-eoc/check-bed-eoc.component';
import { CheckSuppliesComponent } from './check-supplies/check-supplies.component';
import { CheckBedsComponent } from './check-beds/check-beds.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from '../auth-guard.service';
import { CheckHospitalSuppliesComponent } from './check-hospital-supplies/check-hospital-supplies.component';

const routes: Routes = [
  {
    path: 'manager',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'check-hospital-supplies', pathMatch: 'full' },
      // { path: 'check-beds', component: CheckBedsComponent },
      // { path: 'check-bed-eoc', component: CheckBedEocComponent },
      // { path: 'check-bed-eoc2', component: CheckBedEoc2Component },
      // { path: 'check-supplies', component: CheckSuppliesComponent },
      { path: 'check-hospital-supplies', component: CheckHospitalSuppliesComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
