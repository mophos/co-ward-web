import { CheckBedsComponent } from './check-beds/check-beds.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from '../auth-guard.service';

const routes: Routes = [
  {
    path: 'manager',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'check-bed', pathMatch: 'full' },
      { path: 'check-bed', component: CheckBedsComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
