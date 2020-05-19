import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginDashboardComponent } from './login-dashboard/login-dashboard.component';

const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  {
    path: 'login',
    children: [
      // { path: '', redirectTo: , pathMatch: 'full' },
      { path: '', component: LoginComponent },
      { path: 'login-dashboard', component: LoginDashboardComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
